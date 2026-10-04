import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { SpecList } from "@/components/ui/spec-list";
import type { Product } from "@/content/products";
import { cn } from "@/lib/utils";

import { ProductMedia } from "./product-media";

/**
 * Catalogue row: image card + content column. `reverse` puts the image on the
 * right at lg+. On mobile the image always comes first.
 */
export function ProductRow({
  product,
  index,
  total,
  reverse = false,
  priority = false,
}: {
  product: Product;
  index: number;
  total: number;
  reverse?: boolean;
  priority?: boolean;
}) {
  const number = String(index + 1).padStart(2, "0");
  const href = `/products/${product.slug}`;
  return (
    <article
      id={product.slug}
      aria-labelledby={`${product.slug}-title`}
      className="grid scroll-mt-28 items-center gap-8 lg:grid-cols-12 lg:gap-14"
    >
      <Reveal
        from={reverse ? "right" : "left"}
        className={cn("lg:col-span-5", reverse && "lg:order-last")}
      >
        <ProductMedia
          product={product}
          badge={`${number} / ${String(total).padStart(2, "0")}`}
          priority={priority}
          sizes="(min-width: 1280px) 460px, (min-width: 1024px) 40vw, 100vw"
        />
      </Reveal>

      <Reveal delay={0.08} className="lg:col-span-7">
        <Chip>{product.eyebrow}</Chip>
        <h2
          id={`${product.slug}-title`}
          className="mt-4 font-display-tight text-[2rem] sm:text-[2.6rem]"
        >
          <Link href={href} className="hover:text-copper-dark">
            {product.name}
          </Link>
        </h2>
        <p className="mt-3 max-w-xl text-base sm:text-lg">{product.shortDescription}</p>
        <SpecList specs={product.specs} className="mt-6" />
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <ButtonLink href={`/contact?product=${product.slug}#enquiry`} arrow>
            Enquire now
          </ButtonLink>
          <Link
            href={href}
            className="text-sm font-semibold text-copper-dark underline-offset-4 hover:underline"
          >
            Full details<span className="sr-only"> for {product.name}</span>
          </Link>
        </div>
      </Reveal>
    </article>
  );
}
