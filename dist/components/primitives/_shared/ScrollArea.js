import { jsx } from "react/jsx-runtime";
import React from "react";
import { cn } from "./utils";
const ScrollArea = React.forwardRef(
  ({ maxHeight, className, style, children, ...rest }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("scroll-area", className),
      style: { maxHeight, ...style },
      ...rest,
      children
    }
  )
);
ScrollArea.displayName = "ScrollArea";
export {
  ScrollArea
};
