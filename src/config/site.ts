/**
 * Single source of truth for NexMetal business facts.
 * Never hard-code any of these values elsewhere — import from here.
 * Values marked TODO are placeholders awaiting confirmation from the owner.
 */

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(
  /\/$/,
  "",
);

export const siteConfig = {
  url: siteUrl,
  name: "NexMetal",
  wordmark: "NEXMETAL",
  legalName: "NexMetal Recycling Private Limited",
  shortLegalName: "NexMetal Recycling Pvt. Ltd.",
  constitution: "Private Limited Company",
  tagline: "Graded copper scrap, dispatched fast from Kundli.",
  description:
    "NexMetal Recycling sources, sorts, grades and supplies copper scrap — patti, rassa, dori, tally and AC pipe — to wire-drawing units, foundries, smelters, cable and motor manufacturers across North India.",

  gst: {
    gstin: "06AAFCI0854G1ZR",
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
    // TODO(owner): replace with the real sales number.
    phone: "+91-XXXXXXXXXX",
    phoneHref: "tel:+91XXXXXXXXXX",
    // TODO(owner): replace with the real WhatsApp number (digits only, with country code).
    whatsapp: "91XXXXXXXXXX",
    // TODO(owner): confirm the sales email.
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

  // TODO(owner): supply exact map pin. Until then the map is searched by address.
  geo: null as { lat: number; lng: number } | null,

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

  // TODO(owner): confirm client names and permission to display them before publishing.
  clients: [] as string[],

  nav: [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products", hasDropdown: true },
    { label: "Quality", href: "/quality" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  legalNav: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms", href: "/terms" },
  ],
} as const;

export const fullAddress = [
  siteConfig.address.street,
  siteConfig.address.locality,
  `District ${siteConfig.address.district}`,
  `${siteConfig.address.region} – ${siteConfig.address.postalCode}`,
  siteConfig.address.country,
].join(", ");

export const whatsappHref = (message?: string) =>
  `https://wa.me/${siteConfig.contact.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const mapsHref = siteConfig.geo
  ? `https://www.google.com/maps/search/?api=1&query=${siteConfig.geo.lat},${siteConfig.geo.lng}`
  : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

export type SiteConfig = typeof siteConfig;
