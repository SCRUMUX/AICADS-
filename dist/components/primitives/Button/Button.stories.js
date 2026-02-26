import { jsx, jsxs } from "react/jsx-runtime";
import { Button } from "./Button";
import { SearchIcon, ChevronRightIcon } from "../../icons";
const iconL = /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } });
const iconR = /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "100%", height: "100%" } });
const APPEARANCES = ["brand", "base", "ghost", "ghost-danger", "ghost-warning", "ghost-success", "outline", "success", "warning", "danger"];
const SIZES = ["sm", "md", "lg"];
const STATES = ["base", "hover", "active", "focus", "disabled"];
const meta = {
  title: "Primitives/Button",
  component: Button,
  parameters: {
    docs: {
      description: {
        component: "`@UI/Button` \u2014 \u043E\u0441\u043D\u043E\u0432\u043D\u0430\u044F \u043A\u043D\u043E\u043F\u043A\u0430 \u0434\u0438\u0437\u0430\u0439\u043D-\u0441\u0438\u0441\u0442\u0435\u043C\u044B.\n\n**appearance**: brand / base / ghost / ghost-danger / ghost-warning / ghost-success / outline / success / warning / danger\n\n**size**: sm / md / lg\n\n**state**: \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 (hover/focus/active/disabled). \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 `disabled` prop.\n\n\u0418\u043A\u043E\u043D\u043A\u0438 \u0441\u043B\u0435\u0432\u0430 \u0438 \u0441\u043F\u0440\u0430\u0432\u0430 \u2014 \u043D\u0435\u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B (`showLeftIcon`, `showRightIcon`)."
      }
    }
  },
  argTypes: {
    appearance: { control: "select", options: APPEARANCES, description: "\u0412\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C" },
    size: { control: "select", options: SIZES, description: "\u0420\u0430\u0437\u043C\u0435\u0440" },
    state: { control: "select", options: STATES, description: "\u041F\u0440\u0438\u043D\u0443\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435" },
    showLeftIcon: { control: "boolean", description: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043A\u043E\u043D\u043A\u0443 \u0441\u043B\u0435\u0432\u0430" },
    showRightIcon: { control: "boolean", description: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0438\u043A\u043E\u043D\u043A\u0443 \u0441\u043F\u0440\u0430\u0432\u0430" },
    showLabel: { control: "boolean", description: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0442\u0435\u043A\u0441\u0442" },
    disabled: { control: "boolean", description: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443" },
    loading: { control: "boolean", description: "\u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 (\u0441\u043F\u0438\u043D\u043D\u0435\u0440)" },
    fullWidth: { control: "boolean", description: "\u0420\u0430\u0441\u0442\u044F\u043D\u0443\u0442\u044C \u043D\u0430 \u0432\u0441\u044E \u0448\u0438\u0440\u0438\u043D\u0443" },
    iconLeft: { control: false },
    iconRight: { control: false },
    onClick: { action: "clicked", description: "\u041A\u043B\u0438\u043A \u043F\u043E \u043A\u043D\u043E\u043F\u043A\u0435" }
  },
  args: {
    appearance: "brand",
    size: "md",
    showLeftIcon: false,
    showRightIcon: false,
    showLabel: true
  }
};
export default meta;
const Default = {
  args: {
    children: "Button",
    appearance: "brand",
    size: "md",
    iconLeft: iconL,
    iconRight: iconR,
    showLeftIcon: true,
    showRightIcon: false,
    showLabel: true
  }
};
const IconOnly = {
  args: {
    appearance: "brand",
    size: "md",
    iconLeft: iconL,
    showLeftIcon: true,
    showRightIcon: false,
    showLabel: false
  }
};
const AllAppearances = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", padding: 16 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsx(Button, { ...args, appearance: a, children: a }, a)) }),
  args: { size: "md", iconLeft: iconL, showLeftIcon: true, showRightIcon: false }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 12, alignItems: "center", padding: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsx(Button, { ...args, size: s, children: s }, s)) }),
  args: { appearance: "brand", iconLeft: iconL, showLeftIcon: true, showRightIcon: false }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, alignItems: "center", padding: 16 }, children: STATES.map((st) => /* @__PURE__ */ jsx(Button, { ...args, state: st, children: st }, st)) }),
  args: { appearance: "brand", size: "md", iconLeft: iconL, showLeftIcon: true, showRightIcon: false }
};
const AllAppearancesAllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: `repeat(${STATES.length}, auto)`, gap: 6, alignItems: "center", padding: 16 }, children: APPEARANCES.flatMap(
    (a) => STATES.map((st) => /* @__PURE__ */ jsx(Button, { ...args, appearance: a, state: st, children: a }, a + st))
  ) }),
  args: { size: "sm", iconLeft: iconL, showLeftIcon: true, showRightIcon: false }
};
const Loading = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 12, alignItems: "center", padding: 16 }, children: APPEARANCES.slice(0, 5).map((a) => /* @__PURE__ */ jsx(Button, { appearance: a, size: "md", loading: true, children: a }, a)) })
};
const FullWidth = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8, padding: 16, width: 400 }, children: [
    /* @__PURE__ */ jsx(Button, { appearance: "brand", size: "md", fullWidth: true, children: "Full width brand" }),
    /* @__PURE__ */ jsx(Button, { appearance: "outline", size: "md", fullWidth: true, children: "Full width outline" }),
    /* @__PURE__ */ jsx(Button, { appearance: "ghost", size: "md", fullWidth: true, children: "Full width ghost" })
  ] })
};
const Disabled = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, alignItems: "center", padding: 16 }, children: ["brand", "outline", "ghost", "danger"].map((a) => /* @__PURE__ */ jsx(Button, { appearance: a, size: "md", disabled: true, children: a }, a)) })
};
const VariantMatrix = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: `repeat(${SIZES.length}, auto)`, gap: 8, alignItems: "center", padding: 16 }, children: APPEARANCES.flatMap(
    (a) => SIZES.map((s) => /* @__PURE__ */ jsx(Button, { ...args, appearance: a, size: s, children: a }, a + s))
  ) }),
  args: { iconLeft: iconL, showLeftIcon: true, showRightIcon: false }
};
export {
  AllAppearances,
  AllAppearancesAllStates,
  AllSizes,
  AllStates,
  Default,
  Disabled,
  FullWidth,
  IconOnly,
  Loading,
  VariantMatrix
};
