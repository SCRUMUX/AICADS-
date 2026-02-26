import { jsx, jsxs } from "react/jsx-runtime";
import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Button } from "../Button/Button";
import { cn } from "../_shared";
import { useFocusTrap } from "../../../hooks/useFocusTrap";
import { useEscapeKey } from "../../../hooks/useEscapeKey";
const VARIANT_STYLES = {
  base: { panelBg: "bg-[var(--color-surface-1)]", panelBorder: "border-[var(--color-border-base)]", overlayOpacity: "" },
  danger: { panelBg: "bg-[var(--color-danger-surface)]", panelBorder: "border-[var(--color-danger-base)]", overlayOpacity: "" },
  warning: { panelBg: "bg-[var(--color-warning-surface)]", panelBorder: "border-[var(--color-warning-base)]", overlayOpacity: "" },
  success: { panelBg: "bg-[var(--color-success-surface)]", panelBorder: "border-[var(--color-success-base)]", overlayOpacity: "" }
};
const CONFIRM_APPEARANCE = {
  base: "brand",
  danger: "danger",
  warning: "warning",
  success: "success"
};
const SIZE_CLASSES = {
  sm: "w-[400px]",
  md: "w-[480px]",
  lg: "w-[600px]"
};
const CloseIcon = () => /* @__PURE__ */ jsx("svg", { width: 20, height: 20, viewBox: "0 0 20 20", fill: "none", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M5 5l10 10M15 5L5 15", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }) });
const Modal = React.forwardRef((props, ref) => {
  const {
    variant = "base",
    size = "md",
    showClose = true,
    showFooter = true,
    title = "Modal title",
    content = "Modal content.",
    cancelLabel = "Cancel",
    confirmLabel = "Confirm",
    onClose,
    onConfirm,
    onCancel,
    cancelButton,
    confirmButton,
    open = true,
    portal = true,
    confirmLoading = false,
    className,
    style
  } = props;
  const panelRef = useRef(null);
  const handleCancel = useCallback(() => {
    onCancel?.();
    onClose?.();
  }, [onCancel, onClose]);
  useEscapeKey(() => onClose?.(), open);
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
  useFocusTrap(panelRef, open);
  if (!open) return null;
  const { panelBg, panelBorder, overlayOpacity } = VARIANT_STYLES[variant];
  const confirmAppearance = CONFIRM_APPEARANCE[variant];
  const modalContent = /* @__PURE__ */ jsxs(
    "div",
    {
      className: "fixed inset-0 z-modal flex items-center justify-center p-4",
      role: "dialog",
      "aria-modal": "true",
      "aria-labelledby": "modal-title",
      children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            className: cn("absolute inset-0 animate-fade-in", overlayOpacity),
            style: { backgroundColor: variant === "danger" || variant === "warning" ? "var(--effect-scrim-strong)" : "var(--effect-scrim-light)" },
            onClick: onClose,
            "aria-hidden": "true"
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            ref: (node) => {
              panelRef.current = node;
              if (typeof ref === "function") ref(node);
              else if (ref) ref.current = node;
            },
            className: cn(
              "relative flex flex-col gap-6 animate-modal-in",
              SIZE_CLASSES[size],
              "max-w-[calc(100vw-32px)]",
              "p-[var(--space-12)]",
              "rounded-[var(--radius-medium)]",
              "border border-solid",
              panelBg,
              panelBorder,
              "shadow-elevation-2",
              className
            ),
            style,
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-between gap-[var(--space-8)]", children: [
                /* @__PURE__ */ jsx(
                  "span",
                  {
                    id: "modal-title",
                    className: "flex-1 min-w-0 text-style-body font-semibold text-[var(--color-text-primary)]",
                    children: title
                  }
                ),
                showClose && /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    className: cn(
                      "shrink-0 flex items-center justify-center w-[var(--space-20)] h-[var(--space-20)]",
                      "text-[var(--color-icon-muted)]",
                      "hover:text-[var(--color-text-primary)] transition-colors duration-150",
                      "rounded focus-visible:shadow-[var(--effect-focus-brand)] focus-visible:outline-none"
                    ),
                    "aria-label": "Close dialog",
                    children: /* @__PURE__ */ jsx(CloseIcon, {})
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-style-caption text-[var(--color-text-primary)] overflow-y-auto max-h-[60vh]", children: content }),
              showFooter && /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-[var(--space-4)]", children: [
                cancelButton ?? /* @__PURE__ */ jsx(Button, { appearance: "ghost", size: "sm", onClick: handleCancel, children: cancelLabel }),
                confirmButton ?? /* @__PURE__ */ jsx(
                  Button,
                  {
                    appearance: confirmAppearance,
                    size: "sm",
                    onClick: onConfirm,
                    loading: confirmLoading,
                    children: confirmLabel
                  }
                )
              ] })
            ]
          }
        )
      ]
    }
  );
  if (portal && typeof document !== "undefined") {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
});
Modal.displayName = "Modal";
export {
  Modal
};
