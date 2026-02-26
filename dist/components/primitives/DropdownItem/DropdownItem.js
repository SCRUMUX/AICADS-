import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback, useRef } from "react";
import { cn, findClasses, IconSlot } from "../_shared";
import contract from "../../../contracts/components/DropdownItem.contract.json";
const rules = contract.variantRules || [];
const SIZE_CLASSES = {
  sm: "min-h-[var(--space-28)] px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)] gap-[var(--space-button-gap-sm)] text-style-body-sm [--icon-size:20px]",
  md: "min-h-[var(--space-36)] px-[var(--space-button-x-md)] py-[var(--space-button-y-md)] gap-[var(--space-button-gap-md)] [--icon-size:20px]",
  lg: "min-h-[var(--space-40)] px-[var(--space-button-x-lg)] py-[var(--space-button-y-lg)] gap-[var(--space-button-gap-lg)] text-style-body-lg [--icon-size:24px]"
};
const ChevronRight = () => /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M6 4l4 4-4 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) });
const DropdownItem = React.forwardRef((props, ref) => {
  const {
    size = "sm",
    appearance: appearanceProp,
    itemType,
    checkbox,
    iconLeft,
    badge,
    iconRight,
    showCheckbox = false,
    showIconLeft = false,
    showBadge = false,
    showIconRight = false,
    submenuItems,
    children,
    className,
    onClick,
    ...rest
  } = props;
  const appearance = appearanceProp ?? itemType ?? "default";
  const vc = findClasses(rules, { size, itemType: appearance });
  const focusRing = contract.focusRing ?? "";
  const hasSubmenu = submenuItems && submenuItems.length > 0;
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const timerRef = useRef();
  const itemRef = useRef(null);
  const openSubmenu = useCallback(() => {
    clearTimeout(timerRef.current);
    setSubmenuOpen(true);
  }, []);
  const closeSubmenu = useCallback(() => {
    timerRef.current = setTimeout(() => setSubmenuOpen(false), 150);
  }, []);
  const handleKeyDown = useCallback((e) => {
    if (hasSubmenu && e.key === "ArrowRight") {
      e.preventDefault();
      e.stopPropagation();
      setSubmenuOpen(true);
    }
    if (hasSubmenu && e.key === "ArrowLeft") {
      e.preventDefault();
      e.stopPropagation();
      setSubmenuOpen(false);
    }
  }, [hasSubmenu]);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: ref ?? itemRef,
      className: cn(
        "relative transition-colors duration-150 font-base box-border flex flex-row justify-start items-center",
        SIZE_CLASSES[size],
        ...vc,
        focusRing,
        className
      ),
      onMouseEnter: hasSubmenu ? openSubmenu : void 0,
      onMouseLeave: hasSubmenu ? closeSubmenu : void 0,
      onKeyDown: handleKeyDown,
      onClick: !hasSubmenu ? onClick : void 0,
      ...rest,
      children: [
        showCheckbox && checkbox && /* @__PURE__ */ jsx("div", { className: "shrink-0 flex items-center", children: checkbox }),
        showIconLeft && iconLeft && /* @__PURE__ */ jsx(IconSlot, { icon: iconLeft, className: "shrink-0" }),
        /* @__PURE__ */ jsx("span", { className: "flex-1 min-w-0 truncate", children }),
        showBadge && badge && /* @__PURE__ */ jsx("div", { className: "shrink-0 flex items-center", children: badge }),
        hasSubmenu ? /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center text-[var(--color-text-muted)]", style: { width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" }, children: /* @__PURE__ */ jsx(ChevronRight, {}) }) : showIconRight && iconRight ? /* @__PURE__ */ jsx(IconSlot, { icon: iconRight, className: "shrink-0" }) : null,
        hasSubmenu && submenuOpen && /* @__PURE__ */ jsx(
          "div",
          {
            className: "absolute left-full top-0 ml-1 z-50 min-w-[160px] bg-[var(--color-surface-1)] border border-[var(--color-border-base)] rounded-[var(--radius-default)] shadow-elevation-2 py-1",
            onMouseEnter: openSubmenu,
            onMouseLeave: closeSubmenu,
            children: submenuItems.map(({ onClick: subClick, children: subChildren, ...subProps }, i) => /* @__PURE__ */ jsx(
              DropdownItem,
              {
                size,
                ...subProps,
                className: cn(
                  "cursor-pointer rounded-[var(--radius-default)] hover:bg-[var(--color-brand-hover-bg)] px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)]",
                  subProps.className
                ),
                onClick: () => subClick?.(),
                children: subChildren
              },
              i
            ))
          }
        )
      ]
    }
  );
});
DropdownItem.displayName = "DropdownItem";
export {
  DropdownItem
};
