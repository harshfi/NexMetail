import { DrawLine } from "@/components/motion/draw-line";
import { Reveal } from "@/components/motion/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Section, SectionHeading } from "@/components/ui/section";
import { processSteps } from "@/content/process";

/** Dark section: five-step sourcing → dispatch process. */
export function ProcessSteps({
  headingLevel = "h2",
  showLink = true,
}: {
  headingLevel?: "h2" | "h3";
  showLink?: boolean;
}) {
  const StepHeading = headingLevel === "h2" ? "h3" : "h4";
  return (
    <Section tone="dark" aria-labelledby="process-title">
      <SectionHeading
        id="process-title"
        tone="dark"
        eyebrow="Our process"
        title="From yard to your furnace"
        lead="Every lot goes through the same five steps, so what we quote is what you receive."
        action={
          showLink ? (
            <ButtonLink href="/quality" variant="outline-light" arrow>
              Quality &amp; process
            </ButtonLink>
          ) : undefined
        }
      />
      {/* Copper rail that draws across the steps on wide screens. */}
      <div aria-hidden className="relative mb-6 hidden grid-cols-5 gap-4 xl:grid">
        <div className="absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 bg-night-line" />
        <DrawLine
          duration={1.8}
          className="absolute top-1/2 right-0 left-0 h-0.5 -translate-y-1/2 bg-copper-gradient"
        />
        {processSteps.map((step, i) => (
          <Reveal
            key={step.id}
            delay={0.25 + i * 0.3}
            className="flex justify-start pl-6"
          >
            <span className="relative grid size-4 place-items-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-copper/40 [animation-duration:2.4s]" />
              <span className="size-3 rounded-full border-2 border-night bg-copper-light" />
            </span>
          </Reveal>
        ))}
      </div>
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.id}
            delay={i * 0.06}
            className="group relative rounded-[var(--radius-card)] border border-night-line bg-night-2 p-6 transition-[border-color,translate] duration-300 hover:-translate-y-1 hover:border-copper/50 motion-reduce:hover:translate-y-0 max-sm:grid max-sm:grid-cols-[2.75rem_1fr] max-sm:gap-x-4 max-sm:p-5"
          >
            <div className="flex items-center justify-between max-sm:row-span-2 max-sm:items-start">
              <span className="grid size-11 place-items-center rounded-[10px] bg-copper-gradient text-white transition-transform duration-300 group-hover:-rotate-6">
                <Icon name={step.icon} className="size-5" />
              </span>
              <span
                className="font-display text-4xl text-white/15 transition-colors duration-300 group-hover:text-copper-light/60 max-sm:hidden"
                aria-hidden
              >
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <StepHeading className="text-base font-semibold text-white sm:mt-6">
              <span className="sr-only">Step {i + 1}: </span>
              <span
                aria-hidden
                className="mr-2 font-display text-lg text-copper-light sm:hidden"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              {step.title}
            </StepHeading>
            <p className="mt-1 text-sm text-white/65 sm:mt-2">{step.summary}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
