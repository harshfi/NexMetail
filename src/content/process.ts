import type { IconName } from "./types";

export type ProcessStep = {
  id: string;
  title: string;
  summary: string;
  icon: IconName;
};

// TODO(owner): confirm each step reflects how the yard actually works (equipment, checks used).
export const processSteps: ProcessStep[] = [
  {
    id: "sourcing",
    title: "Sourcing",
    summary:
      "We buy copper scrap from industrial and trade sources and check each incoming lot before it enters the yard.",
    icon: "Truck",
  },
  {
    id: "sorting",
    title: "Sorting & Segregation",
    summary:
      "Material is separated by form — strip, wire, pipe, heavy solids — and cleared of iron, brass, insulation and other foreign material.",
    icon: "Layers",
  },
  {
    id: "grading",
    title: "Grading & Purity Check",
    summary:
      "Each lot is graded and checked against its stated purity band, so the grade on your quote is the grade on your truck.",
    icon: "ScanSearch",
  },
  {
    id: "packing",
    title: "Baling & Packing",
    summary:
      "Graded material is bundled, baled or packed by product, ready for clean loading and easy handling at your end.",
    icon: "Package",
  },
  {
    id: "dispatch",
    title: "Weighment, GST Invoice & Dispatch",
    summary:
      "Every consignment is weighed transparently, billed on a GST invoice and dispatched by road from Kundli on NH-44.",
    icon: "ReceiptText",
  },
];
