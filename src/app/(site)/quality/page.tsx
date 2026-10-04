import type { Metadata } from "next";
import Link from "next/link";
import { Check } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { CtaBand } from "@/components/sections/cta-band";
import { ProcessSteps } from "@/components/sections/process-steps";
import { PageHero } from "@/components/ui/page-hero";
import { Section, SectionHeading } from "@/components/ui/section";
import { products } from "@/content/products";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Quality & Process — Sorting, Grading, Weighment, GST Invoice",
  description:
    "How NexMetal handles copper scrap: sourcing, sorting and segregation, grading and purity check, baling and packing, transparent weighment, GST invoice and dispatch from Kundli.",
  path: "/quality",
});

const spec = (slug: string, label: string) =>
  products.find((p) => p.slug === slug)?.specs.find((s) => s.label === label)?.value;

const formOf = (slug: string) =>
  spec(slug, "Format") ??
  spec(slug, "Form") ??
  spec(slug, "Thickness") ??
  spec(slug, "Condition");

// Only checks backed by the product specs — see products.ts.
const dispatchChecks = [
  "Grade and purity band match what is on your quote",
  "Material sorted by form — strip, wire, pipe, heavy solids — never mixed",
  "Foreign material removed: iron fittings, brass attachments, solder joints and PVC insulation where the grade calls for it",
  "Packed by product: bundles, bales or sorted lengths",
  "Weighed transparently, with the weight carried onto the invoice",
  "GST invoice from NexMetal Recycling Private Limited on every load",
];

export default function QualityPage() {
  return (
    <>
      <PageHero
        eyebrow="Quality & process"
        title="What we quote is what you receive"
        lead="Every lot follows the same five steps, from the moment it reaches our Kundli yard to the moment it leaves on your truck."
        crumbs={[{ label: "Home", href: "/" }, { label: "Quality" }]}
      />

      <ProcessSteps showLink={false} />

      <Section aria-labelledby="grades-title">
        <SectionHeading
          id="grades-title"
          eyebrow="Grading"
          title="Grades at a glance"
          lead="The grade, purity band and form for each product we supply."
        />
        {/* Phones: one card per product. */}
        <ul className="grid gap-3 sm:hidden">
          {products.map((p) => (
            <li
              key={p.slug}
              className="rounded-[var(--radius-card)] border border-line bg-surface p-5 shadow-soft"
            >
              <h3 className="font-semibold text-ink">
                <Link href={`/products/${p.slug}`} className="hover:text-copper-dark">
                  {p.name}
                </Link>
              </h3>
              <dl className="mt-3 grid gap-2 text-sm">
                {(
                  [
                    ["Grade", spec(p.slug, "Grade")],
                    ["Purity", spec(p.slug, "Purity")],
                    ["Form", formOf(p.slug)],
                  ] as const
                ).map(([label, value]) => (
                  <div key={label} className="grid grid-cols-[4.5rem_1fr] gap-2">
                    <dt className="text-muted">{label}</dt>
                    <dd className="text-ink">{value ?? "—"}</dd>
                  </div>
                ))}
              </dl>
            </li>
          ))}
        </ul>
        {/* Tablet and up: comparison table. */}
        <div
          role="region"
          aria-labelledby="grades-title"
          tabIndex={0}
          className="hidden overflow-x-auto rounded-[var(--radius-card)] border border-line bg-surface shadow-soft sm:block"
        >
          <table className="w-full min-w-[640px] text-left text-sm">
            <caption className="sr-only">
              Copper scrap grades supplied by NexMetal
            </caption>
            <thead className="border-b border-line bg-copper-soft/60 text-xs tracking-[0.08em] text-ink uppercase">
              <tr>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Product
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Grade
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Purity
                </th>
                <th scope="col" className="px-5 py-4 font-semibold">
                  Form
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {products.map((p) => (
                <tr key={p.slug}>
                  <th scope="row" className="px-5 py-4 font-semibold text-ink">
                    <Link href={`/products/${p.slug}`} className="hover:text-copper-dark">
                      {p.name}
                    </Link>
                  </th>
                  <td className="px-5 py-4">{spec(p.slug, "Grade") ?? "—"}</td>
                  <td className="px-5 py-4">{spec(p.slug, "Purity") ?? "—"}</td>
                  <td className="px-5 py-4">{formOf(p.slug) ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="checks-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              id="checks-title"
              eyebrow="Before dispatch"
              title="Checked before it leaves"
              lead="What every consignment goes through before loading."
            />
          </div>
          <ul className="grid gap-4 lg:col-span-7">
            {dispatchChecks.map((c, i) => (
              <Reveal
                as="li"
                key={c}
                delay={i * 0.04}
                className="flex gap-4 rounded-[var(--radius-card)] border border-line bg-bg p-5"
              >
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-copper-gradient text-white">
                  <Check aria-hidden className="size-4" />
                </span>
                <span className="text-[15px] text-ink">{c}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </Section>

      {/* TODO(owner): confirm samples/yard visits are offered (see faqs.ts). */}
      <CtaBand
        title="Want to inspect a lot?"
        lead="Ask us about samples or arrange a visit to our Kundli yard before you place an order."
      />

      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Quality", path: "/quality" },
        ])}
      />
    </>
  );
}
