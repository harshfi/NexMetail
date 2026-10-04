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
            className="group rounded-[var(--radius-card)] border border-line/70 bg-surface p-7 shadow-soft transition-[translate,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-copper/40 hover:shadow-lift motion-reduce:hover:translate-y-0 max-sm:flex max-sm:gap-4 max-sm:p-5 sm:p-8"
          >
            <span className="grid size-11 shrink-0 place-items-center rounded-[10px] bg-copper-soft text-copper-dark transition-colors duration-300 group-hover:bg-copper-gradient group-hover:text-white">
              <Icon name={point.icon} className="size-5" />
            </span>
            <div>
              <h3 className="text-lg font-semibold sm:mt-5">{point.title}</h3>
              <p className="mt-1.5 text-[15px] sm:mt-2">{point.body}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
