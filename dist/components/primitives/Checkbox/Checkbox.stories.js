import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Checkbox } from "./Checkbox";
const SIZES = ["xs", "sm", "md", "lg"];
const STATES = [
  "unchecked",
  "checked",
  "indeterminate",
  "exclude",
  "focus-unchecked",
  "focus-checked",
  "focus-exclude",
  "disabled-unchecked",
  "disabled-checked",
  "disabled-indeterminate",
  "disabled-exclude"
];
const meta = {
  title: "Primitives/Checkbox",
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: '`@UI/Checkbox` \u2014 \u043A\u0432\u0430\u0434\u0440\u0430\u0442\u043D\u044B\u0439 \u044D\u043B\u0435\u043C\u0435\u043D\u0442 \u0432\u044B\u0431\u043E\u0440\u0430. 4 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (xs/sm/md/lg), 11 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0439. cornerRadius=2px.\n\n**\u0420\u0435\u0436\u0438\u043C\u044B**:\n- Uncontrolled: \u043D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u0432\u0430\u0439\u0442\u0435 `checked`, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 `defaultChecked`.\n- Controlled: \u043F\u0435\u0440\u0435\u0434\u0430\u0439\u0442\u0435 `checked` + `onChange`.\n\n**`indeterminate`** \u2014 \u0447\u0430\u0441\u0442\u0438\u0447\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 (\u043F\u043B\u044E\u0441, `aria-checked="mixed"`).\n\n**`exclude`** \u2014 \u0440\u0435\u0436\u0438\u043C "\u043A\u0440\u043E\u043C\u0435" (\u043C\u0438\u043D\u0443\u0441, \u0437\u0430\u0447\u0451\u0440\u043A\u043D\u0443\u0442\u044B\u0439 label).\n\n**`label`** \u2014 \u0442\u0435\u043A\u0441\u0442 \u0440\u044F\u0434\u043E\u043C \u0441 \u0447\u0435\u043A\u0431\u043E\u043A\u0441\u043E\u043C.'
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES, description: "\u0420\u0430\u0437\u043C\u0435\u0440" },
    state: { control: "select", options: STATES, description: "\u0412\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 (override)" },
    label: { control: "text", description: "\u0422\u0435\u043A\u0441\u0442 \u0440\u044F\u0434\u043E\u043C" },
    disabled: { control: "boolean", description: "Disabled" },
    defaultChecked: { control: "boolean", description: "\u041D\u0430\u0447\u0430\u043B\u044C\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 (uncontrolled)" },
    indeterminate: { control: "boolean", description: "Indeterminate (\u043F\u043B\u044E\u0441)" },
    exclude: { control: "boolean", description: "Exclude mode (\u043C\u0438\u043D\u0443\u0441, \u0437\u0430\u0447\u0451\u0440\u043A\u043D\u0443\u0442\u044B\u0439 label)" },
    onChange: { action: "changed", description: "\u0412\u044B\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0438" }
  },
  args: {
    size: "md",
    label: "Checkbox label"
  }
};
export default meta;
const Default = {
  args: { size: "md", label: "Checkbox label" }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 10, padding: 16 }, children: STATES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 140, fontSize: 12, color: "var(--color-text-muted)" }, children: s }),
    /* @__PURE__ */ jsx(Checkbox, { ...args, state: s })
  ] }, s)) }),
  args: { size: "md" }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", gap: 20, padding: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsx(Checkbox, { ...args, size: s }, s)) }),
  args: { state: "checked" }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { overflowX: "auto", padding: 16 }, children: /* @__PURE__ */ jsxs("table", { style: { borderCollapse: "separate", borderSpacing: "12px 8px" }, children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { style: { fontSize: 11, color: "var(--color-text-muted)", textAlign: "left", paddingRight: 16 }, children: "state \\ size" }),
      SIZES.map((s) => /* @__PURE__ */ jsx("th", { style: { fontSize: 11, color: "var(--color-text-muted)", textAlign: "center", width: 40 }, children: s }, s))
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: STATES.map((st) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { style: { fontSize: 12, color: "var(--color-text-muted)", whiteSpace: "nowrap" }, children: st }),
      SIZES.map((s) => /* @__PURE__ */ jsx("td", { style: { textAlign: "center" }, children: /* @__PURE__ */ jsx(Checkbox, { size: s, state: st }) }, s))
    ] }, st)) })
  ] }) })
};
const WithLabel = {
  render: (args) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10, padding: 16 }, children: [
    /* @__PURE__ */ jsx(Checkbox, { ...args, state: "unchecked", label: "\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E" }),
    /* @__PURE__ */ jsx(Checkbox, { ...args, state: "checked", label: "\u0412\u044B\u0431\u0440\u0430\u043D\u043E" }),
    /* @__PURE__ */ jsx(Checkbox, { ...args, state: "indeterminate", label: "\u0427\u0430\u0441\u0442\u0438\u0447\u043D\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043E (+)" }),
    /* @__PURE__ */ jsx(Checkbox, { ...args, state: "exclude", label: "\u041A\u0440\u043E\u043C\u0435 (\u2212)" }),
    /* @__PURE__ */ jsx(Checkbox, { ...args, state: "disabled-unchecked", label: "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E" }),
    /* @__PURE__ */ jsx(Checkbox, { ...args, state: "disabled-exclude", label: "\u041A\u0440\u043E\u043C\u0435 \u2014 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E" })
  ] }),
  args: { size: "md" }
};
const TriStateCycle = {
  render: (args) => {
    const [phase, setPhase] = useState("off");
    const cycle = () => setPhase((p) => p === "off" ? "on" : p === "on" ? "exclude" : "off");
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, display: "flex", flexDirection: "column", gap: 12 }, children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "\u041D\u0430\u0436\u0438\u043C\u0430\u0439\u0442\u0435 \u043D\u0430 \u0447\u0435\u043A\u0431\u043E\u043A\u0441: unchecked \u2192 checked \u2192 exclude \u2192 unchecked" }),
      /* @__PURE__ */ jsx(
        Checkbox,
        {
          ...args,
          checked: phase === "on",
          exclude: phase === "exclude",
          label: phase === "off" ? "\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E" : phase === "on" ? "\u0412\u044B\u0431\u0440\u0430\u043D\u043E" : "\u041A\u0440\u043E\u043C\u0435",
          onChange: cycle
        }
      ),
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 11, color: "var(--color-text-muted)" }, children: [
        "\u0422\u0435\u043A\u0443\u0449\u0435\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435: ",
        /* @__PURE__ */ jsx("strong", { children: phase })
      ] })
    ] });
  },
  args: { size: "md" }
};
const CheckboxGroup = {
  render: (args) => {
    const [values, setValues] = useState({ apple: true, banana: false, cherry: true });
    const allChecked = Object.values(values).every(Boolean);
    const someChecked = Object.values(values).some(Boolean);
    const toggleAll = () => {
      const next = !allChecked;
      setValues({ apple: next, banana: next, cherry: next });
    };
    return /* @__PURE__ */ jsxs("fieldset", { style: { border: "none", padding: 16, display: "flex", flexDirection: "column", gap: 10 }, children: [
      /* @__PURE__ */ jsx("legend", { style: { fontSize: 14, fontWeight: 600, marginBottom: 8, color: "var(--color-text-primary)" }, children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0440\u0443\u043A\u0442\u044B" }),
      /* @__PURE__ */ jsx(
        Checkbox,
        {
          ...args,
          indeterminate: someChecked && !allChecked,
          checked: allChecked,
          state: someChecked && !allChecked ? "indeterminate" : allChecked ? "checked" : "unchecked",
          label: "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435",
          onChange: toggleAll
        }
      ),
      /* @__PURE__ */ jsx("div", { style: { paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }, children: Object.keys(values).map((key) => /* @__PURE__ */ jsx(
        Checkbox,
        {
          ...args,
          checked: values[key],
          state: values[key] ? "checked" : "unchecked",
          label: key.charAt(0).toUpperCase() + key.slice(1),
          onChange: () => setValues((prev) => ({ ...prev, [key]: !prev[key] }))
        },
        key
      )) })
    ] });
  },
  args: { size: "md" }
};
export {
  AllSizes,
  AllStates,
  CheckboxGroup,
  Default,
  FullMatrix,
  TriStateCycle,
  WithLabel
};
