import { jsx } from "react/jsx-runtime";
import React from "react";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const THICKNESS = {
  sm: 4,
  md: 6,
  lg: 8
};
const COLOR = {
  base: "var(--color-border-base)",
  strong: "var(--color-border-strong)"
};
const DividerInner = React.forwardRef(({
  orientation = "horizontal",
  size = "sm",
  appearance = "base",
  length,
  className,
  style
}, ref) => {
  const thickness = THICKNESS[size];
  const color = COLOR[appearance];
  const isHorizontal = orientation === "horizontal";
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "separator",
      "aria-orientation": orientation,
      className: cn(
        "shrink-0 rounded-[2px]",
        isHorizontal ? "w-full" : "h-full",
        className
      ),
      style: {
        backgroundColor: color,
        ...isHorizontal ? { height: thickness, width: length } : { width: thickness, height: length },
        ...style
      }
    }
  );
});
DividerInner.displayName = "Divider";
const Divider = React.memo(DividerInner);
export {
  Divider
};
