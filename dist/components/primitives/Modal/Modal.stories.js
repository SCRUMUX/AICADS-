import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";
const VARIANTS = ["base", "danger", "warning", "success"];
const SIZES = ["sm", "md", "lg"];
const meta = {
  title: "Primitives/Modal",
  component: Modal,
  parameters: {
    docs: {
      description: {
        component: "`@UI/Modal` \u2014 \u0434\u0438\u0430\u043B\u043E\u0433\u043E\u0432\u043E\u0435 \u043E\u043A\u043D\u043E \u0441 overlay, \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C, \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u043E\u043C \u0438 \u0444\u0443\u0442\u0435\u0440\u043E\u043C \u0441 \u043A\u043D\u043E\u043F\u043A\u0430\u043C\u0438. \u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B: base / danger / warning / success. \u0420\u0430\u0437\u043C\u0435\u0440\u044B: sm / md / lg. Props: `showClose`, `showFooter`, `onClose`, `onConfirm`, `onCancel`, `confirmLoading`."
      }
    },
    layout: "fullscreen"
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS, description: "\u0412\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0432\u0430\u0440\u0438\u0430\u043D\u0442" },
    size: { control: "select", options: SIZES, description: "\u0420\u0430\u0437\u043C\u0435\u0440 \u043F\u0430\u043D\u0435\u043B\u0438" },
    showClose: { control: "boolean", description: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043A\u043D\u043E\u043F\u043A\u0443 \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F \xD7" },
    showFooter: { control: "boolean", description: "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0444\u0443\u0442\u0435\u0440 \u0441 \u043A\u043D\u043E\u043F\u043A\u0430\u043C\u0438" },
    title: { control: "text", description: "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A" },
    cancelLabel: { control: "text", description: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 \u043E\u0442\u043C\u0435\u043D\u044B" },
    confirmLabel: { control: "text", description: "\u0422\u0435\u043A\u0441\u0442 \u043A\u043D\u043E\u043F\u043A\u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u044F" },
    content: { control: "text", description: "\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u043C\u043E\u0434\u0430\u043B\u0430" },
    confirmLoading: { control: "boolean", description: "Confirm \u0432 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0438 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438" },
    cancelButton: { control: false },
    confirmButton: { control: false },
    onClose: { action: "closed", description: "\u0412\u044B\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u0438 (\xD7 \u0438\u043B\u0438 overlay)" },
    onConfirm: { action: "confirmed", description: "\u0412\u044B\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0435\u043D\u0438\u0438" },
    onCancel: { action: "cancelled", description: "\u0412\u044B\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u043E\u0442\u043C\u0435\u043D\u0435" }
  }
};
export default meta;
const ModalDemo = ({
  variant = "base",
  size = "md",
  title = "Modal title",
  content = "Modal content.",
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  showClose = true,
  showFooter = true,
  confirmLoading = false
}) => {
  const [open, setOpen] = useState(true);
  return /* @__PURE__ */ jsxs("div", { style: { position: "relative", width: "100%", minHeight: 280, display: "flex", alignItems: "center", justifyContent: "center", background: "#f1f5f9", padding: 24 }, children: [
    !open && /* @__PURE__ */ jsx(Button, { appearance: "brand", size: "sm", onClick: () => setOpen(true), children: "Open modal" }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        variant,
        size,
        open,
        portal: false,
        showClose,
        showFooter,
        title,
        content,
        cancelLabel,
        confirmLabel,
        confirmLoading,
        onClose: () => setOpen(false),
        onConfirm: () => setOpen(false),
        style: { position: "relative" }
      }
    )
  ] });
};
const Default = {
  render: () => /* @__PURE__ */ jsx(
    ModalDemo,
    {
      title: "Modal title",
      content: "Modal content. This is a description of the action being confirmed."
    }
  )
};
const AllVariants = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 24, padding: 24, background: "#f1f5f9" }, children: VARIANTS.map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#666" }, children: [
      "variant=",
      v
    ] }),
    /* @__PURE__ */ jsx(
      ModalDemo,
      {
        variant: v,
        title: `${v.charAt(0).toUpperCase() + v.slice(1)} dialog`,
        content: `This is a ${v} modal. Press \xD7 or Cancel to close.`
      }
    )
  ] }, v)) })
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24, padding: 24, background: "#f1f5f9" }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#666" }, children: [
      "size=",
      s
    ] }),
    /* @__PURE__ */ jsx(ModalDemo, { size: s, title: `Size ${s}`, content: `This modal uses size="${s}".` })
  ] }, s)) })
};
const NoCloseButton = {
  render: () => /* @__PURE__ */ jsx(
    ModalDemo,
    {
      title: "Confirm action",
      content: "This modal has no \xD7 button. Close it with Cancel.",
      showClose: false
    }
  )
};
const NoFooter = {
  render: () => /* @__PURE__ */ jsx(
    ModalDemo,
    {
      title: "Information",
      content: "This modal has no footer buttons. Close it with the \xD7 button.",
      showFooter: false
    }
  )
};
const Danger = {
  render: () => /* @__PURE__ */ jsx(
    ModalDemo,
    {
      variant: "danger",
      title: "Delete item",
      content: "Are you sure you want to delete this item? This action cannot be undone.",
      confirmLabel: "Delete"
    }
  )
};
const ConfirmLoading = {
  render: () => /* @__PURE__ */ jsx(
    ModalDemo,
    {
      title: "Processing...",
      content: "Please wait while we process your request.",
      confirmLabel: "Saving...",
      confirmLoading: true
    }
  )
};
const Interactive = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [variant, setVariant] = useState("base");
    const [log, setLog] = useState([]);
    const addLog = (msg) => setLog((prev) => [...prev.slice(-4), msg]);
    const configs = {
      base: { title: "Confirm action", content: "Are you sure you want to proceed?", confirmLabel: "Confirm" },
      danger: { title: "Delete account", content: "This will permanently delete your account and all data.", confirmLabel: "Delete" },
      warning: { title: "Unsaved changes", content: "Leaving now will discard your unsaved changes.", confirmLabel: "Discard" },
      success: { title: "Publish changes", content: "Your changes will be published immediately.", confirmLabel: "Publish" }
    };
    const cfg = configs[variant];
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 24 }, children: [
      /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, flexWrap: "wrap" }, children: VARIANTS.map((v) => /* @__PURE__ */ jsxs(
        Button,
        {
          appearance: v === "base" ? "brand" : v === "danger" ? "danger" : v === "warning" ? "warning" : "success",
          size: "sm",
          onClick: () => {
            setVariant(v);
            setOpen(true);
          },
          children: [
            "Open ",
            v
          ]
        },
        v
      )) }),
      /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#888", display: "flex", flexDirection: "column", gap: 2 }, children: log.map((l, i) => /* @__PURE__ */ jsx("span", { children: l }, i)) }),
      /* @__PURE__ */ jsx(
        Modal,
        {
          variant,
          open,
          showClose: true,
          showFooter: true,
          title: cfg.title,
          content: cfg.content,
          confirmLabel: cfg.confirmLabel,
          cancelLabel: "Cancel",
          onClose: () => {
            setOpen(false);
            addLog("Closed");
          },
          onConfirm: () => {
            setOpen(false);
            addLog(`Confirmed (${variant})`);
          }
        }
      )
    ] });
  }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { padding: 24, background: "#f1f5f9", display: "flex", flexDirection: "column", gap: 32 }, children: VARIANTS.map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }, children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#666", gridColumn: "1 / -1" }, children: [
      "variant=",
      v
    ] }),
    [
      { label: "close + footer", showClose: true, showFooter: true },
      { label: "close only", showClose: true, showFooter: false },
      { label: "footer only", showClose: false, showFooter: true },
      { label: "minimal", showClose: false, showFooter: false }
    ].map((cfg) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 4 }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 10, color: "#999" }, children: cfg.label }),
      /* @__PURE__ */ jsx(Modal, { variant: v, showClose: cfg.showClose, showFooter: cfg.showFooter, open: true, portal: false, title: "Dialog title", content: "Dialog body.", style: { position: "relative" } })
    ] }, cfg.label))
  ] }, v)) })
};
export {
  AllSizes,
  AllVariants,
  ConfirmLoading,
  Danger,
  Default,
  FullMatrix,
  Interactive,
  NoCloseButton,
  NoFooter
};
