import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { RadioButton } from "./RadioButton";
const SIZES = ["xs", "sm", "md", "lg"];
const STATES = ["base", "filled", "focus", "always-filled", "disabled"];
const meta = {
  title: "Primitives/RadioButton",
  component: RadioButton,
  parameters: {
    docs: {
      description: {
        component: "RadioButton (@UI/RadioButton): \u043A\u0440\u0443\u0433\u043B\u044B\u0439 \u0438\u043D\u0434\u0438\u043A\u0430\u0442\u043E\u0440 \u0432\u044B\u0431\u043E\u0440\u0430. 4 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (xs/sm/md/lg), 5 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0439 (base/filled/focus/always-filled/disabled). Ring: ELLIPSE \u0441 fill + stroke 1px inside. Figma: 160:82848."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES, description: "\u0420\u0430\u0437\u043C\u0435\u0440" },
    state: { control: "select", options: STATES, description: "\u0412\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435" },
    label: { control: "text", description: "\u0422\u0435\u043A\u0441\u0442 \u0440\u044F\u0434\u043E\u043C" },
    disabled: { control: "boolean", description: "Disabled" },
    onChange: { action: "changed", description: "onChange" }
  },
  args: {
    size: "md",
    label: "Option label"
  }
};
export default meta;
const Default = {
  args: { size: "md", label: "Option label" }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16 }, children: STATES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 88, fontSize: 12, color: "var(--color-text-muted)" }, children: s }),
    /* @__PURE__ */ jsx(RadioButton, { ...args, state: s })
  ] }, s)) }),
  args: { size: "md" }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", alignItems: "center", gap: 20, padding: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsx(RadioButton, { ...args, size: s }, s)) }),
  args: { state: "base" }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 16 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "88px repeat(4, 40px)", gap: 12, alignItems: "center" }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "var(--color-text-muted)" }, children: "state \\ size" }),
      SIZES.map((s) => /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "var(--color-text-muted)", textAlign: "center" }, children: s }, s))
    ] }),
    STATES.map((st) => /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "88px repeat(4, 40px)", gap: 12, alignItems: "center" }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: st }),
      SIZES.map((s) => /* @__PURE__ */ jsx("div", { style: { display: "flex", justifyContent: "center" }, children: /* @__PURE__ */ jsx(RadioButton, { size: s, state: st }) }, s))
    ] }, st))
  ] })
};
const WithLabel = {
  render: (args) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16 }, children: [
    /* @__PURE__ */ jsx(RadioButton, { ...args, state: "base", label: "\u041D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E" }),
    /* @__PURE__ */ jsx(RadioButton, { ...args, state: "filled", label: "\u0412\u044B\u0431\u0440\u0430\u043D\u043E" }),
    /* @__PURE__ */ jsx(RadioButton, { ...args, state: "disabled", label: "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E" })
  ] }),
  args: { size: "md" }
};
const RadioGroup = {
  render: (args) => {
    const [selected, setSelected] = useState("option1");
    const options = [
      { value: "option1", label: "\u041E\u043F\u0446\u0438\u044F 1" },
      { value: "option2", label: "\u041E\u043F\u0446\u0438\u044F 2" },
      { value: "option3", label: "\u041E\u043F\u0446\u0438\u044F 3" },
      { value: "option4", label: "\u041D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0430\u044F \u043E\u043F\u0446\u0438\u044F", disabled: true }
    ];
    return /* @__PURE__ */ jsxs("fieldset", { style: { border: "none", padding: 16, display: "flex", flexDirection: "column", gap: 10 }, children: [
      /* @__PURE__ */ jsx("legend", { style: { fontSize: 14, fontWeight: 600, marginBottom: 8, color: "var(--color-text-primary)" }, children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0432\u0430\u0440\u0438\u0430\u043D\u0442" }),
      options.map((opt) => /* @__PURE__ */ jsx(
        RadioButton,
        {
          ...args,
          name: "demo-group",
          value: opt.value,
          checked: selected === opt.value,
          disabled: opt.disabled,
          label: opt.label,
          onChange: () => setSelected(opt.value),
          state: opt.disabled ? "disabled" : selected === opt.value ? "always-filled" : "base"
        },
        opt.value
      ))
    ] });
  },
  args: { size: "md" }
};
export {
  AllSizes,
  AllStates,
  Default,
  FullMatrix,
  RadioGroup,
  WithLabel
};
