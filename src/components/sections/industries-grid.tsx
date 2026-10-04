import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { industries } from "@/content/industries";
import { getProduct } from "@/content/products";

export function IndustriesGrid() {
  return (
    <Section tone="surface" aria-labelledby="industries-title">
      <SectionHeading
        id="industries-title"
        eyebrow="Who we supply"
        title="Built for industrial buyers"
        lead="We supply copper scrap in the grade and form each industry actually melts, draws or casts."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {industries.map((ind, i) => (
          <Reveal
            as="li"
            key={ind.id}
            delay={(i % 3) * 0.06}
            className="rounded-[var(--radius-card)] border border-line bg-bg p-6"
          >
            <div className="flex items-center gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full border border-copper/40 bg-surface text-copper-dark">
                <Icon name={ind.icon} className="size-5" />
              </span>
              <h3 className="text-lg font-semibold">{ind.name}</h3>
            </div>
            <p className="mt-4 text-[15px]">{ind.summary}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {ind.productSlugs.map((slug) => {
                const product = getProduct(slug);
                if (!product) return null;
                return (
                  <li key={slug}>
                    <Link
                      href={`/products/${slug}`}
                      className="inline-block rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium text-ink hover:border-copper hover:text-copper-dark"
                    >
                      {product.localName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
