import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { SectionHeader } from "../SectionHeader/SectionHeader";
import { ChevronRightIcon } from "../../icons";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const Separator = () => /* @__PURE__ */ jsx(
  "span",
  {
    className: "shrink-0 flex items-center justify-center text-[var(--color-text-muted)]",
    style: { width: 12, height: 12 },
    "aria-hidden": "true",
    children: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "100%", height: "100%" } })
  }
);
const DEFAULT_LABELS = {
  "1": ["Section"],
  "2": ["Section", "Subsection"],
  "3": ["Section", "Subsection", "Category"],
  "4": ["Section", "Subsection", "Category", "Current page"]
};
const Breadcrumb = React.forwardRef((props, ref) => {
  const {
    levels = "1",
    items,
    size = "sm",
    className,
    ...rest
  } = props;
  const resolvedItems = items ?? DEFAULT_LABELS[levels].map(
    (label, i, arr) => ({ label, href: i < arr.length - 1 ? "#" : void 0 })
  );
  return /* @__PURE__ */ jsx(
    "nav",
    {
      ref,
      "aria-label": "breadcrumb",
      className: cn(
        "inline-flex flex-row items-center flex-wrap",
        "px-[var(--space-4)] py-[var(--space-2)] gap-[var(--space-4)]",
        className
      ),
      ...rest,
      children: resolvedItems.map((item, index) => {
        const isLast = index === resolvedItems.length - 1;
        const appearance = isLast ? "base" : "base";
        return /* @__PURE__ */ jsxs(React.Fragment, { children: [
          index > 0 && /* @__PURE__ */ jsx(Separator, {}),
          item.href && !isLast ? /* @__PURE__ */ jsx(
            "a",
            {
              href: item.href,
              onClick: item.onClick,
              className: "no-underline hover:opacity-75 transition-opacity",
              "aria-current": void 0,
              children: /* @__PURE__ */ jsx(
                SectionHeader,
                {
                  size,
                  appearance,
                  showLeftIcon: !!item.iconLeft,
                  iconLeft: item.iconLeft,
                  showBadge: !!item.badge,
                  badge: item.badge,
                  showRightIcon: !!item.iconRight,
                  iconRight: item.iconRight,
                  className: "cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]",
                  style: { padding: 0 },
                  children: item.label
                }
              )
            }
          ) : /* @__PURE__ */ jsx(
            SectionHeader,
            {
              size,
              appearance,
              showLeftIcon: !!item.iconLeft,
              iconLeft: item.iconLeft,
              showBadge: !!item.badge,
              badge: item.badge,
              showRightIcon: !!item.iconRight,
              iconRight: item.iconRight,
              style: { padding: 0 },
              "aria-current": isLast ? "page" : void 0,
              children: item.label
            }
          )
        ] }, index);
      })
    }
  );
});
Breadcrumb.displayName = "Breadcrumb";
export {
  Breadcrumb
};
