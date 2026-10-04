import { absoluteUrl, mapsLink, siteConfig } from "@/config/site";
import type { Faq } from "@/content/faqs";
import type { Product } from "@/content/products";

const orgId = absoluteUrl("/#organization");

/** LocalBusiness + Organization for the whole site. */
export function organizationJsonLd() {
  const { address, contact, geo, hours, socials } = siteConfig;
  const sameAs = Object.values(socials).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": orgId,
    name: siteConfig.name,
    legalName: siteConfig.legalName,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/icons/icon-512.png"),
    image: absoluteUrl("/opengraph-image"),
    description: siteConfig.description,
    telephone: contact.phone,
    email: contact.email,
    taxID: siteConfig.gst.gstin,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: `${address.locality}, ${address.district}`,
      addressRegion: address.region,
      postalCode: address.postalCode,
      addressCountry: address.countryCode,
    },
    hasMap: mapsLink(),
    ...(geo
      ? { geo: { "@type": "GeoCoordinates", latitude: geo.lat, longitude: geo.lng } }
      : {}),
    openingHoursSpecification: hours.openingHours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes,
    })),
    areaServed: siteConfig.serviceAreas.map((name) => ({ "@type": "Place", name })),
    ...(sameAs.length ? { sameAs } : {}),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: contact.phone,
      email: contact.email,
      contactType: "sales",
      areaServed: "IN",
    },
    knowsAbout: ["Copper scrap", "Non-ferrous scrap"],
  };
}

export function productJsonLd(product: Product, imageUrls: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    alternateName: `Copper ${product.localName} scrap`,
    description: product.shortDescription,
    category: "Copper scrap",
    url: absoluteUrl(`/products/${product.slug}`),
    ...(imageUrls.length ? { image: imageUrls } : {}),
    brand: { "@type": "Brand", name: siteConfig.name },
    manufacturer: { "@id": orgId },
    additionalProperty: product.specs.map((s) => ({
      "@type": "PropertyValue",
      name: s.label,
      value: s.value,
    })),
  };
}

export function faqJsonLd(items: { q: string; a: string }[] | Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
