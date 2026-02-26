import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { SkeletonBlock } from "../_shared/SkeletonBlock";
const SIZE = {
  sm: { width: 320, rowH: 28, cellPadX: 12, cellPadY: 3, colWidths: [48, 112, 80, 80], headerCellH: 8 },
  md: { width: 460, rowH: 32, cellPadX: 14, cellPadY: 4, colWidths: [64, 160, 112, 120], headerCellH: 8 },
  lg: { width: 600, rowH: 36, cellPadX: 16, cellPadY: 5, colWidths: [80, 200, 150, 170], headerCellH: 8 }
};
const CELL_LINE_WIDTHS = [
  [17, 53, 45, 28],
  // row 1
  [22, 70, 38, 40],
  // row 2
  [17, 53, 45, 28],
  // row 3
  [22, 70, 38, 40]
  // row 4
];
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SkeletonTableInner = React.forwardRef(({
  size = "sm",
  shimmer = true,
  rows = 4,
  cols = 4,
  className,
  style
}, ref) => {
  const s = SIZE[size];
  const colWidths = s.colWidths.slice(0, cols);
  const totalW = s.width;
  const renderRow = (rowIdx, isHeader) => {
    const lineWidths = CELL_LINE_WIDTHS[rowIdx % CELL_LINE_WIDTHS.length];
    return /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "row",
          width: totalW,
          height: s.rowH,
          backgroundColor: isHeader ? "var(--color-surface-2)" : void 0
        },
        children: colWidths.map((colW, colIdx) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              style: {
                width: colW,
                height: s.rowH,
                flexShrink: 0,
                paddingLeft: s.cellPadX,
                paddingRight: s.cellPadX,
                paddingTop: s.cellPadY,
                paddingBottom: s.cellPadY,
                display: "flex",
                alignItems: "center"
              },
              children: /* @__PURE__ */ jsx(
                SkeletonBlock,
                {
                  shimmer,
                  width: isHeader ? Math.round(colW * 0.55) : lineWidths[colIdx] ?? Math.round(colW * 0.4),
                  height: s.headerCellH,
                  radius: 2
                }
              )
            }
          ),
          colIdx < colWidths.length - 1 && /* @__PURE__ */ jsx(
            "div",
            {
              style: { width: 1, height: s.rowH, backgroundColor: "var(--color-border-base)", flexShrink: 0 },
              "aria-hidden": "true"
            }
          )
        ] }, colIdx))
      },
      rowIdx
    );
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("rounded-[4px] bg-[var(--color-surface-1)] overflow-hidden", className),
      style: { width: totalW, border: "1px solid var(--color-border-base)", ...style },
      role: "status",
      "aria-label": "Loading\u0432\u0402\xA6",
      "aria-busy": "true",
      children: [
        renderRow(-1, true),
        Array.from({ length: rows }).map((_, i) => /* @__PURE__ */ jsxs(React.Fragment, { children: [
          /* @__PURE__ */ jsx("div", { style: { height: 1, backgroundColor: "var(--color-border-base)", width: "100%" }, "aria-hidden": "true" }),
          renderRow(i, false)
        ] }, i))
      ]
    }
  );
});
SkeletonTableInner.displayName = "SkeletonTable";
const SkeletonTable = React.memo(SkeletonTableInner);
export {
  SkeletonTable
};
