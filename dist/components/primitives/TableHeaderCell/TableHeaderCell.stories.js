import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TableHeaderCell } from "./TableHeaderCell";
import { SearchIcon } from "../../icons";
const SIZES = ["sm", "md", "lg"];
const SORTS = ["none", "asc", "desc"];
const meta = {
  title: "Primitives/TableHeaderCell",
  component: TableHeaderCell,
  parameters: {
    docs: {
      description: {
        component: "TableHeaderCell (@UI/Table/HeaderCell): \u044F\u0447\u0435\u0439\u043A\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 \u0442\u0430\u0431\u043B\u0438\u0446\u044B. \u0420\u0435\u043D\u0434\u0435\u0440\u0438\u0442\u0441\u044F \u043A\u0430\u043A <th>. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0438\u043D\u0441\u0442\u0430\u043D\u0441\u0430\u043C\u0438 \u0432 TableHeaderRow \u2192 Table. 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 3 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438 (none/asc/desc). sort=none \u2192 label: text-muted. sort=asc/desc \u2192 label: text-primary + \u0438\u043A\u043E\u043D\u043A\u0430. Figma: 161:89256."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES },
    sort: { control: "select", options: SORTS },
    showIconLeft: { control: "boolean" }
  },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(Story, {}) }) }) }) })]
};
export default meta;
const Default = {
  args: {
    size: "md",
    sort: "none",
    children: "Column"
  }
};
const AllSorts = {
  render: (args) => /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: SORTS.map((s) => /* @__PURE__ */ jsx(TableHeaderCell, { ...args, sort: s, children: s === "none" ? "Column" : s === "asc" ? "Name \u2191" : "Name \u2193" }, s)) }) }) }),
  args: { size: "md" },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 24, fontSize: 12, color: "var(--color-text-muted)", flexShrink: 0 }, children: s }),
    /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx(TableHeaderCell, { size: s, sort: "none", children: "Column" }),
      /* @__PURE__ */ jsx(TableHeaderCell, { size: s, sort: "asc", children: "Name" }),
      /* @__PURE__ */ jsx(TableHeaderCell, { size: s, sort: "desc", children: "Date" })
    ] }) }) })
  ] }, s)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const WithIconLeft = {
  render: (args) => /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
    /* @__PURE__ */ jsx(TableHeaderCell, { ...args, showIconLeft: true, iconLeft: /* @__PURE__ */ jsx(SearchIcon, { size: 16 }), sort: "none", children: "Search" }),
    /* @__PURE__ */ jsx(TableHeaderCell, { ...args, showIconLeft: true, iconLeft: /* @__PURE__ */ jsx(SearchIcon, { size: 16 }), sort: "asc", children: "Name" }),
    /* @__PURE__ */ jsx(TableHeaderCell, { ...args, sort: "none", children: "No icon" })
  ] }) }) }),
  args: { size: "md" },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const Interactive = {
  render: (args) => {
    const [sorts, setSorts] = useState({
      name: "none",
      date: "asc",
      status: "none",
      amount: "desc"
    });
    const handleSort = (col) => (next) => {
      setSorts(() => {
        const fresh = {
          name: "none",
          date: "none",
          status: "none",
          amount: "none"
        };
        fresh[col] = next;
        return fresh;
      });
    };
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043D\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0434\u043B\u044F \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438" }),
      /* @__PURE__ */ jsxs("table", { style: { borderCollapse: "collapse", width: "100%" }, children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { children: Object.entries(sorts).map(([col, s]) => /* @__PURE__ */ jsx(
          TableHeaderCell,
          {
            ...args,
            sort: s,
            onSortChange: handleSort(col),
            style: { width: "25%" },
            children: col.charAt(0).toUpperCase() + col.slice(1)
          },
          col
        )) }) }),
        /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsx("tr", { children: ["Alice", "Jan 1", "Active", "$100"].map((v, i) => /* @__PURE__ */ jsx("td", { style: {
          padding: "6px 16px",
          fontSize: 14,
          borderBottom: "1px solid var(--color-border-base)",
          color: "var(--color-text-primary)"
        }, children: v }, i)) }) })
      ] })
    ] });
  },
  args: { size: "md" },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24, maxWidth: 600 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 20 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      fontSize: 11,
      fontWeight: 600,
      color: "var(--color-text-muted)",
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      SORTS.map((st) => /* @__PURE__ */ jsx(TableHeaderCell, { size: s, sort: st, children: st === "none" ? "Column" : st === "asc" ? "Name" : "Date" }, st)),
      /* @__PURE__ */ jsx(TableHeaderCell, { size: s, sort: "none", showIconLeft: true, iconLeft: /* @__PURE__ */ jsx(SearchIcon, { size: s === "lg" ? 20 : 16 }), children: "With icon" })
    ] }) }) })
  ] }, s)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
export {
  AllSizes,
  AllSorts,
  Default,
  FullMatrix,
  Interactive,
  WithIconLeft
};
