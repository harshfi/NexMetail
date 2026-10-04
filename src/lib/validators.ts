import { z } from "zod";

// Kept free of content imports so the client bundle stays small. The server action
// additionally checks `product` against the real catalogue.

/** Shared by the client form (react-hook-form) and the server action. */
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80, "Name is too long"),
  company: z
    .string()
    .trim()
    .max(120, "Company name is too long")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s-]{10,16}$/, "Enter a valid phone number, e.g. +91 98123 45678"),
  email: z
    .union([z.literal(""), z.email("Enter a valid email address").max(120)])
    .optional(),
  product: z.string().min(1, "Choose a product").max(60),
  quantity: z
    .string()
    .trim()
    .max(60, "Keep this under 60 characters")
    .optional()
    .or(z.literal("")),
  location: z
    .string()
    .trim()
    .max(80, "Keep this under 80 characters")
    .optional()
    .or(z.literal("")),
  message: z
    .string()
    .trim()
    .max(1000, "Keep the message under 1000 characters")
    .optional()
    .or(z.literal("")),
  /** Honeypot — real users never see or fill this. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ProductOption = { value: string; label: string };

export type EnquiryInput = z.infer<typeof enquirySchema>;

export type EnquiryResult =
  | { ok: true }
  | {
      ok: false;
      message: string;
      fieldErrors?: Partial<Record<keyof EnquiryInput, string>>;
    };
