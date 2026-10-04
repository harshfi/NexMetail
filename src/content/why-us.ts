import type { IconName } from "./types";

export type WhyUsPoint = { id: string; title: string; body: string; icon: IconName };

export const whyUs: WhyUsPoint[] = [
  {
    id: "registered",
    title: "GST-registered Pvt. Ltd. company",
    body: "NexMetal Recycling Private Limited has been GST-registered since 2019. You buy from an accountable company, not an unregistered trader.",
    icon: "BadgeCheck",
  },
  {
    id: "graded",
    title: "Graded & sorted material",
    body: "Every lot is sorted by form and graded before dispatch, so you know the grade and purity band before the truck leaves.",
    icon: "Layers",
  },
  {
    id: "weighment",
    title: "Transparent weighment",
    body: "Consignments are weighed openly and the weight is carried through to your GST invoice. No surprises at unloading.",
    icon: "Scale",
  },
  {
    id: "location",
    title: "Delhi–Haryana border location",
    body: "Our Kundli yard sits on NH-44, right at the Delhi border, for fast road dispatch across the NCR and North India.",
    icon: "MapPin",
  },
  {
    id: "pan-india",
    title: "Pan-India delivery",
    body: "Dispatch to Delhi NCR, Haryana, Punjab, Uttar Pradesh and Rajasthan, and pan-India delivery by road.",
    icon: "Truck",
  },
  {
    id: "quotes",
    title: "Responsive quotes",
    body: "Call or WhatsApp with your grade and quantity and get a clear quote quickly.",
    icon: "MessageCircle",
  },
];
