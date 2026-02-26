import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback } from "react";
import { cn, findClasses, getFocusRing, IconSlot } from "../_shared";
import { Spinner } from "../Spinner/Spinner";
import contract from "../../../contracts/components/Button.contract.json";
const rules = contract.variantRules || [];
const SIZE_CLASSES = {
  sm: "!px-[var(--space-button-x-sm)] !py-[var(--space-button-y-sm)] !min-h-[var(--space-button-h-sm)] !max-h-[var(--space-button-h-sm)] min-w-[var(--space-button-h-sm)] !gap-[var(--space-button-gap-sm)] text-style-caption rounded-[var(--radius-button)] [--icon-size:20px]",
  md: "!px-[var(--space-button-x-md)] !py-[var(--space-button-y-md)] !min-h-[var(--space-button-h-md)] !max-h-[var(--space-button-h-md)] min-w-[var(--space-button-h-md)] !gap-[var(--space-button-gap-md)] text-style-body rounded-[var(--radius-button)] [--icon-size:20px]",
  lg: "!px-[var(--space-button-x-lg)] !py-[var(--space-button-y-lg)] !min-h-[var(--space-button-h-lg)] !max-h-[var(--space-button-h-lg)] min-w-[var(--space-button-h-lg)] !gap-[var(--space-button-gap-lg)] text-style-body-lg rounded-[var(--radius-button)] [--icon-size:24px]"
};
const SPINNER_SIZE = { sm: "xs", md: "xs", lg: "sm" };
const Button = React.forwardRef((props, ref) => {
  const {
    appearance = "brand",
    size = "sm",
    state: controlledState,
    disabled = false,
    loading = false,
    fullWidth = false,
    iconLeft,
    iconRight,
    showLeftIcon = true,
    showRightIcon = true,
    showLabel = true,
    children,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onMouseDown,
    onMouseUp,
    ...rest
  } = props;
  const isDisabled = disabled || loading;
  const [internalState, setInternalState] = useState("base");
  const effectiveState = isDisabled ? "disabled" : controlledState ?? internalState;
  const vc = findClasses(rules, {
    appearance,
    size,
    state: effectiveState === "focus" ? "base" : effectiveState
  });
  const focusRing = getFocusRing(contract, appearance);
  const he = useCallback(
    (e) => {
      if (!isDisabled) setInternalState("hover");
      onMouseEnter?.(e);
    },
    [isDisabled, onMouseEnter]
  );
  const hl = useCallback(
    (e) => {
      setInternalState("base");
      onMouseLeave?.(e);
    },
    [onMouseLeave]
  );
  const hf = useCallback(
    (e) => {
      if (!isDisabled) setInternalState("focus");
      onFocus?.(e);
    },
    [isDisabled, onFocus]
  );
  const hb = useCallback(
    (e) => {
      setInternalState("base");
      onBlur?.(e);
    },
    [onBlur]
  );
  const hmd = useCallback(
    (e) => {
      if (!isDisabled) setInternalState("active");
      onMouseDown?.(e);
    },
    [isDisabled, onMouseDown]
  );
  const hmu = useCallback(
    (e) => {
      setInternalState("hover");
      onMouseUp?.(e);
    },
    [onMouseUp]
  );
  const handleClick = useCallback(
    (e) => {
      if (!isDisabled) onClick?.(e);
    },
    [isDisabled, onClick]
  );
  return /* @__PURE__ */ jsxs(
    "button",
    {
      type: "button",
      ref,
      disabled: isDisabled,
      "aria-disabled": isDisabled || void 0,
      "aria-busy": loading || void 0,
      className: cn(
        "transition-colors duration-150 font-base box-border flex flex-row justify-center items-center border-[var(--border-width-base)] border-solid",
        SIZE_CLASSES[size],
        ...vc,
        !isDisabled && focusRing,
        isDisabled && "cursor-not-allowed pointer-events-none",
        fullWidth && "w-full !min-w-0",
        className
      ),
      onMouseEnter: he,
      onMouseLeave: hl,
      onFocus: hf,
      onBlur: hb,
      onMouseDown: hmd,
      onMouseUp: hmu,
      onClick: handleClick,
      ...rest,
      children: [
        loading && /* @__PURE__ */ jsx(Spinner, { size: SPINNER_SIZE[size], appearance: "inherit" }),
        !loading && showLeftIcon && iconLeft && /* @__PURE__ */ jsx(IconSlot, { icon: iconLeft }),
        showLabel && /* @__PURE__ */ jsx("span", { className: cn(loading && "opacity-0 select-none"), children }),
        !loading && showRightIcon && iconRight && /* @__PURE__ */ jsx(IconSlot, { icon: iconRight })
      ]
    }
  );
});
Button.displayName = "Button";
export {
  Button
};
