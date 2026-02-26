import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Switch } from "./Switch";
const meta = {
  title: "Primitives/Switch",
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: "`@UI/Switch` \u2014 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0430\u0442\u0435\u043B\u044C \u0432\u043A\u043B/\u0432\u044B\u043A\u043B. Pill track + thumb \u0441 \u0430\u043D\u0438\u043C\u0430\u0446\u0438\u0435\u0439 slide.\n\n**\u0420\u0430\u0437\u043C\u0435\u0440\u044B**: xs / sm / md / lg\n\n**\u0420\u0435\u0436\u0438\u043C\u044B**:\n- Uncontrolled: \u043D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0439\u0442\u0435 `state`, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 `defaultChecked`. Switch \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u0441\u0432\u043E\u0438\u043C \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435\u043C \u0441\u0430\u043C.\n- Controlled: \u043F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 `state` (`on`|`off`|`disabled-on`|`disabled-off`).\n\n**`onToggle(checked: boolean)`** \u2014 \u0432\u044B\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u043A\u0430\u0436\u0434\u043E\u043C \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg"], description: "\u0420\u0430\u0437\u043C\u0435\u0440 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430" },
    state: { control: "select", options: ["on", "off", "disabled-on", "disabled-off"], description: "\u041A\u043E\u043D\u0442\u0440\u043E\u043B\u0438\u0440\u0443\u0435\u043C\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435" },
    defaultChecked: { control: "boolean", description: "\u041D\u0430\u0447\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 (uncontrolled)" },
    disabled: { control: "boolean", description: "Disabled" },
    onToggle: { action: "toggled", description: "\u0412\u044B\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u043F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0435\u043D\u0438\u0438" },
    onClick: { action: "clicked" }
  },
  args: {
    size: "md",
    defaultChecked: false
  }
};
export default meta;
const Default = {
  args: { size: "md" }
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 20, alignItems: "center" }, children: ["xs", "sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ jsx(Switch, { size: s, defaultChecked: true }),
    /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888" }, children: s })
  ] }, s)) })
};
const AllStates = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 20, alignItems: "center" }, children: ["on", "off", "disabled-on", "disabled-off"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }, children: [
    /* @__PURE__ */ jsx(Switch, { size: "md", state: s }),
    /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888" }, children: s })
  ] }, s)) })
};
const Interactive = {
  render: () => {
    const [log, setLog] = useState([]);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsx(
        Switch,
        {
          size: "md",
          defaultChecked: false,
          onToggle: (v) => setLog((prev) => [`toggled \u2192 ${v}`, ...prev.slice(0, 4)])
        }
      ),
      /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#888", display: "flex", flexDirection: "column", gap: 2 }, children: log.map((l, i) => /* @__PURE__ */ jsx("span", { children: l }, i)) })
    ] });
  }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 8 }, children: ["xs", "sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, alignItems: "center" }, children: [
    /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#888", width: 24 }, children: s }),
    ["on", "off", "disabled-on", "disabled-off"].map((st) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }, children: [
      /* @__PURE__ */ jsx(Switch, { size: s, state: st }),
      /* @__PURE__ */ jsx("span", { style: { fontSize: 9, color: "#aaa" }, children: st })
    ] }, st))
  ] }, s)) })
};
export {
  AllSizes,
  AllStates,
  Default,
  FullMatrix,
  Interactive
};
