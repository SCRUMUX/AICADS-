import { jsx, jsxs } from "react/jsx-runtime";
import { TableCell } from "./TableCell";
import { Checkbox } from "../Checkbox/Checkbox";
import { Badge } from "../Badge/Badge";
import { PersonIcon, GearIcon } from "../../icons";
const SIZES = ["sm", "md", "lg"];
const TYPES = ["text", "badge", "tag", "actions", "numeric"];
const meta = {
  title: "Primitives/TableCell",
  component: TableCell,
  parameters: {
    docs: {
      description: {
        component: "TableCell (@UI/Table/Cell): \u044F\u0447\u0435\u0439\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445 \u0442\u0430\u0431\u043B\u0438\u0446\u044B. \u0420\u0435\u043D\u0434\u0435\u0440\u0438\u0442\u0441\u044F \u043A\u0430\u043A <td>. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0438\u043D\u0441\u0442\u0430\u043D\u0441\u0430\u043C\u0438 \u0432 TableRow \u2192 Table. 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 5 \u0442\u0438\u043F\u043E\u0432 (text/badge/tag/actions/numeric). \u0421\u043B\u043E\u0442\u044B: checkbox, iconLeft, label, badge, iconAction. Figma: 161:89473."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES },
    type: { control: "select", options: TYPES },
    showCheckbox: { control: "boolean" },
    showIconLeft: { control: "boolean" },
    showBadge: { control: "boolean" },
    showIconAction: { control: "boolean" }
  },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(Story, {}) }) }) }) })]
};
export default meta;
const Default = {
  args: {
    size: "md",
    type: "text",
    children: "Cell content"
  }
};
const AllTypes = {
  render: (args) => /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
    /* @__PURE__ */ jsx(TableCell, { ...args, type: "text", children: "Cell content" }),
    /* @__PURE__ */ jsx(TableCell, { ...args, type: "badge", showBadge: true, badge: /* @__PURE__ */ jsx(Badge, { appearance: "brand", size: "sm", children: "Active" }), children: "With badge" }),
    /* @__PURE__ */ jsx(TableCell, { ...args, type: "tag", showBadge: true, badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "Tag" }), children: "With tag" }),
    /* @__PURE__ */ jsx(TableCell, { ...args, type: "actions", showIconAction: true, iconAction: /* @__PURE__ */ jsx(GearIcon, { size: 16 }), children: "Actions" }),
    /* @__PURE__ */ jsx(TableCell, { ...args, type: "numeric", children: "1 234 567" })
  ] }) }) }),
  args: { size: "md" },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 24, fontSize: 12, color: "var(--color-text-muted)", flexShrink: 0 }, children: s }),
    /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx(TableCell, { ...args, size: s, type: "text", children: "Cell content" }),
      /* @__PURE__ */ jsx(TableCell, { ...args, size: s, type: "numeric", children: "1 234" }),
      /* @__PURE__ */ jsx(TableCell, { ...args, size: s, type: "badge", showBadge: true, badge: /* @__PURE__ */ jsx(Badge, { appearance: "brand", size: "sm", children: "Active" }), children: "Badge" })
    ] }) }) })
  ] }, s)) }),
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const AllSlots = {
  render: (args) => /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse" }, children: /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx(
    TableCell,
    {
      ...args,
      showCheckbox: true,
      checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm" }),
      showIconLeft: true,
      iconLeft: /* @__PURE__ */ jsx(PersonIcon, { size: 16 }),
      showBadge: true,
      badge: /* @__PURE__ */ jsx(Badge, { appearance: "brand", size: "sm", children: "New" }),
      showIconAction: true,
      iconAction: /* @__PURE__ */ jsx(GearIcon, { size: 16 }),
      children: "All slots visible"
    }
  ) }) }) }),
  args: { size: "md", type: "text" },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { overflowX: "auto", padding: 24 }, children: /* @__PURE__ */ jsxs("table", { style: { borderCollapse: "collapse" }, children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { style: { padding: "4px 16px 8px 0", fontSize: 11, color: "var(--color-text-muted)", textAlign: "left", fontWeight: 400 }, children: "size" }),
      TYPES.map((t) => /* @__PURE__ */ jsx("th", { style: { padding: "4px 16px 8px", fontSize: 11, color: "var(--color-text-muted)", textAlign: "left", fontWeight: 400 }, children: t }, t))
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: SIZES.map((s) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { style: { padding: "4px 16px 4px 0", fontSize: 12, color: "var(--color-text-muted)" }, children: s }),
      /* @__PURE__ */ jsx(TableCell, { size: s, type: "text", children: "Cell content" }),
      /* @__PURE__ */ jsx(TableCell, { size: s, type: "badge", showBadge: true, badge: /* @__PURE__ */ jsx(Badge, { appearance: "brand", size: "sm", children: "Active" }), children: "Badge" }),
      /* @__PURE__ */ jsx(TableCell, { size: s, type: "tag", showBadge: true, badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "Tag" }), children: "Tag" }),
      /* @__PURE__ */ jsx(TableCell, { size: s, type: "actions", showIconAction: true, iconAction: /* @__PURE__ */ jsx(GearIcon, { size: s === "lg" ? 20 : 16 }), children: "Actions" }),
      /* @__PURE__ */ jsx(TableCell, { size: s, type: "numeric", children: "1 234 567" })
    ] }, s)) })
  ] }) }),
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
const RealTable = {
  render: () => {
    const rows = [
      { name: "Alice Johnson", role: "Designer", status: "Active", score: 98.5, joined: "2023-01-15" },
      { name: "Bob Smith", role: "Engineer", status: "Pending", score: 73.2, joined: "2023-06-20" },
      { name: "Carol White", role: "Manager", status: "Inactive", score: 85, joined: "2022-11-05" }
    ];
    const statusAppearance = (s) => s === "Active" ? "success" : s === "Pending" ? "warning" : "danger";
    return /* @__PURE__ */ jsx("div", { style: { padding: 24, overflowX: "auto" }, children: /* @__PURE__ */ jsx("table", { style: { borderCollapse: "collapse", width: "100%" }, children: /* @__PURE__ */ jsx("tbody", { children: rows.map((r) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", showIconLeft: true, iconLeft: /* @__PURE__ */ jsx(PersonIcon, { size: 16 }), children: r.name }),
      /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", children: r.role }),
      /* @__PURE__ */ jsx(TableCell, { size: "md", type: "badge", showBadge: true, badge: /* @__PURE__ */ jsx(Badge, { appearance: statusAppearance(r.status), size: "sm", children: r.status }) }),
      /* @__PURE__ */ jsx(TableCell, { size: "md", type: "numeric", children: r.score.toFixed(1) }),
      /* @__PURE__ */ jsx(TableCell, { size: "md", type: "text", children: r.joined }),
      /* @__PURE__ */ jsx(TableCell, { size: "md", type: "actions", showIconAction: true, iconAction: /* @__PURE__ */ jsx(GearIcon, { size: 16 }) })
    ] }, r.name)) }) }) });
  },
  decorators: [(Story) => /* @__PURE__ */ jsx(Story, {})]
};
export {
  AllSizes,
  AllSlots,
  AllTypes,
  Default,
  FullMatrix,
  RealTable
};
