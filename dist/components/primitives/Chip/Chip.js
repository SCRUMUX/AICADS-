import { jsx, jsxs } from "react/jsx-runtime";
import React, { useCallback } from "react";
import { cn, findClasses, getFocusRing, IconSlot } from "../_shared";
import contract from "../../../contracts/components/Chip.contract.json";
const rules = contract.variantRules || [];
const SIZE_CLASSES = {
  sm: "px-[var(--space-tag-x-sm)] py-[var(--space-tag-y-sm)] min-h-[var(--space-22)] max-h-[var(--space-22)] min-w-[var(--space-22)] gap-[var(--space-tag-gap)] text-style-caption-xs rounded-[var(--radius-pill)] [--icon-size:16px]",
  md: "px-[var(--space-tag-x-md)] py-[var(--space-tag-y-md)] min-h-[var(--space-24)] max-h-[var(--space-24)] min-w-[var(--space-24)] gap-[var(--space-tag-gap)] text-style-caption rounded-[var(--radius-pill)] [--icon-size:16px]",
  lg: "px-[var(--space-tag-x-lg)] py-[var(--space-tag-y-lg)] min-h-[var(--space-32)] max-h-[var(--space-32)] min-w-[var(--space-32)] gap-[var(--space-tag-gap)] text-style-body rounded-[var(--radius-pill)] [--icon-size:20px]"
};
const DefaultCloseIcon = () => /* @__PURE__ */ jsx("svg", { width: "12", height: "12", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M3 3l6 6M9 3l-6 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
const Chip = React.forwardRef((props, ref) => {
  const {
    appearance = "base",
    size = "sm",
    state = "base",
    disabled = false,
    iconLeft,
    closeIcon,
    showLeftIcon = false,
    showCloseIcon = true,
    value,
    onClose,
    onClick,
    onKeyDown,
    children,
    className,
    ...rest
  } = props;
  const isDisabled = disabled || state === "disabled";
  const isExclude = state === "exclude";
  const vc = findClasses(rules, { appearance, size, state: isExclude ? "base" : state });
  const focusRing = getFocusRing(contract, appearance);
  const handleCloseClick = useCallback(
    (e) => {
      e.stopPropagation();
      if (!isDisabled) onClose?.(value);
    },
    [isDisabled, onClose, value]
  );
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Backspace" || e.key === "Delete") {
        if (showCloseIcon && onClose && !isDisabled) {
          e.preventDefault();
          onClose(value);
        }
      }
      onKeyDown?.(e);
    },
    [showCloseIcon, onClose, isDisabled, value, onKeyDown]
  );
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      type: "button",
      disabled: isDisabled,
      role: "option",
      "aria-selected": state === "selected" || void 0,
      className: cn(
        "transition-colors duration-150 font-base box-border flex flex-row justify-center items-center",
        SIZE_CLASSES[size],
        ...vc,
        !isDisabled && focusRing,
        !isDisabled && "cursor-pointer hover:brightness-95 active:brightness-90",
        isDisabled && "cursor-not-allowed pointer-events-none",
        isExclude && "opacity-60 border border-dashed border-[var(--color-border-strong)]",
        className
      ),
      onClick,
      onKeyDown: handleKeyDown,
      ...rest,
      children: [
        showLeftIcon && iconLeft && /* @__PURE__ */ jsx(IconSlot, { icon: iconLeft }),
        /* @__PURE__ */ jsx("span", { className: cn("truncate max-w-[120px]", isExclude && "line-through"), children }),
        showCloseIcon && /* @__PURE__ */ jsx(
          "span",
          {
            role: "button",
            tabIndex: -1,
            "aria-label": `Remove ${typeof children === "string" ? children : ""}`,
            onClick: handleCloseClick,
            className: "shrink-0 flex items-center justify-center cursor-pointer hover:text-[var(--color-text-primary)] transition-colors",
            style: { width: "var(--icon-size, 16px)", height: "var(--icon-size, 16px)" },
            children: closeIcon ?? /* @__PURE__ */ jsx(DefaultCloseIcon, {})
          }
        )
      ]
    }
  );
});
Chip.displayName = "Chip";
export {
  Chip
};
