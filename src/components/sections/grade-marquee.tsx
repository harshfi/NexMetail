import { products } from "@/content/products";

const items = [
  ...products.map((p) => `Copper ${p.localName}`),
  "Millberry",
  "GST invoice",
  "Transparent weighment",
  "Dispatch from Kundli",
];

/** Slow, decorative ticker of grades. Pauses on hover; static under reduced motion. */
export function GradeMarquee() {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((item) => (
        <li key={item} className="flex items-center">
          <span className="px-6 font-display text-2xl tracking-[0.06em] whitespace-nowrap text-white/85 uppercase sm:text-3xl">
            {item}
          </span>
          <span aria-hidden className="size-2 rotate-45 bg-copper-light" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="group relative overflow-hidden border-y border-night-line bg-night-2 py-4">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-night-2 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-night-2 to-transparent"
      />
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
