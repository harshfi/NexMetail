import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Eyebrow label: short copper rule + small spaced caps, e.g. "— COPPER · NON-FERROUS". */
export function Chip({
  children,
  tone = "light",
  className,
}: {
  children: ReactNode;
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.16em] uppercase",
        tone === "light" ? "text-copper-dark" : "text-copper-light",
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          "h-px w-7",
          tone === "light" ? "bg-copper-dark" : "bg-copper-light",
        )}
      />
      {children}
    </span>
  );
}
