import { jsx, jsxs } from "react/jsx-runtime";
import { Spinner } from "./Spinner";
const meta = {
  title: "Primitives/Spinner",
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: "`@UI/Spinner` \u2014 \u0438\u043D\u0434\u0438\u043A\u0430\u0442\u043E\u0440 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438. \u041A\u043E\u043B\u044C\u0446\u043E \u0441 \u0434\u0443\u0433\u043E\u0439 270\xB0 \u0438 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0435\u0439 \u0432\u0440\u0430\u0449\u0435\u043D\u0438\u044F. 5 \u0440\u0430\u0437\u043C\u0435\u0440\u043E\u0432: xs=16 / sm=24 / md=32 / lg=40 / xl=48 px. 3 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u0430: brand (\u0441\u0438\u043D\u0438\u0439) | base (\u0441\u0435\u0440\u044B\u0439) | inherit (currentColor)."
      }
    },
    layout: "centered"
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    appearance: { control: "select", options: ["brand", "base", "inherit"] },
    label: { control: "text" }
  }
};
export default meta;
const Default = {
  args: { size: "md", appearance: "brand" }
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", padding: 16 }, children: ["xs", "sm", "md", "lg", "xl"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }, children: [
    /* @__PURE__ */ jsx(Spinner, { size: s, appearance: "brand" }),
    /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888" }, children: s })
  ] }, s)) })
};
const AllAppearances = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap", padding: 16 }, children: [
    ["brand", "base"].map((a) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsx(Spinner, { size: "md", appearance: a }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888" }, children: a })
    ] }, a)),
    /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }, children: [
      /* @__PURE__ */ jsx("div", { style: { background: "var(--color-brand-primary)", borderRadius: 8, padding: 8, display: "inline-flex" }, children: /* @__PURE__ */ jsx(Spinner, { size: "md", appearance: "inherit" }) }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888" }, children: "inherit (on brand bg)" })
    ] })
  ] })
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24, padding: 16 }, children: ["brand", "base", "inherit"].map((a) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#666", marginBottom: 8 }, children: [
      "appearance=",
      a
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }, children: ["xs", "sm", "md", "lg", "xl"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
      /* @__PURE__ */ jsx("div", { style: a === "inherit" ? { background: "var(--color-brand-primary)", borderRadius: 6, padding: 6, display: "inline-flex" } : {}, children: /* @__PURE__ */ jsx(Spinner, { size: s, appearance: a }) }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 10, color: "#aaa" }, children: s })
    ] }, s)) })
  ] }, a)) })
};
const Brand = {
  args: { size: "lg", appearance: "brand" }
};
const Base = {
  args: { size: "lg", appearance: "base" }
};
const Inherit = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 12, flexWrap: "wrap", padding: 16 }, children: ["var(--color-brand-primary)", "var(--color-danger-base)", "var(--color-success-base)", "#333"].map((bg) => /* @__PURE__ */ jsx("div", { style: { background: bg, borderRadius: 8, padding: 12, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "white" }, children: /* @__PURE__ */ jsx(Spinner, { size: "md", appearance: "inherit" }) }, bg)) })
};
const InButton = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 12, alignItems: "center", padding: 16 }, children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 16px",
          borderRadius: 4,
          background: "var(--color-brand-primary)",
          border: "none",
          color: "white",
          fontSize: 14,
          cursor: "not-allowed",
          opacity: 0.85
        },
        disabled: true,
        children: [
          /* @__PURE__ */ jsx(Spinner, { size: "xs", appearance: "inherit" }),
          "Loading\u2026"
        ]
      }
    ),
    /* @__PURE__ */ jsxs(
      "button",
      {
        style: {
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "6px 16px",
          borderRadius: 4,
          background: "white",
          border: "1px solid var(--color-border-base)",
          color: "var(--color-text-primary)",
          fontSize: 14,
          cursor: "not-allowed",
          opacity: 0.85
        },
        disabled: true,
        children: [
          /* @__PURE__ */ jsx(Spinner, { size: "xs", appearance: "base" }),
          "Loading\u2026"
        ]
      }
    )
  ] })
};
export {
  AllAppearances,
  AllSizes,
  Base,
  Brand,
  Default,
  FullMatrix,
  InButton,
  Inherit
};
