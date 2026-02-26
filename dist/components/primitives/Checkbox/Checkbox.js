import { jsx, jsxs } from "react/jsx-runtime";
import React, { useId, useRef, useEffect, useState, useCallback } from "react";
import { cn, findClasses } from "../_shared";
import contract from "../../../contracts/components/Checkbox.contract.json";
import { useControllableState } from "../../../hooks/useControllableState";
const rules = contract.variantRules || [];
const SIZE_CONFIG = {
  xs: { px: 12, iconPx: 8, labelSize: "text-style-caption-xs" },
  sm: { px: 16, iconPx: 10, labelSize: "text-style-caption-xs" },
  md: { px: 20, iconPx: 12, labelSize: "text-style-caption" },
  lg: { px: 24, iconPx: 14, labelSize: "text-style-body" }
};
function getIconFlags(state) {
  const isCheck = state === "checked" || state === "focus-checked" || state === "disabled-checked";
  const isPlus = state === "indeterminate" || state === "disabled-indeterminate";
  const isMinus = state === "exclude" || state === "focus-exclude" || state === "disabled-exclude";
  const isStrike = state === "exclude" || state === "focus-exclude" || state === "disabled-exclude";
  return { showCheck: isCheck, showPlus: isPlus, showMinus: isMinus, strikethrough: isStrike };
}
const CheckIcon = ({ size }) => /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", className: "animate-check-pop", children: /* @__PURE__ */ jsx("path", { d: "M2.5 8L6.5 12L13.5 4.5", stroke: "var(--color-text-on-brand)", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
const PlusIcon = ({ size }) => /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", className: "animate-check-pop", children: /* @__PURE__ */ jsx("path", { d: "M8 3.5V12.5M3.5 8H12.5", stroke: "var(--color-text-on-brand)", strokeWidth: "2", strokeLinecap: "round" }) });
const MinusIcon = ({ size }) => /* @__PURE__ */ jsx("svg", { width: size, height: size, viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", className: "animate-check-pop", children: /* @__PURE__ */ jsx("path", { d: "M3.5 8H12.5", stroke: "var(--color-text-on-brand)", strokeWidth: "2", strokeLinecap: "round" }) });
const Checkbox = React.forwardRef((props, ref) => {
  const {
    size = "md",
    state: stateProp,
    indeterminate = false,
    exclude = false,
    label,
    checked: checkedProp,
    defaultChecked,
    disabled = false,
    onChange,
    onFocus,
    onBlur,
    className,
    id: idProp,
    ...rest
  } = props;
  const autoId = useId();
  const id = idProp ?? autoId;
  const innerRef = useRef(null);
  const resolvedRef = ref ?? innerRef;
  const [effectiveChecked, setChecked] = useControllableState({
    value: checkedProp,
    defaultValue: defaultChecked ?? false
  });
  useEffect(() => {
    if (resolvedRef.current) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, resolvedRef]);
  const [isFocused, setIsFocused] = useState(false);
  const handleChange = useCallback((e) => {
    setChecked(e.target.checked);
    onChange?.(e);
  }, [setChecked, onChange]);
  const handleFocus = useCallback((e) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [onFocus]);
  const handleBlur = useCallback((e) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [onBlur]);
  const effectiveState = (() => {
    if (stateProp) return stateProp;
    if (disabled && exclude) return "disabled-exclude";
    if (disabled && indeterminate) return "disabled-indeterminate";
    if (disabled && effectiveChecked) return "disabled-checked";
    if (disabled) return "disabled-unchecked";
    if (exclude) return isFocused ? "focus-exclude" : "exclude";
    if (indeterminate) return "indeterminate";
    if (isFocused && effectiveChecked) return "focus-checked";
    if (isFocused) return "focus-unchecked";
    if (effectiveChecked) return "checked";
    return "unchecked";
  })();
  const { px, iconPx, labelSize } = SIZE_CONFIG[size];
  const vc = findClasses(rules, { state: effectiveState, size });
  const { showCheck, showPlus, showMinus, strikethrough } = getIconFlags(effectiveState);
  const isDisabled = effectiveState.startsWith("disabled") || disabled;
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: id,
      className: cn(
        "inline-flex items-center gap-[var(--space-20)]",
        isDisabled ? "cursor-not-allowed" : "cursor-pointer",
        className
      ),
      children: [
        /* @__PURE__ */ jsxs(
          "span",
          {
            className: "relative shrink-0 inline-flex items-center justify-center",
            style: { width: px, height: px },
            children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: resolvedRef,
                  id,
                  type: "checkbox",
                  checked: effectiveChecked,
                  disabled: isDisabled,
                  onChange: handleChange,
                  onFocus: handleFocus,
                  onBlur: handleBlur,
                  "aria-checked": exclude ? "mixed" : indeterminate ? "mixed" : effectiveChecked,
                  style: {
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    opacity: 0,
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    zIndex: 1,
                    margin: 0
                  },
                  ...rest
                }
              ),
              /* @__PURE__ */ jsxs(
                "span",
                {
                  "aria-hidden": "true",
                  className: cn(
                    "inline-flex shrink-0 items-center justify-center",
                    "border-solid transition-all duration-150",
                    ...vc
                  ),
                  style: { width: px, height: px, pointerEvents: "none" },
                  children: [
                    showCheck && /* @__PURE__ */ jsx(CheckIcon, { size: iconPx }),
                    showPlus && /* @__PURE__ */ jsx(PlusIcon, { size: iconPx }),
                    showMinus && /* @__PURE__ */ jsx(MinusIcon, { size: iconPx })
                  ]
                }
              )
            ]
          }
        ),
        label && /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              labelSize,
              "leading-none select-none",
              isDisabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-primary)]",
              strikethrough && "line-through"
            ),
            children: label
          }
        )
      ]
    }
  );
});
Checkbox.displayName = "Checkbox";
export {
  Checkbox
};
