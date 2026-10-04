import type { ProductSpec } from "@/content/products";
import { cn } from "@/lib/utils";

/** Specifications as a two-column label/value table. */
export function SpecList({
  specs,
  title = "Specifications",
  headingLevel = "h3",
  className,
}: {
  specs: ProductSpec[];
  title?: string;
  headingLevel?: "h2" | "h3" | "h4";
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <div
      className={cn(
        "overflow-hidden rounded-[18px] border border-line bg-surface shadow-soft",
        className,
      )}
    >
      <Heading className="flex items-center gap-2 border-b border-line bg-bg/60 px-5 py-3 text-sm font-semibold text-ink">
        <span aria-hidden className="size-1.5 rounded-full bg-copper" />
        {title}
      </Heading>
      <dl className="divide-y divide-line">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="grid gap-0.5 px-5 py-3 sm:grid-cols-[8.5rem_1fr] sm:gap-4"
          >
            <dt className="text-xs font-semibold tracking-[0.1em] text-muted uppercase sm:pt-0.5">
              {spec.label}
            </dt>
            <dd className="text-[15px] leading-snug text-ink">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
