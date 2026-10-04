import { CountUp } from "@/components/motion/count-up";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { products } from "@/content/products";

// Only verifiable figures — see docs/DECISIONS.md.
const directRegions = siteConfig.serviceAreas.filter((a) => a !== "Pan-India").length;

const stats = [
  {
    value: siteConfig.gst.registeredSinceYear,
    from: 2000,
    label: "GST-registered since",
  },
  { value: products.length, label: "Copper grades supplied" },
  { value: 99.9, decimals: 1, suffix: "%", label: "Purity on top grades" },
  { value: directRegions, label: "Regions served directly by road" },
];

export function StatsStrip() {
  return (
    <section
      aria-label="NexMetal at a glance"
      className="border-b border-line bg-surface"
    >
      <Container>
        <dl className="grid grid-cols-2 divide-line lg:grid-cols-4 lg:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col px-2 py-8 sm:px-6 lg:py-10">
              <dt className="text-xs font-semibold tracking-[0.08em] text-muted uppercase sm:text-sm">
                {s.label}
              </dt>
              <dd className="order-first mb-2 font-display-tight text-4xl text-ink sm:text-5xl">
                <CountUp
                  to={s.value}
                  from={s.from ?? 0}
                  decimals={s.decimals ?? 0}
                  suffix={s.suffix ?? ""}
                />
              </dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
