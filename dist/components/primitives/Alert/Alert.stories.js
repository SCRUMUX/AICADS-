import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Alert } from "./Alert";
import { ExclamationDiamondFillIcon } from "../../icons";
import { Button } from "../Button/Button";
const APPEARANCES = ["warning", "info", "danger", "success"];
const VARIANTS = ["basic", "leftBorder", "topBorder", "solid"];
const meta = {
  title: "Primitives/Alert",
  component: Alert,
  parameters: {
    docs: { description: { component: "Alert: \u0438\u043A\u043E\u043D\u043A\u0430 \u0441\u043B\u0435\u0432\u0430, \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A, \u043F\u0430\u0440\u0430\u0433\u0440\u0430\u0444, \u043A\u043D\u043E\u043F\u043A\u0430 \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u044F (\xD7). \u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B appearance (warning, info, danger, success), variant (basic, leftBorder, topBorder, solid). \u041F\u0440\u043E\u043F `onClose` \u0434\u0435\u043B\u0430\u0435\u0442 \xD7 \u043A\u043B\u0438\u043A\u0430\u0431\u0435\u043B\u044C\u043D\u044B\u043C, `open` \u0443\u043F\u0440\u0430\u0432\u043B\u044F\u0435\u0442 \u0432\u0438\u0434\u0438\u043C\u043E\u0441\u0442\u044C\u044E." } }
  },
  argTypes: {
    appearance: { control: "select", options: APPEARANCES },
    variant: { control: "select", options: VARIANTS },
    showLeftIcon: { control: "boolean" },
    showTitle: { control: "boolean" },
    showParagraph: { control: "boolean" },
    title: { control: "text" },
    paragraph: { control: "text" },
    onClose: { action: "closed" }
  }
};
export default meta;
const leftIcon = /* @__PURE__ */ jsx(ExclamationDiamondFillIcon, { style: { width: "100%", height: "100%" } });
const Default = {
  args: {
    appearance: "warning",
    variant: "basic",
    iconLeft: leftIcon,
    showLeftIcon: true,
    title: "Alert title",
    paragraph: "Alert description or additional context."
  }
};
const Dismissible = {
  render: () => {
    const [open, setOpen] = useState(true);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16 }, children: [
      !open && /* @__PURE__ */ jsx(Button, { size: "sm", appearance: "ghost", onClick: () => setOpen(true), children: "Show alert again" }),
      /* @__PURE__ */ jsx(
        Alert,
        {
          appearance: "warning",
          variant: "basic",
          iconLeft: leftIcon,
          showLeftIcon: true,
          title: "Dismissible alert",
          paragraph: "Click the \xD7 to close this alert.",
          open,
          onClose: () => setOpen(false)
        }
      )
    ] });
  }
};
const AllAppearances = {
  render: () => {
    const [hidden, setHidden] = useState({});
    const allHidden = APPEARANCES.every((a) => hidden[a]);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16 }, children: [
      allHidden && /* @__PURE__ */ jsx(Button, { size: "sm", appearance: "ghost", onClick: () => setHidden({}), children: "Show all alerts" }),
      APPEARANCES.map((a) => /* @__PURE__ */ jsx(
        Alert,
        {
          appearance: a,
          variant: "basic",
          iconLeft: leftIcon,
          showLeftIcon: true,
          title: `${a.charAt(0).toUpperCase() + a.slice(1)} alert`,
          paragraph: "Alert description or additional context.",
          open: !hidden[a],
          onClose: () => setHidden((prev) => ({ ...prev, [a]: true }))
        },
        a
      ))
    ] });
  }
};
const AllVariants = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16 }, children: VARIANTS.map((v) => /* @__PURE__ */ jsx(
    Alert,
    {
      ...args,
      variant: v,
      iconLeft: leftIcon,
      showLeftIcon: true,
      title: `variant="${v}"`,
      paragraph: "Alert description or additional context."
    },
    v
  )) }),
  args: { appearance: "warning" }
};
const AllAppearancesAllVariants = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24, padding: 16 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12 }, children: VARIANTS.map((v) => /* @__PURE__ */ jsx(
    Alert,
    {
      appearance: a,
      variant: v,
      iconLeft: leftIcon,
      showLeftIcon: true,
      title: `${a} / ${v}`,
      paragraph: "Alert description."
    },
    `${a}-${v}`
  )) }, a)) })
};
export {
  AllAppearances,
  AllAppearancesAllVariants,
  AllVariants,
  Default,
  Dismissible
};
