import type { Metadata } from "next";
import { Clock, FileText, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/json-ld";
import { EnquiryForm } from "@/components/forms/enquiry-form";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import {
  fullAddress,
  mailLink,
  mapsEmbedUrl,
  mapsLink,
  siteConfig,
  telLink,
  whatsappLink,
} from "@/config/site";
import { products } from "@/content/products";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";
import type { ProductOption } from "@/lib/validators";

export const metadata: Metadata = pageMetadata({
  title: "Contact & Enquiry — Copper Scrap Supplier, Kundli",
  description:
    "Get a quote for copper scrap from NexMetal Recycling, HSIIDC Industrial Estate, Kundli, Sonipat. Call, WhatsApp or send an enquiry — GST invoice on every load.",
  path: "/contact",
});

const productOptions: ProductOption[] = [
  ...products.map((p) => ({ value: p.slug, label: p.name })),
  { value: "other", label: "Other / not sure" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Get a quote"
        lead="Tell us the grade, quantity and delivery location. We reply fastest on call or WhatsApp."
        crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <section
        className="py-16 sm:py-20 lg:py-24"
        aria-label="Contact details and enquiry form"
      >
        <Container className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-4 lg:col-span-5">
            <h2 className="font-display-tight text-2xl sm:text-3xl">
              Talk to our sales desk
            </h2>
            <ul className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-1">
              <ContactItem icon={<Phone className="size-5" />} label="Call">
                <a
                  href={telLink()}
                  className="font-semibold text-ink hover:text-copper-dark"
                >
                  {siteConfig.contact.phoneDisplay}
                </a>
              </ContactItem>
              <ContactItem icon={<MessageCircle className="size-5" />} label="WhatsApp">
                <a
                  href={whatsappLink("Hi NexMetal, I'd like a quote for copper scrap.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink hover:text-copper-dark"
                >
                  Chat on WhatsApp
                </a>
              </ContactItem>
              <ContactItem icon={<Mail className="size-5" />} label="Email">
                <a
                  href={mailLink("Copper scrap enquiry")}
                  className="font-semibold text-ink hover:text-copper-dark"
                >
                  {siteConfig.contact.email}
                </a>
              </ContactItem>
              <ContactItem icon={<Clock className="size-5" />} label="Business hours">
                <span className="text-ink">{siteConfig.hours.display}</span>
              </ContactItem>
              <ContactItem
                icon={<MapPin className="size-5" />}
                label="Yard & registered office"
              >
                <address className="text-ink not-italic">{fullAddress}</address>
                <a
                  href={mapsLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-semibold text-copper-dark underline-offset-4 hover:underline"
                >
                  Open in Google Maps
                </a>
              </ContactItem>
              <ContactItem icon={<FileText className="size-5" />} label="Company">
                <span className="text-ink">{siteConfig.legalName}</span>
                <span className="block text-sm">
                  GSTIN <span className="font-mono">{siteConfig.gst.gstin}</span>
                </span>
              </ContactItem>
            </ul>
          </div>

          <div
            id="enquiry"
            className="order-first scroll-mt-28 lg:order-none lg:col-span-7"
          >
            <div className="rounded-[var(--radius-card)] border border-line/70 bg-surface p-5 shadow-soft sm:p-10">
              <h2 className="font-display-tight text-2xl sm:text-3xl">Send an enquiry</h2>
              <p className="mt-2 mb-8 text-[15px]">
                Fields marked <span className="text-copper-dark">*</span> are required.
              </p>
              <EnquiryForm productOptions={productOptions} />
            </div>
          </div>
        </Container>
      </section>

      <section aria-label="Map" className="pb-16 sm:pb-24">
        <Container>
          <div className="overflow-hidden rounded-[var(--radius-card)] border border-line shadow-soft">
            <iframe
              title={`Map showing ${siteConfig.legalName}, ${siteConfig.address.locality}`}
              src={mapsEmbedUrl()}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block h-[380px] w-full border-0 grayscale-[35%] sm:h-[460px]"
            />
          </div>
        </Container>
      </section>

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
    </>
  );
}

function ContactItem({
  icon,
  label,
  children,
}: {
  icon: ReactNode;
  label: string;
  children: ReactNode;
}) {
  return (
    <li className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-surface p-4 sm:p-5">
      <span
        aria-hidden
        className="grid size-10 shrink-0 place-items-center rounded-full bg-copper-soft text-copper-dark sm:size-11"
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-xs font-semibold tracking-[0.08em] text-muted uppercase">
          {label}
        </p>
        <div className="mt-1 break-words">{children}</div>
      </div>
    </li>
  );
}
