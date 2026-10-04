import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { ProductRow } from "@/components/product/product-row";
import { CtaBand } from "@/components/sections/cta-band";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { absoluteUrl } from "@/config/site";
import { products } from "@/content/products";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Copper Scrap Products — Patti, Rassa, Tally, AC Pipe, Dori",
  description:
    "Copper scrap grades supplied by NexMetal, Kundli: copper patti (strip), Millberry rassa wire, copper tally, AC copper pipe and copper dori. Specs, purity and quick quotes.",
  path: "/products",
  keywords: products.flatMap((p) => p.seo.keywords.slice(0, 2)),
});

export default function ProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Product catalogue"
        title="Copper scrap grades"
        lead="Five copper grades, sorted and graded at our Kundli yard. Every load is weighed transparently and billed on a GST invoice."
        crumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
      >
        <nav aria-label="Jump to product" className="mt-8">
          <ul className="flex flex-wrap gap-2">
            {products.map((p) => (
              <li key={p.slug}>
                <a
                  href={`#${p.slug}`}
                  className="inline-block rounded-full border border-white/20 px-4 py-1.5 text-sm text-white/85 hover:border-copper-light hover:text-copper-light"
                >
                  {p.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <section aria-label="Products" className="py-16 sm:py-20 lg:py-24">
        <Container className="flex flex-col gap-16 lg:gap-24">
          {products.map((product, i) => (
            <div key={product.slug} className="flex flex-col gap-16 lg:gap-24">
              {i > 0 && <hr className="border-line" />}
              <ProductRow product={product} reverse={i % 2 === 1} priority={i === 0} />
            </div>
          ))}
        </Container>
      </section>

      <CtaBand
        title="Don't see your grade?"
        lead="Tell us what you buy — form, purity and monthly quantity — and we'll tell you honestly whether we can supply it."
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: products.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: absoluteUrl(`/products/${p.slug}`),
            name: p.name,
          })),
        }}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
        ])}
      />
    </>
  );
}
