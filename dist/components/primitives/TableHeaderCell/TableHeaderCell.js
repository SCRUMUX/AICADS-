import { jsx, jsxs } from "react/jsx-runtime";
import React, { useCallback } from "react";
import { ArrowUpIcon, ArrowDownIcon } from "../../icons";
import { cn } from "../_shared/utils";
import { TABLE_SIZE_MAP } from "../_shared/table-tokens";
function nextSort(current) {
  if (current === "none") return "asc";
  if (current === "asc") return "desc";
  return "none";
}
const TableHeaderCell = React.forwardRef((props, ref) => {
  const {
    size = "md",
    sort = "none",
    iconLeft,
    showIconLeft = false,
    onSortChange,
    children,
    className,
    onClick,
    ...rest
  } = props;
  const { padding, gap, iconSize, headerFont: font } = TABLE_SIZE_MAP[size];
  const isSorted = sort !== "none";
  const labelColor = isSorted ? "text-[var(--color-text-primary)]" : "text-[var(--color-text-muted)]";
  const handleClick = useCallback((e) => {
    if (onSortChange) onSortChange(nextSort(sort));
    onClick?.(e);
  }, [sort, onSortChange, onClick]);
  const SortIconComponent = sort === "asc" ? ArrowUpIcon : ArrowDownIcon;
  return /* @__PURE__ */ jsx(
    "th",
    {
      ref,
      scope: "col",
      className: cn(
        /* table-cell чтобы ячейки выравнивались корректно */
        "bg-[var(--color-surface-1)]",
        "border-b border-[var(--color-border-base)]",
        "whitespace-nowrap align-middle",
        padding,
        font,
        onSortChange ? "cursor-pointer select-none hover:bg-[var(--color-surface-2)] transition-colors duration-150" : "",
        className
      ),
      onClick: onSortChange ? handleClick : onClick,
      ...rest,
      children: /* @__PURE__ */ jsxs("span", { className: cn("flex flex-row items-center", gap), children: [
        showIconLeft && iconLeft && /* @__PURE__ */ jsx(
          "span",
          {
            className: "shrink-0 flex items-center justify-center text-[var(--color-icon-muted)]",
            style: { width: iconSize, height: iconSize },
            "aria-hidden": "true",
            children: iconLeft
          }
        ),
        /* @__PURE__ */ jsx("span", { className: cn("flex-1 min-w-0", labelColor), children }),
        isSorted && /* @__PURE__ */ jsx(
          "span",
          {
            className: "shrink-0 flex items-center justify-center text-[var(--color-text-primary)]",
            style: { width: iconSize, height: iconSize },
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsx(SortIconComponent, { size: iconSize })
          }
        ),
        !isSorted && onSortChange && /* @__PURE__ */ jsx(
          "span",
          {
            className: "shrink-0 invisible",
            style: { width: iconSize, height: iconSize },
            "aria-hidden": "true"
          }
        )
      ] })
    }
  );
});
TableHeaderCell.displayName = "TableHeaderCell";
export {
  TableHeaderCell
};
