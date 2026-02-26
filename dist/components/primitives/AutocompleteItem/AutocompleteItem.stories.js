import { jsx } from "react/jsx-runtime";
import { AutocompleteItem } from "./AutocompleteItem";
import { SearchIcon, ChevronRightIcon } from "../../icons";
import { Checkbox } from "../Checkbox/Checkbox";
import { Badge } from "../Badge/Badge";
const meta = {
  title: "Primitives/AutocompleteItem",
  component: AutocompleteItem,
  parameters: {
    docs: { description: { component: "AutocompleteItem: \u043F\u0443\u043D\u043A\u0442 \u0432\u044B\u043F\u0430\u0434\u0430\u044E\u0449\u0435\u0433\u043E \u0441\u043F\u0438\u0441\u043A\u0430 \u0430\u0432\u0442\u043E\u043A\u043E\u043C\u043F\u043B\u0438\u0442\u0430. \u041E\u0441\u0438: size (sm/md/lg) \xD7 itemType (default/primary/danger). \u0412\u0441\u0435\u0433\u0434\u0430 7 \u0441\u043B\u043E\u0442\u043E\u0432 \u0432 DOM: Checkbox, Icon Left, Label, Badge 1, Badge 2, Badge 3, Icon Right. \u0412\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C \u0447\u0435\u0440\u0435\u0437 BOOLEAN props. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0432 @UI/Autocomplete \u0447\u0435\u0440\u0435\u0437 instance swap." } }
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    appearance: { control: "select", options: ["default", "primary", "danger"] },
    showCheckbox: { control: "boolean" },
    showIconLeft: { control: "boolean" },
    showBadge1: { control: "boolean" },
    showBadge2: { control: "boolean" },
    showBadge3: { control: "boolean" },
    showIconRight: { control: "boolean" },
    checkbox: { control: false },
    badge1: { control: false },
    badge2: { control: false },
    badge3: { control: false }
  }
};
export default meta;
const Default = {
  args: {
    children: "Option",
    size: "sm",
    appearance: "default",
    iconLeft: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }),
    iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "100%", height: "100%" } }),
    checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm" }),
    badge1: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "1" }),
    badge2: /* @__PURE__ */ jsx(Badge, { appearance: "success", size: "sm", children: "2" }),
    badge3: /* @__PURE__ */ jsx(Badge, { appearance: "warning", size: "sm", children: "3" }),
    showCheckbox: false,
    showIconLeft: false,
    showBadge1: false,
    showBadge2: false,
    showBadge3: false,
    showIconRight: false
  }
};
const AllSlotsVisible = {
  args: {
    children: "Option",
    size: "sm",
    appearance: "default",
    showCheckbox: true,
    showIconLeft: true,
    showBadge1: true,
    showBadge2: true,
    showBadge3: true,
    showIconRight: true,
    iconLeft: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }),
    iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "100%", height: "100%" } }),
    checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm" }),
    badge1: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "1" }),
    badge2: /* @__PURE__ */ jsx(Badge, { appearance: "success", size: "sm", children: "2" }),
    badge3: /* @__PURE__ */ jsx(Badge, { appearance: "warning", size: "sm", children: "3" })
  }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(AutocompleteItem, { ...args, size: s, children: `Option (${s})` }, s)) }),
  args: {
    appearance: "default",
    iconLeft: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }),
    iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "100%", height: "100%" } }),
    showIconLeft: true,
    showIconRight: true,
    showCheckbox: false,
    showBadge1: false,
    showBadge2: false,
    showBadge3: false
  }
};
const AllAppearances = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: ["default", "primary", "danger"].map((t) => /* @__PURE__ */ jsx(AutocompleteItem, { ...args, appearance: t, children: `Option (${t})` }, t)) }),
  args: {
    size: "sm",
    iconLeft: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }),
    showIconLeft: true,
    showCheckbox: false,
    showBadge1: false,
    showBadge2: false,
    showBadge3: false,
    showIconRight: false
  }
};
const AllSizesAllTypes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 2 }, children: ["default", "primary", "danger"].map((t) => /* @__PURE__ */ jsx(AutocompleteItem, { size: s, appearance: t, showIconLeft: true, iconLeft: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }), children: `${s} / ${t}` }, t)) }, s)) })
};
export {
  AllAppearances,
  AllSizes,
  AllSizesAllTypes,
  AllSlotsVisible,
  Default
};
