export type Faq = { id: string; q: string; a: string };

/** General FAQs. Product-specific FAQs live on each product in products.ts. */
export const faqs: Faq[] = [
  {
    id: "moq",
    q: "What is the minimum order quantity?",
    // TODO(owner): state the real minimum order quantity (e.g. per grade, in kg or tonnes).
    a: "Minimum order quantity depends on the grade. Call or WhatsApp us with your requirement and we will confirm what we can supply.",
  },
  {
    id: "gst-invoice",
    q: "Do you provide a GST invoice?",
    a: "Yes. Every sale is billed on a GST invoice from NexMetal Recycling Private Limited (GSTIN 06AAFCI0854G1ZR).",
  },
  {
    id: "delivery-areas",
    q: "Which areas do you deliver to?",
    a: "We dispatch by road from Kundli, Sonipat to Delhi NCR, Haryana, Punjab, Uttar Pradesh and Rajasthan, and pan-India for larger orders.",
  },
  {
    id: "purity-check",
    q: "How do you check purity?",
    // TODO(owner): describe the actual purity-check method used (visual, spark, XRF, lab report etc.).
    a: "Every lot is sorted by form and graded against its stated purity band before packing. The grade and purity band are written on your quote so you know exactly what you are buying.",
  },
  {
    id: "payment-terms",
    q: "What are your payment terms?",
    // TODO(owner): state the real payment terms (advance, against delivery, credit for regular buyers etc.).
    a: "Payment terms are agreed per order. Our team will share them along with your quote.",
  },
  {
    id: "quote",
    q: "How do I get a quote?",
    a: "Call or WhatsApp us, or fill in the enquiry form, with the product, quantity and delivery location. We will reply with availability and a price.",
  },
  {
    id: "inspection",
    q: "Can I see a sample or visit the yard before buying?",
    // TODO(owner): confirm whether samples are sent and whether yard visits are allowed.
    a: "Yes — you are welcome to inspect material at our Kundli yard by appointment. Contact us to arrange a visit or ask about samples.",
  },
  {
    id: "transport",
    q: "Who arranges loading and transport?",
    // TODO(owner): confirm who arranges and pays for transport (ex-yard vs delivered pricing).
    a: "Material is loaded at our Kundli yard. Transport can be arranged by us or by the buyer — tell us your preference when you ask for a quote.",
  },
];
