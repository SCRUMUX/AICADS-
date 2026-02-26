import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TableHeaderRow } from "./TableHeaderRow";
import { TableHeaderCell } from "../TableHeaderCell/TableHeaderCell";
import { Checkbox } from "../Checkbox/Checkbox";
const SIZES = ["sm", "md", "lg"];
const DEFAULT_COLUMNS = [
  { label: "Name", key: "name" },
  { label: "Role", key: "role" },
  { label: "Status", key: "status" },
  { label: "Score", key: "score" }
];
const meta = {
  title: "Primitives/TableHeaderRow",
  component: TableHeaderRow,
  parameters: {
    docs: {
      description: {
        component: "TableHeaderRow (@UI/Table/HeaderRow): \u0441\u0442\u0440\u043E\u043A\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432 \u0442\u0430\u0431\u043B\u0438\u0446\u044B. \u0420\u0435\u043D\u0434\u0435\u0440\u0438\u0442\u0441\u044F \u043A\u0430\u043A <tr> \u0432\u043D\u0443\u0442\u0440\u0438 <thead>. \u0421\u043E\u0434\u0435\u0440\u0436\u0438\u0442 TableHeaderCell \u0438\u043D\u0441\u0442\u0430\u043D\u0441\u044B. 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg). \u0424\u043E\u043D: surface-1. Border: bottom border-base. Figma: 161:90330."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES },
    showCheckboxColumn: { control: "boolean" }
  },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse", width: "100%" }, children: /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx(Story, {}) }) }) })]
};
export default meta;
const Default = {
  args: {
    size: "md",
    columns: DEFAULT_COLUMNS
  }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 32 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 4 }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse", width: 560 }, children: /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx(TableHeaderRow, { ...args, size: s, columns: DEFAULT_COLUMNS }) }) })
  ] }, s)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const WithCheckboxColumn = {
  args: {
    size: "md",
    showCheckboxColumn: true,
    checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm" }),
    columns: DEFAULT_COLUMNS
  }
};
const WithSort = {
  args: {
    size: "md",
    columns: [
      { label: "Name", key: "name", sort: "asc" },
      { label: "Role", key: "role", sort: "desc" },
      { label: "Status", key: "status", sort: "none" },
      { label: "Score", key: "score", sort: "none" }
    ]
  }
};
const Interactive = {
  render: () => {
    const nextSort = (s) => s === "none" ? "asc" : s === "asc" ? "desc" : "none";
    const [sorts, setSorts] = useState({
      name: "none",
      role: "none",
      status: "none",
      score: "none"
    });
    const toggle = (key) => setSorts((prev) => ({ ...prev, [key]: nextSort(prev[key]) }));
    const columns = [
      { label: "Name", key: "name", sort: sorts.name, onSortChange: () => toggle("name") },
      { label: "Role", key: "role", sort: sorts.role, onSortChange: () => toggle("role") },
      { label: "Status", key: "status", sort: sorts.status, onSortChange: () => toggle("status") },
      { label: "Score", key: "score", sort: sorts.score, onSortChange: () => toggle("score") }
    ];
    return /* @__PURE__ */ jsxs("div", { style: { padding: 24 }, children: [
      /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse", width: 560 }, children: /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx(TableHeaderRow, { size: "md", columns }) }) }),
      /* @__PURE__ */ jsx("p", { style: { marginTop: 12, fontSize: 12, color: "var(--color-text-muted)" }, children: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u043D\u0430 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u043A\u043E\u043B\u043E\u043D\u043A\u0438 \u0434\u043B\u044F \u0441\u043C\u0435\u043D\u044B \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438 (none \u2192 asc \u2192 desc \u2192 none)" })
    ] });
  },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const WithChildren = {
  render: (args) => /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse", width: 560 }, children: /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs(TableHeaderRow, { ...args, size: "md", children: [
    /* @__PURE__ */ jsx(TableHeaderCell, { size: "md", className: "flex-1", children: "Name" }),
    /* @__PURE__ */ jsx(TableHeaderCell, { size: "md", className: "flex-1", sort: "asc", onSortChange: () => {
    }, children: "Date" }),
    /* @__PURE__ */ jsx(TableHeaderCell, { size: "md", className: "flex-1", children: "Status" }),
    /* @__PURE__ */ jsx(TableHeaderCell, { size: "md", className: "w-24", children: "Actions" })
  ] }) }) }),
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 32, padding: 24 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 4 }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse", width: "100%" }, children: /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx(
      TableHeaderRow,
      {
        size: s,
        columns: [
          { label: "Name (none)", key: "name", sort: "none" },
          { label: "Date (asc)", key: "date", sort: "asc", onSortChange: () => {
          } },
          { label: "Role (desc)", key: "role", sort: "desc", onSortChange: () => {
          } },
          { label: "Score", key: "score", sort: "none", onSortChange: () => {
          } }
        ]
      }
    ) }) })
  ] }, s)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const InTableContext = {
  render: () => {
    const rows = [
      { name: "Alice Johnson", role: "Designer", status: "Active", score: 98 },
      { name: "Bob Smith", role: "Engineer", status: "Pending", score: 73 },
      { name: "Carol White", role: "Manager", status: "Inactive", score: 85 }
    ];
    return /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsxs("table", { style: { borderCollapse: "collapse", width: "100%" }, children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx(
        TableHeaderRow,
        {
          size: "md",
          columns: [
            { label: "Name", key: "name", sort: "asc", onSortChange: () => {
            } },
            { label: "Role", key: "role" },
            { label: "Status", key: "status" },
            { label: "Score", key: "score" }
          ]
        }
      ) }),
      /* @__PURE__ */ jsx("tbody", { children: rows.map((r) => /* @__PURE__ */ jsxs("tr", { style: { borderBottom: "1px solid var(--color-border-base)" }, children: [
        /* @__PURE__ */ jsx("td", { style: { padding: "6px 16px", fontSize: 14 }, children: r.name }),
        /* @__PURE__ */ jsx("td", { style: { padding: "6px 16px", fontSize: 14 }, children: r.role }),
        /* @__PURE__ */ jsx("td", { style: { padding: "6px 16px", fontSize: 14 }, children: r.status }),
        /* @__PURE__ */ jsx("td", { style: { padding: "6px 16px", fontSize: 14, textAlign: "right" }, children: r.score })
      ] }, r.name)) })
    ] }) });
  },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
export {
  AllSizes,
  Default,
  FullMatrix,
  InTableContext,
  Interactive,
  WithCheckboxColumn,
  WithChildren,
  WithSort
};
