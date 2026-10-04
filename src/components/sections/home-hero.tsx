import Image from "next/image";
import { BadgeCheck, MapPin, MessageCircle, ReceiptText } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { siteConfig, whatsappLink } from "@/config/site";
import { products } from "@/content/products";
import { availableImages } from "@/lib/images";
import { cn } from "@/lib/utils";

import { CopperStrands } from "./copper-strands";

const trustPoints = [
  {
    icon: BadgeCheck,
    text: `GST-registered since ${siteConfig.gst.registeredSinceYear}`,
  },
  { icon: ReceiptText, text: "GST invoice on every load" },
  { icon: MapPin, text: "On NH-44, Delhi–Haryana border" },
];

export function HomeHero() {
  // Up to four real product photos for the mosaic.
  const tiles = products
    .map((p) => ({ product: p, image: availableImages(p.images)[0] }))
    .filter((t) => t.image)
    .slice(0, 4);

  return (
    <section className="relative isolate overflow-hidden bg-night pt-32 pb-16 text-white/75 sm:pt-40 lg:pt-44 lg:pb-28">
      <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
        <CopperStrands className="size-full animate-kenburns opacity-80" />
        <div className="absolute -top-32 right-[-15%] size-[40rem] animate-glow rounded-full bg-copper/25 blur-[140px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-night/30 via-transparent to-night" />
      </div>

      <Container className="grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="animate-rise">
            <Chip tone="dark">Copper | Non-Ferrous Scrap</Chip>
          </div>
          <h1
            style={{ animationDelay: "90ms" }}
            className="mt-6 animate-rise font-display-tight text-[3.4rem] text-white sm:text-7xl lg:text-[5.75rem]"
          >
            Graded <span className="text-copper-gradient">copper scrap</span>, dispatched
            fast from Kundli
          </h1>
          <p
            style={{ animationDelay: "200ms" }}
            className="mt-6 max-w-xl animate-rise text-base sm:text-lg"
          >
            Patti, rassa, tally, AC pipe and dori — sorted, graded and billed on GST
            invoice. Supplied to wire-drawing units, foundries, smelters and cable &amp;
            motor makers across Delhi NCR and North India.
          </p>
          <div
            style={{ animationDelay: "300ms" }}
            className="mt-9 flex animate-rise flex-col gap-3 sm:flex-row"
          >
            <ButtonLink href="/contact#enquiry" size="lg" arrow>
              Get a quote
            </ButtonLink>
            <ButtonLink
              href={whatsappLink(
                "Hi NexMetal, I'd like today's copper scrap availability.",
              )}
              variant="outline-light"
              size="lg"
              icon={<MessageCircle aria-hidden className="size-4" />}
            >
              WhatsApp us
            </ButtonLink>
          </div>
          <ul
            style={{ animationDelay: "420ms" }}
            className="mt-10 flex animate-rise flex-col gap-3 text-sm sm:flex-row sm:flex-wrap sm:gap-x-7"
          >
            {trustPoints.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-2">
                <Icon aria-hidden className="size-4 text-copper-light" />
                {text}
              </li>
            ))}
          </ul>
        </div>

        {tiles.length > 0 && (
          <div className="lg:col-span-5">
            <ul className="grid grid-cols-2 gap-3 sm:gap-4">
              {tiles.map(({ product, image }, i) => (
                <li
                  key={product.slug}
                  style={{ animationDelay: `${250 + i * 120}ms` }}
                  className={cn(
                    "animate-tile",
                    i % 2 === 1 && "translate-y-6 sm:translate-y-10",
                  )}
                >
                  <figure
                    style={{ animationDelay: `${i * -1.7}s` }}
                    className="group/tile animate-float rounded-[var(--radius-card)] bg-white/5 p-2 ring-1 ring-white/10 backdrop-blur-sm transition-colors duration-300 hover:ring-copper-light/50"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-[10px]">
                      <Image
                        src={image!.src}
                        alt={image!.alt}
                        fill
                        priority={i < 2}
                        sizes="(min-width: 1024px) 220px, 45vw"
                        className="object-cover transition-transform duration-700 group-hover/tile:scale-110"
                      />
                    </div>
                    <figcaption className="px-1.5 pt-2 pb-1 text-xs font-semibold tracking-[0.08em] text-white/85 uppercase">
                      {product.localName}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Container>
    </section>
  );
}
