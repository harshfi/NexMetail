"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Sticky header wrapper. Transparent (light text) over the dark hero/title band,
 * then solid with blur once the page scrolls. Children style themselves with
 * `group-data-[scrolled=true]:` variants, so they can stay server components.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="group fixed inset-x-0 top-0 z-50 border-b border-transparent text-white transition-[background-color,border-color,color,backdrop-filter] duration-300 data-[scrolled=true]:border-line data-[scrolled=true]:bg-bg/85 data-[scrolled=true]:text-ink data-[scrolled=true]:backdrop-blur-md"
    >
      {children}
    </header>
  );
}
