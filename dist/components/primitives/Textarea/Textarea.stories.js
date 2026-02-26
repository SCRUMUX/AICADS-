import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Textarea } from "./Textarea";
const SIZES = ["sm", "md", "lg"];
const STATES = ["base", "hover", "focus", "disabled"];
const meta = {
  title: "Primitives/Textarea",
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: "Textarea (@UI/Textarea): \u043C\u043D\u043E\u0433\u043E\u0441\u0442\u0440\u043E\u0447\u043D\u043E\u0435 \u043F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430. 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 4 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F (base/hover/focus/disabled). cornerRadius=2px. Resizer \u0438\u043A\u043E\u043D\u043A\u0430 \u0432 \u043F\u0440\u0430\u0432\u043E\u043C \u043D\u0438\u0436\u043D\u0435\u043C \u0443\u0433\u043B\u0443. Figma: 160:85023."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES },
    state: { control: "select", options: STATES },
    disabled: { control: "boolean" },
    readOnly: { control: "boolean", description: "\u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u0435\u043D\u0438\u0435" },
    invalid: { control: "boolean", description: "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435" },
    resize: { control: "select", options: ["none", "vertical", "horizontal", "both"], description: "\u0420\u0435\u0441\u0430\u0439\u0437" },
    showCharCount: { control: "boolean", description: "\u0421\u0447\u0451\u0442\u0447\u0438\u043A \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432" },
    maxLength: { control: "number", description: "\u041C\u0430\u043A\u0441. \u0434\u043B\u0438\u043D\u0430" },
    rows: { control: "number", description: "\u041A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E \u0441\u0442\u0440\u043E\u043A" },
    placeholder: { control: "text" }
  },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24, maxWidth: 400 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
export default meta;
const Default = {
  render: (args) => {
    const [val, setVal] = useState("");
    return /* @__PURE__ */ jsx(
      Textarea,
      {
        ...args,
        value: val,
        onChange: (e) => setVal(e.target.value)
      }
    );
  },
  args: { size: "md", placeholder: "Enter text..." }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 24, fontSize: 12, color: "var(--color-text-muted)", paddingTop: 8, flexShrink: 0 }, children: s }),
    /* @__PURE__ */ jsx(Textarea, { ...args, size: s })
  ] }, s)) }),
  args: { placeholder: "Enter text..." }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: STATES.map((st) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 56, fontSize: 12, color: "var(--color-text-muted)", paddingTop: 8, flexShrink: 0 }, children: st }),
    /* @__PURE__ */ jsx(Textarea, { ...args, state: st })
  ] }, st)) }),
  args: { size: "md", placeholder: "Enter text..." }
};
const WithValue = {
  render: (args) => {
    const [val, setVal] = useState("This is some example text that shows how the textarea looks with content inside it.");
    return /* @__PURE__ */ jsx(
      Textarea,
      {
        ...args,
        value: val,
        onChange: (e) => setVal(e.target.value)
      }
    );
  },
  args: { size: "md" }
};
const Disabled = {
  render: (args) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
    /* @__PURE__ */ jsx(Textarea, { ...args, disabled: true, placeholder: "Disabled (empty)" }),
    /* @__PURE__ */ jsx(Textarea, { ...args, disabled: true, value: "Disabled with content" })
  ] }),
  args: { size: "md" }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsxs("div", { style: {
      fontSize: 11,
      fontWeight: 600,
      color: "var(--color-text-muted)",
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: STATES.map((st) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 }, children: [
      /* @__PURE__ */ jsx("span", { style: { width: 56, fontSize: 12, color: "var(--color-text-muted)", paddingTop: 6, flexShrink: 0 }, children: st }),
      /* @__PURE__ */ jsx("div", { style: { width: 280 }, children: /* @__PURE__ */ jsx(Textarea, { size: s, state: st, placeholder: "Enter text..." }) })
    ] }, st)) })
  ] }, s)) })
};
export {
  AllSizes,
  AllStates,
  Default,
  Disabled,
  FullMatrix,
  WithValue
};
