import { jsx } from "react/jsx-runtime";
import { Tab } from "./Tab";
import { SearchIcon, ChevronRightIcon } from "../../icons";
import { Badge } from "../Badge/Badge";
const iconL = /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } });
const iconR = /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "100%", height: "100%" } });
const badge = /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "5" });
const APPEARANCES = ["brand", "base", "ghost", "outline"];
const SIZES = ["sm", "md", "lg"];
const STATES = ["base", "hover", "active", "focus", "disabled"];
const meta = {
  title: "Primitives/Tab",
  component: Tab,
  parameters: {
    docs: { description: { component: "Tab: appearance (brand/base/ghost/outline), size (sm/md/lg), state (base/hover/active/focus/disabled). \u0418\u043A\u043E\u043D\u043A\u0438 \u0441\u043B\u0435\u0432\u0430/\u0441\u043F\u0440\u0430\u0432\u0430 \u0438 Badge \u2014 \u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B." } }
  },
  argTypes: {
    appearance: { control: "select", options: APPEARANCES },
    size: { control: "select", options: SIZES },
    state: { control: "select", options: STATES },
    showLeftIcon: { control: "boolean" },
    showBadge: { control: "boolean" },
    showRightIcon: { control: "boolean" },
    badge: { control: false },
    iconLeft: { control: false },
    iconRight: { control: false }
  }
};
export default meta;
const Default = {
  args: {
    children: "Tab",
    appearance: "brand",
    size: "md",
    iconLeft: iconL,
    badge,
    showLeftIcon: true,
    showBadge: true,
    showRightIcon: false
  }
};
const AllAppearances = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", padding: 16 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsx(Tab, { ...args, appearance: a, children: a }, a)) }),
  args: { size: "md", iconLeft: iconL, showLeftIcon: true, showBadge: false }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 12, alignItems: "center", padding: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsx(Tab, { ...args, size: s, children: s }, s)) }),
  args: { appearance: "brand", iconLeft: iconL, showLeftIcon: true, showBadge: false }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, alignItems: "center", padding: 16 }, children: STATES.map((st) => /* @__PURE__ */ jsx(Tab, { ...args, state: st, children: st }, st)) }),
  args: { appearance: "brand", size: "md", iconLeft: iconL, showLeftIcon: true, showBadge: false }
};
const AllAppearancesAllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: `repeat(${STATES.length}, auto)`, gap: 6, padding: 16 }, children: APPEARANCES.flatMap(
    (a) => STATES.map((st) => /* @__PURE__ */ jsx(Tab, { ...args, appearance: a, state: st, children: a }, a + st))
  ) }),
  args: { size: "sm", showLeftIcon: false, showBadge: false }
};
const VariantMatrix = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: `repeat(${SIZES.length}, auto)`, gap: 8, padding: 16 }, children: APPEARANCES.flatMap(
    (a) => SIZES.map((s) => /* @__PURE__ */ jsx(Tab, { ...args, appearance: a, size: s, children: a }, a + s))
  ) }),
  args: { showLeftIcon: false, showBadge: false }
};
const WithBadgeAndIcons = {
  args: {
    children: "Tab label",
    appearance: "brand",
    size: "md",
    iconLeft: iconL,
    iconRight: iconR,
    badge,
    showLeftIcon: true,
    showBadge: true,
    showRightIcon: true
  }
};
export {
  AllAppearances,
  AllAppearancesAllStates,
  AllSizes,
  AllStates,
  Default,
  VariantMatrix,
  WithBadgeAndIcons
};
