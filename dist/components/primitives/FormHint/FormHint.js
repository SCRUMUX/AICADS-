import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import contract from "../../../contracts/components/FormHint.contract.json";
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
const SIZE_CLASSES = {
  sm: "px-[var(--space-2)] py-[var(--space-1)] gap-[var(--space-2)] text-style-caption-xs [--icon-size:20px]",
  md: "px-[var(--space-2)] py-[var(--space-1)] gap-[var(--space-4)] text-style-caption [--icon-size:20px]",
  lg: "px-[var(--space-2)] py-[var(--space-1)] gap-[var(--space-4)] text-style-body [--icon-size:24px]"
};
const FormHint = React.forwardRef((props, ref) => {
  const {
    size = "sm",
    appearance = "base",
    icon,
    showIcon = false,
    children,
    className,
    ...rest
  } = props;
  const vc = findClasses({ size, appearance });
  const focusRing = appearance?.includes("danger") ? contract.focusRingDanger ?? "" : contract.focusRing ?? "";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "transition-colors duration-150 font-base box-border flex flex-row justify-center items-center",
        SIZE_CLASSES[size],
        ...vc,
        focusRing,
        className
      ),
      ...rest,
      children: [
        showIcon && icon && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center", style: { color: "var(--icon-color, currentColor)", width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" }, children: /* @__PURE__ */ jsx("span", { className: "w-full h-full flex items-center justify-center [&>*]:w-full [&>*]:h-full [&>*]:min-w-0 [&>*]:min-h-0 [&_svg]:!w-full [&_svg]:!h-full [&_svg]:min-w-0 [&_svg]:min-h-0", style: { width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" }, children: icon && (React.isValidElement(icon) ? React.cloneElement(icon, { style: { width: "100%", height: "100%", ...icon.props?.style } }) : icon) }) }),
        /* @__PURE__ */ jsx("span", { children })
      ]
    }
  );
});
FormHint.displayName = "FormHint";
export {
  FormHint
};
