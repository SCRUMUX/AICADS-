import { jsx } from "react/jsx-runtime";
import { FormHint } from "./FormHint";
import { SearchIcon } from "../../icons";
const meta = {
  title: "Primitives/FormHint",
  component: FormHint,
  parameters: {
    docs: { description: { component: "Helper text \u043F\u043E\u0434 \u043F\u043E\u043B\u0435\u043C \u0432\u0432\u043E\u0434\u0430. 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 4 \u0432\u0438\u0434\u0430 (base, success, warning, danger). \u041E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E \u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u043B\u0435\u0432\u0430." } }
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    appearance: { control: "select", options: ["base", "success", "warning", "danger"] },
    showIcon: { control: "boolean" }
  }
};
export default meta;
const Default = {
  args: { children: "FormHint", size: "sm", appearance: "base", icon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "1em", height: "1em" } }), showIcon: true }
};
const AllSlotsVisible = {
  args: { children: "FormHint", size: "sm", appearance: "base", showIcon: true, icon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "1em", height: "1em" } }) }
};
const AllAppearances = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }, children: ["base", "success", "warning", "danger"].map((a) => /* @__PURE__ */ jsx(FormHint, { ...args, appearance: a, children: a }, a)) }),
  args: { size: "sm", appearance: "base", icon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "1em", height: "1em" } }), showIcon: true }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(FormHint, { ...args, size: s, children: s }, s)) }),
  args: { size: "sm", appearance: "base", icon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "1em", height: "1em" } }), showIcon: true }
};
const VariantMatrix = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: 8, alignItems: "center" }, children: ["base", "success", "warning", "danger"].flatMap(
    (a) => ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(FormHint, { ...args, appearance: a, size: s, children: a + " " + s }, a + s))
  ) }),
  args: { size: "sm", appearance: "base", icon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "1em", height: "1em" } }), showIcon: true }
};
export {
  AllAppearances,
  AllSizes,
  AllSlotsVisible,
  Default,
  VariantMatrix
};
