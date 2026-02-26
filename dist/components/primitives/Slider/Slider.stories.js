import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Slider } from "./Slider";
const SIZES = ["sm", "md", "lg"];
const meta = {
  title: "Primitives/Slider",
  component: Slider,
  parameters: {
    docs: {
      description: {
        component: "Slider (@UI/Slider): \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u043B\u0430\u0439\u0434\u0435\u0440. Track + Fill + Thumb(s). 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 1 \u0438\u043B\u0438 2 thumb (range). Figma: 160:83289."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES, description: "\u0420\u0430\u0437\u043C\u0435\u0440 \u0442\u0440\u0435\u043A\u0430 \u0438 thumb" },
    thumbs: { control: "radio", options: ["1", "2"], description: "1 thumb \u0438\u043B\u0438 range (2 thumb)" },
    min: { control: { type: "number" }, description: "\u041C\u0438\u043D\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435" },
    max: { control: { type: "number" }, description: "\u041C\u0430\u043A\u0441\u0438\u043C\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435" },
    step: { control: { type: "number" }, description: "\u0428\u0430\u0433" },
    disabled: { control: "boolean", description: "Disabled" },
    onChange: { action: "changed", description: "onChange (\u043E\u0434\u0438\u043D\u043E\u0447\u043D\u044B\u0439)" },
    onRangeChange: { action: "range-changed", description: "onRangeChange (range)" }
  },
  args: {
    size: "md",
    min: 0,
    max: 100,
    step: 1
  },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24, maxWidth: 400 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
export default meta;
const Default = {
  render: (args) => {
    const [val, setVal] = useState(50);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
      /* @__PURE__ */ jsx(Slider, { ...args, value: val, onChange: setVal }),
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: [
        "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435: ",
        val
      ] })
    ] });
  },
  args: { size: "md", thumbs: "1", min: 0, max: 100, step: 1 }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 20, width: 320 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 24, fontSize: 12, color: "var(--color-text-muted)", flexShrink: 0 }, children: s }),
    /* @__PURE__ */ jsx("div", { style: { flex: 1, minWidth: 0 }, children: /* @__PURE__ */ jsx(Slider, { ...args, size: s }) })
  ] }, s)) }),
  args: { thumbs: "1", value: 60, min: 0, max: 100 }
};
const Range = {
  render: (args) => {
    const [range, setRange] = useState([20, 70]);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
      /* @__PURE__ */ jsx(Slider, { ...args, thumbs: "2", rangeValue: range, onRangeChange: setRange }),
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: [
        "\u0414\u0438\u0430\u043F\u0430\u0437\u043E\u043D: ",
        range[0],
        " \u2014 ",
        range[1]
      ] })
    ] });
  },
  args: { size: "md", min: 0, max: 100, step: 1 }
};
const AllSizesRange = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 20, width: 320 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 24, fontSize: 12, color: "var(--color-text-muted)", flexShrink: 0 }, children: s }),
    /* @__PURE__ */ jsx("div", { style: { flex: 1, minWidth: 0 }, children: /* @__PURE__ */ jsx(Slider, { ...args, size: s, thumbs: "2", rangeValue: [25, 75] }) })
  ] }, s)) }),
  args: { min: 0, max: 100 }
};
const Disabled = {
  render: (args) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
    /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "Single (disabled)" }),
    /* @__PURE__ */ jsx(Slider, { ...args, disabled: true, value: 40 }),
    /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "Range (disabled)" }),
    /* @__PURE__ */ jsx(Slider, { ...args, thumbs: "2", disabled: true, rangeValue: [30, 60] })
  ] }),
  args: { size: "md", min: 0, max: 100 }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24, width: 360 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
      /* @__PURE__ */ jsx("span", { style: { width: 56, fontSize: 12, color: "var(--color-text-muted)", flexShrink: 0 }, children: "1 thumb" }),
      /* @__PURE__ */ jsx("div", { style: { flex: 1, minWidth: 0 }, children: /* @__PURE__ */ jsx(Slider, { size: s, thumbs: "1", value: 50 }) })
    ] }),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
      /* @__PURE__ */ jsx("span", { style: { width: 56, fontSize: 12, color: "var(--color-text-muted)", flexShrink: 0 }, children: "2 thumbs" }),
      /* @__PURE__ */ jsx("div", { style: { flex: 1, minWidth: 0 }, children: /* @__PURE__ */ jsx(Slider, { size: s, thumbs: "2", rangeValue: [25, 75] }) })
    ] })
  ] }, s)) })
};
export {
  AllSizes,
  AllSizesRange,
  Default,
  Disabled,
  FullMatrix,
  Range
};
