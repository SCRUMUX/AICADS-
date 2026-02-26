import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { SkeletonBlock } from "../_shared/SkeletonBlock";
const SIZE = {
  sm: { width: 320, heroPx: 80, cardMediaPx: 80, navBlockH: 14, subtitleW1: 169, subtitleW2: 108, tagWidths: [40, 31, 25], cardContentTitleW: 56, cardContentDescW: 40 },
  md: { width: 480, heroPx: 120, cardMediaPx: 100, navBlockH: 16, subtitleW1: 240, subtitleW2: 160, tagWidths: [56, 44, 34], cardContentTitleW: 80, cardContentDescW: 60 },
  lg: { width: 800, heroPx: 200, cardMediaPx: 140, navBlockH: 18, subtitleW1: 380, subtitleW2: 240, tagWidths: [80, 60, 48], cardContentTitleW: 120, cardContentDescW: 90 }
};
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SkeletonPageInner = React.forwardRef(({
  size = "sm",
  shimmer = true,
  className,
  style
}, ref) => {
  const s = SIZE[size];
  const inner = s.width - 12;
  const cardW = Math.floor((inner - 18) / 3);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("rounded-[4px] bg-[var(--color-surface-1)] flex flex-col", className),
      style: { width: s.width, padding: 6, gap: 12, ...style },
      role: "status",
      "aria-label": "Loading\u0432\u0402\xA6",
      "aria-busy": "true",
      children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "row", gap: 6, alignItems: "center" }, children: [
          /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: 55, height: s.navBlockH, radius: 2 }),
          /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: 31, height: s.navBlockH, radius: 2 }),
          /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: 22, height: s.navBlockH, radius: 2 })
        ] }),
        /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: "100%", height: s.heroPx, radius: 4 }),
        /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.subtitleW1, height: 8, radius: 2 }),
        /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.subtitleW2, height: 8, radius: 2 }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "row", gap: 8 }, children: s.tagWidths.map((w, i) => /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: w, height: 12, radius: 9999 }, i)) }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "row", gap: 9 }, children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxs("div", { style: { width: cardW, borderRadius: 4, display: "flex", flexDirection: "column", gap: 8 }, children: [
          /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: cardW, height: s.cardMediaPx, radius: 4 }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, paddingLeft: 8, paddingRight: 8 }, children: [
            /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.cardContentTitleW, height: 8, radius: 2 }),
            /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.cardContentDescW, height: 8, radius: 2 })
          ] })
        ] }, i)) })
      ]
    }
  );
});
SkeletonPageInner.displayName = "SkeletonPage";
const SkeletonPage = React.memo(SkeletonPageInner);
export {
  SkeletonPage
};
