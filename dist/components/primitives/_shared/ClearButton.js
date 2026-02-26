import { jsx } from "react/jsx-runtime";
import React from "react";
const ClearIcon = ({ size }) => /* @__PURE__ */ jsx(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 20 20",
    fill: "none",
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx(
      "path",
      {
        d: "M6 6l8 8M14 6l-8 8",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }
    )
  }
);
const ClearButton = React.memo(
  ({
    onClick,
    size = "var(--icon-size, 20px)",
    label = "Clear",
    className = "",
    visible = true
  }) => {
    if (!visible) return null;
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: (e) => {
          e.stopPropagation();
          onClick(e);
        },
        className: [
          "shrink-0 flex items-center justify-center",
          "text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
          "transition-colors duration-150 rounded-[var(--radius-subtle)]",
          "focus-visible:shadow-[var(--effect-focus-brand)] focus-visible:outline-none",
          className
        ].join(" "),
        style: { width: size, height: size },
        "aria-label": label,
        tabIndex: -1,
        children: /* @__PURE__ */ jsx(ClearIcon, { size: "16" })
      }
    );
  }
);
ClearButton.displayName = "ClearButton";
export {
  ClearButton
};
