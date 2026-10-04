"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type MenuProduct = { slug: string; name: string; localName: string };

/** "Products" nav item with a dropdown. Opens on hover and on click/keyboard. */
export function ProductsMenu({
  label,
  href,
  products,
}: {
  label: string;
  href: string;
  products: MenuProduct[];
}) {
  const pathname = usePathname();
  // Remember which page the menu was opened on, so navigating closes it without an effect.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((prev) => {
      const value = typeof next === "function" ? next(prev === pathname) : next;
      return value ? pathname : null;
    });
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const active = pathname.startsWith(href);

  // Close on outside click and Escape.
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpenOn(null);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenOn(null);
        ref.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center">
        <Link
          href={href}
          aria-current={pathname === href ? "page" : undefined}
          className={cn(
            "py-2 pr-1 pl-3 text-sm font-medium transition-colors hover:text-copper-light group-data-[scrolled=true]:hover:text-copper-dark",
            active && "text-copper-light group-data-[scrolled=true]:text-copper-dark",
          )}
        >
          {label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${open ? "Hide" : "Show"} product list`}
          // Hover already opens it for mice, so a mouse click keeps it open; keyboard (detail 0) toggles.
          onClick={(e) => setOpen((o) => (e.detail === 0 ? !o : true))}
          className="rounded p-1"
        >
          <ChevronDown
            aria-hidden
            className={cn("size-4 transition-transform", open && "rotate-180")}
          />
        </button>
      </div>

      <div
        id={panelId}
        // `invisible` (visibility: hidden) keeps it out of the tab order and a11y tree while closed.
        className={cn(
          "absolute top-full left-1/2 w-80 -translate-x-1/2 pt-3 transition-[opacity,translate,visibility] duration-200 ease-out",
          open
            ? "visible translate-y-0 opacity-100"
            : "invisible -translate-y-1 opacity-0",
        )}
      >
        <ul className="rounded-[var(--radius-card)] border border-line bg-surface p-2 text-ink shadow-lift">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                href={`${href}/${p.slug}`}
                className="flex items-center justify-between gap-4 rounded-lg px-3 py-2.5 text-sm hover:bg-copper-soft focus-visible:bg-copper-soft"
              >
                <span className="font-medium">{p.name}</span>
                <span className="text-xs text-muted">{p.localName}</span>
              </Link>
            </li>
          ))}
          <li className="mt-1 border-t border-line pt-1">
            <Link
              href={href}
              className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-copper-dark hover:bg-copper-soft"
            >
              View all products →
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
