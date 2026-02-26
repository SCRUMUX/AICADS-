import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { ScrollBar } from "./ScrollBar";
const meta = {
  title: "Primitives/ScrollBar",
  component: ScrollBar,
  parameters: {
    docs: {
      description: {
        component: "`@UI/ScrollBar` \u2014 \u043A\u0430\u0441\u0442\u043E\u043C\u043D\u044B\u0439 \u0441\u043A\u0440\u043E\u043B\u043B\u0431\u0430\u0440. orientation: horizontal | vertical. size: sm / md / lg. shape: circle (\u043A\u0440\u0443\u0433\u043B\u044B\u0439 thumb) | rect (\u043F\u0440\u044F\u043C\u043E\u0443\u0433\u043E\u043B\u044C\u043D\u044B\u0439 thumb \u0441 r=6)."
      }
    },
    layout: "centered"
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    shape: { control: "select", options: ["circle", "rect"] },
    value: { control: { type: "range", min: 0, max: 100 } },
    showArrows: { control: "boolean" }
  }
};
export default meta;
const Default = {
  args: {
    orientation: "horizontal",
    size: "sm",
    shape: "circle",
    value: 33,
    trackLength: 120,
    showArrows: true
  }
};
const AllSizesHorizontal = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 20, padding: 16 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx(ScrollBar, { size: s, orientation: "horizontal", shape: "circle", value: 40, trackLength: 156 })
  ] }, s)) })
};
const BothShapes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 20, padding: 16 }, children: ["circle", "rect"].map((sh) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      "shape=",
      sh
    ] }),
    /* @__PURE__ */ jsx(ScrollBar, { size: "sm", orientation: "horizontal", shape: sh, value: 33, trackLength: 156 })
  ] }, sh)) })
};
const Vertical = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "row", gap: 24, alignItems: "flex-start", padding: 16 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx(ScrollBar, { size: s, orientation: "vertical", shape: "circle", value: 25, trackLength: 160 })
  ] }, s)) })
};
const VerticalBothShapes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "row", gap: 32, alignItems: "flex-start", padding: 16 }, children: ["circle", "rect"].map((sh) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      "shape=",
      sh
    ] }),
    /* @__PURE__ */ jsx(ScrollBar, { size: "sm", orientation: "vertical", shape: sh, value: 33, trackLength: 160 })
  ] }, sh)) })
};
const InteractiveHorizontal = {
  render: () => {
    const [val, setVal] = useState(33);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 16 }, children: [
      /* @__PURE__ */ jsx(
        ScrollBar,
        {
          size: "md",
          orientation: "horizontal",
          shape: "rect",
          value: val,
          trackLength: 200,
          onChange: setVal
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 100,
          value: val,
          onChange: (e) => setVal(Number(e.target.value)),
          style: { width: 200 }
        }
      ),
      /* @__PURE__ */ jsxs("span", { style: { fontSize: 12, color: "#888" }, children: [
        "value=",
        val
      ] })
    ] });
  }
};
const InteractiveVertical = {
  render: () => {
    const [val, setVal] = useState(25);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "row", gap: 24, padding: 16, alignItems: "center" }, children: [
      /* @__PURE__ */ jsx(
        ScrollBar,
        {
          size: "md",
          orientation: "vertical",
          shape: "circle",
          value: val,
          trackLength: 200,
          onChange: setVal
        }
      ),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            type: "range",
            min: 0,
            max: 100,
            value: val,
            onChange: (e) => setVal(Number(e.target.value))
          }
        ),
        /* @__PURE__ */ jsxs("span", { style: { fontSize: 12, color: "#888" }, children: [
          "value=",
          val
        ] })
      ] })
    ] });
  }
};
const WithoutArrows = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 16 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      "size=",
      s,
      ", no arrows"
    ] }),
    /* @__PURE__ */ jsx(ScrollBar, { size: s, orientation: "horizontal", shape: "circle", value: 50, showArrows: false, trackLength: 120 })
  ] }, s)) })
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24, padding: 16 }, children: ["horizontal", "vertical"].map((o) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#666", marginBottom: 8 }, children: [
      "orientation=",
      o
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }, children: ["sm", "md", "lg"].map(
      (s) => ["circle", "rect"].map((sh) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }, children: [
        /* @__PURE__ */ jsxs("span", { style: { fontSize: 10, color: "#aaa" }, children: [
          s,
          "/",
          sh
        ] }),
        /* @__PURE__ */ jsx(
          ScrollBar,
          {
            size: s,
            orientation: o,
            shape: sh,
            value: 33,
            trackLength: o === "horizontal" ? 120 : 120
          }
        )
      ] }, `${s}-${sh}`))
    ) })
  ] }, o)) })
};
export {
  AllSizesHorizontal,
  BothShapes,
  Default,
  FullMatrix,
  InteractiveHorizontal,
  InteractiveVertical,
  Vertical,
  VerticalBothShapes,
  WithoutArrows
};
