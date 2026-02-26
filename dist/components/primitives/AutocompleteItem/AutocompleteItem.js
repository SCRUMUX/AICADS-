import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import contract from "../../../contracts/components/AutocompleteItem.contract.json";
import { cn, findClasses } from "../_shared";
const rules = contract.variantRules || [];
const SIZE_CLASSES = {
  sm: "px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)] gap-[var(--space-button-gap-sm)] min-w-[var(--space-container-compact-min)] max-w-[var(--space-container-compact-max)] text-style-body-sm [--icon-size:20px]",
  md: "px-[var(--space-button-x-md)] py-[var(--space-button-y-md)] gap-[var(--space-button-gap-md)] min-w-[var(--space-container-content-min)] max-w-[var(--space-container-content-max)] text-style-body [--icon-size:20px]",
  lg: "px-[var(--space-button-x-lg)] py-[var(--space-button-y-lg)] gap-[var(--space-button-gap-lg)] min-w-[var(--space-container-wide-min)] max-w-[var(--space-container-wide-max)] text-style-body-lg [--icon-size:24px]"
};
const AutocompleteItem = React.forwardRef((props, ref) => {
  const {
    size = "sm",
    appearance: appearanceProp,
    itemType,
    checkbox,
    iconLeft,
    badge1,
    badge2,
    badge3,
    iconRight,
    showCheckbox = false,
    showIconLeft = false,
    showBadge1 = false,
    showBadge2 = false,
    showBadge3 = false,
    showIconRight = false,
    children,
    className,
    ...rest
  } = props;
  const appearance = appearanceProp ?? itemType ?? "default";
  const vc = findClasses(rules, { size, itemType: appearance });
  const focusRing = contract.focusRing ?? "";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "transition-colors duration-150 font-base box-border flex flex-row justify-start items-center cursor-pointer hover:bg-[var(--color-brand-hover-bg)] rounded-[var(--radius-default)]",
        SIZE_CLASSES[size],
        ...vc,
        focusRing,
        className
      ),
      ...rest,
      children: [
        showCheckbox && checkbox && /* @__PURE__ */ jsx("div", { className: "shrink-0 flex items-center justify-center", style: { width: "20px", height: "20px" }, children: checkbox }),
        showIconLeft && iconLeft && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center [&_svg]:!w-full [&_svg]:!h-full", style: { color: "var(--item-icon, var(--color-icon-on-base))", width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" }, children: iconLeft && (React.isValidElement(iconLeft) ? React.cloneElement(iconLeft, { style: { width: "100%", height: "100%" } }) : iconLeft) }),
        /* @__PURE__ */ jsx("span", { className: "flex-1 min-w-0 min-h-px whitespace-pre-wrap", style: { color: "var(--item-text, var(--color-text-primary))" }, children }),
        showBadge1 && badge1 && /* @__PURE__ */ jsx("div", { className: "shrink-0 flex items-center justify-center", children: badge1 }),
        showBadge2 && badge2 && /* @__PURE__ */ jsx("div", { className: "shrink-0 flex items-center justify-center", children: badge2 }),
        showBadge3 && badge3 && /* @__PURE__ */ jsx("div", { className: "shrink-0 flex items-center justify-center", children: badge3 }),
        showIconRight && iconRight && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center [&_svg]:!w-full [&_svg]:!h-full", style: { color: "var(--item-icon, var(--color-icon-on-base))", width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" }, children: iconRight && (React.isValidElement(iconRight) ? React.cloneElement(iconRight, { style: { width: "100%", height: "100%" } }) : iconRight) })
      ]
    }
  );
});
AutocompleteItem.displayName = "AutocompleteItem";
export {
  AutocompleteItem
};
