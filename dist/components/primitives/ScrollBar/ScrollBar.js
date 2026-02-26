import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_CONFIG = {
  sm: { trackThickness: 4, thumbSize: 12, arrowContainer: 14 },
  md: { trackThickness: 6, thumbSize: 16, arrowContainer: 14 },
  lg: { trackThickness: 8, thumbSize: 20, arrowContainer: 14 }
};
const ArrowIcon = ({ direction, size }) => {
  const rotate = { left: 0, right: 180, up: 90, down: 270 }[direction];
  return /* @__PURE__ */ jsx(
    "svg",
    {
      width: size,
      height: size,
      viewBox: "0 0 14 14",
      fill: "none",
      "aria-hidden": "true",
      style: { transform: `rotate(${rotate}deg)`, flexShrink: 0 },
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M9 3L5 7L9 11",
          stroke: "var(--color-surface-3)",
          strokeWidth: "1.5",
          strokeLinecap: "round",
          strokeLinejoin: "round"
        }
      )
    }
  );
};
const ScrollBarInner = React.forwardRef(({
  orientation = "horizontal",
  size = "sm",
  shape = "circle",
  value = 33,
  onChange,
  trackLength = 120,
  showArrows = true,
  className,
  style
}, ref) => {
  const { trackThickness, thumbSize, arrowContainer } = SIZE_CONFIG[size];
  const isHorizontal = orientation === "horizontal";
  const pos = Math.max(0, Math.min(100, value));
  const trackW = isHorizontal ? trackLength : thumbSize;
  const trackH = isHorizontal ? thumbSize : trackLength;
  const trackBgStyle = isHorizontal ? {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    height: trackThickness,
    borderRadius: trackThickness / 2,
    backgroundColor: "var(--color-surface-3)"
  } : {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "50%",
    transform: "translateX(-50%)",
    width: trackThickness,
    borderRadius: trackThickness / 2,
    backgroundColor: "var(--color-surface-3)"
  };
  const travel = Math.max(0, trackLength - thumbSize);
  const thumbOffset = pos / 100 * travel;
  const thumbStyle = shape === "circle" ? {
    position: "absolute",
    width: thumbSize,
    height: thumbSize,
    borderRadius: "50%",
    backgroundColor: "var(--color-surface-1)",
    border: "1px solid var(--color-border-strong)",
    boxSizing: "border-box",
    cursor: "pointer",
    flexShrink: 0,
    ...isHorizontal ? { left: thumbOffset, top: "50%", transform: "translateY(-50%)" } : { top: thumbOffset, left: "50%", transform: "translateX(-50%)" }
  } : {
    position: "absolute",
    borderRadius: 6,
    backgroundColor: "var(--color-surface-1)",
    border: "1px solid var(--color-border-strong)",
    boxSizing: "border-box",
    cursor: "pointer",
    flexShrink: 0,
    ...isHorizontal ? {
      width: Math.round(trackLength * 0.38),
      // ~38% of track length for rect thumb
      height: thumbSize,
      left: thumbOffset,
      top: "50%",
      transform: "translateY(-50%)"
    } : {
      height: Math.round(trackLength * 0.38),
      width: thumbSize,
      top: thumbOffset,
      left: "50%",
      transform: "translateX(-50%)"
    }
  };
  const containerStyle = {
    display: "inline-flex",
    flexDirection: isHorizontal ? "row" : "column",
    alignItems: "center",
    gap: 4,
    ...style
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn("select-none", className),
      style: containerStyle,
      role: "scrollbar",
      "aria-orientation": orientation,
      "aria-valuenow": pos,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      children: [
        showArrows && /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              width: arrowContainer,
              height: arrowContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer"
            },
            children: /* @__PURE__ */ jsx(
              ArrowIcon,
              {
                direction: isHorizontal ? "left" : "up",
                size: arrowContainer
              }
            )
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            style: {
              position: "relative",
              width: trackW,
              height: trackH,
              flexShrink: 0
            },
            children: [
              /* @__PURE__ */ jsx("div", { style: trackBgStyle, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("div", { style: thumbStyle })
            ]
          }
        ),
        showArrows && /* @__PURE__ */ jsx(
          "div",
          {
            style: {
              width: arrowContainer,
              height: arrowContainer,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              cursor: "pointer"
            },
            children: /* @__PURE__ */ jsx(
              ArrowIcon,
              {
                direction: isHorizontal ? "right" : "down",
                size: arrowContainer
              }
            )
          }
        )
      ]
    }
  );
});
ScrollBarInner.displayName = "ScrollBar";
const ScrollBar = React.memo(ScrollBarInner);
export {
  ScrollBar
};
