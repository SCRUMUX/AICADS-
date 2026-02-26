import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Dropdown } from "./Dropdown";
import { SearchIcon, ChevronDownIcon } from "../../icons";
import { Tag } from "../Tag/Tag";
import { Badge } from "../Badge/Badge";
const iconL = /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } });
const chevronIcon = /* @__PURE__ */ jsx(ChevronDownIcon, { style: { width: "100%", height: "100%" } });
const defaultItems = [
  { children: "Option 1", appearance: "default" },
  { children: "Option 2", appearance: "default" },
  { children: "Option 3", appearance: "primary" },
  { children: "Delete", appearance: "danger" }
];
const SIZES = ["sm", "md", "lg"];
const meta = {
  title: "Primitives/Dropdown",
  component: Dropdown,
  parameters: {
    docs: { description: { component: "Dropdown: \u0432\u044B\u043F\u0430\u0434\u0430\u044E\u0449\u0435\u0435 \u043C\u0435\u043D\u044E. state: closed/open. Trigger: Icon (left), Label, Badge, TagRow, Chevron. Popover: DropdownItem \u043F\u0443\u043D\u043A\u0442\u044B." } }
  },
  argTypes: {
    state: { control: "select", options: ["closed", "open"] },
    size: { control: "select", options: SIZES },
    appearance: { control: "select", options: ["brand", "base", "ghost", "outline"] },
    showIconLeft: { control: "boolean" },
    showBadge: { control: "boolean" },
    showTagRow: { control: "boolean" },
    multiple: { control: "boolean" },
    allowExclude: { control: "boolean" },
    fullWidth: { control: "boolean" },
    showClearButton: { control: "boolean" },
    placeholder: { control: "text" },
    tagRow: { control: false },
    badge: { control: false },
    items: { control: false },
    iconLeft: { control: false },
    chevron: { control: false }
  }
};
export default meta;
const Default = {
  render: () => {
    const [value, setValue] = React.useState("");
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 280, maxWidth: 400 }, children: [
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: [
        "Single-select. \u0412\u044B\u0431\u0440\u0430\u043D\u043E: ",
        /* @__PURE__ */ jsx("strong", { children: value || "\u043D\u0438\u0447\u0435\u0433\u043E" })
      ] }),
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          size: "md",
          options: structuredOptions.slice(0, 5),
          value,
          onChange: (v) => setValue(v),
          placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435...",
          fullWidth: true
        }
      )
    ] });
  }
};
const ActionMenu = {
  args: {
    children: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F",
    size: "md",
    chevron: chevronIcon,
    items: defaultItems
  },
  render: (args) => {
    const [open, setOpen] = React.useState(false);
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 200 }, children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: "Action menu (items API) \u2014 \u043A\u043B\u0438\u043A \u043F\u043E \u043F\u0443\u043D\u043A\u0442\u0443 \u0432\u044B\u043F\u043E\u043B\u043D\u044F\u0435\u0442 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435, \u0430 \u043D\u0435 \u0432\u044B\u0431\u0438\u0440\u0430\u0435\u0442 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0435." }),
      /* @__PURE__ */ jsx(Dropdown, { ...args, state: open ? "open" : "closed", onOpenChange: setOpen })
    ] });
  }
};
const OpenState = {
  args: {
    children: "Select option",
    state: "open",
    size: "md",
    chevron: chevronIcon,
    items: defaultItems
  },
  render: (args) => /* @__PURE__ */ jsx("div", { style: { padding: 16, minHeight: 220 }, children: /* @__PURE__ */ jsx(Dropdown, { ...args, state: "open" }) })
};
const WithAllSlots = {
  args: {
    children: "With all slots",
    state: "closed",
    size: "md",
    iconLeft: iconL,
    chevron: chevronIcon,
    badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "5" }),
    tagRow: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Tag, { appearance: "base", size: "sm", children: "Tag 1" }),
      /* @__PURE__ */ jsx(Tag, { appearance: "base", size: "sm", children: "Tag 2" })
    ] }),
    showIconLeft: true,
    showBadge: true,
    showTagRow: false,
    items: defaultItems
  }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8, padding: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsx(Dropdown, { ...args, size: s, state: "open", children: s }, s)) }),
  args: {
    chevron: chevronIcon,
    items: defaultItems.slice(0, 3)
  }
};
const structuredOptions = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "angular", label: "Angular" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "SolidJS" },
  { value: "next", label: "Next.js" },
  { value: "nuxt", label: "Nuxt" },
  { value: "remix", label: "Remix" }
];
const MultiSelect = {
  render: () => {
    const [selected, setSelected] = React.useState(["react", "vue", "angular"]);
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 360, maxWidth: 400 }, children: [
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: [
        "\u0412\u044B\u0431\u0440\u0430\u043D\u043E: ",
        selected.join(", ") || "\u043D\u0438\u0447\u0435\u0433\u043E"
      ] }),
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          size: "md",
          multiple: true,
          options: structuredOptions,
          value: selected,
          onChange: (v) => setSelected(v),
          placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u0438...",
          fullWidth: true,
          children: "\u0424\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u0438"
        }
      )
    ] });
  }
};
const MultiSelectOverflow = {
  render: () => {
    const allValues = structuredOptions.map((o) => o.value);
    const [selected, setSelected] = React.useState(allValues);
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 360, maxWidth: 280 }, children: [
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: [
        "\u0412\u0441\u0435 ",
        selected.length,
        " \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u0432\u044B\u0431\u0440\u0430\u043D\u044B. Chips overflow + counter."
      ] }),
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          size: "sm",
          multiple: true,
          options: structuredOptions,
          value: selected,
          onChange: (v) => setSelected(v),
          placeholder: "\u0412\u0441\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u044B...",
          fullWidth: true,
          children: "\u0424\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u0438"
        }
      )
    ] });
  }
};
const WithSubmenu = {
  render: () => {
    const [open, setOpen] = React.useState(true);
    return /* @__PURE__ */ jsx("div", { style: { padding: 16, minHeight: 280 }, children: /* @__PURE__ */ jsx(
      Dropdown,
      {
        size: "md",
        state: open ? "open" : "closed",
        onOpenChange: setOpen,
        items: [
          { children: "\u0424\u0430\u0439\u043B", appearance: "default" },
          {
            children: "\u042D\u043A\u0441\u043F\u043E\u0440\u0442",
            appearance: "default",
            submenuItems: [
              { children: "PDF", appearance: "default", onClick: () => {
              } },
              { children: "PNG", appearance: "default", onClick: () => {
              } },
              { children: "SVG", appearance: "primary", onClick: () => {
              } }
            ]
          },
          { children: "\u041D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438", appearance: "default" },
          { children: "\u0423\u0434\u0430\u043B\u0438\u0442\u044C", appearance: "danger" }
        ],
        children: "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F"
      }
    ) });
  }
};
const ControlledValue = {
  render: () => {
    const [value, setValue] = React.useState("react");
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 320, maxWidth: 400 }, children: [
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: [
        "Controlled single-select. \u0422\u0435\u043A\u0443\u0449\u0435\u0435: ",
        /* @__PURE__ */ jsx("strong", { children: value || "\u043D\u0435\u0442" })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8, marginBottom: 8 }, children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setValue("vue"), style: { fontSize: 12 }, children: "Set Vue" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setValue("angular"), style: { fontSize: 12 }, children: "Set Angular" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setValue(""), style: { fontSize: 12 }, children: "Clear" })
      ] }),
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          size: "md",
          options: structuredOptions,
          value,
          onChange: (v) => setValue(v),
          placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435...",
          fullWidth: true,
          children: structuredOptions.find((o) => o.value === value)?.label ?? "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435..."
        }
      )
    ] });
  }
};
const WithOptionsAPI = {
  render: () => {
    const [value, setValue] = React.useState("");
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 320, maxWidth: 400 }, children: [
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: [
        "Single-select with ",
        /* @__PURE__ */ jsx("code", { children: "options" }),
        " + ",
        /* @__PURE__ */ jsx("code", { children: "value" }),
        " + ",
        /* @__PURE__ */ jsx("code", { children: "onChange" }),
        " API. \u0422\u0435\u043A\u0443\u0449\u0435\u0435: ",
        /* @__PURE__ */ jsx("strong", { children: value || "\u043D\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u043E" })
      ] }),
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          size: "md",
          options: structuredOptions.slice(0, 5),
          value,
          onChange: (v) => setValue(v),
          placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u0434\u0438\u043D...",
          fullWidth: true,
          children: structuredOptions.find((o) => o.value === value)?.label ?? "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435..."
        }
      )
    ] });
  }
};
const FullWidth = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 200 }, children: [
    /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: "fullWidth=true" }),
    /* @__PURE__ */ jsx(
      Dropdown,
      {
        size: "md",
        options: structuredOptions.slice(0, 4),
        placeholder: "Full-width dropdown...",
        fullWidth: true,
        children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435"
      }
    ),
    /* @__PURE__ */ jsxs("div", { style: { marginTop: 16 }, children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: "fullWidth=false (default)" }),
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          size: "md",
          options: structuredOptions.slice(0, 4),
          placeholder: "Default width...",
          children: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435"
        }
      )
    ] })
  ] })
};
const ExcludeMode = {
  render: () => {
    const [selected, setSelected] = React.useState(["react", "vue"]);
    const [excluded, setExcluded] = React.useState(["angular"]);
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 360, maxWidth: 400 }, children: [
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: [
        "Tri-state: click \u2192 selected, click again \u2192 excluded (\u043A\u0440\u043E\u043C\u0435), click again \u2192 off.",
        /* @__PURE__ */ jsx("br", {}),
        "Selected: ",
        /* @__PURE__ */ jsx("strong", { children: selected.join(", ") || "\u2014" }),
        /* @__PURE__ */ jsx("br", {}),
        "Excluded: ",
        /* @__PURE__ */ jsx("strong", { children: excluded.join(", ") || "\u2014" })
      ] }),
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          size: "md",
          multiple: true,
          allowExclude: true,
          options: structuredOptions,
          value: selected,
          excludedValues: excluded,
          onChange: (v) => setSelected(v),
          onExcludedChange: setExcluded,
          placeholder: "\u0424\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u0438...",
          fullWidth: true,
          showClearButton: true,
          onClear: () => {
            setSelected([]);
            setExcluded([]);
          },
          children: "\u0424\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u0438"
        }
      )
    ] });
  }
};
const ChipsInClosedControl = {
  render: () => {
    const [selected, setSelected] = React.useState(["react", "vue", "angular", "svelte", "solid"]);
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 360, maxWidth: 300 }, children: [
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: [
        "Multi-select: \u0432 \u0437\u0430\u043A\u0440\u044B\u0442\u043E\u043C \u043A\u043E\u043D\u0442\u0440\u043E\u043B\u0435 \u0432\u0438\u0434\u043D\u044B Chip + Badge \u0441 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E\u043C. \u0412\u044B\u0431\u0440\u0430\u043D\u043E: ",
        selected.length
      ] }),
      /* @__PURE__ */ jsx(
        Dropdown,
        {
          size: "sm",
          multiple: true,
          options: structuredOptions,
          value: selected,
          onChange: (v) => setSelected(v),
          placeholder: "\u0424\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u0438...",
          fullWidth: true,
          showClearButton: true,
          onClear: () => setSelected([]),
          children: "\u0424\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u0438"
        }
      )
    ] });
  }
};
export {
  ActionMenu,
  AllSizes,
  ChipsInClosedControl,
  ControlledValue,
  Default,
  ExcludeMode,
  FullWidth,
  MultiSelect,
  MultiSelectOverflow,
  OpenState,
  WithAllSlots,
  WithOptionsAPI,
  WithSubmenu
};
