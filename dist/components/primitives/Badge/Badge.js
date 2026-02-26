import { jsx } from "react/jsx-runtime";
import React from "react";
import contract from "../../../contracts/components/Badge.contract.json";
import { cn, findClasses } from "../_shared";
const rules = contract.variantRules || [];
const SIZE_CLASSES = {
  sm: "px-[var(--space-4)] py-[var(--space-2)] min-h-[var(--space-badge-min-sm)] min-w-[var(--space-badge-min-sm)] text-style-caption-xs rounded-[var(--radius-pill)]",
  md: "px-[var(--space-6)] py-[var(--space-3)] min-h-[var(--space-badge-min-md)] min-w-[var(--space-badge-min-md)] text-style-caption rounded-[var(--radius-pill)]",
  lg: "px-[var(--space-8)] py-[var(--space-4)] min-h-[var(--space-badge-min-lg)] min-w-[var(--space-badge-min-lg)] text-style-body rounded-[var(--radius-pill)]"
};
const BadgeInner = React.forwardRef((props, ref) => {
  const {
    appearance = "brand",
    size = "sm",
    children,
    className,
    ...rest
  } = props;
  const vc = findClasses(rules, { appearance, size });
  const focusRing = appearance?.includes("danger") ? contract.focusRingDanger ?? "" : contract.focusRing ?? "";
  return /* @__PURE__ */ jsx(
    "span",
    {
      ref,
      className: cn(
        "transition-colors duration-150 font-base box-border flex flex-row justify-end items-center border-[var(--border-width-base)] border-solid",
        SIZE_CLASSES[size],
        ...vc,
        focusRing,
        className
      ),
      ...rest,
      children: /* @__PURE__ */ jsx("span", { children })
    }
  );
});
BadgeInner.displayName = "Badge";
const Badge = React.memo(BadgeInner);
export {
  Badge
};
