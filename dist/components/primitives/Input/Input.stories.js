import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Input } from "./Input";
import { BellIcon, SearchIcon, CloseXIcon } from "../../icons";
import { Badge } from "../Badge/Badge";
import { Tag } from "../Tag/Tag";
const icon1 = /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } });
const icon2 = /* @__PURE__ */ jsx(BellIcon, { style: { width: "100%", height: "100%" } });
const iconClear = /* @__PURE__ */ jsx(CloseXIcon, { style: { width: "100%", height: "100%" } });
const APPEARANCES = ["brand", "base", "ghost", "outline"];
const SIZES = ["sm", "md", "lg"];
const STATES = ["base", "hover", "focus", "filled", "disabled"];
const meta = {
  title: "Primitives/Input",
  component: Input,
  parameters: {
    docs: {
      description: {
        component: "`@UI/Input` \u2014 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u043E\u0435 \u043F\u043E\u043B\u0435. appearance: brand / base / ghost / outline.\n\nGhost \u2014 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0438\u0436\u043D\u0438\u0439 \u0431\u043E\u0440\u0434\u0435\u0440. \u0420\u0430\u0437\u043C\u0435\u0440\u044B sm/md/lg.\n\n\u041E\u043F\u0446\u0438\u043E\u043D\u0430\u043B\u044C\u043D\u043E: 2 \u0438\u043A\u043E\u043D\u043A\u0438 \u0441\u043B\u0435\u0432\u0430, Badge, TagRow, 2 \u0438\u043A\u043E\u043D\u043A\u0438 \u0441\u043F\u0440\u0430\u0432\u0430."
      }
    }
  },
  argTypes: {
    appearance: { control: "select", options: APPEARANCES, description: "\u0412\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C" },
    size: { control: "select", options: SIZES, description: "\u0420\u0430\u0437\u043C\u0435\u0440" },
    state: { control: "select", options: STATES, description: "\u041F\u0440\u0438\u043D\u0443\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435" },
    showIconLeft1: { control: "boolean", description: "\u0418\u043A\u043E\u043D\u043A\u0430 1 \u0441\u043B\u0435\u0432\u0430" },
    showIconLeft2: { control: "boolean", description: "\u0418\u043A\u043E\u043D\u043A\u0430 2 \u0441\u043B\u0435\u0432\u0430" },
    showBadge: { control: "boolean", description: "\u0411\u0435\u0439\u0434\u0436" },
    showTagRow: { control: "boolean", description: "\u0422\u044D\u0433\u0438" },
    showIconRight1: { control: "boolean", description: "\u0418\u043A\u043E\u043D\u043A\u0430 1 \u0441\u043F\u0440\u0430\u0432\u0430" },
    showIconRight2: { control: "boolean", description: "\u0418\u043A\u043E\u043D\u043A\u0430 2 \u0441\u043F\u0440\u0430\u0432\u0430" },
    placeholder: { control: "text", description: "Placeholder" },
    disabled: { control: "boolean", description: "\u0417\u0430\u0431\u043B\u043E\u043A\u0438\u0440\u043E\u0432\u0430\u043D\u043E" },
    readOnly: { control: "boolean", description: "\u0422\u043E\u043B\u044C\u043A\u043E \u0447\u0442\u0435\u043D\u0438\u0435" },
    invalid: { control: "boolean", description: "\u041D\u0435\u0432\u0430\u043B\u0438\u0434\u043D\u043E\u0435 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435 (danger border)" },
    showClearButton: { control: "boolean", description: "\u041A\u043D\u043E\u043F\u043A\u0430 \u043E\u0447\u0438\u0441\u0442\u043A\u0438" },
    clearAlwaysVisible: { control: "boolean", description: "\u041A\u043D\u043E\u043F\u043A\u0430 \u043E\u0447\u0438\u0441\u0442\u043A\u0438 \u0432\u0441\u0435\u0433\u0434\u0430 \u0432\u0438\u0434\u043D\u0430" },
    fullWidth: { control: "boolean", description: "\u0420\u0430\u0441\u0442\u044F\u043D\u0443\u0442\u044C \u043D\u0430 \u0448\u0438\u0440\u0438\u043D\u0443 \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440\u0430" },
    badge: { control: false },
    tagRow: { control: false },
    iconLeft1: { control: false },
    iconLeft2: { control: false },
    iconRight1: { control: false },
    iconRight2: { control: false },
    onChange: { action: "changed", description: "onChange" },
    onFocus: { action: "focused", description: "onFocus" },
    onBlur: { action: "blurred", description: "onBlur" }
  },
  args: {
    appearance: "base",
    size: "md",
    placeholder: "Placeholder text",
    showIconLeft1: false,
    showIconLeft2: false,
    showBadge: false,
    showTagRow: false,
    showIconRight1: false,
    showIconRight2: false
  }
};
export default meta;
const Default = {
  args: {
    placeholder: "Placeholder text",
    appearance: "base",
    size: "md",
    iconLeft1: icon1,
    showIconLeft1: true,
    iconRight1: iconClear,
    showIconRight1: true
  }
};
const WithAllSlots = {
  args: {
    placeholder: "Placeholder",
    appearance: "base",
    size: "md",
    iconLeft1: icon1,
    iconLeft2: icon2,
    iconRight1: iconClear,
    iconRight2: icon2,
    badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "5" }),
    tagRow: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Tag, { appearance: "base", size: "sm", children: "Tag 1" }),
      /* @__PURE__ */ jsx(Tag, { appearance: "base", size: "sm", children: "Tag 2" })
    ] }),
    showIconLeft1: true,
    showIconLeft2: false,
    showBadge: false,
    showTagRow: false,
    showIconRight1: true,
    showIconRight2: false
  }
};
const AllAppearances = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8, padding: 16 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsx(Input, { ...args, appearance: a, placeholder: a }, a)) }),
  args: {
    size: "md",
    iconLeft1: icon1,
    showIconLeft1: true,
    iconRight1: iconClear,
    showIconRight1: true
  }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8, padding: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsx(Input, { ...args, size: s, placeholder: `Size ${s}` }, s)) }),
  args: {
    appearance: "base",
    iconLeft1: icon1,
    showIconLeft1: true,
    iconRight1: iconClear,
    showIconRight1: true
  }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8, padding: 16 }, children: STATES.map((st) => /* @__PURE__ */ jsx(Input, { ...args, state: st, placeholder: `State: ${st}` }, st)) }),
  args: {
    appearance: "base",
    size: "md",
    iconLeft1: icon1,
    showIconLeft1: true,
    iconRight1: iconClear,
    showIconRight1: true
  }
};
const AllAppearancesAllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: `repeat(${STATES.length}, 200px)`, gap: 6, padding: 16 }, children: APPEARANCES.flatMap(
    (a) => STATES.map((st) => /* @__PURE__ */ jsx(Input, { ...args, appearance: a, state: st, placeholder: `${a} / ${st}` }, a + st))
  ) }),
  args: {
    size: "sm",
    iconLeft1: icon1,
    showIconLeft1: true
  }
};
const GhostVariant = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8, padding: 16 }, children: STATES.map((st) => /* @__PURE__ */ jsx(Input, { ...args, appearance: "ghost", state: st, placeholder: `ghost / ${st}` }, st)) }),
  args: {
    size: "md",
    iconLeft1: icon1,
    showIconLeft1: true,
    iconRight1: iconClear,
    showIconRight1: true
  }
};
const WithClearButton = {
  render: () => {
    const [value, setValue] = React.useState("Clear me");
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16, maxWidth: 320 }, children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "showClearButton \u2014 appears on hover when input has value" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          size: "md",
          appearance: "base",
          value,
          onChange: (e) => setValue(e.target.value),
          showClearButton: true,
          onClear: () => setValue(""),
          placeholder: "Type something..."
        }
      )
    ] });
  }
};
const ClearAlwaysVisible = {
  render: () => {
    const [value, setValue] = React.useState("Always visible clear");
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16, maxWidth: 320 }, children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "clearAlwaysVisible \u2014 clear button stays visible without hover" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          size: "md",
          appearance: "base",
          value,
          onChange: (e) => setValue(e.target.value),
          showClearButton: true,
          clearAlwaysVisible: true,
          onClear: () => setValue(""),
          placeholder: "Type something..."
        }
      )
    ] });
  }
};
const FullWidth = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { padding: 16 }, children: [
    /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: "fullWidth=true stretches the input to fill its container" }),
    /* @__PURE__ */ jsx(
      Input,
      {
        size: "md",
        appearance: "base",
        fullWidth: true,
        placeholder: "Full width input...",
        iconLeft1: icon1,
        showIconLeft1: true
      }
    ),
    /* @__PURE__ */ jsxs("div", { style: { marginTop: 16 }, children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: "fullWidth=false (default) \u2014 intrinsic width" }),
      /* @__PURE__ */ jsx(
        Input,
        {
          size: "md",
          appearance: "base",
          placeholder: "Default width...",
          iconLeft1: icon1,
          showIconLeft1: true
        }
      )
    ] })
  ] })
};
const InvalidState = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16, maxWidth: 320 }, children: [
    /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "invalid=true \u2014 danger border and focus ring" }),
    ["base", "brand", "outline", "ghost"].map((a) => /* @__PURE__ */ jsx(
      Input,
      {
        size: "md",
        appearance: a,
        invalid: true,
        placeholder: `${a} / invalid`,
        defaultValue: "Bad value"
      },
      a
    ))
  ] })
};
export {
  AllAppearances,
  AllAppearancesAllStates,
  AllSizes,
  AllStates,
  ClearAlwaysVisible,
  Default,
  FullWidth,
  GhostVariant,
  InvalidState,
  WithAllSlots,
  WithClearButton
};
