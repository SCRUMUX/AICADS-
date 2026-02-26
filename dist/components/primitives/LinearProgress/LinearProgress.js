import { jsx } from "react/jsx-runtime";
import React from "react";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_HEIGHT = {
  sm: "h-1",
  // 4px
  md: "h-1.5",
  // 6px
  lg: "h-2"
  // 8px
};
const LinearProgress = React.forwardRef((props, ref) => {
  const {
    size = "md",
    value = 0,
    label,
    className,
    style,
    ...rest
  } = props;
  const pct = Math.max(0, Math.min(100, value));
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      role: "progressbar",
      "aria-valuenow": pct,
      "aria-valuemin": 0,
      "aria-valuemax": 100,
      "aria-label": label ?? `Progress: ${pct}%`,
      className: cn(
        // Track: pill shape, surface-3 background, full width of container
        "relative w-full overflow-hidden rounded-full",
        SIZE_HEIGHT[size],
        "bg-[var(--color-surface-3)]",
        "transition-all duration-150",
        className
      ),
      style,
      ...rest,
      children: /* @__PURE__ */ jsx(
        "div",
        {
          className: cn(
            "absolute left-0 top-0 h-full rounded-full",
            "bg-[var(--color-brand-primary)]",
            "transition-[width] duration-300 ease-in-out"
          ),
          style: { width: `${pct}%` },
          "aria-hidden": "true"
        }
      )
    }
  );
});
LinearProgress.displayName = "LinearProgress";
export {
  LinearProgress
};
