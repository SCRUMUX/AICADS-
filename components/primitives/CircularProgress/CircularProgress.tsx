import React from 'react';
import type { CircularProgressProps, CircularProgressSize } from './CircularProgress.types';

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

// ─── Size config (from Figma) ─────────────────────────────────────────────────
// Sizes: xs=16, sm=24, md=32, lg=40, xl=48
// innerRadius=0.875 → ring occupies outer 12.5% of total radius
// Ring stroke width in px: size * (1 - innerRadius) / 2
// xs:  16 * 0.125 / 2 = 1px   → use 2px for visibility
// sm:  24 * 0.125 / 2 = 1.5px → use 3px
// md:  32 * 0.125 / 2 = 2px   → use 4px
// lg:  40 * 0.125 / 2 = 2.5px → use 5px
// xl:  48 * 0.125 / 2 = 3px   → use 6px
type SizeSpec = {
  px:         number;   // outer size in pixels
  strokeWidth: number;  // ring stroke in SVG units (viewBox 100)
  fontSize:   number;  // label font size (0 = no label)
  fontWeight: number;
};

// ViewBox is 100×100, center=(50,50), radius=50
// strokeWidth in viewBox units = (px * (1 - 0.875) / 2) / px * 100 = 6.25
// But we want visual ring width proportional. Use strokeWidth = 6 for all sizes in viewBox coords
// (slightly rounded from 6.25 for cleaner numbers)
const SIZE_CONFIG: Record<CircularProgressSize, SizeSpec> = {
  xs: { px: 16, strokeWidth: 6, fontSize:  0, fontWeight: 400 },
  sm: { px: 24, strokeWidth: 6, fontSize:  0, fontWeight: 400 },
  md: { px: 32, strokeWidth: 6, fontSize: 20, fontWeight: 400 },  // 11px at 32px → ~20 in vb100
  lg: { px: 40, strokeWidth: 6, fontSize: 18, fontWeight: 400 },  // 14px at 40px → ~18 in vb100
  xl: { px: 48, strokeWidth: 6, fontSize: 17, fontWeight: 400 },  // 17px at 48px → ~17 in vb100
};

// Sizes that show a label inside
const SHOWS_LABEL = new Set<CircularProgressSize>(['md', 'lg', 'xl']);

// ─── SVG arc helpers ──────────────────────────────────────────────────────────
// ViewBox 100×100, center (50,50)
// Track radius = 50 - strokeWidth/2 (so the stroke fits inside the viewBox)
function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const clampedEnd = Math.min(endDeg, startDeg + 359.999); // prevent full-circle edge case
  const start = polarToCartesian(cx, cy, r, startDeg);
  const end   = polarToCartesian(cx, cy, r, clampedEnd);
  const largeArc = clampedEnd - startDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export const CircularProgress = React.forwardRef<SVGSVGElement, CircularProgressProps>((props, ref) => {
  const {
    size = 'md',
    value = 0,
    showLabel,
    className,
    style,
    ...rest
  } = props;

  const { px, strokeWidth, fontSize, fontWeight } = SIZE_CONFIG[size];

  // Clamp value 0-100
  const pct = Math.max(0, Math.min(100, value));

  // Whether to show label: explicit prop overrides default
  const displayLabel = showLabel !== undefined ? showLabel : SHOWS_LABEL.has(size);

  // SVG viewBox: 100×100
  const cx = 50;
  const cy = 50;
  const r  = 50 - strokeWidth / 2; // radius so stroke stays within viewBox

  // Track: full circle (0° → 360°)
  // Fill:  arc from 0° (top) proportional to value
  const fillEndDeg = pct * 3.6; // 100% → 360°

  const trackPath = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.001} ${cy - r}`;
  const fillPath  = pct === 0
    ? ''
    : pct >= 100
      ? trackPath
      : arcPath(cx, cy, r, 0, fillEndDeg);

  return (
    <svg
      ref={ref}
      width={px}
      height={px}
      viewBox="0 0 100 100"
      fill="none"
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Progress: ${pct}%`}
      className={cn('shrink-0', className)}
      style={style}
      {...rest}
    >
      {/* Track — full donut ring */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="none"
        stroke="var(--color-surface-3)"
        strokeWidth={strokeWidth}
      />

      {/* Fill — progress arc, starts from top (−90° = 12 o'clock) */}
      {pct > 0 && (
        <path
          d={fillPath}
          fill="none"
          stroke="var(--color-brand-primary)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          transform={`rotate(-90 ${cx} ${cy})`}
        />
      )}

      {/* Label — only for md/lg/xl */}
      {displayLabel && (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fill="var(--color-text-primary)"
          fontSize={fontSize}
          fontWeight={fontWeight}
          fontFamily="Inter, sans-serif"
          style={{ userSelect: 'none' }}
        >
          {`${Math.round(pct)}%`}
        </text>
      )}
    </svg>
  );
});

CircularProgress.displayName = 'CircularProgress';
