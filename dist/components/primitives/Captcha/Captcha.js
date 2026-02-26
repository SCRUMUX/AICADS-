import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { cn } from "../_shared";
import { Spinner } from "../Spinner/Spinner";
const STATE_STYLES = {
  idle: {
    bg: "bg-[var(--color-surface-2)]",
    border: "border-[var(--color-border-base)]",
    textColor: "text-[var(--color-text-muted)]"
  },
  loading: {
    bg: "bg-[var(--color-surface-2)]",
    border: "border-[var(--color-border-base)]",
    textColor: "text-[var(--color-text-muted)]"
  },
  success: {
    bg: "bg-[var(--color-success-surface)]",
    border: "border-[var(--color-success-base)]",
    textColor: "text-[var(--color-success-base)]"
  },
  error: {
    bg: "bg-[var(--color-danger-surface)]",
    border: "border-[var(--color-danger-base)]",
    textColor: "text-[var(--color-danger-base)]"
  }
};
const CheckIcon = () => /* @__PURE__ */ jsx("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", className: "shrink-0", "aria-hidden": "true", children: /* @__PURE__ */ jsx("path", { d: "M3 8l3.5 3.5L13 5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) });
const AlertIcon = () => /* @__PURE__ */ jsxs("svg", { width: 16, height: 16, viewBox: "0 0 16 16", fill: "none", className: "shrink-0", "aria-hidden": "true", children: [
  /* @__PURE__ */ jsx("circle", { cx: "8", cy: "8", r: "7", stroke: "currentColor", strokeWidth: "1.5" }),
  /* @__PURE__ */ jsx("path", { d: "M8 5v3.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }),
  /* @__PURE__ */ jsx("circle", { cx: "8", cy: "11.5", r: "0.75", fill: "currentColor" })
] });
const CaptchaCheckbox = () => /* @__PURE__ */ jsx(
  "span",
  {
    className: "shrink-0 w-6 h-6 rounded border-2 border-[var(--color-border-strong)] bg-[var(--color-surface-1)] flex items-center justify-center",
    "aria-hidden": "true"
  }
);
const Captcha = React.forwardRef((props, ref) => {
  const {
    state = "idle",
    placeholder = "Captcha",
    onVerify,
    onExpire,
    className,
    style,
    ...rest
  } = props;
  const { bg, border, textColor } = STATE_STYLES[state];
  const iconNode = (() => {
    switch (state) {
      case "loading":
        return /* @__PURE__ */ jsx(Spinner, { size: "xs", appearance: "inherit" });
      case "success":
        return /* @__PURE__ */ jsx(CheckIcon, {});
      case "error":
        return /* @__PURE__ */ jsx(AlertIcon, {});
      default:
        return /* @__PURE__ */ jsx(CaptchaCheckbox, {});
    }
  })();
  const statusLabel = (() => {
    switch (state) {
      case "loading":
        return "Verifying\u2026";
      case "success":
        return "Verified";
      case "error":
        return "Verification failed";
      default:
        return placeholder;
    }
  })();
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      role: "group",
      "aria-label": "CAPTCHA verification",
      className: cn(
        // Figma: 160×72, padding L16/T12/R16/B12, border-radius 4px, border 1px
        "flex flex-row items-center justify-center gap-2",
        "px-4 py-3",
        // L16/R16 T12/B12
        "w-[var(--space-160)] h-[var(--space-72)]",
        "rounded-[var(--radius-medium)]",
        "border border-solid",
        "transition-colors duration-200",
        bg,
        border,
        className
      ),
      style,
      ...rest,
      children: [
        /* @__PURE__ */ jsx("span", { className: cn("flex items-center justify-center", textColor), children: iconNode }),
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "text-style-caption select-none",
              textColor
            ),
            children: statusLabel
          }
        )
      ]
    }
  );
});
Captcha.displayName = "Captcha";
export {
  Captcha
};
