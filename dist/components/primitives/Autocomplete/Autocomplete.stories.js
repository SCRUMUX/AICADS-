import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import React from "react";
import { Autocomplete } from "./Autocomplete";
import { SearchIcon, CloseXIcon, ChevronRightIcon, BookmarkStarFillIcon } from "../../icons";
import { Tag } from "../Tag/Tag";
import { Checkbox } from "../Checkbox/Checkbox";
import { Badge } from "../Badge/Badge";
const meta = {
  title: "Primitives/Autocomplete",
  component: Autocomplete,
  parameters: {
    docs: { description: { component: "Autocomplete: \u043F\u043E\u043B\u0435 \u0432\u0432\u043E\u0434\u0430 \u0441 \u0432\u044B\u043F\u0430\u0434\u0430\u044E\u0449\u0438\u043C \u0441\u043F\u0438\u0441\u043A\u043E\u043C \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 \u043F\u043E \u0432\u0445\u043E\u0436\u0434\u0435\u043D\u0438\u044E. state: closed/open. size: sm/md/lg. Trigger: Input-like \u043F\u043E\u043B\u0435 \u0441 \u0438\u043A\u043E\u043D\u043A\u043E\u0439 \u043F\u043E\u0438\u0441\u043A\u0430, TagRow \u0434\u043B\u044F \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439. Popover: \u043F\u0443\u043D\u043A\u0442\u044B \u0447\u0435\u0440\u0435\u0437 <AutocompleteItem> \u0441 \u043D\u0430\u0441\u043B\u0435\u0434\u043E\u0432\u0430\u043D\u0438\u0435\u043C size." } }
  },
  argTypes: {
    state: { control: "select", options: ["closed", "open"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    appearance: { control: "select", options: ["brand", "base", "ghost", "outline"] },
    showClearIcon: { control: "boolean" },
    multiple: { control: "boolean" },
    allowExclude: { control: "boolean" },
    fullWidth: { control: "boolean" },
    loading: { control: "boolean" },
    placeholder: { control: "text" },
    items: { control: false }
  }
};
export default meta;
const basicItems = [
  { children: "Option 1", appearance: "default" },
  { children: "Option 2", appearance: "default" },
  { children: "Option 3", appearance: "default" },
  { children: "Option 4", appearance: "primary" },
  { children: "Delete item", appearance: "danger" }
];
const Default = {
  args: {
    state: "closed",
    size: "sm",
    placeholder: "Search...",
    searchIcon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }),
    clearIcon: /* @__PURE__ */ jsx(CloseXIcon, { style: { width: "100%", height: "100%" } }),
    showTagRow: false,
    showClearIcon: false,
    items: basicItems
  }
};
const Open = {
  args: {
    state: "open",
    size: "sm",
    placeholder: "Search...",
    searchIcon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }),
    clearIcon: /* @__PURE__ */ jsx(CloseXIcon, { style: { width: "100%", height: "100%" } }),
    showTagRow: false,
    showClearIcon: true,
    items: basicItems
  },
  render: (args) => {
    const [open, setOpen] = React.useState(true);
    return /* @__PURE__ */ jsx("div", { style: { padding: 16, minHeight: 320 }, children: /* @__PURE__ */ jsx(Autocomplete, { ...args, state: open ? "open" : "closed", onOpenChange: setOpen }) });
  }
};
const itemsWithIcons = [
  { children: "Search results", appearance: "default", showIconLeft: true, iconLeft: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }) },
  { children: "Starred item", appearance: "default", showIconLeft: true, iconLeft: /* @__PURE__ */ jsx(BookmarkStarFillIcon, { style: { width: "100%", height: "100%" } }) },
  { children: "Navigate right", appearance: "primary", showIconLeft: true, iconLeft: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "100%", height: "100%" } }), showIconRight: true, iconRight: /* @__PURE__ */ jsx(ChevronRightIcon, { style: { width: "100%", height: "100%" } }) },
  { children: "Delete", appearance: "danger", showIconLeft: true, iconLeft: /* @__PURE__ */ jsx(CloseXIcon, { style: { width: "100%", height: "100%" } }) }
];
const WithIcons = {
  args: {
    state: "open",
    size: "sm",
    placeholder: "Search...",
    searchIcon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }),
    clearIcon: /* @__PURE__ */ jsx(CloseXIcon, { style: { width: "100%", height: "100%" } }),
    showClearIcon: true,
    items: itemsWithIcons
  },
  render: (args) => /* @__PURE__ */ jsx("div", { style: { padding: 16, minHeight: 220 }, children: /* @__PURE__ */ jsx(Autocomplete, { ...args, state: "open" }) })
};
const itemsWithCheckboxes = [
  { children: "Option A", showCheckbox: true, checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm", state: "checked" }) },
  { children: "Option B", showCheckbox: true, checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm", state: "unchecked" }) },
  { children: "Option C", showCheckbox: true, checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm", state: "unchecked" }) },
  { children: "Option D", showCheckbox: true, checkbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm", state: "checked" }) }
];
const WithCheckboxes = {
  args: {
    state: "open",
    size: "sm",
    placeholder: "Search...",
    searchIcon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }),
    showClearIcon: false,
    items: itemsWithCheckboxes
  },
  render: (args) => /* @__PURE__ */ jsx("div", { style: { padding: 16, minHeight: 220 }, children: /* @__PURE__ */ jsx(Autocomplete, { ...args, state: "open" }) })
};
const itemsWithBadges = [
  { children: "React", appearance: "default", showBadge1: true, badge1: /* @__PURE__ */ jsx(Badge, { appearance: "brand", size: "sm", children: "New" }) },
  { children: "TypeScript", appearance: "default", showBadge1: true, badge1: /* @__PURE__ */ jsx(Badge, { appearance: "success", size: "sm", children: "Stable" }) },
  { children: "Vue", appearance: "default", showBadge1: true, badge1: /* @__PURE__ */ jsx(Badge, { appearance: "warning", size: "sm", children: "Beta" }), showBadge2: true, badge2: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "v3" }) },
  { children: "Angular", appearance: "default", showBadge1: true, badge1: /* @__PURE__ */ jsx(Badge, { appearance: "danger", size: "sm", children: "Deprecated" }) }
];
const WithBadges = {
  args: {
    state: "open",
    size: "sm",
    placeholder: "Search framework...",
    searchIcon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }),
    showClearIcon: false,
    items: itemsWithBadges
  },
  render: (args) => /* @__PURE__ */ jsx("div", { style: { padding: 16, minHeight: 220 }, children: /* @__PURE__ */ jsx(Autocomplete, { ...args, state: "open" }) })
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 48 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx("div", { style: { padding: 16, minHeight: 200 }, children: /* @__PURE__ */ jsx(
    Autocomplete,
    {
      size: s,
      state: "open",
      placeholder: `Size: ${s}`,
      searchIcon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }),
      items: [
        { children: "Option 1", appearance: "default" },
        { children: "Option 2", appearance: "primary" },
        { children: "Delete", appearance: "danger" }
      ]
    }
  ) }, s)) })
};
const WithTagRow = {
  args: {
    state: "closed",
    size: "sm",
    placeholder: "Search...",
    searchIcon: /* @__PURE__ */ jsx(SearchIcon, { style: { width: "100%", height: "100%" } }),
    clearIcon: /* @__PURE__ */ jsx(CloseXIcon, { style: { width: "100%", height: "100%" } }),
    showTagRow: true,
    showClearIcon: true,
    tagRow: /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx(Tag, { appearance: "base", size: "sm", children: "React" }),
      /* @__PURE__ */ jsx(Tag, { appearance: "base", size: "sm", children: "TypeScript" })
    ] }),
    items: basicItems
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
  { value: "remix", label: "Remix" },
  { value: "astro", label: "Astro" },
  { value: "qwik", label: "Qwik" }
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
        Autocomplete,
        {
          size: "md",
          multiple: true,
          options: structuredOptions,
          value: selected,
          onChange: (v) => setSelected(v),
          placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0444\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u0438...",
          showClearIcon: true,
          fullWidth: true
        }
      )
    ] });
  }
};
const MultiSelectOverflow = {
  render: () => {
    const allValues = structuredOptions.map((o) => o.value);
    const [selected, setSelected] = React.useState(allValues);
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 360, maxWidth: 320 }, children: [
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: [
        "Overflow: ",
        selected.length,
        " \u0438\u0437 ",
        structuredOptions.length,
        " \u0432\u044B\u0431\u0440\u0430\u043D\u043E. \u0412\u0438\u0434\u043D\u044B \u0442\u043E\u043B\u044C\u043A\u043E \u0442\u0435 chips, \u0447\u0442\u043E \u043F\u043E\u043C\u0435\u0449\u0430\u044E\u0442\u0441\u044F + \u0441\u0447\u0451\u0442\u0447\u0438\u043A."
      ] }),
      /* @__PURE__ */ jsx(
        Autocomplete,
        {
          size: "sm",
          multiple: true,
          options: structuredOptions,
          value: selected,
          onChange: (v) => setSelected(v),
          placeholder: "\u0412\u0441\u0435 \u0432\u044B\u0431\u0440\u0430\u043D\u044B...",
          showClearIcon: true,
          fullWidth: true
        }
      )
    ] });
  }
};
const AsyncSearch = {
  render: () => {
    const [query, setQuery] = React.useState("");
    const [loading, setLoading] = React.useState(false);
    const [results, setResults] = React.useState(structuredOptions);
    const handleInputChange = React.useCallback((q) => {
      setQuery(q);
      if (!q) {
        setResults(structuredOptions);
        return;
      }
      setLoading(true);
      const timer = setTimeout(() => {
        setResults(structuredOptions.filter((o) => o.label.toLowerCase().includes(q.toLowerCase())));
        setLoading(false);
      }, 800);
      return () => clearTimeout(timer);
    }, []);
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 320, maxWidth: 400 }, children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: "Async: \u0432\u0432\u043E\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442, \u0440\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u044F\u0432\u044F\u0442\u0441\u044F \u0441 \u0437\u0430\u0434\u0435\u0440\u0436\u043A\u043E\u0439 800ms." }),
      /* @__PURE__ */ jsx(
        Autocomplete,
        {
          size: "md",
          options: results,
          inputValue: query,
          onInputChange: handleInputChange,
          loading,
          placeholder: "\u041F\u043E\u0438\u0441\u043A \u0444\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u0430...",
          noResultsMessage: "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
          showClearIcon: true,
          fullWidth: true
        }
      )
    ] });
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
        Autocomplete,
        {
          size: "md",
          options: structuredOptions,
          value,
          onChange: (v) => setValue(v),
          placeholder: "\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435...",
          showClearIcon: true,
          fullWidth: true
        }
      )
    ] });
  }
};
const FullWidth = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 320 }, children: [
    /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: "fullWidth=true \u2014 \u0437\u0430\u043D\u0438\u043C\u0430\u0435\u0442 \u0432\u0441\u044E \u0448\u0438\u0440\u0438\u043D\u0443 \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044F" }),
    /* @__PURE__ */ jsx(
      Autocomplete,
      {
        size: "md",
        options: structuredOptions,
        placeholder: "Full-width autocomplete...",
        showClearIcon: true,
        fullWidth: true
      }
    ),
    /* @__PURE__ */ jsxs("div", { style: { marginTop: 16 }, children: [
      /* @__PURE__ */ jsx("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: "fullWidth=false (default) \u2014 \u043F\u043E \u0448\u0438\u0440\u0438\u043D\u0435 \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430" }),
      /* @__PURE__ */ jsx(
        Autocomplete,
        {
          size: "md",
          options: structuredOptions,
          placeholder: "Default width...",
          showClearIcon: true
        }
      )
    ] })
  ] })
};
const Loading = {
  render: () => /* @__PURE__ */ jsx("div", { style: { padding: 16, minHeight: 200, maxWidth: 400 }, children: /* @__PURE__ */ jsx(
    Autocomplete,
    {
      size: "md",
      options: [],
      loading: true,
      placeholder: "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u0434\u0430\u043D\u043D\u044B\u0445...",
      fullWidth: true
    }
  ) })
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
        Autocomplete,
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
          showClearIcon: true,
          fullWidth: true
        }
      )
    ] });
  }
};
const ChipsOverflowBadge = {
  render: () => {
    const [selected, setSelected] = React.useState(["react", "vue", "angular", "svelte", "solid", "next"]);
    return /* @__PURE__ */ jsxs("div", { style: { padding: 16, minHeight: 360, maxWidth: 300 }, children: [
      /* @__PURE__ */ jsxs("p", { style: { fontSize: 12, color: "var(--color-text-muted)", marginBottom: 8 }, children: [
        "Multi-select: \u0437\u0430\u043A\u0440\u044B\u0442\u044B\u0439 \u043A\u043E\u043D\u0442\u0440\u043E\u043B \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0435\u0442 Chip \u0434\u043B\u044F \u0432\u0438\u0434\u0438\u043C\u044B\u0445 \u0437\u043D\u0430\u0447\u0435\u043D\u0438\u0439 + Badge \u0441 \u043A\u043E\u043B\u0438\u0447\u0435\u0441\u0442\u0432\u043E\u043C overflow. \u0412\u044B\u0431\u0440\u0430\u043D\u043E: ",
        selected.length
      ] }),
      /* @__PURE__ */ jsx(
        Autocomplete,
        {
          size: "sm",
          multiple: true,
          options: structuredOptions,
          value: selected,
          onChange: (v) => setSelected(v),
          placeholder: "\u0424\u0440\u0435\u0439\u043C\u0432\u043E\u0440\u043A\u0438...",
          showClearIcon: true,
          fullWidth: true
        }
      )
    ] });
  }
};
export {
  AllSizes,
  AsyncSearch,
  ChipsOverflowBadge,
  ControlledValue,
  Default,
  ExcludeMode,
  FullWidth,
  Loading,
  MultiSelect,
  MultiSelectOverflow,
  Open,
  WithBadges,
  WithCheckboxes,
  WithIcons,
  WithTagRow
};
