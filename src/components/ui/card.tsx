import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** White card with soft shadow. `interactive` adds the hover lift. */
export function Card({
  className,
  interactive = false,
  ...props
}: ComponentProps<"div"> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-line/70 bg-surface shadow-soft",
        interactive &&
          "transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lift motion-reduce:hover:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}
