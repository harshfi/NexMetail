import { icons, type LucideProps } from "lucide-react";

import type { IconName } from "@/content/types";

/**
 * Renders a lucide icon by name. Server-only usage keeps the full icon map
 * out of client bundles — don't import this from a "use client" file.
 */
export function Icon({ name, ...props }: { name: IconName } & LucideProps) {
  const LucideIcon = icons[name];
  return <LucideIcon aria-hidden {...props} />;
}
