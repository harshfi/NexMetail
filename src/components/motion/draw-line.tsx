"use client";

import * as m from "motion/react-m";

/** A line that draws itself left → right once it scrolls into view. */
export function DrawLine({
  className,
  duration = 1.4,
}: {
  className?: string;
  duration?: number;
}) {
  return (
    <m.div
      aria-hidden
      className={className}
      style={{ originX: 0 }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px 0px -15% 0px" }}
      transition={{ duration, ease: [0.65, 0, 0.35, 1] }}
    />
  );
}
