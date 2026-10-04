/** Decorative copper wire strands (original artwork) used behind dark heroes. */
export function CopperStrands({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1200 800"
      preserveAspectRatio="xMidYMid slice"
      className={className}
    >
      <defs>
        <linearGradient id="strand" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E0A36A" />
          <stop offset="0.45" stopColor="#B5763F" />
          <stop offset="1" stopColor="#7A4A22" />
        </linearGradient>
      </defs>
      {Array.from({ length: 22 }, (_, i) => {
        const y = 60 + i * 34;
        return (
          <path
            key={i}
            d={`M-60 ${y + 240} C 260 ${y - 140}, 620 ${y + 260}, 1260 ${y - 120}`}
            fill="none"
            stroke="url(#strand)"
            strokeWidth={1 + (i % 5) * 0.8}
            strokeOpacity={0.12 + (i % 4) * 0.07}
          />
        );
      })}
    </svg>
  );
}
