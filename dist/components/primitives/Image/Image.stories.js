import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Image } from "./Image";
const SIZES = ["xs", "sm", "md", "lg"];
const RATIOS = ["1:1", "4:3", "16:9", "3:2"];
const STATES = ["loading", "loaded", "error", "empty"];
const LAYOUTS = ["image", "hero-full", "hero-half"];
const meta = {
  title: "Primitives/Image",
  component: Image,
  parameters: {
    docs: {
      description: {
        component: "Image (@UI/Image): \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0441 aspect ratio, fallback, skeleton. 4 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (xs=120px/sm=200px/md=320px/lg=480px) \xD7 4 ratio \xD7 4 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F = 64 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u0430. \u041F\u043B\u044E\u0441 layout=hero-full (1920\xD71080) / hero-half (960\xD71080). Figma: 161:93092."
      }
    }
  },
  argTypes: {
    layout: { control: "select", options: LAYOUTS },
    size: { control: "select", options: SIZES },
    ratio: { control: "select", options: RATIOS },
    state: { control: "select", options: STATES },
    src: { control: "text" },
    alt: { control: "text" }
  }
};
export default meta;
const Default = {
  args: {
    layout: "image",
    size: "md",
    ratio: "16:9",
    state: "loading"
  },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", padding: 24 }, children: STATES.map((s) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 6 }, children: [
      "state=",
      s
    ] }),
    /* @__PURE__ */ jsx(
      Image,
      {
        ...args,
        state: s,
        src: s === "loaded" ? "https://picsum.photos/seed/demo/320/213" : void 0
      }
    )
  ] }, s)) }),
  args: { layout: "image", size: "md", ratio: "3:2" },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start", padding: 24 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 6 }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx(Image, { ...args, size: s })
  ] }, s)) }),
  args: { layout: "image", ratio: "16:9", state: "loading" },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const AllRatios = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start", padding: 24 }, children: RATIOS.map((r) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 6 }, children: [
      "ratio=",
      r
    ] }),
    /* @__PURE__ */ jsx(Image, { ...args, ratio: r })
  ] }, r)) }),
  args: { layout: "image", size: "md", state: "loading" },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const Loaded = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", padding: 24 }, children: RATIOS.map((r) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 6 }, children: [
      "ratio=",
      r
    ] }),
    /* @__PURE__ */ jsx(
      Image,
      {
        layout: "image",
        size: "md",
        ratio: r,
        state: "loaded",
        src: `https://picsum.photos/seed/${r}/640/480`,
        alt: `Demo ${r}`
      }
    )
  ] }, r)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const Loading = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start", padding: 24 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 6 }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx(Image, { layout: "image", size: s, ratio: "16:9", state: "loading" })
  ] }, s)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const InteractiveLoad = {
  render: () => {
    const [imgState, setImgState] = useState("loading");
    const [src] = useState("https://picsum.photos/320/213");
    return /* @__PURE__ */ jsxs("div", { style: { padding: 24 }, children: [
      /* @__PURE__ */ jsx("div", { style: { marginBottom: 12, display: "flex", gap: 8 }, children: ["loading", "loaded", "error"].map((s) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setImgState(s),
          style: {
            padding: "4px 12px",
            fontSize: 12,
            border: "1px solid var(--color-border-base)",
            borderRadius: 4,
            background: imgState === s ? "var(--color-brand-muted)" : "transparent",
            cursor: "pointer"
          },
          children: s
        },
        s
      )) }),
      /* @__PURE__ */ jsx(
        Image,
        {
          layout: "image",
          size: "md",
          ratio: "3:2",
          state: imgState,
          src,
          alt: "Demo image"
        }
      )
    ] });
  },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const HeroLayouts = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 24 }, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { style: { padding: "8px 16px", fontSize: 11, color: "var(--color-text-muted)" }, children: "hero-full (state=loading)" }),
      /* @__PURE__ */ jsx("div", { style: { width: "100%", height: 240, overflow: "hidden" }, children: /* @__PURE__ */ jsx(Image, { layout: "hero-full", state: "loading", style: { width: "100%", height: "100%", minHeight: 0 } }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { style: { padding: "8px 16px", fontSize: 11, color: "var(--color-text-muted)" }, children: "hero-full (state=loaded)" }),
      /* @__PURE__ */ jsx("div", { style: { width: "100%", height: 240, overflow: "hidden" }, children: /* @__PURE__ */ jsx(Image, { layout: "hero-full", state: "loaded", src: "https://picsum.photos/1920/1080", alt: "Hero", style: { width: "100%", height: "100%", minHeight: 0 } }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { style: { padding: "8px 16px", fontSize: 11, color: "var(--color-text-muted)" }, children: "hero-half (state=loading)" }),
      /* @__PURE__ */ jsx("div", { style: { width: "50%", height: 240, overflow: "hidden" }, children: /* @__PURE__ */ jsx(Image, { layout: "hero-half", state: "loading", style: { width: "100%", height: "100%", minHeight: 0 } }) })
    ] })
  ] }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { padding: 24, overflowX: "auto" }, children: /* @__PURE__ */ jsxs("table", { style: { borderCollapse: "collapse" }, children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { style: { padding: "4px 12px 8px 0", fontSize: 11, color: "var(--color-text-muted)", textAlign: "left", fontWeight: 400 }, children: "size\\ratio" }),
      RATIOS.map((r) => /* @__PURE__ */ jsx("th", { style: { padding: "4px 12px 8px", fontSize: 11, color: "var(--color-text-muted)", fontWeight: 400 }, children: r }, r))
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: SIZES.map((s) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { style: { padding: "8px 12px 8px 0", fontSize: 12, color: "var(--color-text-muted)", verticalAlign: "middle" }, children: s }),
      RATIOS.map((r) => /* @__PURE__ */ jsx("td", { style: { padding: "8px 12px", verticalAlign: "top" }, children: /* @__PURE__ */ jsx(Image, { layout: "image", size: s, ratio: r, state: "loading" }) }, r))
    ] }, s)) })
  ] }) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
export {
  AllRatios,
  AllSizes,
  AllStates,
  Default,
  FullMatrix,
  HeroLayouts,
  InteractiveLoad,
  Loaded,
  Loading
};
