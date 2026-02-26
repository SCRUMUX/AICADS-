import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { SkeletonBlock } from "../_shared/SkeletonBlock";
const SIZE = {
  sm: { width: 320, chartAreaH: 80, metricValueW: 92, metricValueH: 20 },
  md: { width: 480, chartAreaH: 120, metricValueW: 130, metricValueH: 28 },
  lg: { width: 800, chartAreaH: 180, metricValueW: 200, metricValueH: 36 }
};
const BAR_HEIGHTS = [48, 68, 36, 76, 56];
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const BarChartArea = ({ shimmer, width, height }) => {
  const barW = Math.floor((width - 20) / 5 - 4);
  return /* @__PURE__ */ jsxs("div", { style: { width, height, display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 4, position: "relative" }, children: [
    BAR_HEIGHTS.map((bh, i) => {
      const scaledH = Math.round(bh * height / 80);
      return /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: barW, height: scaledH, radius: 1 }, i);
    }),
    /* @__PURE__ */ jsx(
      "div",
      {
        style: { position: "absolute", bottom: 0, left: 0, right: 0, height: 1, backgroundColor: "var(--color-surface-3)" },
        "aria-hidden": "true"
      }
    )
  ] });
};
const LineChartArea = ({ shimmer, width, height }) => {
  const areaH = Math.round(height * 0.6);
  return /* @__PURE__ */ jsxs("div", { style: { width, height, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 0 }, children: [
    /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width, height: areaH, radius: 0 }),
    /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width, height: 2, radius: 1 })
  ] });
};
const DonutChartArea = ({ shimmer, width, height }) => {
  const donutOuter = Math.min(height, 80);
  const donutInner = Math.round(donutOuter * 0.55);
  return /* @__PURE__ */ jsx("div", { style: { width, height, display: "flex", alignItems: "center", justifyContent: "flex-start" }, children: /* @__PURE__ */ jsxs("div", { style: { position: "relative", width: donutOuter, height: donutOuter, flexShrink: 0 }, children: [
    /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: donutOuter, height: donutOuter, radius: 9999 }),
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: donutInner,
          height: donutInner,
          borderRadius: "50%",
          backgroundColor: "var(--color-surface-1)"
        },
        "aria-hidden": "true"
      }
    )
  ] }) });
};
const LegendRow = ({ shimmer }) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "row", gap: 6, alignItems: "center" }, children: [37, 37, 37].map((lw, i) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
  /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: 8, height: 8, radius: 9999 }),
  /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: lw, height: 6, radius: 2 })
] }, i)) });
const SkeletonChartInner = React.forwardRef(({
  size = "sm",
  shimmer = true,
  chartType = "bar",
  className,
  style
}, ref) => {
  const s = SIZE[size];
  const inner = s.width - 12;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("rounded-[4px] bg-[var(--color-surface-2)]", className),
      style: { width: s.width, padding: 6, display: "flex", flexDirection: "column", gap: 12, ...style },
      role: "status",
      "aria-label": "Loading\u0432\u0402\xA6",
      "aria-busy": "true",
      children: [
        /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: 123, height: 8, radius: 2 }),
        /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.metricValueW, height: s.metricValueH, radius: 2 }),
        /* @__PURE__ */ jsx(LegendRow, { shimmer }),
        chartType === "bar" && /* @__PURE__ */ jsx(BarChartArea, { shimmer, width: inner, height: s.chartAreaH }),
        chartType === "line" && /* @__PURE__ */ jsx(LineChartArea, { shimmer, width: inner, height: s.chartAreaH }),
        chartType === "donut" && /* @__PURE__ */ jsx(DonutChartArea, { shimmer, width: inner, height: s.chartAreaH })
      ]
    }
  );
});
SkeletonChartInner.displayName = "SkeletonChart";
const SkeletonChart = React.memo(SkeletonChartInner);
export {
  SkeletonChart
};
