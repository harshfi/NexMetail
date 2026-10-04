"use server";

import { headers } from "next/headers";
import { Resend } from "resend";

import { siteConfig } from "@/config/site";
import { getProduct } from "@/content/products";
import { enquirySchema, type EnquiryInput, type EnquiryResult } from "@/lib/validators";

// Best-effort in-memory rate limit (per server instance): 5 enquiries / 10 min / IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > MAX_PER_WINDOW;
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);

function formatEnquiry(data: EnquiryInput) {
  const productName =
    data.product === "other"
      ? "Other / not sure"
      : (getProduct(data.product)?.name ?? data.product);
  const rows: [string, string | undefined][] = [
    ["Name", data.name],
    ["Company", data.company],
    ["Phone", data.phone],
    ["Email", data.email],
    ["Product", productName],
    ["Quantity", data.quantity],
    ["Delivery location", data.location],
    ["Message", data.message],
  ];
  const filled = rows.filter(([, v]) => v);
  const text = filled.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<h2 style="font-family:sans-serif">New website enquiry</h2><table style="font-family:sans-serif;border-collapse:collapse">${filled
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#6e6862;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${escapeHtml(v!)}</td></tr>`,
    )
    .join("")}</table>`;
  return { productName, text, html };
}

export async function submitEnquiry(input: unknown): Promise<EnquiryResult> {
  const parsed = enquirySchema.safeParse(input);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<keyof EnquiryInput, string>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as keyof EnquiryInput;
      fieldErrors[key] ??= issue.message;
    }
    return { ok: false, message: "Please check the highlighted fields.", fieldErrors };
  }

  const data = parsed.data;
  if (data.product !== "other" && !getProduct(data.product)) {
    return {
      ok: false,
      message: "Please check the highlighted fields.",
      fieldErrors: { product: "Choose a product" },
    };
  }

  // Honeypot filled → pretend success so bots learn nothing.
  if (data.website) return { ok: true };

  const h = await headers();
  const ip =
    h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  if (rateLimited(ip)) {
    return {
      ok: false,
      message:
        "Too many enquiries from this connection. Please call or WhatsApp us instead.",
    };
  }

  const { productName, text, html } = formatEnquiry(data);
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_TO_EMAIL;
  const from = process.env.ENQUIRY_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[enquiry] Email not configured — enquiry logged instead:\n" + text);
      return { ok: true };
    }
    console.error(
      "[enquiry] RESEND_API_KEY / ENQUIRY_TO_EMAIL / ENQUIRY_FROM_EMAIL missing",
    );
    return {
      ok: false,
      message: `Sorry, we couldn't send your enquiry. Please call ${siteConfig.contact.phoneDisplay} or WhatsApp us.`,
    };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: to.split(",").map((s) => s.trim()),
      subject: `Enquiry: ${productName} — ${data.name}${data.company ? ` (${data.company})` : ""}`,
      text,
      html,
      ...(data.email ? { replyTo: data.email } : {}),
    });
    if (error) throw new Error(error.message);
    return { ok: true };
  } catch (err) {
    console.error("[enquiry] send failed", err);
    return {
      ok: false,
      message: `Sorry, something went wrong. Please call ${siteConfig.contact.phoneDisplay} or WhatsApp us.`,
    };
  }
}
