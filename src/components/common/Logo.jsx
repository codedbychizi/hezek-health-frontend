/**
 * This is a hand-built approximation of the Hezek Health mark (diamond/fin
 * shape + two accent facets + dot), redrawn from the brand PDF since no
 * vector source file exists yet. It uses the exact brand hex codes, so it
 * reads correctly even though it isn't a pixel-perfect trace. Swap the
 * <Mark> SVG below for the real exported SVG from Geotech Media whenever
 * you have it — nothing else in the app needs to change.
 */
function Mark({ size = 36 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* left teal facet */}
      <polygon points="10,60 45,35 62,60 45,85" fill="#00DC92" />
      {/* main blue fin, pointing right with a concave left edge */}
      <path
        d="M60,10 Q98,28 104,60 Q98,92 60,110 Q74,60 60,10 Z"
        fill="#16538C"
      />
      {/* right teal facet, peeking past the blue fin */}
      <polygon points="96,42 118,60 96,78" fill="#00DC92" />
      {/* accent dot */}
      <circle cx="92" cy="26" r="5" fill="#00DC92" />
    </svg>
  );
}

export default function Logo({ showTagline = false, className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Mark />
      <div className="leading-tight">
        <span className="font-display text-xl font-bold text-brand-blue">
          Hezek<span className="text-brand-teal">Health</span>
        </span>
        {showTagline && (
          <p className="text-xs font-medium text-brand-blue/70">
            Global care, local comfort
          </p>
        )}
      </div>
    </div>
  );
}