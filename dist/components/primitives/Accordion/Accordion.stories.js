import { jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Accordion } from "./Accordion";
import { AicaIcon, CaretUpFillIcon } from "../../icons";
import { Badge } from "../Badge/Badge";
import { Chip } from "../Chip/Chip";
import { Checkbox } from "../Checkbox/Checkbox";
const meta = {
  title: "Primitives/Accordion",
  component: Accordion,
  parameters: {
    docs: { description: { component: "Accordion: \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0439/\u0437\u0430\u043A\u0440\u044B\u0442\u044B\u0439 (\u0447\u0435\u0440\u0435\u0437 variant state), hover, disabled. \u041B\u0435\u0439\u0431\u043B \u0441 fill. \u041E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E: \u0438\u043A\u043E\u043D\u043A\u04301 \u0441\u043B\u0435\u0432\u0430, \u0438\u043A\u043E\u043D\u043A\u04302 \u0441\u043B\u0435\u0432\u0430, \u043B\u0435\u0439\u0431\u043B, badge, \u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u043F\u0440\u0430\u0432\u0430 (closed=chevron, open=caret-up-fill), \u0432\u0435\u0440\u0445\u043D\u0438\u0439 \u0431\u043E\u0440\u0434\u0435\u0440. \u0412 open: \u0431\u043E\u0440\u0434\u0435\u0440 \u0438 \u0438\u043A\u043E\u043D\u043A\u0438 \u2014 color_brand_primary." } }
  },
  argTypes: {
    state: { control: "select", options: ["open", "closed"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    interaction: { control: "select", options: ["base", "hover", "disabled"] },
    showIconLeft1: { control: "boolean" },
    showIconLeft2: { control: "boolean" },
    showBadge: { control: "boolean" },
    showTopBorder: { control: "boolean" },
    badge: { control: false },
    content: { control: "text" }
  }
};
export default meta;
const Default = {
  args: { children: "Accordion", size: "sm", iconLeft1: /* @__PURE__ */ jsx(AicaIcon, { style: { width: "100%", height: "100%" } }), iconLeft2: /* @__PURE__ */ jsx(AicaIcon, { style: { width: "100%", height: "100%" } }), chevron: /* @__PURE__ */ jsx(CaretUpFillIcon, { style: { width: "1em", height: "1em" } }), badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "5" }), showIconLeft1: true, showIconLeft2: true, showBadge: true, content: "Accordion content..." }
};
const AllSlotsVisible = {
  args: { children: "Accordion", size: "sm", showIconLeft1: true, showIconLeft2: true, showBadge: true, showTopBorder: true, iconLeft1: /* @__PURE__ */ jsx(AicaIcon, { style: { width: "100%", height: "100%" } }), iconLeft2: /* @__PURE__ */ jsx(AicaIcon, { style: { width: "100%", height: "100%" } }), chevron: /* @__PURE__ */ jsx(CaretUpFillIcon, { style: { width: "1em", height: "1em" } }), badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "5" }), content: "Accordion content..." }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(Accordion, { ...args, size: s, children: s }, s)) }),
  args: { size: "sm", iconLeft1: /* @__PURE__ */ jsx(AicaIcon, { style: { width: "100%", height: "100%" } }), iconLeft2: /* @__PURE__ */ jsx(AicaIcon, { style: { width: "100%", height: "100%" } }), chevron: /* @__PURE__ */ jsx(CaretUpFillIcon, { style: { width: "1em", height: "1em" } }), badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "5" }), showIconLeft1: true, showIconLeft2: true, showBadge: true, content: "Accordion content..." }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }, children: ["base", "hover", "disabled"].map((st) => /* @__PURE__ */ jsx(Accordion, { ...args, interaction: st, children: st }, st)) }),
  args: { size: "sm", iconLeft1: /* @__PURE__ */ jsx(AicaIcon, { style: { width: "100%", height: "100%" } }), iconLeft2: /* @__PURE__ */ jsx(AicaIcon, { style: { width: "100%", height: "100%" } }), chevron: /* @__PURE__ */ jsx(CaretUpFillIcon, { style: { width: "1em", height: "1em" } }), badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "5" }), showIconLeft1: true, showIconLeft2: true, showBadge: true, content: "Accordion content..." }
};
const WithCheckboxSelection = {
  render: () => {
    const ALL_OPTIONS = ["React", "Vue", "Angular", "Svelte", "SolidJS", "Next.js", "Remix", "Astro"];
    const MAX_CHIPS = 2;
    const [selected, setSelected] = React.useState(["React", "Vue", "Svelte"]);
    const toggle = (opt) => setSelected((prev) => prev.includes(opt) ? prev.filter((s) => s !== opt) : [...prev, opt]);
    const visibleChips = selected.slice(0, MAX_CHIPS);
    const overflow = Math.max(0, selected.length - MAX_CHIPS);
    const badgeSlot = selected.length > 0 ? /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 4, overflow: "hidden" }, onClick: (e) => e.stopPropagation(), children: [
      visibleChips.map((v) => /* @__PURE__ */ jsx(Chip, { size: "sm", appearance: "base", showCloseIcon: true, onClose: () => toggle(v), children: v }, v)),
      overflow > 0 && /* @__PURE__ */ jsxs(Badge, { appearance: "brand", size: "sm", children: [
        "+",
        overflow
      ] })
    ] }) : void 0;
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, maxWidth: 320 }, children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 12 }, children: "\u041F\u0430\u0442\u0442\u0435\u0440\u043D: Accordion primitive \u0441 fullWidth, chips + Badge \u0432 badge-\u0441\u043B\u043E\u0442\u0435. \u0420\u0438\u0442\u043C\u0438\u043A\u0430 \u0438\u0434\u0435\u043D\u0442\u0438\u0447\u043D\u0430 Dropdown sm." }),
      /* @__PURE__ */ jsx(
        Accordion,
        {
          size: "sm",
          fullWidth: true,
          showBadge: selected.length > 0,
          badge: badgeSlot,
          className: "border border-[var(--color-border-base)] bg-[var(--color-surface-1)]",
          content: /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 6, paddingTop: 4 }, children: ALL_OPTIONS.map((opt) => /* @__PURE__ */ jsx(
            Checkbox,
            {
              size: "sm",
              checked: selected.includes(opt),
              label: opt,
              onChange: () => toggle(opt)
            },
            opt
          )) }),
          children: "\u0424\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u0438"
        }
      )
    ] });
  }
};
const RhythmComparison = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { padding: 16, maxWidth: 320, display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 4 }, children: "Accordion \u0438 Dropdown sm \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u044E\u0442 \u043E\u0434\u0438\u043D\u0430\u043A\u043E\u0432\u044B\u0435 size-\u0442\u043E\u043A\u0435\u043D\u044B \u2014 \u0432\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u0430\u044F \u0440\u0438\u0442\u043C\u0438\u043A\u0430 \u0433\u0430\u0440\u0430\u043D\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0430 \u043D\u0430 \u0443\u0440\u043E\u0432\u043D\u0435 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u043D\u043E\u0439 \u0431\u0430\u0437\u044B." }),
    /* @__PURE__ */ jsx(Accordion, { size: "sm", fullWidth: true, className: "border border-[var(--color-border-base)]", content: /* @__PURE__ */ jsx("span", { children: "Content" }), children: "Accordion sm" }),
    /* @__PURE__ */ jsx("div", { style: { border: "1px solid var(--color-border-base)", borderRadius: "var(--radius-default)", padding: "6px 10px", minHeight: 28, display: "flex", alignItems: "center", fontSize: "var(--font-size-12)", color: "var(--color-text-muted)" }, children: "\u2191 same height as Dropdown sm \u2191" })
  ] })
};
export {
  AllSizes,
  AllSlotsVisible,
  AllStates,
  Default,
  RhythmComparison,
  WithCheckboxSelection
};
