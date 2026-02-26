import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Badge } from "../Badge/Badge";
import { PersonCircleIcon } from "../../icons";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_TOKENS = {
  xs: "var(--space-avatar-xs)",
  sm: "var(--space-avatar-sm)",
  md: "var(--space-avatar-md)",
  lg: "var(--space-avatar-lg)",
  xl: "var(--space-avatar-xl)"
};
const ICON_SIZE = {
  xs: 16,
  sm: 20,
  md: 20,
  lg: 24,
  xl: 24
};
const INITIALS_FONT = {
  xs: "9px",
  sm: "11px",
  md: "14px",
  lg: "16px",
  xl: "18px"
};
const Avatar = React.forwardRef((props, ref) => {
  const {
    variant = "guest",
    size = "xs",
    showBadge = false,
    badge,
    initials = "VK",
    src,
    badgeContent,
    className,
    style,
    ...rest
  } = props;
  const sizeToken = SIZE_TOKENS[size];
  const iconSize = ICON_SIZE[size] ?? 20;
  const bgClass = variant === "registered-no-photo" ? "bg-[var(--color-brand-primary)]" : "bg-[var(--color-surface-3)]";
  return (
    /*
     * Корневой div — НЕ имеет overflow-hidden, чтобы badge не обрезался.
     * position: relative нужен для абсолютного позиционирования badge.
     */
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref,
        className: cn("relative inline-flex shrink-0", className),
        style: { width: sizeToken, height: sizeToken, ...style },
        ...rest,
        children: [
          /* @__PURE__ */ jsxs(
            "span",
            {
              className: cn(
                "absolute inset-0 rounded-full overflow-hidden",
                bgClass
              ),
              children: [
                variant === "guest" && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "absolute inset-0 flex items-center justify-center",
                    style: { color: "var(--color-text-muted)" },
                    children: /* @__PURE__ */ jsx(
                      PersonCircleIcon,
                      {
                        size: iconSize,
                        style: { width: "100%", height: "100%", display: "block" }
                      }
                    )
                  }
                ),
                variant === "registered-no-photo" && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "absolute inset-0 flex items-center justify-center font-semibold leading-none select-none",
                    style: { color: "var(--color-text-on-brand)", fontSize: INITIALS_FONT[size] },
                    children: initials
                  }
                ),
                variant === "registered-with-photo" && src && /* @__PURE__ */ jsx(
                  "img",
                  {
                    src,
                    alt: initials,
                    className: "absolute inset-0 w-full h-full object-cover"
                  }
                ),
                variant === "registered-with-photo" && !src && /* @__PURE__ */ jsx(
                  "span",
                  {
                    className: "absolute inset-0 flex items-center justify-center font-semibold leading-none select-none",
                    style: { color: "var(--color-text-on-brand)", fontSize: INITIALS_FONT[size] },
                    children: initials
                  }
                )
              ]
            }
          ),
          showBadge && /* @__PURE__ */ jsx(
            "span",
            {
              className: "absolute z-10 flex items-center justify-center",
              style: { bottom: "-3px", right: "-3px" },
              children: badge ?? /* @__PURE__ */ jsx(
                Badge,
                {
                  appearance: "brand",
                  size: "sm",
                  style: {
                    padding: "1px 4px",
                    minWidth: "16px",
                    minHeight: "16px",
                    fontSize: "10px",
                    lineHeight: "14px",
                    borderRadius: "9999px",
                    boxSizing: "border-box"
                  },
                  children: badgeContent
                }
              )
            }
          )
        ]
      }
    )
  );
});
Avatar.displayName = "Avatar";
export {
  Avatar
};
