import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback } from "react";
import { cn } from "../_shared/utils";
import { TABLE_SIZE_MAP } from "../_shared/table-tokens";
function getStyle(state) {
  switch (state) {
    case "hover":
      return { rowBg: "bg-[var(--color-surface-2)]", opacity: false, cursor: "cursor-pointer" };
    case "selected":
      return { rowBg: "bg-[var(--color-brand-muted)]", opacity: false, cursor: "cursor-pointer" };
    case "disabled":
      return { rowBg: "bg-[var(--color-surface-2)]", opacity: true, cursor: "cursor-not-allowed" };
    default:
      return { rowBg: "bg-[var(--color-surface-1)]", opacity: false, cursor: "" };
  }
}
const TableRow = React.forwardRef((props, ref) => {
  const {
    size = "md",
    state: controlledState,
    selected = false,
    disabled = false,
    showCheckboxColumn = false,
    checkbox,
    onSelect,
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    onClick,
    ...rest
  } = props;
  const [hovered, setHovered] = useState(false);
  const effectiveState = (() => {
    if (controlledState) return controlledState;
    if (disabled) return "disabled";
    if (selected) return "selected";
    if (hovered) return "hover";
    return "base";
  })();
  const { rowBg, opacity, cursor } = getStyle(effectiveState);
  const checkboxPx = TABLE_SIZE_MAP[size].checkboxColWidth;
  const selectedBorderClass = effectiveState === "selected" ? "[&>td]:border-b [&>td]:border-[var(--color-brand-primary)]" : "";
  const he = useCallback((e) => {
    if (!disabled) setHovered(true);
    onMouseEnter?.(e);
  }, [disabled, onMouseEnter]);
  const hl = useCallback((e) => {
    setHovered(false);
    onMouseLeave?.(e);
  }, [onMouseLeave]);
  const handleClick = useCallback((e) => {
    if (!disabled) onSelect?.();
    onClick?.(e);
  }, [disabled, onSelect, onClick]);
  return /* @__PURE__ */ jsxs(
    "tr",
    {
      ref,
      "aria-selected": selected || void 0,
      "aria-disabled": disabled || void 0,
      className: cn(
        "transition-colors duration-150",
        rowBg,
        selectedBorderClass,
        opacity && "opacity-50 pointer-events-none",
        cursor,
        className
      ),
      onMouseEnter: he,
      onMouseLeave: hl,
      onClick: handleClick,
      ...rest,
      children: [
        showCheckboxColumn && /* @__PURE__ */ jsx(
          "td",
          {
            className: "border-b border-[var(--color-border-base)] align-middle",
            style: { width: checkboxPx },
            children: /* @__PURE__ */ jsx("span", { className: "flex items-center justify-center", children: checkbox })
          }
        ),
        children
      ]
    }
  );
});
TableRow.displayName = "TableRow";
export {
  TableRow
};
