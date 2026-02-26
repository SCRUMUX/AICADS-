import { jsx } from "react/jsx-runtime";
import React from "react";
import { cn } from "../_shared";
const MAX_WIDTH_CLASSES = {
  mobile: "max-w-[767px]",
  tablet: "max-w-[1439px]",
  desktop: "max-w-[1440px]",
  full: ""
};
const GridContainer = React.forwardRef(
  (props, ref) => {
    const {
      maxWidth = "desktop",
      centered = true,
      columns,
      as: Tag = "div",
      className,
      style,
      children,
      ...rest
    } = props;
    const customCols = columns ? {
      "--gc-mobile-cols": columns.mobile ?? 4,
      "--gc-tablet-cols": columns.tablet ?? 8,
      "--gc-desktop-cols": columns.desktop ?? 12
    } : void 0;
    return /* @__PURE__ */ jsx(
      Tag,
      {
        ref,
        className: cn(
          "grid-container",
          MAX_WIDTH_CLASSES[maxWidth],
          centered && maxWidth !== "full" && "mx-auto",
          className
        ),
        style: { ...customCols, ...style },
        ...rest,
        children
      }
    );
  }
);
GridContainer.displayName = "GridContainer";
const GridItem = React.forwardRef(
  (props, ref) => {
    const { span, start, as: Tag = "div", className, style, children, ...rest } = props;
    const spanStyle = {};
    if (typeof span === "number") {
      spanStyle.gridColumn = `span ${span}`;
    } else if (span) {
      if (span.mobile) spanStyle.gridColumn = `span ${span.mobile}`;
    }
    if (typeof start === "number") {
      spanStyle.gridColumnStart = start;
    } else if (start) {
      if (start.mobile) spanStyle.gridColumnStart = start.mobile;
    }
    const responsiveClasses = [];
    if (typeof span === "object") {
      if (span.tablet) responsiveClasses.push(`tablet:col-span-${span.tablet}`);
      if (span.desktop) responsiveClasses.push(`desktop:col-span-${span.desktop}`);
    }
    if (typeof start === "object") {
      if (start.tablet) responsiveClasses.push(`tablet:col-start-${start.tablet}`);
      if (start.desktop) responsiveClasses.push(`desktop:col-start-${start.desktop}`);
    }
    return /* @__PURE__ */ jsx(
      Tag,
      {
        ref,
        className: cn(...responsiveClasses, className),
        style: { ...spanStyle, ...style },
        ...rest,
        children
      }
    );
  }
);
GridItem.displayName = "GridItem";
export {
  GridContainer,
  GridItem
};
