import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { TableRow } from "./TableRow";
import { TableCell } from "../TableCell/TableCell";
import { TableHeaderRow } from "../TableHeaderRow/TableHeaderRow";
import { Checkbox } from "../Checkbox/Checkbox";
import { Badge } from "../Badge/Badge";
import { PersonIcon } from "../../icons";
const SIZES = ["sm", "md", "lg"];
const STATES = ["base", "hover", "selected", "disabled"];
const meta = {
  title: "Primitives/TableRow",
  component: TableRow,
  parameters: {
    docs: {
      description: {
        component: "TableRow (@UI/Table/Row): \u0441\u0442\u0440\u043E\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u0442\u0430\u0431\u043B\u0438\u0446\u044B. \u0420\u0435\u043D\u0434\u0435\u0440\u0438\u0442\u0441\u044F \u043A\u0430\u043A <tr> \u0432\u043D\u0443\u0442\u0440\u0438 <tbody>. 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 4 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F (base/hover/selected/disabled). \u0424\u043E\u043D: base=surface-1, hover=surface-2, selected=brand-muted, disabled=surface-2+opacity50. Figma: 161:90212."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES },
    state: { control: "select", options: STATES },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
    showCheckboxColumn: { control: "boolean" }
  },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse", width: "100%" }, children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsx(Story, {}) }) }) })]
};
export default meta;
const Default = {
  args: {
    size: "md"
  },
  render: (args) => /* @__PURE__ */ jsxs(TableRow, { ...args, children: [
    /* @__PURE__ */ jsx(TableCell, { size: args.size ?? "md", type: "text", children: "Alice Johnson" }),
    /* @__PURE__ */ jsx(TableCell, { size: args.size ?? "md", type: "text", children: "Designer" }),
    /* @__PURE__ */ jsx(TableCell, { size: args.size ?? "md", type: "badge", showBadge: true, badge: /* @__PURE__ */ jsx(Badge, { appearance: "success", size: "sm", children: "Active" }) }),
    /* @__PURE__ */ jsx(TableCell, { size: args.size ?? "md", type: "numeric", children: "98.5" })
  ] })
};
const AllStates = {
  render: () => /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse", width: "100%" }, children: /* @__PURE__ */ jsx("tbody", { children: STATES.map((st) => /* @__PURE__ */ jsxs(TableRow, { size: "md", state: st, children: [
    /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", style: { minWidth: 80 }, children: st }),
    /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", children: "Alice Johnson" }),
    /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", children: "Designer" }),
    /* @__PURE__ */ jsx(TableCell, { size: "md", type: "numeric", children: "98.5" })
  ] }, st)) }) }),
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 4 }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse", width: "100%" }, children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs(TableRow, { size: s, children: [
      /* @__PURE__ */ jsx(TableCell, { size: s, type: "text", children: "Alice Johnson" }),
      /* @__PURE__ */ jsx(TableCell, { size: s, type: "text", children: "Designer" }),
      /* @__PURE__ */ jsx(TableCell, { size: s, type: "badge", showBadge: true, badge: /* @__PURE__ */ jsx(Badge, { appearance: "success", size: "sm", children: "Active" }) }),
      /* @__PURE__ */ jsx(TableCell, { size: s, type: "numeric", children: "98.5" })
    ] }) }) })
  ] }, s)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const WithCheckboxColumn = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse", width: "100%" }, children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs(
      TableRow,
      {
        size: "md",
        selected: checked,
        showCheckboxColumn: true,
        checkbox: /* @__PURE__ */ jsx(
          Checkbox,
          {
            size: "sm",
            checked,
            onChange: (e) => setChecked(e.target.checked)
          }
        ),
        children: [
          /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", children: "Alice Johnson" }),
          /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", children: "Designer" }),
          /* @__PURE__ */ jsx(TableCell, { size: "md", type: "badge", showBadge: true, badge: /* @__PURE__ */ jsx(Badge, { appearance: "success", size: "sm", children: "Active" }) }),
          /* @__PURE__ */ jsx(TableCell, { size: "md", type: "numeric", children: "98.5" })
        ]
      }
    ) }) });
  },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const Interactive = {
  render: () => {
    const rows = [
      { id: 1, name: "Alice Johnson", role: "Designer", status: "Active", score: 98 },
      { id: 2, name: "Bob Smith", role: "Engineer", status: "Pending", score: 73 },
      { id: 3, name: "Carol White", role: "Manager", status: "Active", score: 85 },
      { id: 4, name: "Dave Brown", role: "Designer", status: "Inactive", score: 60 }
    ];
    const [selectedId, setSelectedId] = useState(null);
    const statusBadge = (s) => s === "Active" ? "success" : s === "Pending" ? "warning" : "danger";
    return /* @__PURE__ */ jsxs("div", { style: { padding: 24 }, children: [
      /* @__PURE__ */ jsxs("table", { style: { borderCollapse: "collapse", width: "100%" }, children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx(
          TableHeaderRow,
          {
            size: "md",
            columns: [
              { label: "Name", key: "name" },
              { label: "Role", key: "role" },
              { label: "Status", key: "status" },
              { label: "Score", key: "score" }
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("tbody", { children: rows.map((r) => /* @__PURE__ */ jsxs(
          TableRow,
          {
            size: "md",
            selected: selectedId === r.id,
            onSelect: () => setSelectedId(selectedId === r.id ? null : r.id),
            children: [
              /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", children: r.name }),
              /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", children: r.role }),
              /* @__PURE__ */ jsx(
                TableCell,
                {
                  size: "md",
                  type: "badge",
                  showBadge: true,
                  badge: /* @__PURE__ */ jsx(Badge, { appearance: statusBadge(r.status), size: "sm", children: r.status })
                }
              ),
              /* @__PURE__ */ jsx(TableCell, { size: "md", type: "numeric", children: r.score })
            ]
          },
          r.id
        )) })
      ] }),
      /* @__PURE__ */ jsx("p", { style: { marginTop: 12, fontSize: 12, color: "var(--color-text-muted)" }, children: "\u041A\u043B\u0438\u043A\u043D\u0438\u0442\u0435 \u0441\u0442\u0440\u043E\u043A\u0443 \u0434\u043B\u044F \u0432\u044B\u0431\u043E\u0440\u0430 / \u0441\u043D\u044F\u0442\u0438\u044F \u0432\u044B\u0431\u043E\u0440\u0430" })
    ] });
  },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { marginBottom: 24 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "var(--color-text-muted)", marginBottom: 4 }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsxs("table", { style: { borderCollapse: "collapse", width: "100%" }, children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx(TableHeaderRow, { size: s, columns: [
        { label: "State", key: "state" },
        { label: "Name", key: "name" },
        { label: "Role", key: "role" },
        { label: "Score", key: "score" }
      ] }) }),
      /* @__PURE__ */ jsx("tbody", { children: STATES.map((st) => /* @__PURE__ */ jsxs(TableRow, { size: s, state: st, children: [
        /* @__PURE__ */ jsx(TableCell, { size: s, type: "text", style: { minWidth: 80, color: "var(--color-text-muted)", fontSize: 11 }, children: st }),
        /* @__PURE__ */ jsx(TableCell, { size: s, type: "text", children: "Alice Johnson" }),
        /* @__PURE__ */ jsx(TableCell, { size: s, type: "text", children: "Designer" }),
        /* @__PURE__ */ jsx(TableCell, { size: s, type: "numeric", children: "98.5" })
      ] }, st)) })
    ] })
  ] }, s)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const RealTableWithSelection = {
  render: () => {
    const rows = [
      { id: 1, name: "Alice Johnson", role: "Designer", status: "Active", score: 98 },
      { id: 2, name: "Bob Smith", role: "Engineer", status: "Pending", score: 73 },
      { id: 3, name: "Carol White", role: "Manager", status: "Active", score: 85 },
      { id: 4, name: "Dave Brown", role: "Designer", status: "Inactive", score: 60 },
      { id: 5, name: "Eve Davis", role: "Engineer", status: "Active", score: 91 }
    ];
    const [selected, setSelected] = useState(/* @__PURE__ */ new Set());
    const toggleRow = (id) => setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
    const toggleAll = () => setSelected(selected.size === rows.length ? /* @__PURE__ */ new Set() : new Set(rows.map((r) => r.id)));
    const isAllSelected = selected.size === rows.length;
    const isPartialSelected = selected.size > 0 && !isAllSelected;
    const statusBadge = (s) => s === "Active" ? "success" : s === "Pending" ? "warning" : "danger";
    return /* @__PURE__ */ jsxs("div", { style: { padding: 24 }, children: [
      /* @__PURE__ */ jsxs("table", { style: { borderCollapse: "collapse", width: "100%" }, children: [
        /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx(
          TableHeaderRow,
          {
            size: "md",
            showCheckboxColumn: true,
            checkbox: /* @__PURE__ */ jsx(
              Checkbox,
              {
                size: "sm",
                checked: isAllSelected,
                indeterminate: isPartialSelected,
                onChange: toggleAll
              }
            ),
            columns: [
              { label: "Name", key: "name" },
              { label: "Role", key: "role" },
              { label: "Status", key: "status" },
              { label: "Score", key: "score" }
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("tbody", { children: rows.map((r) => /* @__PURE__ */ jsxs(
          TableRow,
          {
            size: "md",
            selected: selected.has(r.id),
            showCheckboxColumn: true,
            checkbox: /* @__PURE__ */ jsx(
              Checkbox,
              {
                size: "sm",
                checked: selected.has(r.id),
                onChange: () => toggleRow(r.id)
              }
            ),
            onSelect: () => toggleRow(r.id),
            children: [
              /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", showIconLeft: true, iconLeft: /* @__PURE__ */ jsx(PersonIcon, { size: 16 }), children: r.name }),
              /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", children: r.role }),
              /* @__PURE__ */ jsx(
                TableCell,
                {
                  size: "md",
                  type: "badge",
                  showBadge: true,
                  badge: /* @__PURE__ */ jsx(Badge, { appearance: statusBadge(r.status), size: "sm", children: r.status })
                }
              ),
              /* @__PURE__ */ jsx(TableCell, { size: "md", type: "numeric", children: r.score })
            ]
          },
          r.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs("p", { style: { marginTop: 12, fontSize: 12, color: "var(--color-text-muted)" }, children: [
        "\u0412\u044B\u0431\u0440\u0430\u043D\u043E: ",
        selected.size,
        " \u0438\u0437 ",
        rows.length
      ] })
    ] });
  },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
export {
  AllSizes,
  AllStates,
  Default,
  FullMatrix,
  Interactive,
  RealTableWithSelection,
  WithCheckboxColumn
};
