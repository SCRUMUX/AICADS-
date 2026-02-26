import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback, useRef, useEffect } from "react";
import contract from "../../../contracts/components/Accordion.contract.json";
import { cn, findClasses } from "../_shared";
import { useControllableState } from "../../../hooks/useControllableState";
const AccordionChevron = ({ open }) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: "20",
    height: "20",
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": "true",
    className: cn("transition-transform duration-200", open && "rotate-180"),
    children: /* @__PURE__ */ jsx("path", { d: "M5 8l5 5 5-5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
  }
);
const rules = contract.variantRules || [];
const HEADER_CLASSES = {
  sm: "px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)] min-h-[var(--space-28)] gap-[var(--space-button-gap-sm)] text-style-caption [--icon-size:20px]",
  md: "px-[var(--space-button-x-md)] py-[var(--space-button-y-md)] min-h-[var(--space-36)] gap-[var(--space-button-gap-md)] text-style-body [--icon-size:20px]",
  lg: "px-[var(--space-button-x-lg)] py-[var(--space-button-y-lg)] min-h-[var(--space-40)] gap-[var(--space-button-gap-lg)] text-style-body-lg [--icon-size:24px]"
};
const ROOT_CLASSES = {
  sm: "rounded-[var(--radius-default)]",
  md: "rounded-[var(--radius-default)]",
  lg: "rounded-[var(--radius-default)]"
};
const CONTENT_PAD = {
  sm: "px-[var(--space-button-x-sm)] pb-[var(--space-button-y-sm)]",
  md: "px-[var(--space-button-x-md)] pb-[var(--space-button-y-md)]",
  lg: "px-[var(--space-button-x-lg)] pb-[var(--space-button-y-lg)]"
};
const CONTENT_TEXT_MAP = {
  sm: "text-style-caption-xs",
  md: "text-style-body-sm",
  lg: "text-style-body"
};
const Accordion = React.forwardRef((props, ref) => {
  const {
    state: stateProp,
    size = "sm",
    interaction: controlledState,
    iconLeft1,
    iconLeft2,
    badge,
    chevron,
    showIconLeft1 = false,
    showIconLeft2 = false,
    showBadge = false,
    showTopBorder = false,
    fullWidth = false,
    content,
    onToggle,
    children,
    className,
    ...rest
  } = props;
  if (true) {
    if (chevron !== void 0) console.warn("[Accordion] `chevron` is deprecated. The chevron icon is now rendered internally.");
  }
  const [isOpen, setIsOpen] = useControllableState({
    value: stateProp !== void 0 ? stateProp === "open" : void 0,
    defaultValue: false
  });
  const handleToggle = useCallback(() => {
    setIsOpen((p) => !p);
    onToggle?.();
  }, [setIsOpen, onToggle]);
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [transitionDone, setTransitionDone] = useState(!isOpen);
  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
    if (!isOpen) setTransitionDone(false);
  }, [isOpen, content, children]);
  const handleTransitionEnd = useCallback(() => {
    if (isOpen && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
      setTransitionDone(true);
    }
  }, [isOpen]);
  const effectiveState = controlledState === "disabled" ? "disabled" : "base";
  const vc = findClasses(rules, { state: isOpen ? "open" : "closed", size, interaction: effectiveState });
  const focusRing = contract.focusRing ?? "";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "transition-colors duration-150 font-base box-border flex flex-col relative overflow-hidden",
        ...vc,
        ROOT_CLASSES[size],
        !isOpen && focusRing,
        fullWidth && "w-full max-w-none !min-w-0",
        className
      ),
      "data-state": isOpen ? "open" : "closed",
      style: { ...isOpen ? { ["--icon-color"]: "var(--color-brand-primary)" } : {}, ...rest.style },
      ...rest,
      children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "flex min-w-0 items-center cursor-pointer w-full",
              HEADER_CLASSES[size]
            ),
            role: "button",
            tabIndex: 0,
            onClick: handleToggle,
            onKeyDown: (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleToggle();
              }
            },
            children: [
              showIconLeft1 && iconLeft1 && /* @__PURE__ */ jsx(
                "span",
                {
                  className: "shrink-0 flex items-center justify-center rounded hover:bg-[var(--color-surface-hover)] active:bg-[var(--color-surface-active)] focus:outline-none transition-colors",
                  style: { color: "var(--icon-color, currentColor)", width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" },
                  onClick: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ jsx("span", { className: "w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full", children: iconLeft1 })
                }
              ),
              showIconLeft2 && iconLeft2 && /* @__PURE__ */ jsx(
                "span",
                {
                  className: "shrink-0 flex items-center justify-center rounded hover:bg-[var(--color-surface-hover)] active:bg-[var(--color-surface-active)] focus:outline-none transition-colors",
                  style: { color: "var(--icon-color, currentColor)", width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" },
                  onClick: (e) => e.stopPropagation(),
                  children: /* @__PURE__ */ jsx("span", { className: "w-full h-full flex items-center justify-center [&_svg]:w-full [&_svg]:h-full", children: iconLeft2 })
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "flex-1 min-w-0", children }),
              showBadge && badge && /* @__PURE__ */ jsx("div", { className: "shrink-0", children: badge }),
              /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center", style: { color: "var(--icon-color, currentColor)", width: "var(--icon-size, 20px)", height: "var(--icon-size, 20px)" }, children: /* @__PURE__ */ jsx(AccordionChevron, { open: isOpen }) })
            ]
          }
        ),
        /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              maxHeight: isOpen ? contentHeight : 0,
              overflow: isOpen && transitionDone ? "visible" : "hidden",
              transition: "max-height 200ms ease-out"
            },
            onTransitionEnd: handleTransitionEnd,
            children: /* @__PURE__ */ jsx("div", { ref: contentRef, className: cn("w-full", CONTENT_TEXT_MAP[size], CONTENT_PAD[size]), children: content ?? "Accordion content..." })
          }
        ),
        showTopBorder && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 right-0 h-px", style: { background: isOpen ? "var(--color-brand-primary)" : "var(--color-border-base)" } })
      ]
    }
  );
});
Accordion.displayName = "Accordion";
export {
  Accordion
};
