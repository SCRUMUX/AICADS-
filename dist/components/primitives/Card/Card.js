import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback } from "react";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_CONFIG = {
  sm: {
    padding: "p-[6px]",
    gap: "gap-1",
    titleFont: "text-[12px] font-medium leading-4",
    contentFont: "text-[10px] font-normal leading-3"
  },
  md: {
    padding: "p-[9px]",
    gap: "gap-1.5",
    titleFont: "text-[14px] font-semibold leading-5",
    contentFont: "text-[12px] font-normal leading-4"
  },
  lg: {
    padding: "p-3",
    gap: "gap-2",
    titleFont: "text-[16px] font-semibold leading-6",
    contentFont: "text-[14px] font-normal leading-5"
  }
};
function getBaseStyle(variant) {
  switch (variant) {
    case "outlined":
      return {
        bg: "bg-[var(--color-surface-1)]",
        border: "border border-[var(--color-border-strong)]",
        shadow: ""
      };
    case "elevated":
      return {
        bg: "bg-[var(--color-surface-1)]",
        border: "border-0",
        shadow: "shadow-[0_1px_3px_rgba(0,0,0,0.12)]"
      };
    case "filled":
      return {
        bg: "bg-[var(--color-surface-3)]",
        border: "border border-[var(--color-border-base)]",
        shadow: ""
      };
    default:
      return {
        bg: "bg-[var(--color-surface-2)]",
        border: "border border-[var(--color-border-base)]",
        shadow: ""
      };
  }
}
function getStateStyle(state) {
  switch (state) {
    case "hover":
      return {
        bg: "bg-[var(--color-surface-3)]",
        focusRing: false,
        opacity: false
      };
    case "focus":
      return {
        bg: "bg-[var(--color-surface-2)]",
        border: "border border-[var(--color-border-strong)]",
        focusRing: true,
        opacity: false
      };
    case "disabled":
      return {
        focusRing: false,
        opacity: true
      };
    default:
      return { focusRing: false, opacity: false };
  }
}
const Card = React.forwardRef((props, ref) => {
  const {
    variant = "base",
    size = "sm",
    state: stateProp,
    title,
    description,
    header,
    footer,
    children,
    disabled = false,
    className,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  } = props;
  const [internalState, setInternalState] = useState("base");
  const effectiveState = (() => {
    if (stateProp) return stateProp;
    if (disabled) return "disabled";
    return internalState;
  })();
  const baseStyle = getBaseStyle(variant);
  const stateStyle = getStateStyle(effectiveState);
  const bg = stateStyle.bg ?? baseStyle.bg;
  const border = stateStyle.border ?? baseStyle.border;
  const shadow = baseStyle.shadow;
  const { padding, gap, titleFont, contentFont } = SIZE_CONFIG[size];
  const he = useCallback((e) => {
    if (!disabled) setInternalState("hover");
    onMouseEnter?.(e);
  }, [disabled, onMouseEnter]);
  const hl = useCallback((e) => {
    if (!disabled) setInternalState("base");
    onMouseLeave?.(e);
  }, [disabled, onMouseLeave]);
  const hf = useCallback((e) => {
    if (!disabled) setInternalState("focus");
    onFocus?.(e);
  }, [disabled, onFocus]);
  const hb = useCallback((e) => {
    setInternalState("base");
    onBlur?.(e);
  }, [onBlur]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "flex flex-col w-full rounded-[4px] transition-colors duration-150 box-border",
        padding,
        gap,
        bg,
        border,
        shadow,
        stateStyle.focusRing && "shadow-[var(--effect-focus-brand)]",
        stateStyle.opacity && "opacity-[var(--opacity-disabled)] cursor-not-allowed",
        className
      ),
      onMouseEnter: he,
      onMouseLeave: hl,
      onFocus: hf,
      onBlur: hb,
      ...rest,
      children: [
        header && /* @__PURE__ */ jsx("div", { className: "w-full", children: header }),
        (title !== void 0 || description !== void 0 || children !== void 0) && /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col w-full", gap), children: [
          title !== void 0 && /* @__PURE__ */ jsx("span", { className: cn(titleFont, "text-[var(--color-text-primary)] leading-none"), children: title }),
          description !== void 0 && /* @__PURE__ */ jsx("span", { className: cn(contentFont, "text-[var(--color-text-primary)]"), children: description }),
          children
        ] }),
        footer && /* @__PURE__ */ jsx("div", { className: "w-full mt-auto", children: footer })
      ]
    }
  );
});
Card.displayName = "Card";
export {
  Card
};
