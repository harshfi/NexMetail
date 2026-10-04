/**
 * Single source of truth for NexMetal business facts.
 * Never hard-code any of these values elsewhere — import from here.
 * Values marked TODO(owner) are placeholders awaiting confirmation (see docs/OWNER_TODO.md).
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

export type NavItem = {
  label: string;
  href: string;
  /** Renders the product list as a dropdown in the header. */
  hasProductMenu?: boolean;
};

export const siteConfig = {
  url: siteUrl,
  name: "NexMetal",
  wordmark: "NEXMETAL",
  legalName: "NexMetal Recycling Private Limited",
  shortLegalName: "NexMetal Recycling Pvt. Ltd.",
  constitution: "Private Limited Company",
  tagline: "Graded copper scrap, dispatched fast from Kundli.",
  description:
    "NexMetal Recycling sources, sorts, grades and supplies copper scrap — patti, rassa, tally, AC pipe and dori — to wire-drawing units, foundries, smelters, cable and motor manufacturers across North India.",

  gst: {
    gstin: "06AAFCI0854G1ZR",
    registrationType: "Regular",
    registeredSince: "2019-08-13",
    registeredSinceYear: 2019,
  },

  address: {
    street: "Plot No. 1698, Rai, HSIIDC Industrial Estate",
    locality: "Kundli",
    district: "Sonipat",
    region: "Haryana",
    postalCode: "131029",
    country: "India",
    countryCode: "IN",
  },

  contact: {
    // TODO(owner): real sales phone number, in E.164 format (e.g. +919812345678).
    phone: "+91XXXXXXXXXX",
    // TODO(owner): how the phone number should be displayed.
    phoneDisplay: "+91-XXXXXXXXXX",
    // TODO(owner): real WhatsApp number, digits only with country code (e.g. 919812345678).
    whatsapp: "91XXXXXXXXXX",
    // TODO(owner): confirm the sales email address.
    email: "sales@nexmetal.in",
  },

  // TODO(owner): confirm business hours.
  hours: {
    display: "Mon–Sat, 9:30 AM – 7:00 PM IST",
    openingHours: [
      {
        days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:30",
        closes: "19:00",
      },
    ],
  },

  // TODO(owner): exact Google Maps pin (lat/long). Until then, map links search by address.
  geo: null as { lat: number; lng: number } | null,

  // TODO(owner): social profile URLs, if any. Empty entries are not rendered.
  socials: {
    linkedin: "",
    facebook: "",
    instagram: "",
    youtube: "",
  },

  serviceAreas: [
    "Delhi NCR",
    "Haryana",
    "Punjab",
    "Uttar Pradesh",
    "Rajasthan",
    "Pan-India",
  ],
  locationAdvantage:
    "Kundli industrial belt on NH-44, at the Delhi–Haryana border — fast road dispatch to Delhi NCR, Punjab, Haryana, UP, Rajasthan and pan-India.",

  // TODO(owner): confirm client names and written permission to display them before publishing.
  clients: [] as string[],

  nav: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products", hasProductMenu: true },
    { label: "Quality", href: "/quality" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[],

  legalNav: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ] satisfies NavItem[],
} as const;

export type SiteConfig = typeof siteConfig;

/** Single-line postal address. */
export const fullAddress = [
  siteConfig.address.street,
  siteConfig.address.locality,
  `District ${siteConfig.address.district}`,
  `${siteConfig.address.region} – ${siteConfig.address.postalCode}`,
  siteConfig.address.country,
].join(", ");

/** `tel:` link for the sales phone. */
export function telLink() {
  return `tel:${siteConfig.contact.phone.replace(/[^\d+]/g, "")}`;
}

/** wa.me link, optionally with a prefilled message. */
export function whatsappLink(message?: string) {
  const base = `https://wa.me/${siteConfig.contact.whatsapp}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Google Maps link — uses the exact pin when available, otherwise the address. */
export function mapsLink() {
  const query = siteConfig.geo
    ? `${siteConfig.geo.lat},${siteConfig.geo.lng}`
    : `${siteConfig.legalName}, ${fullAddress}`;
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** Google Maps embed URL for an iframe (no API key needed). */
export function mapsEmbedUrl() {
  const query = siteConfig.geo
    ? `${siteConfig.geo.lat},${siteConfig.geo.lng}`
    : fullAddress;
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=15&output=embed`;
}

/** mailto: link, optionally with a subject. */
export function mailLink(subject?: string) {
  const base = `mailto:${siteConfig.contact.email}`;
  return subject ? `${base}?subject=${encodeURIComponent(subject)}` : base;
}

/** Absolute URL for a site path, based on NEXT_PUBLIC_SITE_URL. */
export function absoluteUrl(path = "/") {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
