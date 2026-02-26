import { jsx, jsxs } from "react/jsx-runtime";
import { Tooltip, TooltipBubble } from "./Tooltip";
import { Button } from "../Button/Button";
const meta = {
  title: "Primitives/Tooltip",
  component: TooltipBubble,
  parameters: {
    docs: {
      description: {
        component: "`@UI/Tooltip` \u2014 \u0432\u0441\u043F\u043B\u044B\u0432\u0430\u044E\u0449\u0430\u044F \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430 \u0441 \u043F\u0443\u0437\u044B\u0440\u044C\u043A\u043E\u043C \u0438 \u0441\u0442\u0440\u0435\u043B\u043A\u043E\u0439. 4 \u043F\u043E\u0437\u0438\u0446\u0438\u0438: top / bottom / left / right. 4 \u0432\u0438\u0434\u0430: base / success / warning / danger. `TooltipBubble` \u2014 \u0447\u0438\u0441\u0442\u044B\u0439 \u043F\u0443\u0437\u044B\u0440\u0451\u043A (\u0434\u043B\u044F Storybook). `Tooltip` \u2014 \u043E\u0431\u0451\u0440\u0442\u043A\u0430 \u043D\u0430\u0434 trigger \u0441 hover/focus."
      }
    },
    layout: "centered"
  },
  argTypes: {
    position: { control: "select", options: ["top", "bottom", "left", "right"], description: "\u041F\u043E\u0437\u0438\u0446\u0438\u044F \u043F\u0443\u0437\u044B\u0440\u044C\u043A\u0430" },
    appearance: { control: "select", options: ["base", "success", "warning", "danger"], description: "\u0412\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C. base = \u0438\u043D\u0432\u0435\u0440\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 (\u0442\u0451\u043C\u043D\u044B\u0439 \u043D\u0430 \u0441\u0432\u0435\u0442\u043B\u043E\u043C / \u0441\u0432\u0435\u0442\u043B\u044B\u0439 \u043D\u0430 \u0442\u0451\u043C\u043D\u043E\u043C)" },
    content: { control: "text", description: "\u0422\u0435\u043A\u0441\u0442 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438" }
  },
  args: {
    content: "Tooltip text",
    position: "top",
    appearance: "base"
  }
};
export default meta;
const Default = {
  args: {
    content: "Tooltip text",
    position: "top",
    appearance: "base"
  }
};
const AllAppearances = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 24, padding: 16 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { background: "#F7F8FA", borderRadius: 8, padding: 24, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888", width: "100%" }, children: "Light background (base = dark tooltip)" }),
      ["base", "success", "warning", "danger"].map((a) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsx(TooltipBubble, { content: "Tooltip text", position: "top", appearance: a }),
        /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888" }, children: a })
      ] }, a))
    ] }),
    /* @__PURE__ */ jsxs("div", { "data-theme": "dark", style: { background: "#1A2330", borderRadius: 8, padding: 24, display: "flex", gap: 20, flexWrap: "wrap", alignItems: "flex-end" }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#9AA6B2", width: "100%" }, children: "Dark background (base = light tooltip)" }),
      ["base", "success", "warning", "danger"].map((a) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
        /* @__PURE__ */ jsx(TooltipBubble, { content: "Tooltip text", position: "top", appearance: a }),
        /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#9AA6B2" }, children: a })
      ] }, a))
    ] })
  ] })
};
const AllPositions = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 24, flexWrap: "wrap", alignItems: "center", padding: 16 }, children: ["top", "bottom", "left", "right"].map((p) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ jsx(TooltipBubble, { content: "Tooltip text", position: p, appearance: "base" }),
    /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888" }, children: p })
  ] }, p)) })
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24, padding: 16 }, children: ["top", "bottom", "left", "right"].map((pos) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#666", marginBottom: 8 }, children: [
      "position=",
      pos
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }, children: ["base", "success", "warning", "danger"].map((a) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }, children: [
      /* @__PURE__ */ jsx(TooltipBubble, { content: "Tooltip text", position: pos, appearance: a }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 10, color: "#aaa" }, children: a })
    ] }, a)) })
  ] }, pos)) })
};
const Interactive = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 40, flexWrap: "wrap", padding: 48, alignItems: "center", justifyContent: "center" }, children: [
    /* @__PURE__ */ jsx(Tooltip, { content: "Top tooltip", position: "top", appearance: "base", children: /* @__PURE__ */ jsx(Button, { appearance: "outline", size: "sm", children: "Hover me (top)" }) }),
    /* @__PURE__ */ jsx(Tooltip, { content: "Bottom tooltip", position: "bottom", appearance: "base", children: /* @__PURE__ */ jsx(Button, { appearance: "outline", size: "sm", children: "Hover me (bottom)" }) }),
    /* @__PURE__ */ jsx(Tooltip, { content: "Left tooltip", position: "left", appearance: "base", children: /* @__PURE__ */ jsx(Button, { appearance: "outline", size: "sm", children: "Hover me (left)" }) }),
    /* @__PURE__ */ jsx(Tooltip, { content: "Right tooltip", position: "right", appearance: "base", children: /* @__PURE__ */ jsx(Button, { appearance: "outline", size: "sm", children: "Hover me (right)" }) })
  ] })
};
const InteractiveAppearances = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", padding: 48, alignItems: "center", justifyContent: "center" }, children: ["base", "success", "warning", "danger"].map((a) => /* @__PURE__ */ jsx(Tooltip, { content: `${a} tooltip`, position: "top", appearance: a, children: /* @__PURE__ */ jsx(
    Button,
    {
      appearance: a === "base" ? "outline" : a,
      size: "sm",
      children: a
    }
  ) }, a)) })
};
const WithDelay = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, padding: 48, alignItems: "center", justifyContent: "center" }, children: [
    /* @__PURE__ */ jsx(Tooltip, { content: "No delay", position: "top", appearance: "base", delayMs: 0, children: /* @__PURE__ */ jsx(Button, { appearance: "outline", size: "sm", children: "No delay" }) }),
    /* @__PURE__ */ jsx(Tooltip, { content: "300ms delay", position: "top", appearance: "base", delayMs: 300, children: /* @__PURE__ */ jsx(Button, { appearance: "outline", size: "sm", children: "300ms delay" }) }),
    /* @__PURE__ */ jsx(Tooltip, { content: "600ms delay", position: "top", appearance: "base", delayMs: 600, children: /* @__PURE__ */ jsx(Button, { appearance: "outline", size: "sm", children: "600ms delay" }) })
  ] })
};
const InvertedBase = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 0, borderRadius: 8, overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { flex: 1, background: "#FFFFFF", padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888" }, children: "Light theme" }),
      /* @__PURE__ */ jsx(TooltipBubble, { content: "Tooltip text", position: "top", appearance: "base" }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#aaa" }, children: "dark bubble" })
    ] }),
    /* @__PURE__ */ jsxs("div", { "data-theme": "dark", style: { flex: 1, background: "#1A2330", padding: 32, display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#9AA6B2" }, children: "Dark theme" }),
      /* @__PURE__ */ jsx(TooltipBubble, { content: "Tooltip text", position: "top", appearance: "base" }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#485B76" }, children: "light bubble" })
    ] })
  ] })
};
const LongContent = {
  args: {
    content: "This is a longer tooltip message that wraps",
    position: "top",
    appearance: "base"
  }
};
const Danger = {
  args: {
    content: "Error: invalid value",
    position: "top",
    appearance: "danger"
  }
};
const Success = {
  args: {
    content: "Saved successfully",
    position: "bottom",
    appearance: "success"
  }
};
const Warning = {
  args: {
    content: "Required field",
    position: "right",
    appearance: "warning"
  }
};
export {
  AllAppearances,
  AllPositions,
  Danger,
  Default,
  FullMatrix,
  Interactive,
  InteractiveAppearances,
  InvertedBase,
  LongContent,
  Success,
  Warning,
  WithDelay
};
