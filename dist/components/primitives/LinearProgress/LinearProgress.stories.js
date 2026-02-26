import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { LinearProgress } from "./LinearProgress";
const meta = {
  title: "Primitives/LinearProgress",
  component: LinearProgress,
  parameters: {
    docs: {
      description: {
        component: "`@UI/LinearProgress` \u2014 \u043B\u0438\u043D\u0435\u0439\u043D\u044B\u0439 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441-\u0431\u0430\u0440 \u0441 pill-\u0441\u043A\u0440\u0443\u0433\u043B\u0435\u043D\u0438\u0435\u043C. 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430: sm (4px), md (6px), lg (8px). `value` \u2014 \u0447\u0438\u0441\u043B\u043E \u043E\u0442 0 \u0434\u043E 100."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    label: { control: "text" }
  },
  decorators: [
    (Story) => /* @__PURE__ */ jsx("div", { style: { width: 240, padding: 8 }, children: /* @__PURE__ */ jsx(Story, {}) })
  ]
};
export default meta;
const Default = {
  args: {
    size: "md",
    value: 65
  }
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { width: 240, display: "flex", flexDirection: "column", gap: 12 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx(LinearProgress, { size: s, value: 65 })
  ] }, s)) })
};
const FigmaExamples = {
  render: () => /* @__PURE__ */ jsx("div", { style: { width: 240, display: "flex", flexDirection: "column", gap: 12 }, children: [25, 50, 75].map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      v,
      "%"
    ] }),
    /* @__PURE__ */ jsx(LinearProgress, { size: "md", value: v })
  ] }, v)) })
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { width: 280, display: "flex", flexDirection: "column", gap: 16 }, children: [0, 25, 50, 75, 100].map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      v,
      "%"
    ] }),
    ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(LinearProgress, { size: s, value: v }, s))
  ] }, v)) })
};
const EdgeCases = {
  render: () => /* @__PURE__ */ jsx("div", { style: { width: 240, display: "flex", flexDirection: "column", gap: 12 }, children: [0, 100].map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      v,
      "%"
    ] }),
    /* @__PURE__ */ jsx(LinearProgress, { size: "md", value: v })
  ] }, v)) })
};
const Animated = {
  render: () => {
    const [value, setValue] = useState(0);
    const [running, setRunning] = useState(false);
    useEffect(() => {
      if (!running) return;
      if (value >= 100) {
        setRunning(false);
        return;
      }
      const t = setTimeout(() => setValue((v) => Math.min(v + 1, 100)), 40);
      return () => clearTimeout(t);
    }, [running, value]);
    return /* @__PURE__ */ jsxs("div", { style: { width: 280, display: "flex", flexDirection: "column", gap: 16 }, children: [
      /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(LinearProgress, { size: s, value }, s)) }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setRunning((r) => !r),
            style: { padding: "4px 12px", fontSize: 12, borderRadius: 4, border: "1px solid #ccc", cursor: "pointer", background: running ? "#fee" : "white" },
            children: running ? "Pause" : value >= 100 ? "Replay" : "Start"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => {
              setValue(0);
              setRunning(false);
            },
            style: { padding: "4px 12px", fontSize: 12, borderRadius: 4, border: "1px solid #ccc", cursor: "pointer", background: "white" },
            children: "Reset"
          }
        ),
        /* @__PURE__ */ jsxs("span", { style: { fontSize: 12, color: "#666" }, children: [
          value,
          "%"
        ] })
      ] })
    ] });
  }
};
const Interactive = {
  render: () => {
    const [value, setValue] = useState(45);
    return /* @__PURE__ */ jsxs("div", { style: { width: 280, display: "flex", flexDirection: "column", gap: 12 }, children: [
      ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
        /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888" }, children: s }),
        /* @__PURE__ */ jsx(LinearProgress, { size: s, value })
      ] }, s)),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 100,
          value,
          onChange: (e) => setValue(Number(e.target.value)),
          style: { width: "100%", marginTop: 4 }
        }
      ),
      /* @__PURE__ */ jsxs("span", { style: { fontSize: 12, color: "#666" }, children: [
        value,
        "%"
      ] })
    ] });
  }
};
export {
  AllSizes,
  Animated,
  Default,
  EdgeCases,
  FigmaExamples,
  FullMatrix,
  Interactive
};
