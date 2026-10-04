"use client";

import * as m from "motion/react-m";
import type { ReactNode } from "react";

const offsets = {
  up: { x: 0, y: 24 },
  left: { x: -48, y: 0 },
  right: { x: 48, y: 0 },
};

/** Fades and slides children in once when they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  from = "up",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li";
  /** Direction the content travels in from. */
  from?: keyof typeof offsets;
}) {
  const Component = as === "li" ? m.li : m.div;
  return (
    <Component
      className={className}
      initial={{ opacity: 0, ...offsets[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Component>
  );
}
