import { jsx } from "react/jsx-runtime";
import React from "react";
import { cn } from "../_shared";
const SIZE_CLASSES = {
  sm: "text-style-caption",
  md: "text-style-body",
  lg: "text-style-body-lg"
};
const BREAKPOINT_WIDTH = {
  "mobile": "w-[var(--space-paragraph-max-mobile)]",
  "tablet": "w-[var(--space-paragraph-max-tablet)]",
  "desktop-sm": "w-[var(--space-paragraph-max-desktop-sm)]",
  "desktop-lg": "w-[var(--space-paragraph-max-desktop-lg)]"
};
const ALIGN_CLASSES = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
  justify: "text-justify"
};
const ParagraphInner = React.forwardRef((props, ref) => {
  const {
    size = "md",
    breakpoint,
    align = "left",
    color,
    children,
    className,
    style,
    ...rest
  } = props;
  return /* @__PURE__ */ jsx(
    "p",
    {
      ref,
      className: cn(
        "font-normal box-border",
        SIZE_CLASSES[size],
        breakpoint ? BREAKPOINT_WIDTH[breakpoint] : "w-full",
        ALIGN_CLASSES[align] ?? "text-left",
        className
      ),
      style: {
        color: color ?? "var(--color-text-primary)",
        ...style
      },
      ...rest,
      children
    }
  );
});
ParagraphInner.displayName = "Paragraph";
const Paragraph = React.memo(ParagraphInner);
export {
  Paragraph
};
