import { jsx, jsxs } from "react/jsx-runtime";
import { EmptyState } from "./EmptyState";
import { SearchIcon, BellIcon, GearIcon, BookmarkFrameIcon, PersonIcon } from "../../icons";
import { Button } from "../Button/Button";
const meta = {
  title: "Primitives/EmptyState",
  component: EmptyState,
  parameters: {
    docs: {
      description: {
        component: "`@UI/EmptyState` \u2014 \u043F\u0443\u0441\u0442\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u0441 \u0438\u043A\u043E\u043D\u043A\u043E\u0439, \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C, \u043E\u043F\u0438\u0441\u0430\u043D\u0438\u0435\u043C \u0438 CTA-\u043A\u043D\u043E\u043F\u043A\u0430\u043C\u0438. \u041E\u0441\u0438: size (sm/md/lg) \xD7 appearance (base/info/success/warning/danger) \xD7 layout (vertical/horizontal)."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    appearance: { control: "select", options: ["base", "info", "success", "warning", "danger"] },
    layout: { control: "select", options: ["vertical", "horizontal"] },
    title: { control: "text" },
    description: { control: "text" },
    showIcon: { control: "boolean" },
    showCta: { control: "boolean" },
    showSecondary: { control: "boolean" },
    icon: { control: false },
    ctaButton: { control: false },
    secondaryButton: { control: false }
  }
};
export default meta;
const makeShared = (size = "sm") => ({
  icon: /* @__PURE__ */ jsx(SearchIcon, { size: size === "sm" ? 32 : size === "md" ? 48 : 64 }),
  ctaButton: /* @__PURE__ */ jsx(Button, { appearance: "brand", size: "sm", children: "Add item" }),
  secondaryButton: /* @__PURE__ */ jsx(Button, { appearance: "ghost", size: "sm", children: "Learn more" })
});
const Default = {
  args: {
    size: "md",
    appearance: "base",
    layout: "vertical",
    title: "No items yet",
    description: "Add your first item to get started.",
    showIcon: true,
    showCta: true,
    showSecondary: true,
    ...makeShared("md")
  }
};
const AllAppearances = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }, children: ["base", "info", "success", "warning", "danger"].map((a) => /* @__PURE__ */ jsx(
    EmptyState,
    {
      size: "md",
      appearance: a,
      layout: "vertical",
      title: `appearance=${a}`,
      description: "Add your first item to get started.",
      showIcon: true,
      showCta: true,
      showSecondary: false,
      icon: /* @__PURE__ */ jsx(SearchIcon, { size: 48 }),
      ctaButton: /* @__PURE__ */ jsx(Button, { appearance: a === "base" || a === "info" ? "brand" : a, size: "sm", children: "Add item" })
    },
    a
  )) })
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(
    EmptyState,
    {
      size: s,
      appearance: "base",
      layout: "vertical",
      title: `size=${s}`,
      description: "Add your first item to get started.",
      showIcon: true,
      showCta: true,
      showSecondary: false,
      ...makeShared(s)
    },
    s
  )) })
};
const AllLayouts = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 24 }, children: ["vertical", "horizontal"].map((l) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#888", marginBottom: 8 }, children: [
      "layout=",
      l
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(
      EmptyState,
      {
        size: s,
        appearance: "base",
        layout: l,
        title: "No items yet",
        description: "Add your first item to get started.",
        showIcon: true,
        showCta: true,
        showSecondary: true,
        ...makeShared(s)
      },
      s
    )) })
  ] }, l)) })
};
const IconOnly = {
  args: {
    size: "md",
    appearance: "base",
    layout: "vertical",
    title: "Nothing to show",
    description: "This section is currently empty.",
    showIcon: true,
    showCta: false,
    showSecondary: false,
    icon: /* @__PURE__ */ jsx(SearchIcon, { size: 48 })
  }
};
const Horizontal = {
  args: {
    size: "md",
    appearance: "base",
    layout: "horizontal",
    title: "No items yet",
    description: "Add your first item to get started.",
    showIcon: true,
    showCta: true,
    showSecondary: true,
    ...makeShared("md")
  }
};
const Info = {
  args: {
    size: "md",
    appearance: "info",
    layout: "vertical",
    title: "Get started",
    description: "Follow the steps below to set up your workspace.",
    showIcon: true,
    showCta: true,
    showSecondary: true,
    icon: /* @__PURE__ */ jsx(BellIcon, { size: 48 }),
    ctaButton: /* @__PURE__ */ jsx(Button, { appearance: "brand", size: "sm", children: "Get started" }),
    secondaryButton: /* @__PURE__ */ jsx(Button, { appearance: "ghost", size: "sm", children: "Learn more" })
  }
};
const Success = {
  args: {
    size: "md",
    appearance: "success",
    layout: "vertical",
    title: "All done!",
    description: "Your data has been saved successfully.",
    showIcon: true,
    showCta: true,
    showSecondary: false,
    icon: /* @__PURE__ */ jsx(GearIcon, { size: 48 }),
    ctaButton: /* @__PURE__ */ jsx(Button, { appearance: "success", size: "sm", children: "Continue" })
  }
};
const Warning = {
  args: {
    size: "md",
    appearance: "warning",
    layout: "vertical",
    title: "No results",
    description: "Check your filters or try a different search.",
    showIcon: true,
    showCta: true,
    showSecondary: true,
    icon: /* @__PURE__ */ jsx(SearchIcon, { size: 48 }),
    ctaButton: /* @__PURE__ */ jsx(Button, { appearance: "warning", size: "sm", children: "Reset filters" }),
    secondaryButton: /* @__PURE__ */ jsx(Button, { appearance: "ghost", size: "sm", children: "Help" })
  }
};
const Danger = {
  args: {
    size: "md",
    appearance: "danger",
    layout: "vertical",
    title: "Failed to load",
    description: "Something went wrong. Please try again later.",
    showIcon: true,
    showCta: true,
    showSecondary: true,
    icon: /* @__PURE__ */ jsx(PersonIcon, { size: 48 }),
    ctaButton: /* @__PURE__ */ jsx(Button, { appearance: "danger", size: "sm", children: "Retry" }),
    secondaryButton: /* @__PURE__ */ jsx(Button, { appearance: "ghost", size: "sm", children: "Contact support" })
  }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 32 }, children: ["base", "info", "success", "warning", "danger"].map((a) => /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { style: { fontSize: 11, color: "#888", marginBottom: 8 }, children: [
      "appearance=",
      a
    ] }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "flex-start" }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12 }, children: [
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, color: "#999" }, children: [
        "size=",
        s,
        " / vertical"
      ] }),
      /* @__PURE__ */ jsx(
        EmptyState,
        {
          size: s,
          appearance: a,
          layout: "vertical",
          title: "No items yet",
          description: "Add your first item to get started.",
          showIcon: true,
          showCta: true,
          showSecondary: false,
          icon: /* @__PURE__ */ jsx(SearchIcon, { size: s === "sm" ? 32 : s === "md" ? 48 : 64 }),
          ctaButton: /* @__PURE__ */ jsx(Button, { appearance: a === "base" || a === "info" ? "brand" : a, size: "sm", children: "Add item" })
        }
      ),
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 10, color: "#999" }, children: [
        "size=",
        s,
        " / horizontal"
      ] }),
      /* @__PURE__ */ jsx(
        EmptyState,
        {
          size: s,
          appearance: a,
          layout: "horizontal",
          title: "No items yet",
          description: "Add your first item to get started.",
          showIcon: true,
          showCta: true,
          showSecondary: false,
          icon: /* @__PURE__ */ jsx(SearchIcon, { size: s === "sm" ? 32 : s === "md" ? 48 : 64 }),
          ctaButton: /* @__PURE__ */ jsx(Button, { appearance: a === "base" || a === "info" ? "brand" : a, size: "sm", children: "Add item" })
        }
      )
    ] }, s)) })
  ] }, a)) })
};
const EmptyList = {
  args: {
    size: "lg",
    appearance: "base",
    layout: "vertical",
    title: "No tasks found",
    description: "You haven't created any tasks yet. Start by clicking the button below.",
    showIcon: true,
    showCta: true,
    showSecondary: true,
    icon: /* @__PURE__ */ jsx(BookmarkFrameIcon, { size: 64 }),
    ctaButton: /* @__PURE__ */ jsx(Button, { appearance: "brand", size: "sm", children: "Create task" }),
    secondaryButton: /* @__PURE__ */ jsx(Button, { appearance: "outline", size: "sm", children: "Import" })
  }
};
const LoadError = {
  args: {
    size: "md",
    appearance: "danger",
    layout: "horizontal",
    title: "Connection failed",
    description: "We couldn't reach the server. Check your connection and try again.",
    showIcon: true,
    showCta: true,
    showSecondary: false,
    icon: /* @__PURE__ */ jsx(GearIcon, { size: 48 }),
    ctaButton: /* @__PURE__ */ jsx(Button, { appearance: "danger", size: "sm", children: "Retry" })
  }
};
export {
  AllAppearances,
  AllLayouts,
  AllSizes,
  Danger,
  Default,
  EmptyList,
  FullMatrix,
  Horizontal,
  IconOnly,
  Info,
  LoadError,
  Success,
  Warning
};
