import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { SkeletonBlock } from "../_shared/SkeletonBlock";
const SIZE = {
  sm: { width: 320, mediaH: 80, titleW: 185, descW1: 277, descW2: 216, actionW1: 44, actionW2: 31 },
  md: { width: 480, mediaH: 110, titleW: 260, descW1: 400, descW2: 320, actionW1: 60, actionW2: 44 },
  lg: { width: 800, mediaH: 150, titleW: 400, descW1: 680, descW2: 540, actionW1: 80, actionW2: 60 }
};
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SkeletonCardInner = React.forwardRef(({
  size = "sm",
  shimmer = true,
  className,
  style
}, ref) => {
  const s = SIZE[size];
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("rounded-[4px] bg-[var(--color-surface-2)]", className),
      style: { width: s.width, padding: 6, display: "flex", flexDirection: "column", gap: 4, ...style },
      role: "status",
      "aria-label": "Loading\u0432\u0402\xA6",
      "aria-busy": "true",
      children: [
        /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: "100%", height: s.mediaH, radius: 2 }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4, paddingLeft: 6, paddingRight: 6 }, children: [
          /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.titleW, height: 10, radius: 2 }),
          /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.descW1, height: 8, radius: 2 }),
          /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.descW2, height: 8, radius: 2 }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "row", gap: 4 }, children: [
            /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.actionW1, height: 14, radius: 9999 }),
            /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.actionW2, height: 14, radius: 9999 })
          ] })
        ] })
      ]
    }
  );
});
SkeletonCardInner.displayName = "SkeletonCard";
const SkeletonCard = React.memo(SkeletonCardInner);
export {
  SkeletonCard
};
