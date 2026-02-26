import { jsx, jsxs } from "react/jsx-runtime";
import React, { useId } from "react";
import { cn, findClasses } from "../_shared";
import contract from "../../../contracts/components/RadioButton.contract.json";
const rules = contract.variantRules || [];
const SIZE_CONFIG = {
  xs: { ringPx: 12, innerPx: 6, labelSize: "text-style-caption-xs" },
  sm: { ringPx: 16, innerPx: 6, labelSize: "text-style-caption-xs" },
  md: { ringPx: 20, innerPx: 8, labelSize: "text-style-caption" },
  lg: { ringPx: 24, innerPx: 10, labelSize: "text-style-body" }
};
function showInnerDot(state) {
  return state === "filled" || state === "always-filled";
}
const RadioButton = React.forwardRef((props, ref) => {
  const {
    size = "md",
    state: stateProp,
    label,
    checked,
    disabled = false,
    onChange,
    className,
    id: idProp,
    ...rest
  } = props;
  const autoId = useId();
  const id = idProp ?? autoId;
  const effectiveState = (() => {
    if (stateProp) return stateProp;
    if (disabled) return "disabled";
    if (checked) return "filled";
    return "base";
  })();
  const { ringPx, innerPx, labelSize } = SIZE_CONFIG[size];
  const vc = findClasses(rules, { state: effectiveState, size });
  const showInner = showInnerDot(effectiveState);
  return /* @__PURE__ */ jsxs(
    "label",
    {
      htmlFor: id,
      className: cn(
        "inline-flex items-center gap-[var(--space-4)]",
        disabled ? "cursor-not-allowed opacity-[var(--opacity-disabled)]" : "cursor-pointer",
        className
      ),
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref,
            id,
            type: "radio",
            checked,
            disabled,
            onChange,
            className: "sr-only",
            ...rest
          }
        ),
        /* @__PURE__ */ jsx(
          "span",
          {
            "aria-hidden": "true",
            className: cn(
              "relative inline-flex shrink-0 items-center justify-center",
              "transition-all duration-150",
              ...vc
            ),
            style: { width: ringPx, height: ringPx },
            children: showInner && /* @__PURE__ */ jsx(
              "span",
              {
                className: "rounded-full bg-[var(--color-text-on-brand)] shrink-0 block",
                style: { width: innerPx, height: innerPx }
              }
            )
          }
        ),
        label && /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              labelSize,
              "leading-none select-none",
              disabled ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-primary)]"
            ),
            children: label
          }
        )
      ]
    }
  );
});
RadioButton.displayName = "RadioButton";
export {
  RadioButton
};
