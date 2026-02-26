import { jsx, jsxs } from "react/jsx-runtime";
import React, { useRef, useState, useCallback, useEffect } from "react";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_CONFIG = {
  sm: { cellSize: "w-8 h-8", gap: "gap-[var(--space-2)]", radius: "rounded-[8px]", dotSize: "w-2 h-2", fontSize: "text-style-caption" },
  md: { cellSize: "w-10 h-10", gap: "gap-[var(--space-4)]", radius: "rounded-[10px]", dotSize: "w-2.5 h-2.5", fontSize: "text-style-body" },
  lg: { cellSize: "w-12 h-12", gap: "gap-[var(--space-6)]", radius: "rounded-[12px]", dotSize: "w-3 h-3", fontSize: "text-style-body-lg" }
};
function getCellBorderColor(state, isActive) {
  if (isActive) return "border-[var(--color-brand-primary)]";
  if (state === "error") return "border-[var(--color-danger-base)]";
  if (state === "filled") return "border-[var(--color-border-strong)]";
  if (state === "disabled") return "border-[var(--color-border-disabled)]";
  return "border-[var(--color-border-base)]";
}
function getDotColor(state) {
  if (state === "error") return "bg-[var(--color-danger-base)]";
  if (state === "filled") return "bg-[var(--color-text-muted)]";
  if (state === "disabled") return "bg-[var(--color-text-disabled)]";
  return "bg-[var(--color-border-base)]";
}
const PinCell = ({ value, index, size, state, isActive, mask, inputRef, onCellClick, onKeyDown, onInputChange, onPaste }) => {
  const { cellSize, radius, dotSize, fontSize } = SIZE_CONFIG[size];
  const isDisabled = state === "disabled";
  const hasValue = value !== "";
  const borderColor = getCellBorderColor(state, isActive);
  const dotColor = getDotColor(state);
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: cn(
        "relative inline-flex items-center justify-center shrink-0",
        "bg-[var(--color-surface-1)] border border-solid",
        "transition-colors duration-150",
        cellSize,
        radius,
        borderColor,
        isActive && "shadow-[var(--effect-focus-brand)]",
        isDisabled && "cursor-not-allowed opacity-[var(--opacity-disabled)]"
      ),
      onClick: () => !isDisabled && onCellClick(index),
      children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            ref: inputRef,
            type: mask ? "password" : "text",
            inputMode: "numeric",
            pattern: "[0-9]*",
            maxLength: 1,
            value,
            disabled: isDisabled,
            "aria-label": `PIN digit ${index + 1}`,
            className: "absolute inset-0 w-full h-full opacity-0 cursor-default",
            onChange: (e) => onInputChange(e, index),
            onKeyDown: (e) => onKeyDown(e, index),
            onPaste,
            tabIndex: isActive ? 0 : -1,
            autoComplete: "one-time-code"
          }
        ),
        hasValue && !mask && /* Цифра — отображается открытым текстом */
        /* @__PURE__ */ jsx(
          "span",
          {
            className: cn(
              "font-semibold leading-none select-none",
              fontSize,
              state === "error" ? "text-[var(--color-danger-base)]" : state === "disabled" ? "text-[var(--color-text-disabled)]" : "text-[var(--color-text-primary)]"
            ),
            children: value
          }
        ),
        hasValue && mask && /* Точка для masked mode */
        /* @__PURE__ */ jsx("span", { className: cn("rounded-full shrink-0", dotSize, dotColor) }),
        !hasValue && /* Пустая ячейка — dot placeholder (из Figma: ELLIPSE с цветом бордера) */
        (isActive ? /* @__PURE__ */ jsx("span", { className: "w-px h-4 bg-[var(--color-brand-primary)] animate-pulse" }) : /* @__PURE__ */ jsx("span", { className: cn("rounded-full shrink-0", dotSize, dotColor) }))
      ]
    }
  );
};
const PinInput = React.forwardRef((props, ref) => {
  const {
    size = "sm",
    state: stateProp = "unfilled",
    length = 6,
    value: controlledValue,
    onChange,
    onComplete,
    mask = true,
    className,
    ...rest
  } = props;
  const [internalValue, setInternalValue] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  useEffect(() => {
    if (controlledValue !== void 0) {
      const chars = controlledValue.split("").slice(0, length);
      const padded = [...chars, ...Array(length - chars.length).fill("")];
      setInternalValue(padded);
    }
  }, [controlledValue, length]);
  const values = controlledValue !== void 0 ? controlledValue.split("").slice(0, length).concat(Array(length).fill("")).slice(0, length) : internalValue;
  const computedState = stateProp !== "unfilled" ? stateProp : values.every((v) => v !== "") ? "filled" : "unfilled";
  const focusCell = useCallback((index) => {
    const el = inputRefs.current[index];
    if (el) {
      el.focus();
      setActiveIndex(index);
    }
  }, []);
  const updateValue = useCallback((newValues) => {
    if (controlledValue === void 0) setInternalValue(newValues);
    const str = newValues.join("");
    onChange?.(str);
    if (newValues.every((v) => v !== "")) onComplete?.(str);
  }, [controlledValue, onChange, onComplete]);
  const handleInputChange = useCallback((e, index) => {
    const char = e.target.value.replace(/\D/g, "").slice(-1);
    const newValues = [...values];
    newValues[index] = char;
    updateValue(newValues);
    if (char && index < length - 1) focusCell(index + 1);
  }, [values, length, updateValue, focusCell]);
  const handleKeyDown = useCallback((e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newValues = [...values];
      if (newValues[index]) {
        newValues[index] = "";
        updateValue(newValues);
      } else if (index > 0) {
        newValues[index - 1] = "";
        updateValue(newValues);
        focusCell(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      e.preventDefault();
      focusCell(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      e.preventDefault();
      focusCell(index + 1);
    }
  }, [values, length, updateValue, focusCell]);
  const handlePaste = useCallback((e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const newValues = [...Array(length).fill("")];
    pasted.split("").forEach((ch, i) => {
      newValues[i] = ch;
    });
    updateValue(newValues);
    const nextFocus = Math.min(pasted.length, length - 1);
    focusCell(nextFocus);
  }, [length, updateValue, focusCell]);
  const handleCellClick = useCallback((index) => {
    focusCell(index);
  }, [focusCell]);
  const { gap } = SIZE_CONFIG[size];
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("inline-flex flex-row items-center", gap, className),
      role: "group",
      "aria-label": "PIN input",
      onBlur: (e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setActiveIndex(-1);
      },
      ...rest,
      children: Array.from({ length }).map((_, i) => /* @__PURE__ */ jsx(
        PinCell,
        {
          index: i,
          value: values[i] ?? "",
          size,
          state: computedState,
          isActive: activeIndex === i,
          mask,
          inputRef: { current: inputRefs.current[i] },
          onCellClick: handleCellClick,
          onKeyDown: handleKeyDown,
          onInputChange: handleInputChange,
          onPaste: handlePaste
        },
        i
      ))
    }
  );
});
PinInput.displayName = "PinInput";
export {
  PinInput
};
