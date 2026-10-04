import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  MapPin,
  MessageCircle,
  ReceiptText,
} from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { siteConfig, whatsappLink } from "@/config/site";
import { products, type Product } from "@/content/products";
import { availableImages } from "@/lib/images";

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
  const grades = products.map((p) => ({
    product: p,
    image: availableImages(p.images)[0],
    purity: purityLabel(p),
  }));

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
            <Chip tone="dark">Copper · Non-ferrous scrap</Chip>
          </div>
          <h1
            style={{ animationDelay: "90ms" }}
            className="mt-6 animate-rise font-display-tight text-[2.6rem] text-white sm:text-6xl lg:text-[4.4rem]"
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

        <div
          style={{ animationDelay: "250ms" }}
          className="animate-tile lg:col-span-5 lg:col-start-8"
        >
          <div className="rounded-[22px] border border-white/10 bg-white/[0.04] p-2 shadow-[0_30px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur-md">
            <div className="flex items-center justify-between px-4 pt-3 pb-4">
              <p className="text-sm font-semibold text-white">Grades we supply</p>
              <span className="flex items-center gap-2 text-xs text-white/60">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 animate-ping rounded-full bg-copper-light/60" />
                  <span className="relative size-2 rounded-full bg-copper-light" />
                </span>
                Dispatch from Kundli
              </span>
            </div>
            <ul className="flex flex-col gap-1">
              {grades.map(({ product, image, purity }, i) => (
                <li
                  key={product.slug}
                  style={{ animationDelay: `${400 + i * 90}ms` }}
                  className="animate-rise-sm"
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="group/row flex items-center gap-4 rounded-2xl px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                  >
                    <span className="relative size-12 shrink-0 overflow-hidden rounded-xl bg-copper-gradient ring-1 ring-white/10">
                      {image && (
                        <Image
                          src={image.src}
                          alt=""
                          fill
                          sizes="48px"
                          priority={i < 2}
                          className="object-cover transition-transform duration-500 group-hover/row:scale-110"
                        />
                      )}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-medium text-white">
                        {product.name}
                      </span>
                      <span className="block text-xs text-white/55">
                        Trade name: {product.localName}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full border border-copper-light/30 bg-copper/10 px-3 py-1 text-xs font-semibold text-copper-light tabular-nums">
                      {purity}
                    </span>
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 shrink-0 text-white/40 transition-transform group-hover/row:translate-x-0.5 group-hover/row:-translate-y-0.5 group-hover/row:text-copper-light max-sm:hidden"
                    />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex items-center justify-between gap-4 rounded-2xl bg-night-2/80 px-4 py-3 text-xs text-white/60">
              <span>Purity as graded per lot · GST invoice on every load</span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/** Short purity tag for the grades panel, derived from the product's own specs. */
function purityLabel(product: Product) {
  const purity = product.specs.find((s) => s.label === "Purity")?.value ?? "";
  const range = purity.match(/(\d+(?:\.\d+)?)%\s*to\s*(\d+(?:\.\d+)?)%/);
  if (range) return `${range[1]}–${range[2]}%`;
  const single = purity.match(/\d+(?:\.\d+)?%/);
  if (single) return single[0];
  // No purity listed (e.g. AC pipe): fall back to the grade acronym, e.g. "DHP".
  const grade = product.specs.find((s) => s.label === "Grade")?.value ?? "";
  return grade.match(/\(([A-Z]{2,})\)/)?.[1] ?? product.localName;
}
