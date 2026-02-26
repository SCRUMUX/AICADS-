import { jsx, jsxs } from "react/jsx-runtime";
import { Toast, Toaster, toast } from "./Toast";
import { Button } from "../Button/Button";
const InfoIcon = () => /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", children: [
  /* @__PURE__ */ jsx("circle", { cx: "10", cy: "10", r: "8", stroke: "currentColor", strokeWidth: "1.5" }),
  /* @__PURE__ */ jsx("path", { d: "M10 9v4M10 7h.01", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
] });
const CheckCircle = () => /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", children: [
  /* @__PURE__ */ jsx("circle", { cx: "10", cy: "10", r: "8", stroke: "currentColor", strokeWidth: "1.5" }),
  /* @__PURE__ */ jsx("path", { d: "M7 10l2 2 4-4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })
] });
const WarningIcon = () => /* @__PURE__ */ jsxs("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", children: [
  /* @__PURE__ */ jsx("path", { d: "M10 3L2 17h16L10 3z", stroke: "currentColor", strokeWidth: "1.5", strokeLinejoin: "round" }),
  /* @__PURE__ */ jsx("path", { d: "M10 8v4M10 14h.01", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
] });
const meta = {
  title: "Primitives/Toast",
  component: Toast,
  parameters: {
    docs: {
      description: {
        component: "`Toast` \u2014 transient notification. Appearances: info, success, warning, danger. Auto-dismisses after a configurable duration. Use `Toaster` + `toast()` for imperative API."
      }
    }
  },
  argTypes: {
    appearance: { control: "select", options: ["info", "success", "warning", "danger"] },
    title: { control: "text" },
    description: { control: "text" },
    showClose: { control: "boolean" },
    duration: { control: "number" },
    open: { control: "boolean" },
    icon: { control: false }
  }
};
export default meta;
const Default = {
  args: {
    appearance: "info",
    title: "Information",
    description: "This is an informational notification.",
    showClose: true,
    open: true,
    duration: 0,
    icon: /* @__PURE__ */ jsx(InfoIcon, {})
  }
};
const AllAppearances = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
    { appearance: "info", title: "Info", desc: "Something happened.", icon: /* @__PURE__ */ jsx(InfoIcon, {}) },
    { appearance: "success", title: "Success", desc: "Operation completed.", icon: /* @__PURE__ */ jsx(CheckCircle, {}) },
    { appearance: "warning", title: "Warning", desc: "Please review this.", icon: /* @__PURE__ */ jsx(WarningIcon, {}) },
    { appearance: "danger", title: "Error", desc: "Something went wrong.", icon: /* @__PURE__ */ jsx(WarningIcon, {}) }
  ].map((t) => /* @__PURE__ */ jsx(
    Toast,
    {
      appearance: t.appearance,
      title: t.title,
      description: t.desc,
      icon: t.icon,
      showClose: true,
      duration: 0,
      onClose: () => {
      }
    },
    t.appearance
  )) })
};
const WithoutIcon = {
  args: {
    appearance: "success",
    title: "Saved",
    description: "Your changes have been saved.",
    showClose: true,
    open: true,
    duration: 0
  }
};
const TitleOnly = {
  args: {
    appearance: "warning",
    title: "Connection lost",
    showClose: true,
    open: true,
    duration: 0,
    icon: /* @__PURE__ */ jsx(WarningIcon, {})
  }
};
const ImperativeAPI = {
  render: () => {
    const appearances = ["info", "success", "warning", "danger"];
    const icons = { info: /* @__PURE__ */ jsx(InfoIcon, {}), success: /* @__PURE__ */ jsx(CheckCircle, {}), warning: /* @__PURE__ */ jsx(WarningIcon, {}), danger: /* @__PURE__ */ jsx(WarningIcon, {}) };
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: [
      /* @__PURE__ */ jsx(Toaster, { position: "top-right" }),
      appearances.map((a) => /* @__PURE__ */ jsxs(
        Button,
        {
          appearance: "base",
          size: "sm",
          onClick: () => toast({
            appearance: a,
            title: `${a.charAt(0).toUpperCase() + a.slice(1)} toast`,
            description: `This is a ${a} notification.`,
            icon: icons[a],
            showClose: true,
            duration: 4e3
          }),
          children: [
            "Show ",
            a
          ]
        },
        a
      ))
    ] });
  }
};
export {
  AllAppearances,
  Default,
  ImperativeAPI,
  TitleOnly,
  WithoutIcon
};
