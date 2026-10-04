import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Copper "N" mark — same artwork as the favicon (src/app/icon.svg). Owner can replace with a real logo. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={cn("size-9", className)}>
      <defs>
        <radialGradient id="nx-bg" cx="28%" cy="18%" r="95%">
          <stop offset="0" stopColor="#43291a" />
          <stop offset="0.55" stopColor="#1b1512" />
          <stop offset="1" stopColor="#0d0b0a" />
        </radialGradient>
        <linearGradient id="nx-cu" x1="0.1" y1="0" x2="0.9" y2="1">
          <stop offset="0" stopColor="#FFE0BC" />
          <stop offset="0.3" stopColor="#F0B47A" />
          <stop offset="0.65" stopColor="#C98449" />
          <stop offset="1" stopColor="#8F5A2C" />
        </linearGradient>
        <linearGradient id="nx-rim" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F0B47A" />
          <stop offset="0.5" stopColor="#B5763F" stopOpacity="0.7" />
          <stop offset="1" stopColor="#7A4A22" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="15" fill="url(#nx-bg)" />
      <rect
        x="1.25"
        y="1.25"
        width="61.5"
        height="61.5"
        rx="13.75"
        fill="none"
        stroke="url(#nx-rim)"
        strokeWidth="2.5"
      />
      <path
        d="M18.5 46.5v-29l27 29v-29"
        fill="none"
        stroke="url(#nx-cu)"
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 21.8l21 22.4"
        fill="none"
        stroke="#FFF4E6"
        strokeOpacity="0.6"
        strokeWidth="1.6"
        strokeLinecap="round"
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
