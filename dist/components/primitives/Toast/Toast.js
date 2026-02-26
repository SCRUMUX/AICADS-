import { jsx, jsxs } from "react/jsx-runtime";
import React, { useEffect, useCallback, useRef, useState } from "react";
import { cn } from "../_shared";
import ReactDOM from "react-dom";
const APPEARANCE_CLASSES = {
  info: "bg-[var(--color-info-bg)] border-[var(--color-info-base)] text-[var(--color-info-text)]",
  success: "bg-[var(--color-success-bg)] border-[var(--color-success-base)] text-[var(--color-success-text)]",
  warning: "bg-[var(--color-warning-bg)] border-[var(--color-warning-base)] text-[var(--color-warning-text)]",
  danger: "bg-[var(--color-danger-bg)] border-[var(--color-danger-base)] text-[var(--color-danger-text)]"
};
const ICON_COLORS = {
  info: "var(--color-info-base)",
  success: "var(--color-success-base)",
  warning: "var(--color-warning-base)",
  danger: "var(--color-danger-base)"
};
const CloseIcon = () => /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M4 4l8 8M12 4l-8 8", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
const Toast = React.forwardRef((props, ref) => {
  const {
    appearance = "info",
    title,
    description,
    icon,
    showClose = true,
    onClose,
    duration = 5e3,
    open = true,
    className,
    ...rest
  } = props;
  const timerRef = useRef();
  const startTimer = useCallback(() => {
    if (duration > 0 && onClose) {
      timerRef.current = setTimeout(onClose, duration);
    }
  }, [duration, onClose]);
  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);
  useEffect(() => {
    if (open) startTimer();
    return clearTimer;
  }, [open, startTimer, clearTimer]);
  if (!open) return null;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      role: "alert",
      "aria-live": "assertive",
      className: cn(
        "flex items-start gap-[var(--space-8)] p-[var(--space-12)]",
        "border border-solid rounded-[var(--radius-default)]",
        "shadow-elevation-2 min-w-[280px] max-w-[420px]",
        "transition-all duration-200",
        APPEARANCE_CLASSES[appearance],
        className
      ),
      onMouseEnter: clearTimer,
      onMouseLeave: startTimer,
      ...rest,
      children: [
        icon && /* @__PURE__ */ jsx(
          "span",
          {
            className: "shrink-0 flex items-center justify-center mt-[2px]",
            style: { width: 20, height: 20, color: ICON_COLORS[appearance] },
            "aria-hidden": "true",
            children: icon
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex flex-col gap-[var(--space-2)]", children: [
          title && /* @__PURE__ */ jsx("span", { className: "text-style-caption font-semibold leading-tight", children: title }),
          description && /* @__PURE__ */ jsx("span", { className: "text-style-body-sm opacity-80 leading-snug", children: description })
        ] }),
        showClose && onClose && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "shrink-0 flex items-center justify-center rounded opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-0 p-0",
            style: { width: 20, height: 20, color: "currentColor" },
            "aria-label": "Close notification",
            children: /* @__PURE__ */ jsx(CloseIcon, {})
          }
        )
      ]
    }
  );
});
Toast.displayName = "Toast";
const POSITION_CLASSES = {
  "top-right": "top-[var(--space-16)] right-[var(--space-16)] items-end",
  "top-center": "top-[var(--space-16)] left-1/2 -translate-x-1/2 items-center",
  "top-left": "top-[var(--space-16)] left-[var(--space-16)] items-start",
  "bottom-right": "bottom-[var(--space-16)] right-[var(--space-16)] items-end",
  "bottom-center": "bottom-[var(--space-16)] left-1/2 -translate-x-1/2 items-center",
  "bottom-left": "bottom-[var(--space-16)] left-[var(--space-16)] items-start"
};
let toastIdCounter = 0;
let globalAddToast = null;
function toast(config) {
  globalAddToast?.(config);
}
const Toaster = ({
  position = "top-right",
  maxVisible = 5
}) => {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((config) => {
    const id = `toast-${++toastIdCounter}`;
    setToasts((prev) => [...prev, { ...config, id }].slice(-maxVisible));
  }, [maxVisible]);
  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);
  useEffect(() => {
    globalAddToast = addToast;
    return () => {
      globalAddToast = null;
    };
  }, [addToast]);
  if (typeof document === "undefined") return null;
  return ReactDOM.createPortal(
    /* @__PURE__ */ jsx(
      "div",
      {
        className: cn(
          "fixed z-[var(--z-toast)] flex flex-col gap-[var(--space-8)] pointer-events-none",
          POSITION_CLASSES[position]
        ),
        "aria-label": "Notifications",
        children: toasts.map((t) => /* @__PURE__ */ jsx("div", { className: "pointer-events-auto", children: /* @__PURE__ */ jsx(
          Toast,
          {
            appearance: t.appearance,
            title: t.title,
            description: t.description,
            icon: t.icon,
            showClose: t.showClose,
            duration: t.duration,
            onClose: () => removeToast(t.id)
          }
        ) }, t.id))
      }
    ),
    document.body
  );
};
Toaster.displayName = "Toaster";
export {
  Toast,
  Toaster,
  toast
};
