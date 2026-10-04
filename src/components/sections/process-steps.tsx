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
      <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {processSteps.map((step, i) => (
          <Reveal
            as="li"
            key={step.id}
            delay={i * 0.06}
            className="relative rounded-[var(--radius-card)] border border-night-line bg-night-2 p-6"
          >
            <div className="flex items-center justify-between">
              <span className="grid size-11 place-items-center rounded-[10px] bg-copper-gradient text-white">
                <Icon name={step.icon} className="size-5" />
              </span>
              <span className="font-display text-4xl text-white/15" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <StepHeading className="mt-6 text-base font-semibold text-white">
              <span className="sr-only">Step {i + 1}: </span>
              {step.title}
            </StepHeading>
            <p className="mt-2 text-sm text-white/65">{step.summary}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
