"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import type { ProductImage } from "@/content/products";
import { cn } from "@/lib/utils";

/** Swipeable image carousel with dots overlaid bottom-centre. Use only for 2+ images. */
export function ProductGallery({
  images,
  productName,
  sizes,
  priority = false,
}: {
  images: ProductImage[];
  productName: string;
  sizes: string;
  priority?: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect).on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect).off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label={`${productName} photos`}
      className="relative size-full"
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
        if (e.key === "ArrowRight") emblaApi?.scrollNext();
      }}
    >
      <div ref={emblaRef} className="size-full overflow-hidden">
        <div className="flex size-full touch-pan-y">
          {images.map((img, i) => (
            <div
              key={img.src}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${images.length}`}
              className="relative size-full min-w-0 shrink-0 grow-0 basis-full"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes={sizes}
                priority={priority && i === 0}
                className="object-cover transition-transform duration-700 ease-out group-hover/media:scale-105"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
        {images.map((img, i) => (
          <button
            key={img.src}
            type="button"
            onClick={() => emblaApi?.scrollTo(i)}
            aria-label={`Show photo ${i + 1} of ${images.length}`}
            aria-current={i === selected}
            className="grid size-6 place-items-center"
          >
            <span
              className={cn(
                "block h-1.5 rounded-full bg-white shadow transition-all",
                i === selected ? "w-5" : "w-1.5 opacity-60",
              )}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
