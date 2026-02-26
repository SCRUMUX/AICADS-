import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { TableHeaderCell } from "../TableHeaderCell/TableHeaderCell";
import { cn } from "../_shared/utils";
import { TABLE_SIZE_MAP } from "../_shared/table-tokens";
const TableHeaderRow = React.forwardRef((props, ref) => {
  const {
    size = "md",
    showCheckboxColumn = false,
    checkbox,
    columns,
    children,
    className,
    ...rest
  } = props;
  const checkboxPx = TABLE_SIZE_MAP[size].checkboxColWidth;
  return /* @__PURE__ */ jsxs(
    "tr",
    {
      ref,
      className: cn(
        "bg-[var(--color-surface-1)]",
        className
      ),
      ...rest,
      children: [
        showCheckboxColumn && /* @__PURE__ */ jsx(
          "th",
          {
            scope: "col",
            className: "border-b border-[var(--color-border-base)] bg-[var(--color-surface-1)] align-middle",
            style: { width: checkboxPx },
            children: /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center", children: checkbox })
          }
        ),
        columns ? columns.map((col, i) => /* @__PURE__ */ jsx(
          TableHeaderCell,
          {
            size,
            sort: col.sort ?? "none",
            iconLeft: col.iconLeft,
            showIconLeft: col.showIconLeft,
            onSortChange: col.onSortChange,
            className: col.className,
            children: col.label
          },
          col.key ?? i
        )) : children
      ]
    }
  );
});
TableHeaderRow.displayName = "TableHeaderRow";
export {
  TableHeaderRow
};
