import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, MessageCircle, Phone } from "lucide-react";

import { JsonLd } from "@/components/json-ld";
import { ProductCard } from "@/components/product/product-card";
import { ProductMedia } from "@/components/product/product-media";
import { CtaBand } from "@/components/sections/cta-band";
import { FaqList } from "@/components/sections/faq-list";
import { ButtonLink } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Container } from "@/components/ui/container";
import { Section, SectionHeading } from "@/components/ui/section";
import { SpecList } from "@/components/ui/spec-list";
import { absoluteUrl, siteConfig, telLink, whatsappLink } from "@/config/site";
import { getProduct, products } from "@/content/products";
import { availableImages } from "@/lib/images";
import { breadcrumbJsonLd, faqJsonLd, productJsonLd } from "@/lib/jsonld";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/products/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.seo.title,
    description: product.seo.description,
    path: `/products/${product.slug}`,
    keywords: product.seo.keywords,
  });
}

export default async function ProductPage({ params }: PageProps<"/products/[slug]">) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const imageUrls = availableImages(product.images).map((img) => absoluteUrl(img.src));
  const paragraphs = product.longDescription.split(/\n\s*\n/);
  const enquiryHref = `/contact?product=${product.slug}#enquiry`;

  return (
    <>
      {/* Dark top band with breadcrumb + product intro */}
      <section className="relative isolate overflow-hidden bg-night pt-28 pb-16 text-white/75 sm:pt-36 lg:pb-24">
        <div
          aria-hidden
          className="absolute -top-40 left-[-10%] -z-10 size-[36rem] rounded-full bg-copper/20 blur-[120px]"
        />
        <Container>
          <nav aria-label="Breadcrumb" className="mb-8 text-sm text-white/60">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-copper-light">
                  Home
                </Link>
                <span aria-hidden className="px-1.5">
                  /
                </span>
              </li>
              <li>
                <Link href="/products" className="hover:text-copper-light">
                  Products
                </Link>
                <span aria-hidden className="px-1.5">
                  /
                </span>
              </li>
              <li aria-current="page" className="text-white/90">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5">
              <ProductMedia
                product={product}
                priority
                sizes="(min-width: 1280px) 460px, (min-width: 1024px) 40vw, 100vw"
                className="border-white/10"
              />
            </div>
            <div className="lg:col-span-7">
              <Chip tone="dark">{product.eyebrow}</Chip>
              <h1 className="mt-5 font-display-tight text-5xl text-white sm:text-7xl">
                {product.name}
              </h1>
              <p className="mt-2 text-sm font-semibold tracking-[0.08em] text-copper-light uppercase">
                Trade name: {product.localName}
              </p>
              <p className="mt-5 max-w-xl text-base sm:text-lg">
                {product.shortDescription}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href={enquiryHref} size="lg" arrow>
                  Enquire now
                </ButtonLink>
                <ButtonLink
                  href={whatsappLink(
                    `Hi NexMetal, I'd like a quote for ${product.name}.`,
                  )}
                  variant="outline-light"
                  size="lg"
                  icon={<MessageCircle aria-hidden className="size-4" />}
                >
                  WhatsApp
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SpecList specs={product.specs} headingLevel="h2" />
            <div className="prose-nex mt-12">
              <h2>About {product.name}</h2>
              {paragraphs.map((p) => (
                <p key={p.slice(0, 32)}>{p}</p>
              ))}
            </div>
          </div>

          <aside
            className="flex flex-col gap-6 lg:col-span-5"
            aria-label="Product summary"
          >
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
              <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase">
                Applications
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {product.applications.map((a) => (
                  <li key={a} className="flex gap-3 text-[15px]">
                    <Check aria-hidden className="mt-1 size-4 shrink-0 text-copper" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-soft">
              <h2 className="text-[13px] font-bold tracking-[0.08em] uppercase">
                Who buys it
              </h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {product.buyers.map((b) => (
                  <li
                    key={b}
                    className="rounded-full border border-copper/40 bg-copper-soft px-3 py-1 text-sm text-copper-dark"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[var(--radius-card)] bg-night p-6 text-white/75">
              <h2 className="font-display-tight text-3xl text-white">
                Get today&apos;s price
              </h2>
              <p className="mt-2 text-sm">
                Share quantity and delivery location. GST invoice on every load,
                dispatched from Kundli.
              </p>
              <div className="mt-5 flex flex-col gap-3">
                <ButtonLink href={enquiryHref} arrow>
                  Send enquiry
                </ButtonLink>
                <ButtonLink
                  href={telLink()}
                  variant="outline-light"
                  icon={<Phone aria-hidden className="size-4" />}
                >
                  {siteConfig.contact.phoneDisplay}
                </ButtonLink>
              </div>
            </div>
          </aside>
        </div>
      </Section>

      <Section tone="surface" aria-labelledby="product-faq-title">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading
              id="product-faq-title"
              eyebrow="FAQ"
              title={`${product.localName} questions`}
            />
          </div>
          <FaqList items={product.faqs} className="lg:col-span-8" />
        </div>
      </Section>

      <Section aria-labelledby="related-title">
        <SectionHeading
          id="related-title"
          eyebrow="More grades"
          title="Other copper scrap we supply"
        />
        <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <li key={p.slug}>
              <ProductCard product={p} />
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />

      <JsonLd data={productJsonLd(product, imageUrls)} />
      <JsonLd data={faqJsonLd(product.faqs)} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Products", path: "/products" },
          { name: product.name, path: `/products/${product.slug}` },
        ])}
      />
    </>
  );
}
