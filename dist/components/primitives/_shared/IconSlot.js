import { jsx } from "react/jsx-runtime";
import React from "react";
const IconSlotInner = ({
  icon,
  color = "var(--icon-color, currentColor)",
  size = "var(--icon-size, 20px)",
  className = ""
}) => {
  if (!icon) return null;
  const cloned = React.isValidElement(icon) ? React.cloneElement(icon, {
    style: { width: "100%", height: "100%" }
  }) : icon;
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: `shrink-0 flex items-center justify-center [&_svg]:!w-full [&_svg]:!h-full ${className}`,
      style: { color, width: size, height: size },
      children: cloned
    }
  );
};
const IconSlot = React.memo(IconSlotInner);
export {
  IconSlot
};
