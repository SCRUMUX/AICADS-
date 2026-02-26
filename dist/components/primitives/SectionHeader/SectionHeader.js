import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { IconSlot } from "../_shared/IconSlot";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_CLASSES = {
  sm: "px-[var(--space-4)] py-[var(--space-2)] gap-[var(--space-4)] text-style-h4 [--icon-size:16px]",
  md: "px-[var(--space-6)] py-[var(--space-3)] gap-[var(--space-6)] text-style-h2 [--icon-size:20px]",
  lg: "px-[var(--space-8)] py-[var(--space-4)] gap-[var(--space-6)] text-style-h1 [--icon-size:24px]"
};
const APPEARANCE_CLASSES = {
  base: "text-[var(--color-text-primary)] [--icon-color:var(--color-text-muted)]",
  success: "text-[var(--color-success-base)] [--icon-color:var(--color-success-base)]",
  warning: "text-[var(--color-warning-base)] [--icon-color:var(--color-warning-base)]",
  danger: "text-[var(--color-danger-base)]  [--icon-color:var(--color-danger-base)]"
};
const SectionHeaderInner = React.forwardRef((props, ref) => {
  const {
    size = "sm",
    appearance = "base",
    iconLeft,
    badge,
    iconRight,
    showLeftIcon = false,
    showBadge = false,
    showRightIcon = false,
    children,
    className,
    ...rest
  } = props;
  const iconPx = size === "lg" ? 24 : size === "md" ? 20 : 16;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "inline-flex flex-row items-center",
        SIZE_CLASSES[size],
        APPEARANCE_CLASSES[appearance] ?? APPEARANCE_CLASSES.base,
        className
      ),
      ...rest,
      children: [
        showLeftIcon && /* @__PURE__ */ jsx(IconSlot, { icon: iconLeft, size: `${iconPx}px`, className: "shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "font-semibold leading-none", children }),
        showBadge && badge && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: badge }),
        showRightIcon && /* @__PURE__ */ jsx(IconSlot, { icon: iconRight, size: `${iconPx}px`, className: "shrink-0" })
      ]
    }
  );
});
SectionHeaderInner.displayName = "SectionHeader";
const SectionHeader = React.memo(SectionHeaderInner);
export {
  SectionHeader
};
