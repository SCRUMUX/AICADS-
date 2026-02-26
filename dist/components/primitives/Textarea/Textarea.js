import { jsx, jsxs } from "react/jsx-runtime";
import React, { useState, useCallback, useId } from "react";
import { cn } from "../_shared";
import { useControllableState } from "../../../hooks/useControllableState";
const SIZE_CONFIG = {
  sm: { padding: "px-3 py-[6px]", minHeight: "min-h-[64px]", textStyle: "text-style-caption", fontWeight: "font-medium" },
  md: { padding: "px-4 py-2", minHeight: "min-h-[96px]", textStyle: "text-style-body", fontWeight: "font-normal" },
  lg: { padding: "px-5 py-[10px]", minHeight: "min-h-[120px]", textStyle: "text-style-body-lg", fontWeight: "font-medium" }
};
const RESIZE_CLASS = {
  none: "resize-none",
  vertical: "resize-y",
  horizontal: "resize-x",
  both: "resize"
};
function getVisualStyle(state, invalid) {
  if (invalid) {
    return {
      bg: state === "focus" || state === "hover" ? "bg-[var(--color-surface-3)]" : "bg-[var(--color-surface-2)]",
      border: "border-[var(--color-danger-base)]",
      focus: state === "focus",
      opacity: false
    };
  }
  switch (state) {
    case "hover":
      return { bg: "bg-[var(--color-surface-3)]", border: "border-[var(--color-border-strong)]", focus: false, opacity: false };
    case "focus":
      return { bg: "bg-[var(--color-surface-3)]", border: "border-[var(--color-border-strong)]", focus: true, opacity: false };
    case "disabled":
      return { bg: "bg-[var(--color-surface-2)]", border: "border-[var(--color-border-base)]", focus: false, opacity: true };
    default:
      return { bg: "bg-[var(--color-surface-2)]", border: "border-[var(--color-border-base)]", focus: false, opacity: false };
  }
}
const ResizerIcon = () => /* @__PURE__ */ jsx("svg", { width: "16", height: "16", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", className: "shrink-0", children: /* @__PURE__ */ jsx("path", { d: "M13 10L10 13M13 6L6 13", stroke: "var(--color-border-strong)", strokeWidth: "1.5", strokeLinecap: "round" }) });
const Textarea = React.forwardRef((props, ref) => {
  const {
    size = "md",
    state: stateProp,
    value: controlledValue,
    defaultValue = "",
    placeholder = "Enter text...",
    disabled = false,
    readOnly = false,
    required = false,
    name,
    id: idProp,
    maxLength,
    minLength,
    rows,
    invalid = false,
    resize = "vertical",
    showCharCount = false,
    "aria-describedby": ariaDescribedBy,
    "aria-label": ariaLabel,
    onChange,
    textareaProps,
    className,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  } = props;
  const generatedId = useId();
  const textareaId = idProp ?? generatedId;
  const [internalState, setInternalState] = useState("base");
  const [value, setValue] = useControllableState({
    value: controlledValue,
    defaultValue,
    onChange: void 0
  });
  const effectiveState = (() => {
    if (stateProp) return stateProp;
    if (disabled) return "disabled";
    return internalState;
  })();
  const { padding, minHeight, textStyle, fontWeight } = SIZE_CONFIG[size];
  const { bg, border, focus, opacity } = getVisualStyle(effectiveState, invalid);
  const handleChange = useCallback(
    (e) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [setValue, onChange]
  );
  const he = useCallback(
    (e) => {
      if (!disabled && internalState !== "focus") setInternalState("hover");
      onMouseEnter?.(e);
    },
    [disabled, internalState, onMouseEnter]
  );
  const hl = useCallback(
    (e) => {
      if (!disabled && internalState !== "focus") setInternalState("base");
      onMouseLeave?.(e);
    },
    [disabled, internalState, onMouseLeave]
  );
  const hf = useCallback(
    (e) => {
      if (!disabled) setInternalState("focus");
      onFocus?.(e);
    },
    [disabled, onFocus]
  );
  const hb = useCallback(
    (e) => {
      setInternalState("base");
      onBlur?.(e);
    },
    [onBlur]
  );
  const charCount = value.length;
  const isOverLimit = maxLength !== void 0 && charCount > maxLength;
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "relative flex flex-col w-full",
        "rounded-[var(--radius-default)] border border-solid",
        "transition-colors duration-150",
        bg,
        border,
        focus && (invalid ? "shadow-[var(--effect-focus-danger)]" : "shadow-[var(--effect-focus-brand)]"),
        opacity && "opacity-[var(--opacity-disabled)]",
        disabled ? "cursor-not-allowed" : "cursor-text",
        className
      ),
      "data-state": effectiveState,
      "data-invalid": invalid || void 0,
      onMouseEnter: he,
      onMouseLeave: hl,
      onFocus: hf,
      onBlur: hb,
      ...rest,
      children: [
        /* @__PURE__ */ jsx("div", { className: cn("flex-1 w-full", padding), children: /* @__PURE__ */ jsx(
          "textarea",
          {
            id: textareaId,
            name,
            value,
            placeholder,
            disabled,
            readOnly,
            required,
            maxLength,
            minLength,
            rows,
            onChange: handleChange,
            "aria-invalid": invalid || void 0,
            "aria-describedby": ariaDescribedBy,
            "aria-label": ariaLabel,
            "aria-required": required || void 0,
            className: cn(
              "w-full bg-transparent outline-none",
              RESIZE_CLASS[resize],
              "[&::-webkit-resizer]:!appearance-none [&::-webkit-resizer]:!bg-transparent",
              "text-[var(--color-text-primary)]",
              "placeholder:text-[var(--color-text-muted)]",
              textStyle,
              fontWeight,
              minHeight,
              disabled ? "cursor-not-allowed" : "cursor-text"
            ),
            ...textareaProps
          }
        ) }),
        showCharCount && /* @__PURE__ */ jsx("div", { className: "flex items-center px-2 pb-1", children: /* @__PURE__ */ jsxs("span", { className: cn("text-[10px] leading-3", isOverLimit ? "text-[var(--color-danger-base)]" : "text-[var(--color-text-muted)]"), children: [
          charCount,
          maxLength !== void 0 ? `/${maxLength}` : ""
        ] }) }),
        resize !== "none" && /* @__PURE__ */ jsx("div", { className: "absolute bottom-[2px] right-[2px] pointer-events-none", children: /* @__PURE__ */ jsx(ResizerIcon, {}) })
      ]
    }
  );
});
Textarea.displayName = "Textarea";
export {
  Textarea
};
