import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

import { Chip } from "./chip";
import { Container } from "./container";

export type Crumb = { label: string; href?: string };

/** Dark title band for inner pages. The header sits transparently over it. */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-night pt-32 pb-14 text-white/75 sm:pt-40 sm:pb-20">
      <div
        aria-hidden
        className="absolute -top-40 right-[-10%] -z-10 size-[36rem] rounded-full bg-copper/25 blur-[120px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgb(255_255_255/0.04)_1px,transparent_1px)] bg-[size:72px_100%]"
      />
      <Container>
        {crumbs && crumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
              {crumbs.map((crumb, i) => (
                <li key={crumb.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight aria-hidden className="size-3.5" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="hover:text-copper-light">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white/90">
                      {crumb.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}
        {eyebrow && (
          <Chip tone="dark" className="mb-5">
            {eyebrow}
          </Chip>
        )}
        <h1 className="max-w-4xl font-display-tight text-5xl text-white sm:text-7xl lg:text-[5.5rem]">
          {title}
        </h1>
        {lead && (
          <p className="mt-5 max-w-2xl text-base text-white/75 sm:text-lg">{lead}</p>
        )}
        {children}
      </Container>
    </section>
  );
}
