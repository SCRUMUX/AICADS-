import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback } from "react";
import { cn } from "../_shared";
const LABEL_FONT = {
  sm: "text-style-caption font-normal",
  md: "text-style-body font-normal",
  lg: "text-style-body-lg font-normal"
};
const SUBTITLE_FONT = {
  sm: "text-style-body-xs font-normal",
  md: "text-style-caption font-normal",
  lg: "text-style-body font-normal"
};
const LEADING_ICON_SIZE = { sm: 20, md: 20, lg: 20 };
const LEADING_AVATAR_SIZE = { sm: 24, md: 24, lg: 24 };
const TRAILING_ICON_SIZE = 20;
function getBg(state) {
  switch (state) {
    case "hover":
      return "bg-[var(--color-surface-2)]";
    case "selected":
      return "bg-[var(--color-brand-muted)]";
    case "disabled":
      return "bg-[var(--color-surface-2)]";
    default:
      return "bg-[var(--color-surface-1)]";
  }
}
function getMetaColor(state) {
  return state === "selected" ? "text-[var(--color-brand-primary)]" : "text-[var(--color-text-muted)]";
}
const SIZE_SPACING = {
  sm: "px-[var(--space-list-item-x-sm)] py-[var(--space-list-item-y-sm)] gap-[var(--space-list-item-gap-sm)] min-h-[var(--space-list-item-h-sm)]",
  md: "px-[var(--space-list-item-x-md)] py-[var(--space-list-item-y-md)] gap-[var(--space-list-item-gap-md)] min-h-[var(--space-list-item-h-md)]",
  lg: "px-[var(--space-list-item-x-lg)] py-[var(--space-list-item-y-lg)] gap-[var(--space-list-item-gap-lg)] min-h-[var(--space-list-item-h-lg)]"
};
const IconWrap = ({ node, size, className }) => /* @__PURE__ */ jsx(
  "span",
  {
    className: cn("shrink-0 flex items-center justify-center", className),
    style: { width: size, height: size },
    "aria-hidden": "true",
    children: React.isValidElement(node) ? React.cloneElement(node, {
      style: { width: "100%", height: "100%", display: "block", ...node.props?.style }
    }) : node
  }
);
const ListItem = React.forwardRef((props, ref) => {
  const {
    size = "md",
    variant = "iconNav",
    state: stateProp,
    interaction: interactionProp,
    label = "List item label",
    subtitle = "Secondary description text",
    trailingMeta = "12:00",
    leadingIcon,
    leadingAvatar,
    leadingCheckbox,
    trailingChevron,
    trailingBadge,
    trailingAction,
    showSubtitle = false,
    showDivider = true,
    className,
    onMouseEnter,
    onMouseLeave,
    ...rest
  } = props;
  const controlledState = stateProp ?? interactionProp;
  const [hovered, setHovered] = useState(false);
  const isDisabled = controlledState === "disabled";
  const effectiveState = (() => {
    if (controlledState) return controlledState;
    if (hovered) return "hover";
    return "base";
  })();
  const he = useCallback((e) => {
    if (!isDisabled) setHovered(true);
    onMouseEnter?.(e);
  }, [isDisabled, onMouseEnter]);
  const hl = useCallback((e) => {
    setHovered(false);
    onMouseLeave?.(e);
  }, [onMouseLeave]);
  const iconSize = LEADING_ICON_SIZE[size];
  const avatarSize = LEADING_AVATAR_SIZE[size];
  const showLeadingIcon = variant === "iconNav" || variant === "iconMeta";
  const showLeadingAvatar = variant === "avatarContact";
  const showLeadingCb = variant === "checkboxSelect";
  const showChevron = variant === "iconNav";
  const showBadge = variant === "iconMeta";
  const showMeta = variant === "avatarContact";
  const showAction = variant === "checkboxSelect";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "flex flex-row items-center w-full",
        SIZE_SPACING[size],
        "transition-colors duration-150",
        getBg(effectiveState),
        showDivider && "border-b border-[var(--color-border-base)]",
        isDisabled && "opacity-50 pointer-events-none",
        !isDisabled && "cursor-pointer",
        className
      ),
      "aria-disabled": isDisabled || void 0,
      onMouseEnter: he,
      onMouseLeave: hl,
      ...rest,
      children: [
        showLeadingIcon && leadingIcon && /* @__PURE__ */ jsx(
          IconWrap,
          {
            node: leadingIcon,
            size: iconSize,
            className: "text-[var(--color-icon-on-base)]"
          }
        ),
        showLeadingAvatar && leadingAvatar && /* @__PURE__ */ jsx(
          "span",
          {
            className: "shrink-0 flex items-center justify-center",
            style: { width: avatarSize, height: avatarSize },
            children: leadingAvatar
          }
        ),
        showLeadingCb && leadingCheckbox && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center", children: leadingCheckbox }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col flex-1 min-w-0 gap-[2px]", children: [
          /* @__PURE__ */ jsx("span", { className: cn(LABEL_FONT[size], "text-[var(--color-text-primary)] truncate"), children: label }),
          showSubtitle && /* @__PURE__ */ jsx("span", { className: cn(SUBTITLE_FONT[size], "text-[var(--color-text-muted)] truncate"), children: subtitle })
        ] }),
        showBadge && trailingBadge && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center", children: trailingBadge }),
        showMeta && /* @__PURE__ */ jsx("span", { className: cn(
          LABEL_FONT[size],
          "shrink-0 tabular-nums",
          getMetaColor(effectiveState)
        ), children: trailingMeta }),
        showChevron && trailingChevron && /* @__PURE__ */ jsx(
          IconWrap,
          {
            node: trailingChevron,
            size: TRAILING_ICON_SIZE,
            className: "text-[var(--color-icon-on-base)]"
          }
        ),
        showAction && trailingAction && /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center", children: trailingAction })
      ]
    }
  );
});
ListItem.displayName = "ListItem";
export {
  ListItem
};
