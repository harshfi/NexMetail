import { cn } from "@/lib/utils";

/**
 * Tasteful stand-in for a missing product photo: copper gradient with
 * abstract wire strands. Rendered instead of a broken image.
 */
export function CopperPlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`${label} — photo coming soon`}
      className={cn(
        "relative isolate flex size-full items-end overflow-hidden bg-night-2",
        className,
      )}
    >
      <div aria-hidden className="absolute inset-0 bg-copper-gradient opacity-90" />
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 size-full mix-blend-soft-light"
      >
        {Array.from({ length: 9 }, (_, i) => (
          <path
            key={i}
            d={`M-20 ${40 + i * 30} C 100 ${-10 + i * 34}, 220 ${110 + i * 22}, 420 ${20 + i * 32}`}
            fill="none"
            stroke="white"
            strokeOpacity={0.35 + (i % 3) * 0.15}
            strokeWidth={6 + (i % 4) * 3}
            strokeLinecap="round"
          />
        ))}
      </svg>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent"
      />
      <p className="relative z-10 p-5 text-xs font-semibold tracking-[0.08em] text-white uppercase">
        {label}
        <span className="block font-normal tracking-normal text-white/80 normal-case">
          Photo coming soon
        </span>
      </p>
    </div>
  );
}
