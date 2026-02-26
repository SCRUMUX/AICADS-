import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Table } from "./Table";
import { TableRow } from "../TableRow/TableRow";
import { TableCell } from "../TableCell/TableCell";
import { TableHeaderRow } from "../TableHeaderRow/TableHeaderRow";
import { Badge } from "../Badge/Badge";
import { Checkbox } from "../Checkbox/Checkbox";
import { SkeletonTable } from "../SkeletonTable/SkeletonTable";
import { PersonIcon } from "../../icons";
const SIZES = ["sm", "md", "lg"];
const APPEARANCES = ["base", "striped", "bordered"];
const DEMO_ROWS = [
  { id: 1, name: "Alice Johnson", role: "Designer", status: "Active", score: 98, joined: "2023-01-15" },
  { id: 2, name: "Bob Smith", role: "Engineer", status: "Pending", score: 73, joined: "2023-06-20" },
  { id: 3, name: "Carol White", role: "Manager", status: "Active", score: 85, joined: "2022-11-05" },
  { id: 4, name: "Dave Brown", role: "Designer", status: "Inactive", score: 60, joined: "2024-02-10" }
];
const statusAppearance = (s) => s === "Active" ? "success" : s === "Pending" ? "warning" : "danger";
const DEMO_COLUMNS = [
  {
    key: "name",
    label: "Name",
    cellIconLeft: /* @__PURE__ */ jsx(PersonIcon, { size: 16 }),
    render: (row) => row.name
  },
  {
    key: "role",
    label: "Role",
    render: (row) => row.role
  },
  {
    key: "status",
    label: "Status",
    cellType: "badge",
    render: (row) => /* @__PURE__ */ jsx(Badge, { appearance: statusAppearance(row.status), size: "sm", children: row.status })
  },
  {
    key: "score",
    label: "Score",
    cellType: "numeric",
    render: (row) => String(row.score)
  }
];
const meta = {
  title: "Primitives/Table",
  component: Table,
  parameters: {
    docs: {
      description: {
        component: "Table (@UI/Table): \u043F\u043E\u043B\u043D\u0430\u044F \u0442\u0430\u0431\u043B\u0438\u0446\u0430. \u0420\u0435\u043D\u0434\u0435\u0440\u0438\u0442\u0441\u044F \u043A\u0430\u043A \u0441\u0435\u043C\u0430\u043D\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 <table>. \u0421\u043E\u0434\u0435\u0440\u0436\u0438\u0442 TableHeaderRow + TableRow \u0438\u043D\u0441\u0442\u0430\u043D\u0441\u044B. 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 3 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u0430 (base/striped/bordered). Figma: 161:92875."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES },
    appearance: { control: "select", options: APPEARANCES },
    showCheckboxColumn: { control: "boolean" }
  }
};
export default meta;
const Default = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Table, { ...args, columns: DEMO_COLUMNS, rows: DEMO_ROWS, getRowKey: (r) => r.id }) }),
  args: { size: "md", appearance: "base" },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const AllAppearances = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 32, padding: 24 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 8 }, children: [
      "appearance=",
      a
    ] }),
    /* @__PURE__ */ jsx(Table, { size: "md", appearance: a, columns: DEMO_COLUMNS, rows: DEMO_ROWS, getRowKey: (r) => r.id })
  ] }, a)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 32, padding: 24 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 8 }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx(Table, { size: s, appearance: "base", columns: DEMO_COLUMNS, rows: DEMO_ROWS, getRowKey: (r) => r.id })
  ] }, s)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const Striped = {
  render: () => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Table, { size: "md", appearance: "striped", columns: DEMO_COLUMNS, rows: DEMO_ROWS, getRowKey: (r) => r.id }) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const Bordered = {
  render: () => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Table, { size: "md", appearance: "bordered", columns: DEMO_COLUMNS, rows: DEMO_ROWS, getRowKey: (r) => r.id }) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const WithSort = {
  render: () => {
    const nextSort = (s) => s === "none" ? "asc" : s === "asc" ? "desc" : "none";
    const [sorts, setSorts] = useState({
      name: "none",
      role: "none",
      score: "none"
    });
    const toggle = (key) => setSorts((prev) => ({ ...prev, [key]: nextSort(prev[key]) }));
    const columns = [
      {
        key: "name",
        label: "Name",
        sort: sorts.name,
        onSortChange: () => toggle("name"),
        render: (row) => row.name
      },
      {
        key: "role",
        label: "Role",
        sort: sorts.role,
        onSortChange: () => toggle("role"),
        render: (row) => row.role
      },
      {
        key: "status",
        label: "Status",
        cellType: "badge",
        render: (row) => /* @__PURE__ */ jsx(Badge, { appearance: statusAppearance(row.status), size: "sm", children: row.status })
      },
      {
        key: "score",
        label: "Score",
        cellType: "numeric",
        sort: sorts.score,
        onSortChange: () => toggle("score"),
        render: (row) => String(row.score)
      }
    ];
    return /* @__PURE__ */ jsxs("div", { style: { padding: 24 }, children: [
      /* @__PURE__ */ jsx(Table, { size: "md", appearance: "base", columns, rows: DEMO_ROWS, getRowKey: (r) => r.id }),
      /* @__PURE__ */ jsx("p", { style: { marginTop: 12, fontSize: 12, color: "var(--color-text-muted)" }, children: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0434\u043B\u044F \u0441\u043E\u0440\u0442\u0438\u0440\u043E\u0432\u043A\u0438" })
    ] });
  },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const WithRowSelection = {
  render: () => {
    const [selectedIds, setSelectedIds] = useState(/* @__PURE__ */ new Set());
    const toggleRow = (id) => setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    const toggleAll = () => setSelectedIds(selectedIds.size === DEMO_ROWS.length ? /* @__PURE__ */ new Set() : new Set(DEMO_ROWS.map((r) => r.id)));
    const isAll = selectedIds.size === DEMO_ROWS.length;
    const isPartial = selectedIds.size > 0 && !isAll;
    return /* @__PURE__ */ jsxs("div", { style: { padding: 24 }, children: [
      /* @__PURE__ */ jsx(
        Table,
        {
          size: "md",
          appearance: "base",
          showCheckboxColumn: true,
          headerCheckbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm", checked: isAll, indeterminate: isPartial, onChange: toggleAll }),
          columns: DEMO_COLUMNS,
          rows: DEMO_ROWS,
          getRowKey: (r) => r.id,
          selectedRowKeys: [...selectedIds],
          getRowCheckbox: (row) => /* @__PURE__ */ jsx(
            Checkbox,
            {
              size: "sm",
              checked: selectedIds.has(row.id),
              onChange: () => toggleRow(row.id)
            }
          ),
          onRowSelect: (row) => toggleRow(row.id)
        }
      ),
      /* @__PURE__ */ jsxs("p", { style: { marginTop: 12, fontSize: 12, color: "var(--color-text-muted)" }, children: [
        "\u0412\u044B\u0431\u0440\u0430\u043D\u043E: ",
        selectedIds.size,
        " \u0438\u0437 ",
        DEMO_ROWS.length
      ] })
    ] });
  },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const WithDisabledRows = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { padding: 24 }, children: [
    /* @__PURE__ */ jsx(
      Table,
      {
        size: "md",
        appearance: "base",
        columns: DEMO_COLUMNS,
        rows: DEMO_ROWS,
        getRowKey: (r) => r.id,
        disabledRowKeys: [2, 4]
      }
    ),
    /* @__PURE__ */ jsx("p", { style: { marginTop: 12, fontSize: 12, color: "var(--color-text-muted)" }, children: "\u0421\u0442\u0440\u043E\u043A\u0438 2 \u0438 4 \u0437\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u044B" })
  ] }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const ManualLayout = {
  render: () => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsxs(Table, { size: "md", appearance: "bordered", children: [
    /* @__PURE__ */ jsx(
      TableHeaderRow,
      {
        size: "md",
        columns: [
          { key: "name", label: "Name" },
          { key: "role", label: "Role" },
          { key: "status", label: "Status" },
          { key: "score", label: "Score" }
        ]
      }
    ),
    DEMO_ROWS.map((r) => /* @__PURE__ */ jsxs(TableRow, { size: "md", children: [
      /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", children: r.name }),
      /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", children: r.role }),
      /* @__PURE__ */ jsx(
        TableCell,
        {
          size: "md",
          type: "badge",
          showBadge: true,
          badge: /* @__PURE__ */ jsx(Badge, { appearance: statusAppearance(r.status), size: "sm", children: r.status })
        }
      ),
      /* @__PURE__ */ jsx(TableCell, { size: "md", type: "numeric", children: r.score })
    ] }, r.id))
  ] }) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const WithSkeleton = {
  render: () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const t = setTimeout(() => setLoading(false), 2e3);
      return () => clearTimeout(t);
    }, []);
    return /* @__PURE__ */ jsxs("div", { style: { padding: 24 }, children: [
      loading ? /* @__PURE__ */ jsx(SkeletonTable, { size: "md", shimmer: true, rows: 4, cols: 4 }) : /* @__PURE__ */ jsx(Table, { size: "md", appearance: "base", columns: DEMO_COLUMNS, rows: DEMO_ROWS, getRowKey: (r) => r.id }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setLoading(true),
          style: {
            marginTop: 12,
            padding: "6px 16px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid var(--color-border-base)",
            background: "var(--color-surface-1)",
            color: "var(--color-text-primary)",
            cursor: "pointer"
          },
          children: "Reload (2s delay)"
        }
      )
    ] });
  },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 40, padding: 24 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)", marginBottom: 16 }, children: [
      "appearance=",
      a
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 20 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 6 }, children: [
        "size=",
        s
      ] }),
      /* @__PURE__ */ jsx(Table, { size: s, appearance: a, columns: DEMO_COLUMNS, rows: DEMO_ROWS, getRowKey: (r) => r.id })
    ] }, s)) })
  ] }, a)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
export {
  AllAppearances,
  AllSizes,
  Bordered,
  Default,
  FullMatrix,
  ManualLayout,
  Striped,
  WithDisabledRows,
  WithRowSelection,
  WithSkeleton,
  WithSort
};
