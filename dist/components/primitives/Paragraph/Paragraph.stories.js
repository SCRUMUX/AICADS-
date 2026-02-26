import { jsx, jsxs } from "react/jsx-runtime";
import { Paragraph } from "./Paragraph";
const SIZES = ["sm", "md", "lg"];
const BREAKPOINTS = ["mobile", "tablet", "desktop-sm", "desktop-lg"];
const ALIGNS = ["left", "center", "right", "justify"];
const SAMPLE_TEXT = "Machine-readable layout \u2014 structured interface markup that can be parsed by algorithms and AI. AICA DS (AI Component Architecture Design System) ensures consistency of components and tokens for automated generation and maintenance of design systems.";
const meta = {
  title: "Primitives/Paragraph",
  component: Paragraph,
  parameters: {
    docs: {
      description: {
        component: "Paragraph (@UI/Paragraph): \u0442\u0438\u043F\u043E\u0433\u0440\u0430\u0444\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0431\u043B\u043E\u043A \u0434\u043B\u044F \u0434\u043B\u0438\u043D\u043D\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0430. 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 4 breakpoint-\u0448\u0438\u0440\u0438\u043D\u044B (mobile/tablet/desktop-sm/desktop-lg). padding=32px. \u0426\u0432\u0435\u0442: --color-text-primary. Figma: 160:82623."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES },
    breakpoint: { control: "select", options: BREAKPOINTS },
    align: { control: "select", options: ALIGNS }
  },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24, overflowX: "auto" }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
export default meta;
const Default = {
  args: {
    size: "md",
    breakpoint: "tablet",
    children: SAMPLE_TEXT
  }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 0 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 0 }, children: [
    /* @__PURE__ */ jsx("span", { style: {
      width: 24,
      fontSize: 11,
      color: "var(--color-text-muted)",
      paddingTop: 32,
      paddingRight: 8,
      flexShrink: 0
    }, children: s }),
    /* @__PURE__ */ jsx(Paragraph, { ...args, size: s, breakpoint: "tablet" })
  ] }, s)) }),
  args: { children: SAMPLE_TEXT }
};
const AllBreakpoints = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 0 }, children: BREAKPOINTS.map((bp) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start" }, children: [
    /* @__PURE__ */ jsx("span", { style: {
      width: 88,
      fontSize: 11,
      color: "var(--color-text-muted)",
      paddingTop: 32,
      paddingRight: 8,
      flexShrink: 0
    }, children: bp }),
    /* @__PURE__ */ jsx(Paragraph, { ...args, breakpoint: bp })
  ] }, bp)) }),
  args: { size: "sm", children: SAMPLE_TEXT }
};
const Alignments = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 0 }, children: ALIGNS.map((a) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start" }, children: [
    /* @__PURE__ */ jsx("span", { style: {
      width: 56,
      fontSize: 11,
      color: "var(--color-text-muted)",
      paddingTop: 32,
      paddingRight: 8,
      flexShrink: 0
    }, children: a }),
    /* @__PURE__ */ jsx(Paragraph, { ...args, align: a, breakpoint: "tablet" })
  ] }, a)) }),
  args: { size: "md", children: SAMPLE_TEXT }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 0 }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      fontSize: 11,
      fontWeight: 600,
      color: "var(--color-text-muted)",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      padding: "8px 0 0 0"
    }, children: [
      "size=",
      s
    ] }),
    BREAKPOINTS.map((bp) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsx("span", { style: {
        width: 80,
        fontSize: 11,
        color: "var(--color-text-muted)",
        paddingTop: 32,
        flexShrink: 0
      }, children: bp }),
      /* @__PURE__ */ jsx(Paragraph, { size: s, breakpoint: bp, children: SAMPLE_TEXT })
    ] }, bp))
  ] }, s)) })
};
export {
  Alignments,
  AllBreakpoints,
  AllSizes,
  Default,
  FullMatrix
};
