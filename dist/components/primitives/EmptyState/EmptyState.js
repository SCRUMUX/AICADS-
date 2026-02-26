import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React from "react";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_CONFIG = {
  sm: {
    padding: "p-[9px]",
    outerGap: "gap-3",
    // 12px
    innerTextGap: "gap-1",
    // ~4px between title and desc
    iconFrameSize: 40,
    iconSize: 32,
    titleFont: "text-[14px] font-semibold leading-5",
    descFont: "text-[12px] font-normal leading-4",
    actionsGap: "gap-2"
  },
  md: {
    padding: "p-3",
    // 12px
    outerGap: "gap-4",
    // 16px
    innerTextGap: "gap-[6px]",
    iconFrameSize: 64,
    iconSize: 48,
    titleFont: "text-[16px] font-semibold leading-6",
    descFont: "text-[14px] font-normal leading-5",
    actionsGap: "gap-2"
  },
  lg: {
    padding: "p-4",
    // 16px
    outerGap: "gap-6",
    // 24px
    innerTextGap: "gap-2",
    iconFrameSize: 80,
    iconSize: 64,
    titleFont: "text-[18px] font-semibold leading-6",
    descFont: "text-[16px] font-normal leading-6",
    actionsGap: "gap-3"
  }
};
const APPEARANCE_BG = {
  base: "bg-[var(--color-surface-2)]",
  info: "bg-[var(--color-info-surface)]",
  success: "bg-[var(--color-success-surface)]",
  warning: "bg-[var(--color-warning-surface)]",
  danger: "bg-[var(--color-danger-surface)]"
};
const APPEARANCE_ICON_COLOR = {
  base: "text-[var(--color-icon-on-base)]",
  info: "text-[var(--color-info-base)]",
  success: "text-[var(--color-success-base)]",
  warning: "text-[var(--color-warning-base)]",
  danger: "text-[var(--color-danger-base)]"
};
const IconFrame = ({ node, frameSize, iconSize, colorClass }) => /* @__PURE__ */ jsx(
  "span",
  {
    className: cn("shrink-0 flex items-center justify-center", colorClass),
    style: { width: frameSize, height: frameSize },
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx(
      "span",
      {
        className: "flex items-center justify-center",
        style: { width: iconSize, height: iconSize },
        children: React.isValidElement(node) ? React.cloneElement(node, {
          style: {
            width: "100%",
            height: "100%",
            display: "block",
            ...node.props?.style
          }
        }) : node
      }
    )
  }
);
const EmptyState = React.forwardRef((props, ref) => {
  const {
    size = "sm",
    appearance = "base",
    layout = "vertical",
    icon,
    title = "No items yet",
    description = "Add your first item to get started.",
    ctaButton,
    secondaryButton,
    showIcon = true,
    showCta = true,
    showSecondary = true,
    className,
    style,
    ...rest
  } = props;
  const { padding, outerGap, innerTextGap, iconFrameSize, iconSize, titleFont, descFont, actionsGap } = SIZE_CONFIG[size];
  const bgClass = APPEARANCE_BG[appearance];
  const iconColor = APPEARANCE_ICON_COLOR[appearance];
  const isVertical = layout === "vertical";
  const textAlign = isVertical ? "text-center" : "text-left";
  const hasActions = showCta && ctaButton || showSecondary && secondaryButton;
  const actionsRow = hasActions ? /* @__PURE__ */ jsxs("div", { className: cn("flex flex-row items-center flex-wrap", actionsGap), children: [
    showCta && ctaButton && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: ctaButton }),
    showSecondary && secondaryButton && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: secondaryButton })
  ] }) : null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "inline-flex rounded-[4px]",
        padding,
        bgClass,
        isVertical ? cn("flex-col items-center", outerGap) : cn("flex-row items-center", outerGap),
        className
      ),
      style,
      ...rest,
      children: [
        showIcon && icon && /* @__PURE__ */ jsx(
          IconFrame,
          {
            node: icon,
            frameSize: iconFrameSize,
            iconSize,
            colorClass: iconColor
          }
        ),
        isVertical ? (
          // ── Vertical: text block + actions underneath ──
          /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col items-center", innerTextGap), children: [
              /* @__PURE__ */ jsx("span", { className: cn(titleFont, "text-[var(--color-text-primary)]", textAlign), children: title }),
              /* @__PURE__ */ jsx("span", { className: cn(descFont, "text-[var(--color-text-muted)]", textAlign), children: description })
            ] }),
            actionsRow
          ] })
        ) : (
          // ── Horizontal: content column (text + actions) to the right of icon ──
          /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col", innerTextGap), children: [
            /* @__PURE__ */ jsxs("div", { className: cn("flex flex-col", innerTextGap), children: [
              /* @__PURE__ */ jsx("span", { className: cn(titleFont, "text-[var(--color-text-primary)]", textAlign), children: title }),
              /* @__PURE__ */ jsx("span", { className: cn(descFont, "text-[var(--color-text-muted)]", textAlign), children: description })
            ] }),
            actionsRow
          ] })
        )
      ]
    }
  );
});
EmptyState.displayName = "EmptyState";
export {
  EmptyState
};
