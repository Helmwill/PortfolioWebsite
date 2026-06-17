export function NoiseOverlay() {
  return (
    <svg
      className="fixed inset-0 w-full h-full pointer-events-none z-[5]"
      style={{ mixBlendMode: 'overlay', opacity: 0.04 }}
    >
      <filter id="noise">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise)" />
    </svg>
  );
}
