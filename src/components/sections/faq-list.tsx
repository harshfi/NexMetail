import { Plus } from "lucide-react";

import { cn } from "@/lib/utils";

/** Accessible accordion using native <details>/<summary> — no JS required. */
export function FaqList({
  items,
  headingLevel = "h3",
  className,
}: {
  items: { q: string; a: string }[];
  headingLevel?: "h3" | "h4";
  className?: string;
}) {
  const Heading = headingLevel;
  return (
    <div className={cn("divide-y divide-line border-y border-line", className)}>
      {items.map((item) => (
        <details key={item.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
            <Heading className="text-base font-semibold sm:text-lg">{item.q}</Heading>
            <span className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-copper-dark transition-transform duration-200 group-open:rotate-45">
              <Plus aria-hidden className="size-4" />
            </span>
          </summary>
          <p className="max-w-3xl pr-12 pb-6 text-[15px]">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
