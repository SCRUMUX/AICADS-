import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import contract from "../../../contracts/components/Alert.contract.json";
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
const DefaultCloseIcon = () => /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
const Alert = React.forwardRef((props, ref) => {
  const {
    appearance = "warning",
    variant = "basic",
    iconLeft,
    iconRight,
    showLeftIcon = false,
    showRightIcon = false,
    showTitle = true,
    showParagraph = true,
    title = "Alert title",
    paragraph = "Alert message",
    onClose,
    open = true,
    children,
    className,
    ...rest
  } = props;
  if (!open) return null;
  const vc = findClasses({ appearance, variant });
  const focusRing = appearance?.includes("danger") ? contract.focusRingDanger ?? "" : contract.focusRing ?? "";
  const titleTextCls = vc.find((c) => c.startsWith("[--title-text-class:"))?.match(/\[--title-text-class:([^\]]+)\]/)?.[1] || "";
  const paragraphTextCls = vc.find((c) => c.startsWith("[--paragraph-text-class:"))?.match(/\[--paragraph-text-class:([^\]]+)\]/)?.[1] || "";
  const isSolid = variant === "solid";
  const iconColorVar = isSolid ? `var(--color-${appearance}-text)` : `var(--color-${appearance}-base)`;
  const closeIconContent = iconRight ?? /* @__PURE__ */ jsx(DefaultCloseIcon, {});
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "transition-colors duration-150 font-base box-border flex flex-row justify-center items-start animate-alert-in",
        ...vc,
        focusRing,
        className
      ),
      role: "alert",
      ...rest,
      children: [
        showLeftIcon && iconLeft && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center [&_svg]:!w-full [&_svg]:!h-full", style: { color: iconColorVar, width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" }, children: React.isValidElement(iconLeft) ? React.cloneElement(iconLeft, { style: { width: "100%", height: "100%", color: iconColorVar } }) : iconLeft }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 min-w-0 items-start gap-[inherit]", children: [
          showTitle && /* @__PURE__ */ jsx("span", { className: `flex-1 min-w-0 ${titleTextCls}`, style: { color: "var(--title-color, currentColor)" }, children: title }),
          showParagraph && /* @__PURE__ */ jsx("span", { className: `flex-1 min-w-0 ${paragraphTextCls}`, children: paragraph })
        ] }),
        onClose ? /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "shrink-0 flex items-center justify-center rounded cursor-pointer bg-transparent border-0 p-0 opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:shadow-[var(--effect-focus-brand)]",
            style: { color: iconColorVar, width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" },
            "aria-label": "Close alert",
            children: closeIconContent
          }
        ) : showRightIcon && iconRight ? /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center [&_svg]:!w-full [&_svg]:!h-full", style: { color: iconColorVar, width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" }, children: React.isValidElement(iconRight) ? React.cloneElement(iconRight, { style: { width: "100%", height: "100%", color: iconColorVar } }) : iconRight }) : null
      ]
    }
  );
});
Alert.displayName = "Alert";
export {
  Alert
};
