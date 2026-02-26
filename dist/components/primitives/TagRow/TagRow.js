import { jsx } from "react/jsx-runtime";
import React from "react";
import { cn, findClasses, getFocusRing } from "../_shared";
import contract from "../../../contracts/components/TagRow.contract.json";
const rules = contract.variantRules || [];
const TagRow = React.forwardRef((props, ref) => {
  const {
    children,
    className,
    ...rest
  } = props;
  const vc = findClasses(rules, {});
  const focusRing = getFocusRing(contract);
  return /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn(
        "transition-colors duration-150 font-base box-border",
        ...vc,
        focusRing,
        className
      ),
      ...rest,
      children
    }
  );
});
TagRow.displayName = "TagRow";
export {
  TagRow
};
