import Image from "next/image";

import { CopperPlaceholder } from "@/components/ui/copper-placeholder";
import type { Product } from "@/content/products";
import { availableImages } from "@/lib/images";
import { cn } from "@/lib/utils";

import { ProductGallery } from "./product-gallery";

/**
 * White-framed product image card. Picks the cheapest rendering:
 * placeholder (no photos) → single next/image → client carousel (2+ photos).
 */
export function ProductMedia({
  product,
  sizes,
  priority = false,
  className,
  aspect = "aspect-[4/3]",
  single = false,
  badge,
}: {
  product: Product;
  sizes: string;
  priority?: boolean;
  className?: string;
  aspect?: string;
  /** Show only the first photo — required inside links, where carousel buttons would nest. */
  single?: boolean;
  /** Optional overlay label, e.g. "01". */
  badge?: string;
}) {
  const all = availableImages(product.images);
  const images = single ? all.slice(0, 1) : all;

  return (
    <div
      className={cn(
        "group/media relative overflow-hidden rounded-[20px] bg-night-2 shadow-soft ring-1 ring-black/5",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden", aspect)}>
        {images.length === 0 ? (
          <CopperPlaceholder label={product.name} />
        ) : images.length === 1 ? (
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover transition-transform duration-700 ease-out group-hover/media:scale-105"
          />
        ) : (
          <ProductGallery
            images={images}
            productName={product.name}
            sizes={sizes}
            priority={priority}
          />
        )}
        {badge && (
          <>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/45 to-transparent"
            />
            <span
              aria-hidden
              className="absolute top-4 left-4 font-display text-sm font-semibold tracking-[0.08em] text-white/90 tabular-nums"
            >
              {badge}
            </span>
          </>
        )}
      </div>
    </div>
  );
}
