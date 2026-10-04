import { Reveal } from "@/components/motion/reveal";
import type { Product } from "@/content/products";

import { ProductCard } from "./product-card";

/**
 * Product cards: a swipeable, snapping row on phones (next card peeks in as a hint),
 * a 2/3-column grid from `sm` up.
 */
export function ProductCardGrid({
  products,
  label,
}: {
  products: Product[];
  label: string;
}) {
  return (
    <ul
      aria-label={label}
      className="-mx-4 flex snap-x snap-mandatory scroll-px-4 [scrollbar-width:none] gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 [&::-webkit-scrollbar]:hidden"
    >
      {products.map((product, i) => (
        <Reveal
          as="li"
          key={product.slug}
          delay={(i % 3) * 0.06}
          className="w-[80%] shrink-0 snap-start sm:w-auto"
        >
          <ProductCard product={product} />
        </Reveal>
      ))}
    </ul>
  );
}
