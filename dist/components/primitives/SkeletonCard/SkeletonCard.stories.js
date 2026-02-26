import { jsx, jsxs } from "react/jsx-runtime";
import { SkeletonCard } from "./SkeletonCard";
const meta = {
  title: "Primitives/Skeleton/Card",
  component: SkeletonCard,
  parameters: {
    docs: { description: { component: "`@UI/Skeleton/Card` \u2014 \u0448\u0430\u0431\u043B\u043E\u043D-\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430 \u0434\u043B\u044F \u043A\u0430\u0440\u0442\u043E\u0447\u043A\u0438. Media + Content (Title + Desc + Actions)." } },
    layout: "centered"
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    shimmer: { control: "boolean" }
  }
};
export default meta;
const Default = { args: { size: "sm", shimmer: true } };
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24, padding: 16 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#888", marginBottom: 6 }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx(SkeletonCard, { size: s, shimmer: true })
  ] }, s)) })
};
const NoShimmer = { args: { size: "sm", shimmer: false } };
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 32, padding: 16 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 24, flexWrap: "wrap" }, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, color: "#aaa", marginBottom: 4 }, children: [
        s,
        " shimmer"
      ] }),
      /* @__PURE__ */ jsx(SkeletonCard, { size: s, shimmer: true })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, color: "#aaa", marginBottom: 4 }, children: [
        s,
        " static"
      ] }),
      /* @__PURE__ */ jsx(SkeletonCard, { size: s, shimmer: false })
    ] })
  ] }, s)) })
};
export {
  AllSizes,
  Default,
  FullMatrix,
  NoShimmer
};
