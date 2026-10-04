import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Logo } from "@/components/ui/logo";
import { fullAddress, mailLink, mapsLink, siteConfig, telLink } from "@/config/site";
import { products } from "@/content/products";

const socialLabels: Record<keyof typeof siteConfig.socials, string> = {
  linkedin: "LinkedIn",
  facebook: "Facebook",
  instagram: "Instagram",
  youtube: "YouTube",
};

export function Footer() {
  const year = new Date().getFullYear();
  const socials = Object.entries(siteConfig.socials).filter(([, url]) => url) as [
    keyof typeof siteConfig.socials,
    string,
  ][];

  return (
    <footer className="bg-night pb-20 text-white/70 md:pb-0">
      <div aria-hidden className="h-1 bg-copper-gradient" />
      <Container className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 sm:gap-12 sm:py-16 lg:grid-cols-12 lg:py-20">
        <div className="col-span-2 lg:col-span-4">
          <Logo className="text-white" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            {siteConfig.tagline} Sorted, graded copper scrap for wire-drawing units,
            foundries, smelters and cable &amp; motor makers.
          </p>
          {socials.length > 0 && (
            <ul className="mt-6 flex gap-4 text-sm">
              {socials.map(([key, url]) => (
                <li key={key}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-white"
                  >
                    {socialLabels[key]}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>

        <FooterColumn title="Company" className="lg:col-span-2">
          {[...siteConfig.nav, ...siteConfig.legalNav].map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Products" className="lg:col-span-2">
          {products.map((p) => (
            <li key={p.slug}>
              <Link href={`/products/${p.slug}`} className="hover:text-white">
                {p.name}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Contact" className="col-span-2 lg:col-span-4">
          <li className="flex gap-3">
            <MapPin aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-light" />
            <address className="not-italic">
              {siteConfig.legalName}
              <br />
              {fullAddress}
              <br />
              <a
                href={mapsLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-copper-light underline-offset-4 hover:underline"
              >
                View on Google Maps
              </a>
            </address>
          </li>
          <li className="flex gap-3">
            <Phone aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-light" />
            <a href={telLink()} className="hover:text-white">
              {siteConfig.contact.phoneDisplay}
            </a>
          </li>
          <li className="flex gap-3">
            <Mail aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-light" />
            <a href={mailLink()} className="hover:text-white">
              {siteConfig.contact.email}
            </a>
          </li>
          <li className="flex gap-3">
            <Clock aria-hidden className="mt-0.5 size-4 shrink-0 text-copper-light" />
            <span>{siteConfig.hours.display}</span>
          </li>
        </FooterColumn>
      </Container>

      <div className="border-t border-night-line">
        <Container className="flex flex-col gap-2 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.shortLegalName} All rights reserved.
          </p>
          <p>
            GSTIN:{" "}
            <span className="font-mono tracking-wide text-white/75">
              {siteConfig.gst.gstin}
            </span>
          </p>
        </Container>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="mb-5 text-xs font-semibold tracking-[0.08em] text-white uppercase">
        {title}
      </h2>
      <ul className="flex flex-col gap-3 text-sm">{children}</ul>
    </div>
  );
}
