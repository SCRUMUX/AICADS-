import React from 'react';
import type { SpinnerProps, SpinnerSize, SpinnerAppearance } from './Spinner.types';
import { cn } from '../_shared';

// ─── Size config ──────────────────────────────────────────────────────────────
// From Figma:
//   xs=16, sm=24, md=32, lg=40, xl=48 px
//   innerRadius = 0.875 → ring thickness = size * (1 - 0.875) / 2 = size * 0.0625
//   stroke width (both sides) = size * 0.125
//   xs: 16*0.125 = 2px, sm: 24*0.125 = 3px, md: 32*0.125 = 4px
//   lg: 40*0.125 = 5px, xl: 48*0.125 = 6px

const SIZE_PX: Record<SpinnerSize, number> = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48,
};

// stroke width = size * 0.125 (derived from Figma innerRadius=0.875)
function getStroke(size: SpinnerSize): number {
  return SIZE_PX[size] * 0.125;
}

// ─── Appearance config ────────────────────────────────────────────────────────
// From Figma variable aliases:
//   brand:   Track = surface-3 (light gray),  Fill = brand-primary (blue)
//   base:    Track = surface-3,               Fill = icon-muted (gray)
//   inherit: Track = currentColor (white on colored bg), Fill = currentColor

type AppearanceStyle = { track: string; fill: string };

const APPEARANCE: Record<SpinnerAppearance, AppearanceStyle & { trackOpacity?: number }> = {
  brand:   { track: 'var(--color-surface-3)',    fill: 'var(--color-brand-primary)' },
  base:    { track: 'var(--color-surface-3)',    fill: 'var(--color-icon-muted)' },
  inherit: { track: 'currentColor',             fill: 'currentColor', trackOpacity: 0.25 },
};

// ─── SVG arc helpers ──────────────────────────────────────────────────────────
// We work in a normalised viewBox="0 0 1 1" coordinate space,
// then scale with width/height attributes.
//
// Figma Fill arc:
//   startingAngle = -π/2  (top of circle, 12 o'clock)
//   endingAngle   = π     (bottom, 6 o'clock)
//   span          = π - (-π/2) = 3π/2 = 270°
//
// SVG uses clockwise positive angles, 0° = 3 o'clock.
// We start from 12 o'clock (-90°) and sweep 270° clockwise.

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  };
}

// Build an SVG arc path for a partial circle (donut ring)
// startDeg=0° (12 o'clock), sweepDeg=270
function buildArcPath(cx: number, cy: number, r: number, startDeg: number, sweepDeg: number): string {
  const start = polarToCartesian(cx, cy, r, startDeg);
  const end = polarToCartesian(cx, cy, r, startDeg + sweepDeg);
  const largeArc = sweepDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}

// ─── Component ────────────────────────────────────────────────────────────────
const SpinnerInner = React.forwardRef<SVGSVGElement, SpinnerProps>(({
  size = 'md',
  appearance = 'brand',
  label = 'Loading…',
  className,
  style,
}, ref) => {
  const px = SIZE_PX[size];
  const stroke = getStroke(size);
  const { track, fill, trackOpacity } = APPEARANCE[appearance] as AppearanceStyle & { trackOpacity?: number };

  // SVG viewBox size: we use px × px for simplicity
  const vb = px;
  const cx = vb / 2;
  const cy = vb / 2;
  // radius of the center-line of the ring
  const r = (vb - stroke) / 2;

  // Track: full circle via two half-arcs (to avoid 360° degenerate case)
  const trackPath =
    `M ${cx} ${cy - r} ` +
    `A ${r} ${r} 0 1 1 ${cx - 0.0001} ${cy - r}`;

  // Fill arc: 270° starting at 12 o'clock
  const fillPath = buildArcPath(cx, cy, r, 0, 270);

  return (
    <svg
      ref={ref}
      width={px}
      height={px}
      viewBox={`0 0 ${vb} ${vb}`}
      fill="none"
      className={cn('animate-spin shrink-0', className)}
      style={style}
      role="status"
      aria-label={label}
    >
      {/* Track — full donut circle */}
      <path
        d={trackPath}
        stroke={track}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        opacity={trackOpacity}
      />
      {/* Fill — 270° arc, rotates with the SVG */}
      <path
        d={fillPath}
        stroke={fill}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
});

SpinnerInner.displayName = 'Spinner';
export const Spinner = React.memo(SpinnerInner);
