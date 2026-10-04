"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "px-3 py-2 text-sm font-medium transition-colors hover:text-copper-light group-data-[scrolled=true]:hover:text-copper-dark",
        active && "text-copper-light group-data-[scrolled=true]:text-copper-dark",
      )}
    >
      {label}
    </Link>
  );
}
