import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useCallback, useId, useEffect } from "react";
import ReactDOM from "react-dom";
import { cn } from "../_shared";
const APPEARANCE = {
  base: { bubbleBg: "var(--color-tooltip-bg)", textColor: "var(--color-tooltip-text)" },
  success: { bubbleBg: "var(--color-success-base)", textColor: "var(--color-text-on-brand)" },
  warning: { bubbleBg: "var(--color-warning-base)", textColor: "var(--color-text-primary)" },
  danger: { bubbleBg: "var(--color-danger-base)", textColor: "var(--color-text-on-brand)" }
};
const Arrow = ({ position, color }) => {
  if (position === "top") {
    return /* @__PURE__ */ jsx("svg", { width: 12, height: 6, viewBox: "0 0 12 6", style: { display: "block", flexShrink: 0 }, "aria-hidden": "true", children: /* @__PURE__ */ jsx("polygon", { points: "0,0 12,0 6,6", fill: color }) });
  }
  if (position === "bottom") {
    return /* @__PURE__ */ jsx("svg", { width: 12, height: 6, viewBox: "0 0 12 6", style: { display: "block", flexShrink: 0 }, "aria-hidden": "true", children: /* @__PURE__ */ jsx("polygon", { points: "0,6 12,6 6,0", fill: color }) });
  }
  if (position === "left") {
    return /* @__PURE__ */ jsx("svg", { width: 6, height: 12, viewBox: "0 0 6 12", style: { display: "block", flexShrink: 0 }, "aria-hidden": "true", children: /* @__PURE__ */ jsx("polygon", { points: "0,0 0,12 6,6", fill: color }) });
  }
  return /* @__PURE__ */ jsx("svg", { width: 6, height: 12, viewBox: "0 0 6 12", style: { display: "block", flexShrink: 0 }, "aria-hidden": "true", children: /* @__PURE__ */ jsx("polygon", { points: "6,0 6,12 0,6", fill: color }) });
};
const TooltipBubble = ({
  content,
  position = "top",
  appearance = "base",
  className,
  style
}) => {
  const { bubbleBg, textColor } = APPEARANCE[appearance];
  const isVertical = position === "top" || position === "bottom";
  const bubble = /* @__PURE__ */ jsx(
    "div",
    {
      className: "inline-flex items-center justify-center px-[var(--space-8)] py-[var(--space-6)] rounded-[var(--radius-medium)] text-style-caption whitespace-nowrap",
      style: {
        backgroundColor: bubbleBg,
        color: textColor
      },
      children: content
    }
  );
  const arrow = /* @__PURE__ */ jsx(Arrow, { position, color: bubbleBg });
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn("inline-flex animate-tooltip-in", isVertical ? "flex-col items-center" : "flex-row items-center", className),
      style,
      children: position === "top" || position === "left" ? /* @__PURE__ */ jsxs(Fragment, { children: [
        bubble,
        arrow
      ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
        arrow,
        bubble
      ] })
    }
  );
};
const Tooltip = ({
  content,
  position = "top",
  appearance = "base",
  children,
  delayMs = 0,
  className
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);
  const triggerRef = useRef(null);
  const tooltipId = useId();
  const [coords, setCoords] = useState({});
  const GAP = 6;
  const computePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    switch (position) {
      case "top":
        setCoords({ top: rect.top + scrollY - GAP, left: rect.left + scrollX + rect.width / 2, transform: "translate(-50%, -100%)" });
        break;
      case "bottom":
        setCoords({ top: rect.bottom + scrollY + GAP, left: rect.left + scrollX + rect.width / 2, transform: "translateX(-50%)" });
        break;
      case "left":
        setCoords({ top: rect.top + scrollY + rect.height / 2, left: rect.left + scrollX - GAP, transform: "translate(-100%, -50%)" });
        break;
      case "right":
        setCoords({ top: rect.top + scrollY + rect.height / 2, left: rect.right + scrollX + GAP, transform: "translateY(-50%)" });
        break;
    }
  }, [position]);
  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      computePosition();
      setVisible(true);
    }, delayMs);
  }, [delayMs, computePosition]);
  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  const bubble = visible ? ReactDOM.createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        id: tooltipId,
        role: "tooltip",
        style: {
          position: "absolute",
          zIndex: "var(--z-tooltip)",
          pointerEvents: "none",
          ...coords
        },
        children: /* @__PURE__ */ jsx(TooltipBubble, { content, position, appearance })
      }
    ),
    document.body
  ) : null;
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        ref: triggerRef,
        className: cn("inline-flex items-center justify-center", className),
        onMouseEnter: show,
        onMouseLeave: hide,
        onFocus: show,
        onBlur: hide,
        children: React.isValidElement(children) ? React.cloneElement(children, {
          "aria-describedby": visible ? tooltipId : void 0
        }) : children
      }
    ),
    bubble
  ] });
};
Tooltip.displayName = "Tooltip";
TooltipBubble.displayName = "TooltipBubble";
export {
  Tooltip,
  TooltipBubble
};
