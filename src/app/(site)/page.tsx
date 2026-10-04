import type { Metadata } from "next";

import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion/reveal";
import { ProductCard } from "@/components/product/product-card";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { GradeMarquee } from "@/components/sections/grade-marquee";
import { HomeHero } from "@/components/sections/home-hero";
import { IndustriesGrid } from "@/components/sections/industries-grid";
import { LocationBand } from "@/components/sections/location-band";
import { ProcessSteps } from "@/components/sections/process-steps";
import { StatsStrip } from "@/components/sections/stats-strip";
import { WhyUsGrid } from "@/components/sections/why-us-grid";
import { ButtonLink } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { faqs } from "@/content/faqs";
import { products } from "@/content/products";
import { faqJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMetadata({
    title: "Copper Scrap Supplier in Kundli, Sonipat | Delhi NCR & Haryana",
    description: siteConfig.description,
    path: "/",
    keywords: [
      "copper scrap supplier Sonipat",
      "copper scrap Kundli",
      "copper scrap dealer Delhi NCR",
      "copper scrap Haryana",
      "copper patti scrap",
      "copper rassa scrap",
      "millberry copper scrap India",
    ],
  }),
  title: { absolute: "Copper Scrap Supplier in Kundli, Sonipat | NexMetal" },
};

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <GradeMarquee />
      <StatsStrip />

      <Section aria-labelledby="products-title">
        <SectionHeading
          id="products-title"
          eyebrow="Our grades"
          title="Copper scrap, sorted by grade"
          lead="Five copper grades, each sorted and graded before dispatch. Pick a grade for full specifications."
          action={
            <ButtonLink href="/products" variant="outline" arrow>
              All products
            </ButtonLink>
          }
        />
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal as="li" key={product.slug} delay={(i % 3) * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </Section>

      <WhyUsGrid />
      <ProcessSteps />
      <IndustriesGrid />
      <LocationBand />

      <Section tone="surface" aria-labelledby="faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="faq-title"
              eyebrow="FAQ"
              title="Buying from NexMetal"
              lead="Quick answers for purchase teams. Anything else — just call or WhatsApp."
            />
          </div>
          <FaqList items={faqs} className="lg:col-span-8" />
        </div>
      </Section>

      <CtaBand />
      <JsonLd data={faqJsonLd(faqs)} />
    </>
  );
}
