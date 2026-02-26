import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { IconSlot } from "../_shared/IconSlot";
import { cn } from "../_shared/utils";
import { TABLE_SIZE_MAP } from "../_shared/table-tokens";
function getLabelClasses(type) {
  if (type === "numeric") return "text-[var(--color-text-primary)]";
  if (type === "actions") return "text-[var(--color-text-muted)]";
  return "text-[var(--color-text-primary)]";
}
const TableCell = React.forwardRef((props, ref) => {
  const {
    size = "md",
    type = "text",
    checkbox,
    iconLeft,
    badge,
    iconAction,
    showCheckbox = false,
    showIconLeft = false,
    showBadge = false,
    showIconAction = false,
    children,
    className,
    ...rest
  } = props;
  const { padding, gap, iconSize, cellFont: font } = TABLE_SIZE_MAP[size];
  const isNumeric = type === "numeric";
  return /* @__PURE__ */ jsx(
    "td",
    {
      ref,
      className: cn(
        "border-b border-[var(--color-border-base)]",
        "whitespace-nowrap align-middle",
        padding,
        font,
        className
      ),
      ...rest,
      children: /* @__PURE__ */ jsxs("span", { className: cn(
        "flex flex-row items-center",
        gap,
        isNumeric && "justify-end"
      ), children: [
        showCheckbox && checkbox && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center", children: checkbox }),
        showIconLeft && iconLeft && /* @__PURE__ */ jsx(
          IconSlot,
          {
            icon: iconLeft,
            size: `${iconSize}px`,
            className: "shrink-0 text-[var(--color-icon-muted)]"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: cn(
          isNumeric ? "tabular-nums" : "flex-1 min-w-0 truncate",
          getLabelClasses(type)
        ), children }),
        showBadge && badge && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center", children: badge }),
        showIconAction && iconAction && /* @__PURE__ */ jsx(
          IconSlot,
          {
            icon: iconAction,
            size: `${iconSize}px`,
            className: "shrink-0 text-[var(--color-icon-muted)] hover:text-[var(--color-icon-primary)] transition-colors duration-150"
          }
        )
      ] })
    }
  );
});
TableCell.displayName = "TableCell";
export {
  TableCell
};
