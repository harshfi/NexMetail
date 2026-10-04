import { Reveal } from "@/components/motion/reveal";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { whyUs } from "@/content/why-us";

export function WhyUsGrid() {
  return (
    <Section aria-labelledby="why-us-title">
      <SectionHeading
        id="why-us-title"
        eyebrow="Why NexMetal"
        title="A supplier you can audit"
        lead="Purchase teams buy from us for the same reasons every time: known grades, honest weight, proper paperwork and trucks that leave on time."
      />
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {whyUs.map((point, i) => (
          <Reveal
            as="li"
            key={point.id}
            delay={(i % 3) * 0.06}
            className="rounded-[var(--radius-card)] border border-line/70 bg-surface p-7 shadow-soft sm:p-8"
          >
            <span className="grid size-11 place-items-center rounded-[10px] bg-copper-soft text-copper-dark">
              <Icon name={point.icon} className="size-5" />
            </span>
            <h3 className="mt-5 text-lg font-semibold">{point.title}</h3>
            <p className="mt-2 text-[15px]">{point.body}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
