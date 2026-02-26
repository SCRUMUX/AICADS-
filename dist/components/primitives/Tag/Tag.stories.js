import { jsx, jsxs } from "react/jsx-runtime";
import { Tag } from "./Tag";
import { SearchIcon, CloseXIcon } from "../../icons";
const icon1 = /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } });
const iconClose = /* @__PURE__ */ jsx(CloseXIcon, { style: { width: "100%", height: "100%" } });
const APPEARANCES = ["brand", "base", "ghost", "outline"];
const SIZES = ["sm", "md", "lg"];
const STATES = ["base", "hover"];
const meta = {
  title: "Primitives/Tag",
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: "`@UI/Tag` \u2014 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u0430\u044F \u043C\u0435\u0442\u043A\u0430-\u0442\u0435\u0433. appearance: brand / base / ghost / outline.\n\n\u0420\u0430\u0437\u043C\u0435\u0440\u044B sm/md/lg. \u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F base/hover.\n\n\u041E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E: \u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u043B\u0435\u0432\u0430, \u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u043F\u0440\u0430\u0432\u0430 (close)."
      }
    }
  },
  argTypes: {
    appearance: { control: "select", options: APPEARANCES, description: "\u0412\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C" },
    size: { control: "select", options: SIZES, description: "\u0420\u0430\u0437\u043C\u0435\u0440" },
    state: { control: "select", options: STATES, description: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435" },
    showLeftIcon: { control: "boolean", description: "\u0418\u043A\u043E\u043D\u043A\u0430 \u0441\u043B\u0435\u0432\u0430" },
    showRightIcon: { control: "boolean", description: "\u0418\u043A\u043E\u043D\u043A\u0430 \u0441\u043F\u0440\u0430\u0432\u0430 (close)" },
    iconLeft: { control: false },
    iconRight: { control: false }
  },
  args: {
    appearance: "base",
    size: "sm",
    showLeftIcon: false,
    showRightIcon: false
  }
};
export default meta;
const Default = {
  args: {
    children: "Tag label",
    appearance: "base",
    size: "sm"
  }
};
const WithIcons = {
  args: {
    children: "Tag label",
    appearance: "base",
    size: "md",
    iconLeft: icon1,
    iconRight: iconClose,
    showLeftIcon: true,
    showRightIcon: true
  }
};
const AllAppearances = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, padding: 16 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsx(Tag, { ...args, appearance: a, children: a }, a)) }),
  args: { size: "md" }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, padding: 16, alignItems: "center" }, children: SIZES.map((s) => /* @__PURE__ */ jsx(Tag, { ...args, size: s, children: s }, s)) }),
  args: { appearance: "base" }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 12, padding: 16, alignItems: "center" }, children: STATES.map((st) => /* @__PURE__ */ jsx(Tag, { ...args, state: st, children: st }, st)) }),
  args: { appearance: "base", size: "md" }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, alignItems: "center" }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 60, fontSize: 11, color: "#888" }, children: a }),
    SIZES.map(
      (s) => STATES.map((st) => /* @__PURE__ */ jsx(Tag, { appearance: a, size: s, state: st, children: `${s}/${st}` }, `${a}-${s}-${st}`))
    )
  ] }, a)) })
};
export {
  AllAppearances,
  AllSizes,
  AllStates,
  Default,
  FullMatrix,
  WithIcons
};
