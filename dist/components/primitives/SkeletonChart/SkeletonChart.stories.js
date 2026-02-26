import { jsx, jsxs } from "react/jsx-runtime";
import { SkeletonChart } from "./SkeletonChart";
const meta = {
  title: "Primitives/Skeleton/Chart",
  component: SkeletonChart,
  parameters: {
    docs: { description: { component: "`@UI/Skeleton/Chart` \u2014 \u0448\u0430\u0431\u043B\u043E\u043D-\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430 \u0434\u043B\u044F \u0433\u0440\u0430\u0444\u0438\u043A\u0430. chartType: bar | line | donut." } },
    layout: "centered"
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    shimmer: { control: "boolean" },
    chartType: { control: "select", options: ["bar", "line", "donut"] }
  }
};
export default meta;
const Default = { args: { size: "sm", shimmer: true, chartType: "bar" } };
const AllChartTypes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", padding: 16 }, children: ["bar", "line", "donut"].map((t) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#888", marginBottom: 6 }, children: [
      "chartType=",
      t
    ] }),
    /* @__PURE__ */ jsx(SkeletonChart, { size: "sm", shimmer: true, chartType: t })
  ] }, t)) })
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24, padding: 16 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#888", marginBottom: 6 }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx(SkeletonChart, { size: s, shimmer: true, chartType: "bar" })
  ] }, s)) })
};
const NoShimmer = { args: { size: "sm", shimmer: false, chartType: "bar" } };
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 32, padding: 16 }, children: ["bar", "line", "donut"].map((t) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#666", marginBottom: 8 }, children: [
      "chartType=",
      t
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, flexWrap: "wrap" }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: 10, color: "#aaa", marginBottom: 4 }, children: s }),
      /* @__PURE__ */ jsx(SkeletonChart, { size: s, shimmer: true, chartType: t })
    ] }, s)) })
  ] }, t)) })
};
export {
  AllChartTypes,
  AllSizes,
  Default,
  FullMatrix,
  NoShimmer
};
