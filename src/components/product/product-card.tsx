import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import type { Product } from "@/content/products";

import { ProductMedia } from "./product-media";

/** Compact product card for grids (home page, related products). */
export function ProductCard({
  product,
  headingLevel = "h3",
}: {
  product: Product;
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const purity = product.specs.find((s) => s.label === "Purity")?.value;
  const grade = product.specs.find((s) => s.label === "Grade")?.value;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex h-full flex-col rounded-[var(--radius-card)] transition-transform duration-300 hover:-translate-y-1 motion-reduce:hover:translate-y-0"
    >
      <ProductMedia
        single
        product={product}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
        className="transition-shadow duration-300 group-hover:shadow-lift"
      />
      <div className="flex flex-1 flex-col px-1 pt-5">
        <div className="flex items-start justify-between gap-4">
          <Heading className="font-display-tight text-3xl">{product.name}</Heading>
          <ArrowUpRight
            aria-hidden
            className="mt-1 size-5 shrink-0 text-copper transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </div>
        <p className="mt-2 line-clamp-2 text-sm">{product.shortDescription}</p>
        <dl className="mt-4 flex flex-wrap gap-2 text-xs">
          {grade && (
            <div className="rounded-full border border-line bg-surface px-3 py-1">
              <dt className="sr-only">Grade</dt>
              <dd className="text-ink">{grade}</dd>
            </div>
          )}
          {purity && (
            <div className="rounded-full border border-copper/40 bg-copper-soft px-3 py-1">
              <dt className="sr-only">Purity</dt>
              <dd className="text-copper-dark">{purity}</dd>
            </div>
          )}
        </dl>
      </div>
    </Link>
  );
}
