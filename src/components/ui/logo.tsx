import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Copper mark: three stacked strands forming an "N". Original, owner can replace with a real logo. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" aria-hidden className={cn("size-9", className)}>
      <defs>
        <linearGradient id="nx-copper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E0A36A" />
          <stop offset="0.45" stopColor="#B5763F" />
          <stop offset="1" stopColor="#7A4A22" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#nx-copper)" />
      <path
        d="M12 29V11l16 18V11"
        fill="none"
        stroke="white"
        strokeWidth="3.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// TODO(owner): replace with the official NexMetal logo (SVG) when available.
/** Wordmark inherits the current text colour, so it works on light and dark backgrounds. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} — home`}
      className={cn("inline-flex items-center gap-2.5", className)}
    >
      <LogoMark />
      <span className="font-display text-[1.7rem] leading-none tracking-[0.06em]">
        {siteConfig.wordmark}
      </span>
    </Link>
  );
}
