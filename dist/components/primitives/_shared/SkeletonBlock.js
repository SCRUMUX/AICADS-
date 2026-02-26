import { jsx } from "react/jsx-runtime";
import React from "react";
const SkeletonBlockInner = React.forwardRef(({
  shimmer = true,
  width,
  height,
  radius = 2,
  className,
  style
}, ref) => {
  const isCircle = radius === 9999 || radius === "9999";
  const borderRadius = isCircle ? "9999px" : typeof radius === "number" ? radius : radius;
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: [
        // position: relative + overflow: hidden — обрезает движущийся градиент
        "relative overflow-hidden",
        "bg-[var(--color-surface-3)]",
        isCircle ? "rounded-full" : "",
        className ?? ""
      ].filter(Boolean).join(" "),
      style: {
        width,
        height,
        borderRadius,
        flexShrink: 0,
        ...style
      },
      "aria-hidden": "true",
      children: shimmer && /* @__PURE__ */ jsx(
        "div",
        {
          className: "animate-shimmer absolute inset-0",
          style: {
            background: "linear-gradient(90deg, transparent 0%, var(--color-surface-2) 50%, transparent 100%)"
          }
        }
      )
    }
  );
});
SkeletonBlockInner.displayName = "SkeletonBlock";
const SkeletonBlock = React.memo(SkeletonBlockInner);
export {
  SkeletonBlock
};
