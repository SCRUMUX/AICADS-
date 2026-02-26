import { jsx, jsxs } from "react/jsx-runtime";
import { SkeletonList } from "./SkeletonList";
const meta = {
  title: "Primitives/Skeleton/List",
  component: SkeletonList,
  parameters: {
    docs: { description: { component: "`@UI/Skeleton/List` \u2014 \u0448\u0430\u0431\u043B\u043E\u043D-\u0437\u0430\u0433\u043B\u0443\u0448\u043A\u0430 \u0434\u043B\u044F \u0441\u043F\u0438\u0441\u043A\u0430. \u0421\u0442\u0440\u043E\u043A\u0438 \u0441 Avatar + Label + Meta, \u0440\u0430\u0437\u0434\u0435\u043B\u0451\u043D\u043D\u044B\u0435 dividers." } },
    layout: "centered"
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    shimmer: { control: "boolean" },
    rows: { control: "number" }
  }
};
export default meta;
const Default = { args: { size: "sm", shimmer: true, rows: 4 } };
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24, padding: 16 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#888", marginBottom: 6 }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx(SkeletonList, { size: s, shimmer: true })
  ] }, s)) })
};
const NoShimmer = { args: { size: "sm", shimmer: false } };
const ThreeRows = { args: { size: "sm", shimmer: true, rows: 3 } };
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 32, padding: 16 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 24, flexWrap: "wrap" }, children: [
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, color: "#aaa", marginBottom: 4 }, children: [
        s,
        " shimmer"
      ] }),
      /* @__PURE__ */ jsx(SkeletonList, { size: s, shimmer: true })
    ] }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, color: "#aaa", marginBottom: 4 }, children: [
        s,
        " static"
      ] }),
      /* @__PURE__ */ jsx(SkeletonList, { size: s, shimmer: false })
    ] })
  ] }, s)) })
};
export {
  AllSizes,
  Default,
  FullMatrix,
  NoShimmer,
  ThreeRows
};
