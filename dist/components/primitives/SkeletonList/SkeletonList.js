import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { SkeletonBlock } from "../_shared/SkeletonBlock";
const SIZE = {
  sm: { width: 320, avatarPx: 16, labelWidths: [168, 112, 146, 130], metaW: 36, rowH: 36 },
  md: { width: 480, avatarPx: 20, labelWidths: [240, 180, 210, 195], metaW: 48, rowH: 40 },
  lg: { width: 800, avatarPx: 24, labelWidths: [360, 280, 320, 300], metaW: 64, rowH: 44 }
};
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SkeletonListInner = React.forwardRef(({
  size = "sm",
  shimmer = true,
  rows = 4,
  className,
  style
}, ref) => {
  const s = SIZE[size];
  const labelWidths = s.labelWidths;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("rounded-[4px] bg-[var(--color-surface-1)]", className),
      style: { width: s.width, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, ...style },
      role: "status",
      "aria-label": "Loading\u0432\u0402\xA6",
      "aria-busy": "true",
      children: Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center", gap: 6, height: s.rowH }, children: [
          /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.avatarPx, height: s.avatarPx, radius: 9999 }),
          /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: labelWidths[i % labelWidths.length], height: 8, radius: 2 }),
          /* @__PURE__ */ jsx("div", { style: { flex: 1 } }),
          /* @__PURE__ */ jsx(SkeletonBlock, { shimmer, width: s.metaW, height: 8, radius: 2 })
        ] }),
        i < rows - 1 && /* @__PURE__ */ jsx("div", { style: { height: 1, backgroundColor: "var(--color-border-base)", width: "100%" }, "aria-hidden": "true" })
      ] }, i))
    }
  );
});
SkeletonListInner.displayName = "SkeletonList";
const SkeletonList = React.memo(SkeletonListInner);
export {
  SkeletonList
};
