import { jsx, jsxs } from "react/jsx-runtime";
import { Divider } from "./Divider";
const meta = {
  title: "Primitives/Divider",
  component: Divider,
  parameters: {
    docs: {
      description: {
        component: "`@UI/Divider` \u2014 \u043B\u0438\u043D\u0438\u044F-\u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C. orientation: horizontal | vertical. size: sm (4px) | md (6px) | lg (8px) \u2014 \u0442\u043E\u043B\u0449\u0438\u043D\u0430. appearance: base | strong."
      }
    },
    layout: "centered"
  },
  argTypes: {
    orientation: { control: "select", options: ["horizontal", "vertical"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    appearance: { control: "select", options: ["base", "strong"] }
  }
};
export default meta;
const Default = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { width: 240 }, children: /* @__PURE__ */ jsx(Divider, { ...args }) }),
  args: {
    orientation: "horizontal",
    size: "sm",
    appearance: "base"
  }
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16, width: 240 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx(Divider, { size: s, orientation: "horizontal", appearance: "base" })
  ] }, s)) })
};
const AllAppearances = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16, width: 240 }, children: ["base", "strong"].map((a) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      "appearance=",
      a
    ] }),
    /* @__PURE__ */ jsx(Divider, { size: "md", orientation: "horizontal", appearance: a })
  ] }, a)) })
};
const Vertical = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "row", gap: 24, alignItems: "center" }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx("div", { style: { height: 60, display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsx(Divider, { size: s, orientation: "vertical", appearance: "base" }) })
  ] }, s)) })
};
const InContext = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { width: 280, display: "flex", flexDirection: "column", gap: 0, padding: 16, background: "var(--color-surface-1)", borderRadius: 8 }, children: [
    /* @__PURE__ */ jsx("div", { style: { paddingBottom: 12, fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }, children: "Section A" }),
    /* @__PURE__ */ jsx(Divider, { size: "sm", orientation: "horizontal", appearance: "base" }),
    /* @__PURE__ */ jsx("div", { style: { paddingTop: 12, paddingBottom: 12, fontSize: 14, color: "var(--color-text-secondary)" }, children: "Some content here" }),
    /* @__PURE__ */ jsx(Divider, { size: "sm", orientation: "horizontal", appearance: "strong" }),
    /* @__PURE__ */ jsx("div", { style: { paddingTop: 12, fontSize: 14, color: "var(--color-text-secondary)" }, children: "Section B" })
  ] })
};
const HorizontalAndVertical = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "row", alignItems: "center", gap: 12, padding: 16, background: "var(--color-surface-1)", borderRadius: 8 }, children: [
    /* @__PURE__ */ jsx("span", { style: { fontSize: 14, color: "var(--color-text-primary)" }, children: "Item A" }),
    /* @__PURE__ */ jsx("div", { style: { height: 20, display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsx(Divider, { size: "sm", orientation: "vertical", appearance: "base" }) }),
    /* @__PURE__ */ jsx("span", { style: { fontSize: 14, color: "var(--color-text-primary)" }, children: "Item B" }),
    /* @__PURE__ */ jsx("div", { style: { height: 20, display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsx(Divider, { size: "sm", orientation: "vertical", appearance: "strong" }) }),
    /* @__PURE__ */ jsx("span", { style: { fontSize: 14, color: "var(--color-text-primary)" }, children: "Item C" })
  ] })
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24, padding: 16 }, children: ["horizontal", "vertical"].map((o) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#666", marginBottom: 8 }, children: [
      "orientation=",
      o
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }, children: ["sm", "md", "lg"].map(
      (s) => ["base", "strong"].map((a) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }, children: [
        /* @__PURE__ */ jsxs("span", { style: { fontSize: 10, color: "#aaa" }, children: [
          s,
          "/",
          a
        ] }),
        o === "horizontal" ? /* @__PURE__ */ jsx("div", { style: { width: 80 }, children: /* @__PURE__ */ jsx(Divider, { size: s, orientation: o, appearance: a }) }) : /* @__PURE__ */ jsx("div", { style: { height: 40, display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsx(Divider, { size: s, orientation: o, appearance: a }) })
      ] }, `${s}-${a}`))
    ) })
  ] }, o)) })
};
export {
  AllAppearances,
  AllSizes,
  Default,
  FullMatrix,
  HorizontalAndVertical,
  InContext,
  Vertical
};
