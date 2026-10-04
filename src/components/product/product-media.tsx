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
}: {
  product: Product;
  sizes: string;
  priority?: boolean;
  className?: string;
  aspect?: string;
  /** Show only the first photo — required inside links, where carousel buttons would nest. */
  single?: boolean;
}) {
  const all = availableImages(product.images);
  const images = single ? all.slice(0, 1) : all;

  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-line/70 bg-surface p-4 shadow-soft sm:p-6",
        className,
      )}
    >
      <div className={cn("relative overflow-hidden rounded-[10px] bg-night-2", aspect)}>
        {images.length === 0 ? (
          <CopperPlaceholder label={product.name} />
        ) : images.length === 1 ? (
          <Image
            src={images[0].src}
            alt={images[0].alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
        ) : (
          <ProductGallery
            images={images}
            productName={product.name}
            sizes={sizes}
            priority={priority}
          />
        )}
      </div>
    </div>
  );
}
