import type { Metadata } from "next";
import Link from "next/link";

import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { LocationBand } from "@/components/sections/location-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { fullAddress, siteConfig } from "@/config/site";
import { products } from "@/content/products";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About NexMetal Recycling — Copper Scrap Company in Kundli",
  description:
    "NexMetal Recycling Private Limited is a GST-registered copper scrap company in HSIIDC Industrial Estate, Kundli, Sonipat — sourcing, sorting, grading and supplying copper scrap across North India.",
  path: "/about",
});

const registeredSince = new Date(siteConfig.gst.registeredSince).toLocaleDateString(
  "en-IN",
  {
    day: "numeric",
    month: "long",
    year: "numeric",
  },
);

const companyFacts = [
  { label: "Legal name", value: siteConfig.legalName },
  { label: "Constitution", value: siteConfig.constitution },
  { label: "GSTIN", value: siteConfig.gst.gstin, mono: true },
  {
    label: "GST registration",
    value: `${siteConfig.gst.registrationType}, since ${registeredSince}`,
  },
  { label: "Registered address", value: fullAddress },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Copper scrap, handled properly"
        lead={`${siteConfig.legalName} sources, sorts, grades and supplies copper scrap from Kundli, on the Delhi–Haryana border.`}
        crumbs={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="prose-nex lg:col-span-7">
            {/* TODO(owner): add the founding story, team and any history you want told here. */}
            <h2 className="!mt-0">Who we are</h2>
            <p>
              NexMetal is a {siteConfig.constitution.toLowerCase()}, GST-registered since{" "}
              {siteConfig.gst.registeredSinceYear}, working in non-ferrous scrap with a
              single focus: copper. We source copper scrap, sort it by form, grade it, and
              supply it to the businesses that melt, draw and cast it.
            </p>
            <p>
              Our buyers are wire-drawing units, foundries, secondary smelters, and cable
              and motor manufacturers. They need to know exactly what is arriving on the
              truck — the grade, the purity band, the form and the weight — and they need
              a proper GST invoice for it. That is the standard we work to.
            </p>
            <h2>What we supply</h2>
            <p>
              We currently supply {products.length} copper grades:{" "}
              {products.map((p, i) => (
                <span key={p.slug}>
                  <Link href={`/products/${p.slug}`}>{p.name}</Link>
                  {i < products.length - 2
                    ? ", "
                    : i === products.length - 2
                      ? " and "
                      : ""}
                </span>
              ))}
              . Each is sorted and graded at our yard before dispatch.
            </p>
            <h2>Why Kundli</h2>
            <p>{siteConfig.locationAdvantage}</p>
          </div>

          <Reveal className="lg:col-span-5">
            <div className="rounded-[var(--radius-card)] border border-line/70 bg-surface p-6 shadow-soft sm:p-8">
              <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase">
                Company details
              </h2>
              <dl className="mt-5 divide-y divide-line">
                {companyFacts.map((f) => (
                  <div
                    key={f.label}
                    className="grid gap-1 py-3.5 sm:grid-cols-3 sm:gap-4"
                  >
                    <dt className="text-sm text-muted">{f.label}</dt>
                    <dd
                      className={
                        f.mono
                          ? "font-mono text-sm text-ink sm:col-span-2"
                          : "text-sm text-ink sm:col-span-2"
                      }
                    >
                      {f.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </Section>

      <IndustriesGrid />
      <LocationBand />
      <CtaBand />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
    </>
  );
}
