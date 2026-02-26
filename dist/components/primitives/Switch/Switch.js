import { jsx } from "react/jsx-runtime";
import React, { useState, useCallback } from "react";
import contract from "../../../contracts/components/Switch.contract.json";
const rules = contract.variantRules || [];
function findClasses(args) {
  return rules.filter((r) => {
    for (const k of Object.keys(r.when)) {
      if (r.when[k] !== args[k]) return false;
    }
    return true;
  }).flatMap((r) => r.tailwindClasses);
}
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const isOnState = (s) => s === "on" || s === "disabled-on";
const isDisabledState = (s) => s === "disabled-on" || s === "disabled-off";
const Switch = React.forwardRef((props, ref) => {
  const {
    size = "sm",
    state: controlledState,
    disabled = false,
    defaultChecked = false,
    onToggle,
    onClick,
    children,
    className,
    ...rest
  } = props;
  const [internalOn, setInternalOn] = useState(
    controlledState !== void 0 ? isOnState(controlledState) : defaultChecked
  );
  const isControlled = controlledState !== void 0;
  const effectiveOn = isControlled ? isOnState(controlledState) : internalOn;
  const effectiveState = (() => {
    const isDisabled = disabled || isControlled && isDisabledState(controlledState);
    if (isDisabled) return effectiveOn ? "disabled-on" : "disabled-off";
    return effectiveOn ? "on" : "off";
  })();
  const effectiveDisabled = effectiveState === "disabled-on" || effectiveState === "disabled-off";
  const handleClick = useCallback((e) => {
    if (effectiveDisabled) return;
    if (!isControlled) {
      setInternalOn((prev) => {
        const next = !prev;
        onToggle?.(next);
        return next;
      });
    } else {
      onToggle?.(!effectiveOn);
    }
    onClick?.(e);
  }, [effectiveDisabled, isControlled, effectiveOn, onToggle, onClick]);
  const vc = findClasses({ size, state: effectiveState });
  const focusRing = contract.focusRing ?? "";
  return /* @__PURE__ */ jsx(
    "button",
    {
      ref,
      type: "button",
      disabled: effectiveDisabled,
      role: "switch",
      "aria-checked": effectiveOn,
      onClick: handleClick,
      className: cn(
        "transition-colors duration-200 box-border relative inline-flex items-center shrink-0 bg-[var(--track-bg,transparent)] border-[var(--border-width-base)] border-solid border-transparent",
        ...vc,
        !effectiveDisabled && focusRing,
        effectiveDisabled && "cursor-not-allowed pointer-events-none",
        className
      ),
      ...rest,
      children: /* @__PURE__ */ jsx(
        "span",
        {
          className: "absolute rounded-full transition-transform duration-200 bg-[var(--thumb-bg,var(--color-icon-on-brand))] border border-[var(--thumb-border,transparent)] shadow-sm",
          style: {
            width: "var(--thumb-size, 12px)",
            height: "var(--thumb-size, 12px)",
            transform: effectiveOn ? "translateX(calc(100% + var(--space-2, 2px)))" : "translateX(var(--space-2, 2px))",
            top: "50%",
            marginTop: "calc(var(--thumb-size, 12px) / -2)",
            left: 0
          }
        }
      )
    }
  );
});
Switch.displayName = "Switch";
export {
  Switch
};
