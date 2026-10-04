import type { ProductSpec } from "@/content/products";
import { cn } from "@/lib/utils";

/** "PRODUCT SPECIFICATIONS" card with a 2-column copper-dot grid. */
export function SpecList({
  specs,
  title = "Product specifications",
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
        "rounded-[var(--radius-card)] border border-line/70 bg-surface p-5 shadow-soft sm:p-6",
        className,
      )}
    >
      <Heading className="border-b border-line pb-3 text-[13px] font-bold tracking-[0.08em] text-ink uppercase">
        {title}
      </Heading>
      <dl className="mt-4 grid gap-x-8 gap-y-4 sm:grid-cols-2">
        {specs.map((spec) => (
          <div key={spec.label} className="flex gap-3">
            <span
              aria-hidden
              className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-copper"
            />
            <div className="text-sm leading-snug">
              <dt className="inline font-semibold text-ink">{spec.label}: </dt>
              <dd className="inline text-body">{spec.value}</dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
