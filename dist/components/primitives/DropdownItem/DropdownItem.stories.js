import { jsx } from "react/jsx-runtime";
import { DropdownItem } from "./DropdownItem";
import { SearchIcon, ChevronRightIcon } from "../../icons";
import { Checkbox } from "../Checkbox/Checkbox";
import { Badge } from "../Badge/Badge";
const meta = {
  title: "Primitives/DropdownItem",
  component: DropdownItem,
  parameters: {
    docs: { description: { component: "DropdownItem: \u043F\u0443\u043D\u043A\u0442 \u043C\u0435\u043D\u044E \u0434\u043B\u044F Popover/Submenu. \u041E\u0441\u0438: size (sm/md/lg) \xD7 itemType (default/primary/danger). \u041A\u0430\u0436\u0434\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442 \u0432\u0441\u0435\u0433\u0434\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u0432\u0441\u0435 4 \u0441\u043B\u043E\u0442\u0430: Icon (left), Label, Badge, Icon (right). \u0412\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u0441\u043B\u043E\u0442\u043E\u0432 \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F BOOLEAN props. Icon (right) \u2014 chevron \u0438\u043B\u0438 check \u0447\u0435\u0440\u0435\u0437 INSTANCE_SWAP. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0432 @UI/Dropdown \u0447\u0435\u0440\u0435\u0437 instance swap." } }
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    appearance: { control: "select", options: ["default", "primary", "danger"] },
    showCheckbox: { control: "boolean" },
    showIconLeft: { control: "boolean" },
    showBadge: { control: "boolean" },
    showIconRight: { control: "boolean" },
    checkbox: { control: false },
    badge: { control: false }
  }
};
export default meta;
const Default = {
  args: { children: "Option", size: "sm", appearance: "default", iconLeft: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "1em", height: "1em" } }), iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "1em", height: "1em" } }), checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm" }), badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "5" }), showCheckbox: true, showIconLeft: true, showBadge: true, showIconRight: true }
};
const AllSlotsVisible = {
  args: { children: "Option", size: "sm", appearance: "default", showCheckbox: true, showIconLeft: true, showBadge: true, showIconRight: true, iconLeft: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "1em", height: "1em" } }), iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "1em", height: "1em" } }), checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm" }), badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "5" }) }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(DropdownItem, { ...args, size: s, children: s }, s)) }),
  args: { size: "sm", appearance: "default", iconLeft: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "1em", height: "1em" } }), iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "1em", height: "1em" } }), checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm" }), badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "5" }), showCheckbox: true, showIconLeft: true, showBadge: true, showIconRight: true }
};
const AllAppearances = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }, children: ["default", "primary", "danger"].map((v) => /* @__PURE__ */ jsx(DropdownItem, { ...args, appearance: v, children: v }, v)) }),
  args: { size: "sm", appearance: "default", iconLeft: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "1em", height: "1em" } }), iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "1em", height: "1em" } }), checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm" }), badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "5" }), showCheckbox: true, showIconLeft: true, showBadge: true, showIconRight: true }
};
export {
  AllAppearances,
  AllSizes,
  AllSlotsVisible,
  Default
};
