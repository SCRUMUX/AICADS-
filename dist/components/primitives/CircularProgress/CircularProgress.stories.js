import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { CircularProgress } from "./CircularProgress";
const meta = {
  title: "Primitives/CircularProgress",
  component: CircularProgress,
  parameters: {
    docs: {
      description: {
        component: "`@UI/CircularProgress` \u2014 \u043A\u0440\u0443\u0433\u043E\u0432\u043E\u0439 \u0438\u043D\u0434\u0438\u043A\u0430\u0442\u043E\u0440 \u043F\u0440\u043E\u0433\u0440\u0435\u0441\u0441\u0430. 5 \u0440\u0430\u0437\u043C\u0435\u0440\u043E\u0432: xs(16px), sm(24px), md(32px), lg(40px), xl(48px). \u0422\u0435\u043A\u0441\u0442 \u043F\u0440\u043E\u0446\u0435\u043D\u0442\u043E\u0432 \u0432\u043D\u0443\u0442\u0440\u0438 \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0430\u0435\u0442\u0441\u044F \u043E\u0442 md \u0438 \u0432\u044B\u0448\u0435. `value` \u2014 \u0447\u0438\u0441\u043B\u043E \u043E\u0442 0 \u0434\u043E 100."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
    showLabel: { control: "boolean" }
  }
};
export default meta;
const Default = {
  args: {
    size: "md",
    value: 65
  }
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }, children: ["xs", "sm", "md", "lg", "xl"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ jsx(CircularProgress, { size: s, value: 65 }),
    /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888" }, children: s })
  ] }, s)) })
};
const FigmaExamples = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }, children: [25, 50, 75].map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ jsx(CircularProgress, { size: "md", value: v }),
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      v,
      "%"
    ] })
  ] }, v)) })
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24 }, children: [0, 25, 50, 75, 100].map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 24, alignItems: "center" }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888", width: 36 }, children: [
      v,
      "%"
    ] }),
    ["xs", "sm", "md", "lg", "xl"].map((s) => /* @__PURE__ */ jsx(CircularProgress, { size: s, value: v }, s))
  ] }, v)) })
};
const EdgeCases = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, alignItems: "center" }, children: [0, 100].map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ jsx(CircularProgress, { size: "lg", value: v }),
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      v,
      "%"
    ] })
  ] }, v)) })
};
const WithLabel = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, alignItems: "center" }, children: ["xs", "sm", "md", "lg", "xl"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ jsx(CircularProgress, { size: s, value: 42, showLabel: true }),
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      s,
      " + label"
    ] })
  ] }, s)) })
};
const WithoutLabel = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, alignItems: "center" }, children: ["xs", "sm", "md", "lg", "xl"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ jsx(CircularProgress, { size: s, value: 42, showLabel: false }),
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      s,
      " \u2013 label"
    ] })
  ] }, s)) })
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
      const t = setTimeout(() => setValue((v) => Math.min(v + 2, 100)), 50);
      return () => clearTimeout(t);
    }, [running, value]);
    const reset = () => {
      setValue(0);
      setRunning(false);
    };
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, alignItems: "center" }, children: ["xs", "sm", "md", "lg", "xl"].map((s) => /* @__PURE__ */ jsx(CircularProgress, { size: s, value }, s)) }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
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
            onClick: reset,
            style: { padding: "4px 12px", fontSize: 12, borderRadius: 4, border: "1px solid #ccc", cursor: "pointer", background: "white" },
            children: "Reset"
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("span", { style: { fontSize: 12, color: "#666" }, children: [
        "value = ",
        value,
        "%"
      ] })
    ] });
  }
};
const Interactive = {
  render: () => {
    const [value, setValue] = useState(45);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
      /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, alignItems: "center" }, children: ["xs", "sm", "md", "lg", "xl"].map((s) => /* @__PURE__ */ jsx(CircularProgress, { size: s, value }, s)) }),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "range",
          min: 0,
          max: 100,
          value,
          onChange: (e) => setValue(Number(e.target.value)),
          style: { width: 280 }
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
  Interactive,
  WithLabel,
  WithoutLabel
};
