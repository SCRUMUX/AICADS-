import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Chip } from "./Chip";
import { SearchIcon, CloseXIcon } from "../../icons";
const iconL = /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } });
const iconClose = /* @__PURE__ */ jsx(CloseXIcon, { style: { width: "100%", height: "100%" } });
const APPEARANCES = ["base", "brand"];
const SIZES = ["sm", "md", "lg"];
const STATES = ["base", "selected", "disabled", "exclude"];
const meta = {
  title: "Primitives/Chip",
  component: Chip,
  parameters: {
    docs: { description: { component: "Chip: \u0444\u0438\u043B\u044C\u0442\u0440/\u0442\u0435\u0433 \u0441 \u0443\u0434\u0430\u043B\u0435\u043D\u0438\u0435\u043C. appearance (base/brand), size (sm/md/lg), state (base/selected/disabled). Close-\u0438\u043A\u043E\u043D\u043A\u0430 \u043F\u043E\u043A\u0430\u0437\u0430\u043D\u0430 \u043F\u043E \u0443\u043C\u043E\u043B\u0447\u0430\u043D\u0438\u044E. \u0418\u043A\u043E\u043D\u043A\u0430 \u0441\u043B\u0435\u0432\u0430 \u2014 \u043E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u0430." } }
  },
  argTypes: {
    appearance: { control: "select", options: APPEARANCES },
    size: { control: "select", options: SIZES },
    state: { control: "select", options: STATES },
    showLeftIcon: { control: "boolean" },
    showCloseIcon: { control: "boolean" },
    disabled: { control: "boolean", description: "Disabled state" },
    iconLeft: { control: false },
    closeIcon: { control: false },
    onClose: { action: "closed", description: "Close icon click" }
  }
};
export default meta;
const Default = {
  args: {
    children: "Chip",
    appearance: "base",
    size: "md",
    state: "base",
    iconLeft: iconL,
    closeIcon: iconClose,
    showLeftIcon: true,
    showCloseIcon: true
  }
};
const AllAppearances = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, alignItems: "center", padding: 16 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsx(Chip, { ...args, appearance: a, children: a }, a)) }),
  args: { size: "md", state: "base", iconLeft: iconL, closeIcon: iconClose, showLeftIcon: true, showCloseIcon: true }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 12, alignItems: "center", padding: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsx(Chip, { ...args, size: s, children: s }, s)) }),
  args: { appearance: "base", state: "base", iconLeft: iconL, closeIcon: iconClose, showLeftIcon: true, showCloseIcon: true }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, alignItems: "center", padding: 16 }, children: STATES.map((st) => /* @__PURE__ */ jsx(Chip, { ...args, state: st, children: st }, st)) }),
  args: { appearance: "base", size: "md", iconLeft: iconL, closeIcon: iconClose, showLeftIcon: true, showCloseIcon: true }
};
const AllAppearancesAllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: `repeat(${STATES.length}, auto)`, gap: 8, padding: 16 }, children: APPEARANCES.flatMap(
    (a) => STATES.map((st) => /* @__PURE__ */ jsx(Chip, { ...args, appearance: a, state: st, children: `${a}/${st}` }, a + st))
  ) }),
  args: { size: "md", iconLeft: iconL, closeIcon: iconClose, showLeftIcon: true, showCloseIcon: true }
};
const Interactive = {
  render: () => {
    const [chips, setChips] = useState(["React", "TypeScript", "Tailwind", "Figma", "Storybook"]);
    const remove = (label) => setChips((prev) => prev.filter((c) => c !== label));
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16 }, children: [
      /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 6, flexWrap: "wrap" }, children: chips.map((label) => /* @__PURE__ */ jsx(
        Chip,
        {
          appearance: "base",
          size: "md",
          state: "base",
          closeIcon: iconClose,
          showCloseIcon: true,
          onClose: () => remove(label),
          children: label
        },
        label
      )) }),
      chips.length === 0 && /* @__PURE__ */ jsx("span", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "All chips removed" }),
      chips.length < 5 && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setChips(["React", "TypeScript", "Tailwind", "Figma", "Storybook"]),
          style: {
            alignSelf: "flex-start",
            padding: "4px 12px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid var(--color-border-base)",
            background: "var(--color-surface-1)",
            color: "var(--color-text-primary)",
            cursor: "pointer"
          },
          children: "Reset"
        }
      )
    ] });
  }
};
export {
  AllAppearances,
  AllAppearancesAllStates,
  AllSizes,
  AllStates,
  Default,
  Interactive
};
