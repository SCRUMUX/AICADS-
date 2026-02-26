import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback } from "react";
import { IconSlot } from "../_shared/IconSlot";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_CLASSES = {
  sm: "px-[var(--space-4)] py-[var(--space-2)] gap-[var(--space-4)] text-style-caption-xs [--icon-size:20px]",
  md: "px-[var(--space-6)] py-[var(--space-3)] gap-[var(--space-4)] text-style-caption   [--icon-size:20px]",
  lg: "px-[var(--space-8)] py-[var(--space-4)] gap-[var(--space-4)] text-style-body       [--icon-size:24px]"
};
function getStyles({ appearance, state }) {
  if (appearance === "brand") {
    const brandBase = "rounded-pill text-[var(--color-text-on-brand)] [--icon-color:var(--color-icon-on-brand)]";
    if (state === "hover") return cn(brandBase, "bg-[var(--color-brand-hover)]");
    if (state === "active") return cn(brandBase, "bg-[var(--color-brand-pressed)]");
    if (state === "disabled") return cn(brandBase, "bg-[var(--color-brand-primary)] opacity-[var(--opacity-disabled)]");
    return cn(brandBase, "bg-[var(--color-brand-primary)]");
  }
  if (appearance === "base") {
    const baseBase = "bg-transparent border-b border-solid [--icon-color:var(--color-icon-on-base)]";
    if (state === "hover") return cn(baseBase, "border-[var(--color-border-strong)]  text-[var(--color-text-muted)]");
    if (state === "active") return cn(baseBase, "border-[var(--color-brand-primary)]  text-[var(--color-brand-primary)]");
    if (state === "focus") return cn(baseBase, "border-[var(--color-border-base)]    text-[var(--color-text-muted)]");
    if (state === "disabled") return cn(baseBase, "border-[var(--color-border-disabled)] text-[var(--color-text-disabled)] opacity-[var(--opacity-disabled)]");
    return cn(baseBase, "border-[var(--color-border-base)] text-[var(--color-text-muted)]");
  }
  if (appearance === "outline") {
    const outlineBase = "border border-solid border-b-0 [--icon-color:var(--color-icon-on-outline)] text-[var(--color-brand-primary)]";
    if (state === "hover") return cn(outlineBase, "bg-[var(--color-surface-1)] border-[var(--color-border-strong)]");
    if (state === "active") return cn(outlineBase, "bg-[var(--color-surface-2)] border-[var(--color-border-strong)]");
    if (state === "disabled") return cn(outlineBase, "bg-transparent border-[var(--color-border-disabled)] text-[var(--color-text-disabled)] opacity-[var(--opacity-disabled)]");
    return cn(outlineBase, "bg-transparent border-[var(--color-border-base)]");
  }
  if (appearance === "ghost") {
    const ghostBase = "text-[var(--color-text-primary)] [--icon-color:var(--color-icon-on-ghost)] border border-solid";
    if (state === "hover") return cn(ghostBase, "bg-[var(--color-brand-hover-bg)] border-[var(--color-border-base)]");
    if (state === "active") return cn(ghostBase, "bg-[var(--color-brand-hover-bg)] border-[var(--color-border-strong)]");
    if (state === "disabled") return cn(ghostBase, "border-transparent opacity-[var(--opacity-disabled)]");
    return cn(ghostBase, "bg-transparent border-transparent");
  }
  return "";
}
const Tab = React.forwardRef((props, ref) => {
  const {
    appearance = "brand",
    size = "sm",
    state: controlledState,
    disabled = false,
    iconLeft,
    badge,
    iconRight,
    showLeftIcon = true,
    showBadge = true,
    showRightIcon = true,
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onMouseDown,
    onMouseUp,
    ...rest
  } = props;
  const [internalState, setInternalState] = useState("base");
  const effectiveState = disabled ? "disabled" : controlledState ?? internalState;
  const iconPx = size === "lg" ? 24 : 20;
  const variantClasses = getStyles({ appearance, state: effectiveState === "focus" ? "base" : effectiveState });
  const focusRingClass = effectiveState === "focus" || !controlledState && !disabled ? "focus:outline-none focus:shadow-[var(--effect-focus-brand)]" : "";
  const he = useCallback((e) => {
    if (!disabled) setInternalState("hover");
    onMouseEnter?.(e);
  }, [disabled, onMouseEnter]);
  const hl = useCallback((e) => {
    setInternalState("base");
    onMouseLeave?.(e);
  }, [onMouseLeave]);
  const hf = useCallback((e) => {
    if (!disabled) setInternalState("focus");
    onFocus?.(e);
  }, [disabled, onFocus]);
  const hb = useCallback((e) => {
    setInternalState("base");
    onBlur?.(e);
  }, [onBlur]);
  const hmd = useCallback((e) => {
    if (!disabled) setInternalState("active");
    onMouseDown?.(e);
  }, [disabled, onMouseDown]);
  const hmu = useCallback((e) => {
    setInternalState("hover");
    onMouseUp?.(e);
  }, [onMouseUp]);
  return /* @__PURE__ */ jsxs(
    "button",
    {
      ref,
      disabled,
      className: cn(
        "inline-flex flex-row items-center transition-colors duration-150 box-border",
        SIZE_CLASSES[size],
        variantClasses,
        focusRingClass,
        disabled && "cursor-not-allowed pointer-events-none",
        className
      ),
      onMouseEnter: he,
      onMouseLeave: hl,
      onFocus: hf,
      onBlur: hb,
      onMouseDown: hmd,
      onMouseUp: hmu,
      ...rest,
      children: [
        showLeftIcon && /* @__PURE__ */ jsx(IconSlot, { icon: iconLeft, size: `${iconPx}px`, className: "shrink-0" }),
        /* @__PURE__ */ jsx("span", { children }),
        showBadge && badge && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: badge }),
        showRightIcon && /* @__PURE__ */ jsx(IconSlot, { icon: iconRight, size: `${iconPx}px`, className: "shrink-0" })
      ]
    }
  );
});
Tab.displayName = "Tab";
export {
  Tab
};
