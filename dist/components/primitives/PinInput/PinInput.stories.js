import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { PinInput } from "./PinInput";
const SIZES = ["sm", "md", "lg"];
const STATES = ["unfilled", "filled", "error", "disabled"];
const meta = {
  title: "Primitives/PinInput",
  component: PinInput,
  parameters: {
    docs: {
      description: {
        component: "PinInput (@UI/PinInput): 6 \u043A\u0432\u0430\u0434\u0440\u0430\u0442\u043D\u044B\u0445 \u044F\u0447\u0435\u0435\u043A \u0441 \u0442\u043E\u0447\u043A\u043E\u0439 \u0432\u043D\u0443\u0442\u0440\u0438. 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 4 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F (unfilled/filled/error/disabled). \u041F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u0432\u0432\u043E\u0434 \u0441 \u043A\u043B\u0430\u0432\u0438\u0430\u0442\u0443\u0440\u044B, \u0432\u0441\u0442\u0430\u0432\u043A\u0443 \u0447\u0435\u0440\u0435\u0437 paste, \u043C\u0430\u0441\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435. Figma: 160:82793."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES },
    state: { control: "select", options: STATES },
    length: { control: { type: "number", min: 4, max: 8 } },
    mask: { control: "boolean" }
  }
};
export default meta;
const Default = {
  render: (args) => {
    const [val, setVal] = useState("");
    return /* @__PURE__ */ jsx(PinInput, { ...args, value: val, onChange: setVal });
  },
  args: { size: "md", state: "unfilled", mask: true, length: 6 }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 16 }, children: STATES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 64, fontSize: 12, color: "var(--color-text-muted)" }, children: s }),
    /* @__PURE__ */ jsx(PinInput, { ...args, state: s })
  ] }, s)) }),
  args: { size: "sm", mask: true, length: 6 }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 24, fontSize: 12, color: "var(--color-text-muted)" }, children: s }),
    /* @__PURE__ */ jsx(PinInput, { ...args, size: s })
  ] }, s)) }),
  args: { state: "unfilled", mask: true, length: 6 }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 20, padding: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }, children: [
      "size=",
      s
    ] }),
    STATES.map((st) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 16 }, children: [
      /* @__PURE__ */ jsx("span", { style: { width: 64, fontSize: 12, color: "var(--color-text-muted)" }, children: st }),
      /* @__PURE__ */ jsx(PinInput, { size: s, state: st, mask: true, length: 6 })
    ] }, st))
  ] }, s)) })
};
const Unmasked = {
  render: (args) => {
    const [val, setVal] = useState("");
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16 }, children: [
      /* @__PURE__ */ jsx(PinInput, { ...args, value: val, onChange: setVal, mask: false }),
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: [
        "\u0417\u043D\u0430\u0447\u0435\u043D\u0438\u0435: ",
        /* @__PURE__ */ jsx("code", { children: val || "(\u043F\u0443\u0441\u0442\u043E)" })
      ] })
    ] });
  },
  args: { size: "md", state: "unfilled", length: 6 }
};
const WithOnComplete = {
  render: (args) => {
    const [val, setVal] = useState("");
    const [completed, setCompleted] = useState(false);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16 }, children: [
      /* @__PURE__ */ jsx(
        PinInput,
        {
          ...args,
          value: val,
          onChange: (v) => {
            setVal(v);
            setCompleted(false);
          },
          onComplete: () => setCompleted(true),
          state: completed ? "filled" : "unfilled"
        }
      ),
      /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: completed ? "var(--color-success-base)" : "var(--color-text-muted)" }, children: completed ? "\u2713 \u041A\u043E\u0434 \u0432\u0432\u0435\u0434\u0451\u043D \u043F\u043E\u043B\u043D\u043E\u0441\u0442\u044C\u044E" : `\u0412\u0432\u0435\u0434\u0438\u0442\u0435 ${args.length ?? 6}-\u0437\u043D\u0430\u0447\u043D\u044B\u0439 \u043A\u043E\u0434` })
    ] });
  },
  args: { size: "md", mask: true, length: 6 }
};
const ErrorState = {
  render: (args) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8, padding: 16 }, children: [
    /* @__PURE__ */ jsx(PinInput, { ...args, state: "error" }),
    /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "var(--color-danger-base)" }, children: "\u041D\u0435\u0432\u0435\u0440\u043D\u044B\u0439 \u043A\u043E\u0434. \u041F\u043E\u043F\u0440\u043E\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437." })
  ] }),
  args: { size: "md", mask: true, length: 6 }
};
export {
  AllSizes,
  AllStates,
  Default,
  ErrorState,
  FullMatrix,
  Unmasked,
  WithOnComplete
};
