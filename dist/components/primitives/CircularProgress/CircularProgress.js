import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_CONFIG = {
  xs: { px: 16, strokeWidth: 6, fontSize: 0, fontWeight: 400 },
  sm: { px: 24, strokeWidth: 6, fontSize: 0, fontWeight: 400 },
  md: { px: 32, strokeWidth: 6, fontSize: 20, fontWeight: 400 },
  // 11px at 32px → ~20 in vb100
  lg: { px: 40, strokeWidth: 6, fontSize: 18, fontWeight: 400 },
  // 14px at 40px → ~18 in vb100
  xl: { px: 48, strokeWidth: 6, fontSize: 17, fontWeight: 400 }
  // 17px at 48px → ~17 in vb100
};
const SHOWS_LABEL = /* @__PURE__ */ new Set(["md", "lg", "xl"]);
function polarToCartesian(cx, cy, r, angleDeg) {
  const rad = (angleDeg - 90) * Math.PI / 180;
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad)
  };
}
function arcPath(cx, cy, r, startDeg, endDeg) {
  const clampedEnd = Math.min(endDeg, startDeg + 359.999);
  const start = polarToCartesian(cx, cy, r, startDeg);
  const end = polarToCartesian(cx, cy, r, clampedEnd);
  const largeArc = clampedEnd - startDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArc} 1 ${end.x} ${end.y}`;
}
const CircularProgress = React.forwardRef((props, ref) => {
  const {
    size = "md",
    value = 0,
    showLabel,
    className,
    style,
    ...rest
  } = props;
  const { px, strokeWidth, fontSize, fontWeight } = SIZE_CONFIG[size];
  const pct = Math.max(0, Math.min(100, value));
  const displayLabel = showLabel !== void 0 ? showLabel : SHOWS_LABEL.has(size);
  const cx = 50;
  const cy = 50;
  const r = 50 - strokeWidth / 2;
  const fillEndDeg = pct * 3.6;
  const trackPath = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 1e-3} ${cy - r}`;
  const fillPath = pct === 0 ? "" : pct >= 100 ? trackPath : arcPath(cx, cy, r, 0, fillEndDeg);
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      ref,
      width: px,
      height: px,
      viewBox: "0 0 100 100",
      fill: "none",
      role: "progressbar",
      "aria-valuenow": pct,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": `Progress: ${pct}%`,
      className: cn("shrink-0", className),
      style,
      ...rest,
      children: [
        /* @__PURE__ */ jsx(
          "circle",
          {
            cx,
            cy,
            r,
            fill: "none",
            stroke: "var(--color-surface-3)",
            strokeWidth
          }
        ),
        pct > 0 && /* @__PURE__ */ jsx(
          "path",
          {
            d: fillPath,
            fill: "none",
            stroke: "var(--color-brand-primary)",
            strokeWidth,
            strokeLinecap: "round",
            transform: `rotate(-90 ${cx} ${cy})`
          }
        ),
        displayLabel && /* @__PURE__ */ jsx(
          "text",
          {
            x: cx,
            y: cy,
            textAnchor: "middle",
            dominantBaseline: "central",
            fill: "var(--color-text-primary)",
            fontSize,
            fontWeight,
            fontFamily: "Inter, sans-serif",
            style: { userSelect: "none" },
            children: `${Math.round(pct)}%`
          }
        )
      ]
    }
  );
});
CircularProgress.displayName = "CircularProgress";
export {
  CircularProgress
};
