import type { IconName } from "./types";

export type Industry = {
  id: string;
  name: string;
  summary: string;
  icon: IconName;
  /** Product slugs this industry typically buys (see products.ts buyers). */
  productSlugs: string[];
};

export const industries: Industry[] = [
  {
    id: "wire-drawing",
    name: "Wire drawing units",
    summary: "Bare bright rassa for re-drawing into fine wire.",
    icon: "Cable",
    productSlugs: ["copper-rassa-wire"],
  },
  {
    id: "foundries",
    name: "Foundries & casting",
    summary: "Heavy copper tally and clean melting grades for casting.",
    icon: "Flame",
    productSlugs: ["copper-tally", "copper-strips-patti", "ac-copper-pipes"],
  },
  {
    id: "smelters",
    name: "Secondary smelters & refineries",
    summary: "Graded feed for secondary copper production.",
    icon: "Factory",
    productSlugs: [
      "copper-tally",
      "copper-rassa-wire",
      "ac-copper-pipes",
      "copper-strips-patti",
    ],
  },
  {
    id: "cable-makers",
    name: "Cable & conductor makers",
    summary: "High-conductivity wire, strip and dori for conductors and cable cores.",
    icon: "Zap",
    productSlugs: ["copper-rassa-wire", "copper-dori", "copper-strips-patti"],
  },
  {
    id: "motor-transformer",
    name: "Motor & transformer manufacturers",
    summary: "Copper strip and winding wire for windings and motor manufacturing.",
    icon: "Cog",
    productSlugs: ["copper-strips-patti", "copper-dori"],
  },
  {
    id: "alloy-brass",
    name: "Alloy & brass makers",
    summary: "Copper units for alloy mixtures and brass production.",
    icon: "FlaskConical",
    productSlugs: ["copper-dori", "copper-tally", "ac-copper-pipes"],
  },
];
