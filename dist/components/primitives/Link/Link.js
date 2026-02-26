import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback } from "react";
import { cn, findClasses, IconSlot } from "../_shared";
import contract from "../../../contracts/components/Link.contract.json";
const rules = contract.variantRules || [];
const SIZE_CLASSES = {
  sm: "gap-[var(--space-2)] text-style-caption [--icon-size:20px]",
  md: "gap-[var(--space-4)] text-style-body [--icon-size:20px]",
  lg: "gap-[var(--space-6)] text-style-body-lg [--icon-size:24px]"
};
const DefaultLinkIcon = () => /* @__PURE__ */ jsx("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx(
  "path",
  {
    d: "M8.5 5H6.5C5.39543 5 4.5 5.89543 4.5 7V13.5C4.5 14.6046 5.39543 15.5 6.5 15.5H13C14.1046 15.5 15 14.6046 15 13.5V11.5M11.5 4.5H15.5M15.5 4.5V8.5M15.5 4.5L9 11",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }
) });
const Link = React.forwardRef((props, ref) => {
  const {
    size = "sm",
    state: controlledState,
    iconRight,
    showLabel = true,
    showRightIcon = true,
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  } = props;
  const [internalState, setInternalState] = useState("base");
  const effectiveState = controlledState === "disabled" ? "disabled" : controlledState ?? internalState;
  const vc = findClasses(rules, { size, state: effectiveState });
  const focusRing = contract.focusRing ?? "";
  const isDisabled = effectiveState === "disabled";
  const he = useCallback((e) => {
    setInternalState("hover");
    onMouseEnter?.(e);
  }, [onMouseEnter]);
  const hl = useCallback((e) => {
    setInternalState("base");
    onMouseLeave?.(e);
  }, [onMouseLeave]);
  const hf = useCallback((e) => {
    setInternalState("hover");
    onFocus?.(e);
  }, [onFocus]);
  const hb = useCallback((e) => {
    setInternalState("base");
    onBlur?.(e);
  }, [onBlur]);
  const handleClick = useCallback((e) => {
    if (isDisabled) {
      e.preventDefault();
      return;
    }
    rest.onClick?.(e);
  }, [isDisabled, rest.onClick]);
  const resolvedIcon = iconRight ?? (showRightIcon ? /* @__PURE__ */ jsx(DefaultLinkIcon, {}) : null);
  return /* @__PURE__ */ jsxs(
    "a",
    {
      ref,
      className: cn(
        "transition-colors duration-150 font-base box-border inline-flex flex-row items-center",
        SIZE_CLASSES[size],
        ...vc,
        focusRing,
        isDisabled && "cursor-not-allowed",
        className
      ),
      "aria-disabled": isDisabled || void 0,
      tabIndex: isDisabled ? -1 : void 0,
      onMouseEnter: he,
      onMouseLeave: hl,
      onFocus: hf,
      onBlur: hb,
      onClick: handleClick,
      ...rest,
      children: [
        showLabel && /* @__PURE__ */ jsx("span", { children }),
        showRightIcon && resolvedIcon && /* @__PURE__ */ jsx(IconSlot, { icon: resolvedIcon, className: "shrink-0" })
      ]
    }
  );
});
Link.displayName = "Link";
export {
  Link
};
