import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_PX = {
  xs: 16,
  sm: 24,
  md: 32,
  lg: 40,
  xl: 48
};
function getStroke(size) {
  return SIZE_PX[size] * 0.125;
}
const APPEARANCE = {
  brand: { track: "var(--color-surface-3)", fill: "var(--color-brand-primary)" },
  base: { track: "var(--color-surface-3)", fill: "var(--color-icon-muted)" },
  inherit: { track: "currentColor", fill: "currentColor", trackOpacity: 0.25 }
};
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}
function buildArcPath(cx, cy, r, startDeg, sweepDeg) {
  const start = polarToCartesian(cx, cy, r, startDeg);
  const end = polarToCartesian(cx, cy, r, startDeg + sweepDeg);
  const largeArc = sweepDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}
const SpinnerInner = React.forwardRef(({
  size = "md",
  appearance = "brand",
  label = "Loading\u2026",
  className,
  style
}, ref) => {
  const px = SIZE_PX[size];
  const stroke = getStroke(size);
  const { track, fill, trackOpacity } = APPEARANCE[appearance];
  const vb = px;
  const cx = vb / 2;
  const cy = vb / 2;
  const r = (vb - stroke) / 2;
  const trackPath = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 1e-4} ${cy - r}`;
  const fillPath = buildArcPath(cx, cy, r, 0, 270);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ref,
      width: px,
      height: px,
      viewBox: `0 0 ${vb} ${vb}`,
      fill: "none",
      className: cn("animate-spin shrink-0", className),
      style,
      role: "status",
      "aria-label": label,
      children: [
        /* @__PURE__ */ jsx(
          "path",
          {
            d: trackPath,
            stroke: track,
            strokeWidth: stroke,
            strokeLinecap: "round",
            fill: "none",
            opacity: trackOpacity
          }
        ),
        /* @__PURE__ */ jsx(
          "path",
          {
            d: fillPath,
            stroke: fill,
            strokeWidth: stroke,
            strokeLinecap: "round",
            fill: "none"
          }
        )
      ]
    }
  );
});
SpinnerInner.displayName = "Spinner";
const Spinner = React.memo(SpinnerInner);
export {
  Spinner
};
