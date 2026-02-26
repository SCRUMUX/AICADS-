import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React from "react";
function cn(...c) {
  return c.filter(Boolean).join(" ");
}
const SIZE_WIDTH = {
  xs: 120,
  sm: 200,
  md: 320,
  lg: 480
};
const RATIO_STYLE = {
  "1:1": { aspectRatio: "1 / 1" },
  "4:3": { aspectRatio: "4 / 3" },
  "16:9": { aspectRatio: "16 / 9" },
  "3:2": { aspectRatio: "3 / 2" }
};
const ShimmerOverlay = () => /* @__PURE__ */ jsx(
  "span",
  {
    className: "absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]",
    style: {
      background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)"
    },
    "aria-hidden": "true"
  }
);
const ImagePlaceholderIcon = ({ size = 16 }) => /* @__PURE__ */ jsxs(
  "svg",
  {
    width: size,
    height: size,
    viewBox: "0 0 16 16",
    fill: "none",
    "aria-hidden": "true",
    children: [
      /* @__PURE__ */ jsx("rect", { x: "1", y: "1", width: "14", height: "14", rx: "2", stroke: "currentColor", strokeWidth: "1.5" }),
      /* @__PURE__ */ jsx("circle", { cx: "5.5", cy: "5.5", r: "1.5", fill: "currentColor" }),
      /* @__PURE__ */ jsx("path", { d: "M1 11l3.5-3.5L7 10l3-3 5 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
    ]
  }
);
const Image = React.forwardRef((props, ref) => {
  const {
    layout = "image",
    size = "md",
    ratio = "1:1",
    state = "empty",
    src,
    alt = "",
    errorText = "Failed to load",
    emptyText = "No image",
    icon,
    onLoad,
    onError,
    className,
    style,
    ...rest
  } = props;
  const isHero = layout === "hero-full" || layout === "hero-half";
  const containerStyle = isHero ? {
    width: layout === "hero-full" ? "100%" : "50%",
    height: "100%",
    minHeight: 480,
    ...style
  } : {
    width: SIZE_WIDTH[size],
    ...RATIO_STYLE[ratio],
    ...style
  };
  const radiusClass = isHero ? "" : "rounded-[4px]";
  const bgClass = state === "loading" ? "bg-[var(--color-surface-3)]" : "bg-[var(--color-surface-2)]";
  const iconNode = icon ?? /* @__PURE__ */ jsx(ImagePlaceholderIcon, { size: 16 });
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref,
      className: cn(
        "relative overflow-hidden shrink-0",
        radiusClass,
        bgClass,
        className
      ),
      style: containerStyle,
      role: state === "loaded" ? "img" : void 0,
      "aria-label": state === "loaded" ? alt : void 0,
      ...rest,
      children: [
        state === "loading" && /* @__PURE__ */ jsxs(Fragment, { children: [
          /* @__PURE__ */ jsx("span", { className: "absolute inset-0 bg-[var(--color-surface-3)]", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx(ShimmerOverlay, {}),
          src && /* @__PURE__ */ jsx(
            "img",
            {
              src,
              alt: "",
              className: "sr-only",
              onLoad,
              onError,
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Loading\u2026" })
        ] }),
        state === "loaded" && /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt,
            className: "absolute inset-0 w-full h-full object-cover",
            draggable: false
          }
        ),
        (state === "error" || state === "empty") && /* @__PURE__ */ jsxs("span", { className: "absolute inset-0 flex flex-col items-center justify-center gap-2 px-3", children: [
          /* @__PURE__ */ jsx("span", { className: "shrink-0 text-[var(--color-text-muted)]", children: iconNode }),
          /* @__PURE__ */ jsx(
            "span",
            {
              className: cn(
                "text-center text-[var(--color-text-muted)] select-none",
                state === "error" ? "text-[12px] font-medium leading-4" : "text-[10px] font-normal leading-3"
              ),
              children: state === "error" ? errorText : emptyText
            }
          )
        ] })
      ]
    }
  );
});
Image.displayName = "Image";
export {
  Image
};
