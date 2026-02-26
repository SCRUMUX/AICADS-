import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback } from "react";
import { cn, findClasses, getFocusRing, IconSlot } from "../_shared";
import contract from "../../../contracts/components/Tag.contract.json";
const rules = contract.variantRules || [];
const SIZE_CLASSES = {
  sm: "px-[var(--space-tag-x-sm)] py-[var(--space-tag-y-sm)] min-h-[var(--space-22)] max-h-[var(--space-22)] min-w-[var(--space-22)] gap-[var(--space-tag-gap)] text-style-caption-xs rounded-[var(--radius-pill)] [--icon-size:16px]",
  md: "px-[var(--space-tag-x-md)] py-[var(--space-tag-y-md)] min-h-[var(--space-24)] max-h-[var(--space-24)] min-w-[var(--space-24)] gap-[var(--space-tag-gap)] text-style-caption rounded-[var(--radius-pill)] [--icon-size:16px]",
  lg: "px-[var(--space-tag-x-lg)] py-[var(--space-tag-y-lg)] min-h-[var(--space-32)] max-h-[var(--space-32)] min-w-[var(--space-32)] gap-[var(--space-tag-gap)] text-style-body rounded-[var(--radius-pill)] [--icon-size:20px]"
};
const Tag = React.forwardRef((props, ref) => {
  const {
    appearance = "base",
    size = "sm",
    state: controlledState,
    iconLeft,
    iconRight,
    showLeftIcon = false,
    showRightIcon = false,
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    ...rest
  } = props;
  const [internalState, setInternalState] = useState("base");
  const effectiveState = controlledState ?? internalState;
  const vc = findClasses(rules, { appearance, size, state: effectiveState });
  const focusRing = getFocusRing(contract, appearance);
  const he = useCallback(
    (e) => {
      if (!controlledState) setInternalState("hover");
      onMouseEnter?.(e);
    },
    [controlledState, onMouseEnter]
  );
  const hl = useCallback(
    (e) => {
      if (!controlledState) setInternalState("base");
      onMouseLeave?.(e);
    },
    [controlledState, onMouseLeave]
  );
  return /* @__PURE__ */ jsxs(
    "span",
    {
      ref,
      className: cn(
        "transition-colors duration-150 font-base box-border inline-flex flex-row justify-center items-center border-[var(--border-width-base)] border-solid",
        SIZE_CLASSES[size],
        ...vc,
        focusRing,
        className
      ),
      onMouseEnter: he,
      onMouseLeave: hl,
      ...rest,
      children: [
        showLeftIcon && iconLeft && /* @__PURE__ */ jsx(IconSlot, { icon: iconLeft }),
        /* @__PURE__ */ jsx("span", { className: "truncate", children }),
        showRightIcon && iconRight && /* @__PURE__ */ jsx(IconSlot, { icon: iconRight })
      ]
    }
  );
});
Tag.displayName = "Tag";
export {
  Tag
};
