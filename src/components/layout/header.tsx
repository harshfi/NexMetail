import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { siteConfig, telLink, whatsappLink } from "@/config/site";
import { products } from "@/content/products";

import { HeaderShell } from "./header-shell";
import { MobileNav } from "./mobile-nav";
import { NavLink } from "./nav-link";
import { ProductsMenu } from "./products-menu";

const menuProducts = products.map(({ slug, name, localName }) => ({
  slug,
  name,
  localName,
}));

export function Header() {
  return (
    <HeaderShell>
      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                {"hasProductMenu" in item && item.hasProductMenu ? (
                  <ProductsMenu
                    label={item.label}
                    href={item.href}
                    products={menuProducts}
                  />
                ) : (
                  <NavLink href={item.href} label={item.label} />
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3 sm:gap-5">
          <a
            href={telLink()}
            className="hidden items-center gap-2 text-sm font-semibold xl:flex"
          >
            <Phone aria-hidden className="size-4 text-copper" />
            {siteConfig.contact.phoneDisplay}
          </a>
          <ButtonLink href="/contact#enquiry" size="sm" className="hidden sm:inline-flex">
            Get a Quote
          </ButtonLink>
          <MobileNav header={<Logo className="text-white" />}>
            <MobileMenuContent />
          </MobileNav>
        </div>
      </Container>
    </HeaderShell>
  );
}

function MobileMenuContent() {
  return (
    <nav aria-label="Mobile" className="flex flex-col gap-10">
      <ul className="flex flex-col">
        {siteConfig.nav.map((item, i) => (
          <li
            key={item.href}
            style={{ animationDelay: `${60 + i * 50}ms` }}
            className="animate-rise-sm border-b border-night-line"
          >
            <Link
              href={item.href}
              className="block py-4 font-display-tight text-3xl text-white hover:text-copper-light"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      <div style={{ animationDelay: "320ms" }} className="animate-rise-sm">
        <p className="mb-3 text-xs font-semibold tracking-[0.08em] text-copper-light uppercase">
          Products
        </p>
        <ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
          {products.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                className="block rounded-lg py-2 text-white/80 hover:text-white"
              >
                {p.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        style={{ animationDelay: "400ms" }}
        className="flex animate-rise-sm flex-col gap-3"
      >
        <ButtonLink href="/contact#enquiry" size="lg" arrow>
          Get a Quote
        </ButtonLink>
        <div className="grid grid-cols-2 gap-3">
          <ButtonLink
            href={telLink()}
            variant="outline-light"
            icon={<Phone aria-hidden className="size-4" />}
          >
            Call
          </ButtonLink>
          <ButtonLink
            href={whatsappLink("Hi NexMetal, I'd like a quote for copper scrap.")}
            variant="outline-light"
            icon={<MessageCircle aria-hidden className="size-4" />}
          >
            WhatsApp
          </ButtonLink>
        </div>
      </div>
    </nav>
  );
}
