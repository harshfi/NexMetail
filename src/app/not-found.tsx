import type { Metadata } from "next";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { products } from "@/content/products";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <>
      <PageHero
        eyebrow="Error 404"
        title="This page isn't in stock"
        lead="The page you're looking for has moved or never existed. Try one of our copper grades instead."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/" arrow>
            Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="outline-light">
            Contact us
          </ButtonLink>
        </div>
      </PageHero>
      <section className="py-16">
        <div className="container-page">
          <h2 className="font-display-tight text-3xl">Our products</h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {products.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="inline-block rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink hover:border-copper hover:text-copper-dark"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
