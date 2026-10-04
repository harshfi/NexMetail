import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";

/** Shared shell for Privacy Policy and Terms. */
export function LegalPage({
  title,
  updated,
  crumb,
  children,
}: {
  title: string;
  updated: string;
  crumb: string;
  children: ReactNode;
}) {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={title}
        lead={`Last updated: ${updated}`}
        crumbs={[{ label: "Home", href: "/" }, { label: crumb }]}
      />
      <section className="py-16 sm:py-20">
        <Container>
          <article className="mx-auto prose-nex rounded-[var(--radius-card)] border border-line/70 bg-surface p-6 shadow-soft sm:p-12">
            {children}
          </article>
        </Container>
      </section>
    </>
  );
}
