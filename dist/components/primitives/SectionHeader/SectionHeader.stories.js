import { jsx } from "react/jsx-runtime";
import { SectionHeader } from "./SectionHeader";
import { SearchIcon, ChevronRightIcon, BellIcon, GearIcon } from "../../icons";
import { Badge } from "../Badge/Badge";
const SIZES = ["sm", "md", "lg"];
const APPEARANCES = ["base", "success", "warning", "danger"];
const iconL = /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } });
const iconR = /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "100%", height: "100%" } });
const badgeEl = /* @__PURE__ */ jsx(Badge, { appearance: "brand", size: "sm", children: "5" });
const meta = {
  title: "Primitives/SectionHeader",
  component: SectionHeader,
  parameters: {
    docs: {
      description: {
        component: "SectionHeader (@UI/SectionHeader): \u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u043B\u0435\u0432\u0430 + \u043B\u0435\u0439\u0431\u043B + badge + \u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u043F\u0440\u0430\u0432\u0430. 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 4 \u0432\u0438\u0434\u0430 (base, success, warning, danger). Figma: 160:72309."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES },
    appearance: { control: "select", options: APPEARANCES },
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
    children: "Section",
    size: "sm",
    appearance: "base",
    showLeftIcon: true,
    iconLeft: iconL,
    showBadge: true,
    badge: badgeEl,
    showRightIcon: true,
    iconRight: iconR
  }
};
const LabelOnly = {
  args: { children: "Section", size: "sm", appearance: "base" }
};
const AllAppearances = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsx(SectionHeader, { ...args, appearance: a, children: a }, a)) }),
  args: {
    size: "sm",
    showLeftIcon: true,
    iconLeft: iconL,
    showBadge: true,
    badge: badgeEl,
    showRightIcon: true,
    iconRight: iconR
  }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }, children: SIZES.map((s) => /* @__PURE__ */ jsx(SectionHeader, { ...args, size: s, children: s }, s)) }),
  args: {
    appearance: "base",
    showLeftIcon: true,
    iconLeft: iconL,
    showBadge: true,
    badge: badgeEl,
    showRightIcon: true,
    iconRight: iconR
  }
};
const AllAppearancesAllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "8px 16px", alignItems: "center" }, children: APPEARANCES.flatMap(
    (a) => SIZES.map((s) => /* @__PURE__ */ jsx(
      SectionHeader,
      {
        size: s,
        appearance: a,
        showLeftIcon: true,
        iconLeft: /* @__PURE__ */ jsx(BellIcon, { style: { width: "100%", height: "100%" } }),
        showBadge: true,
        badge: /* @__PURE__ */ jsx(Badge, { appearance: a === "base" ? "brand" : a, size: "sm", children: "3" }),
        showRightIcon: true,
        iconRight: /* @__PURE__ */ jsx(GearIcon, { style: { width: "100%", height: "100%" } }),
        children: `${a} / ${s}`
      },
      a + s
    ))
  ) })
};
export {
  AllAppearances,
  AllAppearancesAllSizes,
  AllSizes,
  Default,
  LabelOnly
};
