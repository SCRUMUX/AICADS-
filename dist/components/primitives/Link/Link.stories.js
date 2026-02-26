import { jsx } from "react/jsx-runtime";
import { Link } from "./Link";
import { ChevronRightIcon } from "../../icons";
const meta = {
  title: "Primitives/Link",
  component: Link,
  parameters: {
    docs: { description: { component: "\u0421\u0441\u044B\u043B\u043A\u0430: \u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u044B\u0439 \u043B\u0435\u0439\u0431\u043B, \u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u0430\u044F \u043F\u0440\u0430\u0432\u0430\u044F \u0438\u043A\u043E\u043D\u043A\u0430 (link-45deg). 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm, md, lg). \u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F: base, hover, visited, disabled." } }
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    state: { control: "select", options: ["base", "hover", "visited", "disabled"] },
    showLabel: { control: "boolean" },
    showRightIcon: { control: "boolean" }
  }
};
export default meta;
const Default = {
  args: { children: "Link", size: "sm", iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "1em", height: "1em" } }), showRightIcon: true }
};
const AllSlotsVisible = {
  args: { children: "Link", size: "sm", showLabel: true, showRightIcon: true, iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "1em", height: "1em" } }) }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(Link, { ...args, size: s, children: s }, s)) }),
  args: { size: "sm", iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "1em", height: "1em" } }), showRightIcon: true }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }, children: ["base", "hover", "visited", "disabled"].map((st) => /* @__PURE__ */ jsx(Link, { ...args, state: st, children: st }, st)) }),
  args: { size: "sm", iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "1em", height: "1em" } }), showRightIcon: true }
};
export {
  AllSizes,
  AllSlotsVisible,
  AllStates,
  Default
};
