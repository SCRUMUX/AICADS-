import { jsx, jsxs } from "react/jsx-runtime";
import { GridContainer, GridItem } from "./GridContainer";
const MAX_WIDTHS = ["mobile", "tablet", "desktop", "full"];
const meta = {
  title: "Primitives/GridContainer",
  component: GridContainer,
  parameters: {
    docs: {
      description: {
        component: "`@UI/GridContainer` + `@UI/GridItem` \u2014 \u0430\u0434\u0430\u043F\u0442\u0438\u0432\u043D\u0430\u044F \u0441\u0435\u0442\u043A\u0430, \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u044E\u0449\u0430\u044F 4\u21928\u219212 \u043A\u043E\u043B\u043E\u043D\u043E\u043A \u043D\u0430 breakpoints mobile/tablet/desktop. `maxWidth` \u043E\u0433\u0440\u0430\u043D\u0438\u0447\u0438\u0432\u0430\u0435\u0442 \u0448\u0438\u0440\u0438\u043D\u0443 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0430. `GridItem` \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 span/start \u0434\u043B\u044F \u043A\u0430\u0436\u0434\u043E\u0433\u043E breakpoint."
      }
    },
    layout: "fullscreen"
  },
  argTypes: {
    maxWidth: { control: "select", options: MAX_WIDTHS, description: "\u041E\u0433\u0440\u0430\u043D\u0438\u0447\u0435\u043D\u0438\u0435 \u0448\u0438\u0440\u0438\u043D\u044B" },
    centered: { control: "boolean", description: "\u0426\u0435\u043D\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435 \u043F\u043E \u0433\u043E\u0440\u0438\u0437\u043E\u043D\u0442\u0430\u043B\u0438" }
  }
};
export default meta;
const Cell = ({ label, span }) => /* @__PURE__ */ jsxs("div", { style: {
  background: "var(--color-brand-muted)",
  border: "1px solid var(--color-brand-primary)",
  borderRadius: 4,
  padding: "12px 8px",
  fontSize: 11,
  color: "var(--color-text-primary)",
  textAlign: "center",
  minHeight: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}, children: [
  label,
  span ? ` (span ${span})` : ""
] });
const Default = {
  render: () => /* @__PURE__ */ jsx(GridContainer, { maxWidth: "desktop", style: { padding: "24px 0" }, children: Array.from({ length: 12 }, (_, i) => /* @__PURE__ */ jsx(Cell, { label: `${i + 1}` }, i)) })
};
const AllMaxWidths = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 32, padding: 16 }, children: MAX_WIDTHS.map((mw) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8, paddingLeft: 16 }, children: [
      'maxWidth="',
      mw,
      '"'
    ] }),
    /* @__PURE__ */ jsx(GridContainer, { maxWidth: mw, style: { background: "var(--color-surface-2)", padding: "16px 0" }, children: Array.from({ length: 4 }, (_, i) => /* @__PURE__ */ jsx(Cell, { label: `${i + 1}` }, i)) })
  ] }, mw)) })
};
const ResponsiveLayout = {
  render: () => /* @__PURE__ */ jsxs(GridContainer, { maxWidth: "desktop", style: { padding: "24px 0" }, children: [
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 4, tablet: 8, desktop: 12 }, children: /* @__PURE__ */ jsx(Cell, { label: "Full width (4/8/12)" }) }),
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 4, tablet: 4, desktop: 6 }, children: /* @__PURE__ */ jsx(Cell, { label: "Half (4/4/6)" }) }),
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 4, tablet: 4, desktop: 6 }, children: /* @__PURE__ */ jsx(Cell, { label: "Half (4/4/6)" }) }),
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 2, tablet: 2, desktop: 3 }, children: /* @__PURE__ */ jsx(Cell, { label: "Quarter" }) }),
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 2, tablet: 2, desktop: 3 }, children: /* @__PURE__ */ jsx(Cell, { label: "Quarter" }) }),
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 2, tablet: 2, desktop: 3 }, children: /* @__PURE__ */ jsx(Cell, { label: "Quarter" }) }),
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 2, tablet: 2, desktop: 3 }, children: /* @__PURE__ */ jsx(Cell, { label: "Quarter" }) })
  ] })
};
const WithStartPositions = {
  render: () => /* @__PURE__ */ jsxs(GridContainer, { maxWidth: "desktop", style: { padding: "24px 0" }, children: [
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 2, tablet: 3, desktop: 4 }, start: { mobile: 1, tablet: 1, desktop: 1 }, children: /* @__PURE__ */ jsx(Cell, { label: "Col 1-4" }) }),
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 2, tablet: 3, desktop: 4 }, start: { mobile: 3, tablet: 4, desktop: 5 }, children: /* @__PURE__ */ jsx(Cell, { label: "Col 5-8" }) }),
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 4, tablet: 2, desktop: 4 }, start: { mobile: 1, tablet: 7, desktop: 9 }, children: /* @__PURE__ */ jsx(Cell, { label: "Col 9-12" }) })
  ] })
};
const DashboardLayout = {
  render: () => /* @__PURE__ */ jsxs(GridContainer, { maxWidth: "desktop", style: { padding: "24px 0" }, children: [
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 4, tablet: 8, desktop: 12 }, children: /* @__PURE__ */ jsx("div", { style: { background: "var(--color-surface-2)", borderRadius: 8, padding: 16, minHeight: 60, display: "flex", alignItems: "center" }, children: /* @__PURE__ */ jsx("span", { style: { fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }, children: "Header / Navigation" }) }) }),
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 4, tablet: 8, desktop: 3 }, children: /* @__PURE__ */ jsx("div", { style: { background: "var(--color-surface-2)", borderRadius: 8, padding: 16, minHeight: 200 }, children: /* @__PURE__ */ jsx("span", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "Sidebar" }) }) }),
    /* @__PURE__ */ jsx(GridItem, { span: { mobile: 4, tablet: 8, desktop: 9 }, children: /* @__PURE__ */ jsx("div", { style: { background: "var(--color-surface-2)", borderRadius: 8, padding: 16, minHeight: 200 }, children: /* @__PURE__ */ jsx("span", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "Main Content Area" }) }) })
  ] })
};
export {
  AllMaxWidths,
  DashboardLayout,
  Default,
  ResponsiveLayout,
  WithStartPositions
};
