/**
 * Product catalogue. Names, short descriptions and specs come from the owner's
 * catalogue (docs/DECISIONS.md). Do not add technical claims that aren't listed there.
 *
 * Images live at public/images/products/<slug>/<n>.jpg. Missing files fall back to the
 * copper placeholder at render time — run `npm run check:images` to list them.
 */

export type ProductImage = { src: string; alt: string };
export type ProductSpec = { label: string; value: string };
export type ProductFaq = { q: string; a: string };

export type Product = {
  slug: string;
  name: string;
  /** Trade name used on the shop floor (romanised Hindi). */
  localName: string;
  eyebrow: string;
  shortDescription: string;
  longDescription: string;
  specs: ProductSpec[];
  applications: string[];
  /** Industries that buy this grade. */
  buyers: string[];
  images: ProductImage[];
  seo: { title: string; description: string; keywords: string[] };
  faqs: ProductFaq[];
};

const EYEBROW = "Copper | Non-Ferrous";

function productImages(slug: string, alts: string[]): ProductImage[] {
  return alts.map((alt, i) => ({ src: `/images/products/${slug}/${i + 1}.jpg`, alt }));
}

export const products: Product[] = [
  {
    slug: "copper-strips-patti",
    name: "Copper Strips (Patti)",
    localName: "Patti",
    eyebrow: EYEBROW,
    shortDescription:
      "Flat copper strips used in electrical transformers, busbars and winding applications. Available in various widths and thicknesses.",
    longDescription: `Copper patti scrap is flat copper strip recovered from electrical equipment — the kind of material that started life as busbars, transformer windings and panel conductors. At NexMetal we source patti, sort it by grade and form, and supply it to buyers who need flat copper of a known quality.

Our copper strips are graded as Electrolytic Tough Pitch (ETP) or Oxygen-Free copper with a minimum copper content of 99.9%. Because patti arrives in many widths and thicknesses, we sort and supply it to suit your order specifications rather than as one mixed lot.

Buyers use copper patti for busbars, transformer windings and electrical panels, and as high-grade feed wherever clean, flat copper is preferred. Each consignment is weighed transparently and billed on a GST invoice from NexMetal Recycling Private Limited.

Our yard is in the HSIIDC Industrial Estate at Kundli, Sonipat, on NH-44 at the Delhi–Haryana border. That puts copper patti within quick road reach of Delhi NCR, Haryana, Punjab, Uttar Pradesh and Rajasthan, with pan-India dispatch for larger orders.

Looking for a copper patti scrap supplier near Delhi? Call or WhatsApp us with the width, thickness and quantity you need, and we will come back with availability and a quote.`,
    specs: [
      { label: "Grade", value: "Electrolytic Tough Pitch (ETP) / Oxygen-Free" },
      { label: "Purity", value: "99.9% minimum copper content" },
      {
        label: "Applications",
        value: "Busbars, transformer windings, electrical panels",
      },
      { label: "Thickness", value: "Custom thickness tailored to order specifications" },
    ],
    applications: [
      "Busbars",
      "Transformer windings",
      "Electrical panels",
      "Winding applications",
    ],
    buyers: [
      "Motor & transformer manufacturers",
      "Cable & conductor makers",
      "Secondary smelters & refineries",
      "Foundries & casting units",
    ],
    images: productImages("copper-strips-patti", [
      "Pile of flat copper patti strips sorted at the NexMetal yard",
      "Close-up of copper strip edges showing width and thickness",
      "Bundled copper patti scrap ready for weighment",
      "Copper busbar and strip offcuts graded for dispatch",
    ]),
    seo: {
      title: "Copper Patti Scrap Supplier in Kundli, Sonipat | Copper Strips",
      description:
        "Copper patti (flat strip) scrap — ETP / Oxygen-Free, 99.9% minimum copper. Custom thickness to order, GST invoice, fast dispatch from Kundli to Delhi NCR and North India.",
      keywords: [
        "copper patti scrap",
        "copper strip scrap",
        "copper busbar scrap",
        "copper patti supplier Sonipat",
        "copper scrap Kundli",
        "copper scrap dealer Delhi NCR",
      ],
    },
    faqs: [
      {
        q: "What grade and purity is your copper patti?",
        a: "Our copper strips are graded as Electrolytic Tough Pitch (ETP) or Oxygen-Free copper, with a minimum copper content of 99.9%.",
      },
      {
        q: "Can you supply copper strips in a specific thickness?",
        a: "Yes. Patti is sorted and supplied to the thickness in your order specification. Share the width, thickness and quantity you need and we will confirm availability.",
      },
      {
        q: "Do you deliver copper patti outside Haryana?",
        a: "Yes. From Kundli we dispatch by road to Delhi NCR, Haryana, Punjab, Uttar Pradesh and Rajasthan, and pan-India for larger orders.",
      },
    ],
  },
  {
    slug: "copper-rassa-wire",
    name: "Copper Rassa (Wire)",
    localName: "Rassa",
    eyebrow: EYEBROW,
    shortDescription:
      "High-conductivity copper wire scrap, ideal for re-drawing into fine wire. Clean, bare and uncoated.",
    longDescription: `Copper rassa is bare bright copper wire scrap supplied in interlocked, bundled ropes — the form the trade calls "rassa". In international terms it is Millberry grade: clean, bare and uncoated copper wire with no insulation left on it.

NexMetal supplies rassa at 99.9% high-conductivity copper. Because the wire is bare and clean, it can go straight into the furnace for direct melting with minimal slag, which is why wire-drawing units and refiners value it as feedstock for re-drawing into fine wire.

Every lot is sorted and graded at our Kundli yard before it is bundled, so you get rassa that matches the grade on your quote. Material is weighed transparently at dispatch and billed on a GST invoice from NexMetal Recycling Private Limited, a GST-registered private limited company.

Our location on NH-44 at the Delhi–Haryana border means short road transit to wire-drawing clusters in Delhi NCR, Haryana, Punjab, Uttar Pradesh and Rajasthan, with pan-India dispatch available.

If you are buying Millberry copper scrap in India, or need a dependable copper rassa scrap supplier near Delhi, send us your monthly requirement on call or WhatsApp and we will share current availability and pricing.`,
    specs: [
      { label: "Grade", value: "Bare Bright Copper Scrap (Millberry)" },
      { label: "Purity", value: "99.9% high-conductivity copper" },
      { label: "Format", value: "Interlocked, bundled ropes (Rassa)" },
      { label: "Recyclability", value: "Direct melting capability with minimal slag" },
    ],
    applications: ["Re-drawing into fine wire", "Direct melting"],
    buyers: [
      "Wire drawing units",
      "Cable & conductor makers",
      "Secondary smelters & refineries",
    ],
    images: productImages("copper-rassa-wire", [
      "Bundled ropes of bare bright copper rassa wire",
      "Close-up of clean, uncoated Millberry copper wire strands",
    ]),
    seo: {
      title: "Copper Rassa Scrap (Millberry) Supplier | Kundli, Delhi NCR",
      description:
        "Bare bright Millberry copper rassa wire scrap — 99.9% high-conductivity, clean and uncoated, bundled ropes. GST invoice and fast dispatch from Kundli, Sonipat.",
      keywords: [
        "copper rassa scrap",
        "millberry copper scrap India",
        "bare bright copper wire scrap",
        "copper wire scrap supplier",
        "copper scrap Haryana",
        "copper scrap dealer Delhi NCR",
      ],
    },
    faqs: [
      {
        q: "Is copper rassa the same as Millberry?",
        a: "Our rassa is graded as Bare Bright Copper Scrap (Millberry) — clean, bare and uncoated copper wire supplied in interlocked, bundled ropes.",
      },
      {
        q: "What purity is your copper rassa?",
        a: "We supply rassa at 99.9% high-conductivity copper, suitable for direct melting with minimal slag.",
      },
      {
        q: "Who usually buys copper rassa?",
        a: "Wire-drawing units that re-draw it into fine wire, cable and conductor makers, and secondary smelters and refineries.",
      },
    ],
  },
  {
    slug: "copper-tally",
    name: "Copper Tally",
    localName: "Tally",
    eyebrow: EYEBROW,
    shortDescription:
      "Refined copper tally pieces — consistent in size and purity, suitable for melting and secondary copper production.",
    longDescription: `Copper tally is heavy copper scrap cut into plates and segment blocks of consistent size. It is a melting grade: foundries and secondary smelters buy it because uniform pieces charge easily and melt predictably.

NexMetal grades its tally as mixed heavy copper solids in the 97% to 99% purity range. The material is supplied as clean-cut copper plates and segment blocks, sorted at our Kundli yard so that each lot is consistent in size and purity rather than a loose mix of shapes.

Casting foundries and secondary smelting units are the main buyers of copper tally, using it as feed for secondary copper production. Whatever your use, the grade and purity band are stated upfront on your quote, every consignment is weighed transparently, and every sale is billed on a GST invoice from NexMetal Recycling Private Limited.

We are based in the HSIIDC Industrial Estate, Kundli, District Sonipat — on NH-44 at the Delhi–Haryana border. From here, copper tally reaches foundry and smelting clusters in Delhi NCR, Haryana, Punjab, Uttar Pradesh and Rajasthan quickly by road, and we dispatch pan-India.

Need copper tally for your next melt? Call or WhatsApp with the quantity and delivery location, and we will confirm availability and a price.`,
    specs: [
      { label: "Grade", value: "Mixed heavy copper solids" },
      { label: "Purity", value: "97% to 99% pure scrap grading" },
      { label: "Form", value: "Clean-cut copper plates and segment blocks" },
      { label: "Industry", value: "Casting foundries, secondary smelting units" },
    ],
    applications: ["Melting", "Secondary copper production", "Casting"],
    buyers: [
      "Foundries & casting units",
      "Secondary smelters & refineries",
      "Alloy & brass makers",
    ],
    images: productImages("copper-tally", [
      "Clean-cut copper tally plates sorted by size",
      "Heavy copper segment blocks graded for melting",
      "Stack of copper tally pieces ready for dispatch",
    ]),
    seo: {
      title: "Copper Tally Scrap Supplier | Heavy Copper for Foundries | Kundli",
      description:
        "Copper tally — mixed heavy copper solids, 97–99% purity, clean-cut plates and segment blocks for foundries and secondary smelters. GST invoice, dispatch from Kundli.",
      keywords: [
        "copper tally",
        "copper tally scrap",
        "heavy copper scrap",
        "copper scrap for foundry",
        "copper scrap supplier Sonipat",
        "copper scrap Haryana",
      ],
    },
    faqs: [
      {
        q: "What purity is copper tally?",
        a: "Our copper tally is graded as mixed heavy copper solids in the 97% to 99% purity range.",
      },
      {
        q: "What form does copper tally come in?",
        a: "Clean-cut copper plates and segment blocks, sorted so each lot is consistent in size.",
      },
      {
        q: "Which industries use copper tally?",
        a: "Mainly casting foundries and secondary smelting units, which melt it for secondary copper production.",
      },
    ],
  },
  {
    slug: "ac-copper-pipes",
    name: "AC Pipes (Copper Tubes)",
    localName: "AC Pipe",
    eyebrow: EYEBROW,
    shortDescription:
      "Copper pipes and tubes recovered from air-conditioning units. Available in straight and bent forms.",
    longDescription: `AC copper pipe scrap is copper tubing recovered from air-conditioning and HVAC units, radiator tubes and plumbing. NexMetal sorts and supplies it in straight and bent forms for buyers who want clean tube copper.

The tubes are Deoxidized High Phosphorus (DHP) copper — the standard grade for refrigeration and plumbing tube. We supply AC pipes free of iron fittings, brass attachments and solder joints, so you are paying for copper rather than for contaminants that have to be cut away later.

Material is supplied either as compressed bundles or as sorted length segments, depending on what suits your handling and furnace charging. Every consignment is weighed transparently at our Kundli yard and billed on a GST invoice from NexMetal Recycling Private Limited.

Whether you are an AC copper pipe scrap buyer looking for a steady seller, or a smelter or alloy maker that needs clean tube copper, our location on NH-44 at the Delhi–Haryana border keeps road transit short to Delhi NCR, Haryana, Punjab, Uttar Pradesh and Rajasthan. We also dispatch pan-India.

Tell us the form you prefer — bundles or sorted lengths — and the quantity, on call or WhatsApp, and we will send availability and a quote.`,
    specs: [
      { label: "Grade", value: "Deoxidized High Phosphorus (DHP) copper" },
      { label: "Source", value: "HVAC units, radiator tubes, plumbing scrap" },
      { label: "Format", value: "Compressed bundles or sorted length segments" },
      {
        label: "Quality",
        value: "Free of iron fittings, brass attachments or solder joints",
      },
    ],
    applications: ["Melting", "Secondary copper production", "Alloy production"],
    buyers: [
      "Secondary smelters & refineries",
      "Alloy & brass makers",
      "Foundries & casting units",
    ],
    // TODO(owner): real photo of AC copper pipe scrap. Renders the copper placeholder until supplied.
    images: productImages("ac-copper-pipes", [
      "Straight and bent AC copper pipe scrap, cleaned of fittings",
    ]),
    seo: {
      title: "AC Copper Pipe Scrap Supplier & Buyer | DHP Copper Tubes | Kundli",
      description:
        "AC copper pipe scrap — DHP copper tubes from HVAC units, free of iron fittings, brass and solder joints. Bundles or sorted lengths, GST invoice, dispatch from Kundli.",
      keywords: [
        "AC copper pipe scrap",
        "AC copper pipe scrap buyer",
        "copper tube scrap",
        "DHP copper scrap",
        "copper scrap dealer Delhi NCR",
        "copper scrap Kundli",
      ],
    },
    faqs: [
      {
        q: "What grade is AC copper pipe scrap?",
        a: "AC pipes are Deoxidized High Phosphorus (DHP) copper, recovered from HVAC units, radiator tubes and plumbing scrap.",
      },
      {
        q: "Are the pipes cleaned of fittings?",
        a: "Yes. We supply AC pipes free of iron fittings, brass attachments and solder joints.",
      },
      {
        q: "Can I get AC pipes in sorted lengths instead of bundles?",
        a: "Yes. We supply either compressed bundles or sorted length segments — tell us which suits your handling.",
      },
    ],
  },
  {
    slug: "copper-dori",
    name: "Copper Dori",
    localName: "Dori",
    eyebrow: EYEBROW,
    shortDescription:
      "Fine copper wire bundles and strands — light, flexible, and used in motor rewinding and cable manufacturing.",
    longDescription: `Copper dori is fine copper wire in bundles and strands — hair wire and winding wire scrap that is light and flexible. It comes largely from motor rewinding work and cable production, and goes back into the same industries as feedstock.

NexMetal supplies dori graded as hair wire and winding wire scrap at 99.9% purity, as enamel-coated or bare strands. The outer PVC insulation layer is stripped clean before supply, so you receive copper strands rather than insulated cable.

Buyers use copper dori for cable cores, in alloy mixtures, and in motor manufacturing. Each lot is sorted at our yard in the HSIIDC Industrial Estate, Kundli, weighed transparently at dispatch, and billed on a GST invoice from NexMetal Recycling Private Limited.

Sitting on NH-44 at the Delhi–Haryana border, we can move copper dori quickly by road to motor, cable and alloy units across Delhi NCR, Haryana, Punjab, Uttar Pradesh and Rajasthan, and dispatch pan-India for larger requirements.

If you are looking for a copper dori scrap supplier, let us know whether you need enamel-coated or bare strands and the quantity required. Call or WhatsApp for availability and a quote.`,
    specs: [
      { label: "Grade", value: "Hair wire / winding wire scrap" },
      { label: "Purity", value: "99.9% pure, enamel-coated or bare strands" },
      { label: "Condition", value: "Stripped clean of outer PVC insulation layer" },
      { label: "Usage", value: "Cable cores, alloy mixtures, motor manufacturing" },
    ],
    applications: [
      "Cable cores",
      "Alloy mixtures",
      "Motor manufacturing",
      "Motor rewinding",
    ],
    buyers: [
      "Cable & conductor makers",
      "Motor & transformer manufacturers",
      "Alloy & brass makers",
    ],
    images: productImages("copper-dori", [
      "Bundles of fine copper dori winding wire",
      "Close-up of stripped copper hair-wire strands",
    ]),
    seo: {
      title: "Copper Dori Scrap Supplier | Hair & Winding Wire | Kundli, Sonipat",
      description:
        "Copper dori — hair wire and winding wire scrap, 99.9% pure, enamel-coated or bare, PVC stripped. For cable, alloy and motor makers. GST invoice, dispatch from Kundli.",
      keywords: [
        "copper dori scrap",
        "copper winding wire scrap",
        "copper hair wire scrap",
        "copper scrap supplier Sonipat",
        "copper scrap Haryana",
        "copper scrap dealer Delhi NCR",
      ],
    },
    faqs: [
      {
        q: "What is copper dori?",
        a: "Dori is fine copper wire in bundles and strands — hair wire and winding wire scrap that is light and flexible.",
      },
      {
        q: "Is the insulation removed?",
        a: "Yes. The outer PVC insulation layer is stripped clean. Strands are supplied enamel-coated or bare.",
      },
      {
        q: "What is copper dori used for?",
        a: "Cable cores, alloy mixtures and motor manufacturing.",
      },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export const productSlugs = products.map((p) => p.slug);
