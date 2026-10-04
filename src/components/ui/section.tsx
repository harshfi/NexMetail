import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Chip } from "./chip";
import { Container } from "./container";

type Tone = "light" | "surface" | "dark";

const tones: Record<Tone, string> = {
  light: "bg-bg",
  surface: "bg-surface",
  dark: "bg-night text-white/75",
};

/** Page section with consistent vertical rhythm and an optional heading block. */
export function Section({
  tone = "light",
  className,
  containerClassName,
  children,
  ...props
}: ComponentProps<"section"> & { tone?: Tone; containerClassName?: string }) {
  return (
    <section
      data-tone={tone}
      className={cn("py-14 sm:py-20 lg:py-28", tones[tone], className)}
      {...props}
    >
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}

/** Eyebrow + H2 + lead paragraph. */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  align = "left",
  tone = "light",
  id,
  className,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  id?: string;
  className?: string;
  action?: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-5 sm:mb-14 sm:gap-6",
        align === "center"
          ? "items-center text-center"
          : "md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <Chip tone={tone} className="mb-4">
            {eyebrow}
          </Chip>
        )}
        <h2
          id={id}
          className={cn(
            "font-display-tight text-[2.75rem] sm:text-6xl",
            tone === "dark" && "text-white",
          )}
        >
          {title}
        </h2>
        {lead && (
          <p
            className={cn(
              "mt-4 text-base sm:text-lg",
              tone === "dark" ? "text-white/70" : "text-body",
            )}
          >
            {lead}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
