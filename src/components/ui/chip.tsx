import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Eyebrow chip, e.g. "COPPER | NON-FERROUS". */
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
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-[0.08em] uppercase",
        tone === "light"
          ? "border-copper/40 bg-copper-soft text-copper-dark"
          : "border-copper/50 bg-copper/10 text-copper-light",
        className,
      )}
    >
      {children}
    </span>
  );
}
