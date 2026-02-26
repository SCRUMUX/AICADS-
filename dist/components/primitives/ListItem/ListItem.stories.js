import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { ListItem } from "./ListItem";
import {
  BellIcon,
  ChevronRightIcon,
  GearIcon,
  PersonIcon,
  SearchIcon
} from "../../icons";
import { Avatar } from "../Avatar/Avatar";
import { Badge } from "../Badge/Badge";
import { Checkbox } from "../Checkbox/Checkbox";
import { Switch } from "../Switch/Switch";
import { SkeletonList } from "../SkeletonList/SkeletonList";
const meta = {
  title: "Primitives/ListItem",
  component: ListItem,
  parameters: {
    docs: {
      description: {
        component: "`@UI/ListItem` \u2014 \u0441\u0442\u0440\u043E\u043A\u0430 \u0441\u043F\u0438\u0441\u043A\u0430. \u041E\u0441\u0438: size (sm/md/lg) \xD7 interaction (base/hover/selected/disabled) \xD7 variant (iconNav/iconMeta/avatarContact/checkboxSelect)."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    state: { control: "select", options: ["base", "hover", "selected", "disabled"] },
    variant: { control: "select", options: ["iconNav", "iconMeta", "avatarContact", "checkboxSelect"] },
    label: { control: "text" },
    subtitle: { control: "text" },
    trailingMeta: { control: "text" },
    showSubtitle: { control: "boolean" },
    showDivider: { control: "boolean" },
    leadingIcon: { control: false },
    leadingAvatar: { control: false },
    leadingCheckbox: { control: false },
    trailingChevron: { control: false },
    trailingBadge: { control: false },
    trailingAction: { control: false }
  }
};
export default meta;
const sharedSlots = {
  leadingIcon: /* @__PURE__ */ jsx(GearIcon, { size: 20 }),
  leadingAvatar: /* @__PURE__ */ jsx(Avatar, { size: "sm", variant: "registered-no-photo" }),
  leadingCheckbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm" }),
  trailingChevron: /* @__PURE__ */ jsx(ChevronRightIcon, { size: 20 }),
  trailingBadge: /* @__PURE__ */ jsx(Badge, { appearance: "brand", size: "sm", children: "3" }),
  trailingAction: /* @__PURE__ */ jsx(Switch, { size: "sm", state: "off" })
};
const Default = {
  args: {
    size: "md",
    variant: "iconNav",
    label: "List item label",
    showDivider: true,
    ...sharedSlots
  },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { width: 360 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
const AllVariants = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { width: 360, display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsx(
      ListItem,
      {
        variant: "iconNav",
        label: "iconNav \u2014 Settings",
        subtitle: "Navigate or configure",
        showSubtitle: true,
        showDivider: true,
        ...sharedSlots
      }
    ),
    /* @__PURE__ */ jsx(
      ListItem,
      {
        variant: "iconMeta",
        label: "iconMeta \u2014 Notifications",
        subtitle: "Badge count on right",
        showSubtitle: true,
        showDivider: true,
        ...sharedSlots
      }
    ),
    /* @__PURE__ */ jsx(
      ListItem,
      {
        variant: "avatarContact",
        label: "avatarContact \u2014 Alice",
        trailingMeta: "2m ago",
        showDivider: true,
        ...sharedSlots
      }
    ),
    /* @__PURE__ */ jsx(
      ListItem,
      {
        variant: "checkboxSelect",
        label: "checkboxSelect \u2014 Select me",
        showDivider: true,
        ...sharedSlots
      }
    )
  ] })
};
const AllStates = {
  render: () => /* @__PURE__ */ jsx("div", { style: { width: 360, display: "flex", flexDirection: "column" }, children: ["base", "hover", "selected", "disabled"].map((st) => /* @__PURE__ */ jsx(
    ListItem,
    {
      variant: "iconNav",
      state: st,
      label: `${st} state`,
      showDivider: true,
      ...sharedSlots
    },
    st
  )) })
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { width: 360, display: "flex", flexDirection: "column" }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(
    ListItem,
    {
      size: s,
      variant: "iconNav",
      label: `size = ${s}`,
      showDivider: true,
      ...sharedSlots
    },
    s
  )) })
};
const WithSubtitle = {
  render: () => /* @__PURE__ */ jsx("div", { style: { width: 360, display: "flex", flexDirection: "column" }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(
    ListItem,
    {
      size: s,
      variant: "iconNav",
      label: "List item label",
      subtitle: "Secondary description text",
      showSubtitle: true,
      showDivider: true,
      ...sharedSlots
    },
    s
  )) })
};
const IconNav = {
  render: () => /* @__PURE__ */ jsx("div", { style: { width: 360, display: "flex", flexDirection: "column" }, children: ["base", "hover", "selected", "disabled"].map((st) => /* @__PURE__ */ jsx(
    ListItem,
    {
      variant: "iconNav",
      state: st,
      label: `iconNav \u2014 ${st}`,
      showDivider: true,
      leadingIcon: /* @__PURE__ */ jsx(GearIcon, { size: 20 }),
      trailingChevron: /* @__PURE__ */ jsx(ChevronRightIcon, { size: 20 })
    },
    st
  )) })
};
const IconMeta = {
  render: () => /* @__PURE__ */ jsx("div", { style: { width: 360, display: "flex", flexDirection: "column" }, children: ["base", "hover", "selected", "disabled"].map((st) => /* @__PURE__ */ jsx(
    ListItem,
    {
      variant: "iconMeta",
      state: st,
      label: `iconMeta \u2014 ${st}`,
      showDivider: true,
      leadingIcon: /* @__PURE__ */ jsx(BellIcon, { size: 20 }),
      trailingBadge: /* @__PURE__ */ jsx(Badge, { appearance: "brand", size: "sm", children: "5" })
    },
    st
  )) })
};
const AvatarContact = {
  render: () => /* @__PURE__ */ jsx("div", { style: { width: 360, display: "flex", flexDirection: "column" }, children: ["base", "hover", "selected", "disabled"].map((st) => /* @__PURE__ */ jsx(
    ListItem,
    {
      variant: "avatarContact",
      state: st,
      label: "Alice Johnson",
      trailingMeta: "12:00",
      showDivider: true,
      leadingAvatar: /* @__PURE__ */ jsx(Avatar, { size: "sm", variant: "registered-no-photo" })
    },
    st
  )) })
};
const CheckboxSelect = {
  render: () => /* @__PURE__ */ jsx("div", { style: { width: 360, display: "flex", flexDirection: "column" }, children: ["base", "hover", "selected", "disabled"].map((st) => /* @__PURE__ */ jsx(
    ListItem,
    {
      variant: "checkboxSelect",
      state: st,
      label: `checkboxSelect \u2014 ${st}`,
      showDivider: true,
      leadingCheckbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm", checked: st === "selected", readOnly: true }),
      trailingAction: /* @__PURE__ */ jsx(Switch, { size: "sm", state: st === "selected" ? "on" : "off" })
    },
    st
  )) })
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 32, flexWrap: "wrap" }, children: ["iconNav", "iconMeta", "avatarContact", "checkboxSelect"].map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column" }, children: [
    /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#666", marginBottom: 4, paddingLeft: 4 }, children: v }),
    ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", marginBottom: 8 }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: 10, color: "#999", paddingLeft: 4, marginBottom: 2 }, children: s }),
      ["base", "hover", "selected", "disabled"].map((st) => /* @__PURE__ */ jsx(
        ListItem,
        {
          size: s,
          variant: v,
          state: st,
          label: "List item label",
          trailingMeta: "12:00",
          showDivider: true,
          style: { width: 320 },
          leadingIcon: /* @__PURE__ */ jsx(GearIcon, { size: s === "lg" ? 20 : 20 }),
          leadingAvatar: /* @__PURE__ */ jsx(Avatar, { size: "sm", variant: "registered-no-photo" }),
          leadingCheckbox: /* @__PURE__ */ jsx(Checkbox, { size: "sm" }),
          trailingChevron: /* @__PURE__ */ jsx(ChevronRightIcon, { size: 20 }),
          trailingBadge: /* @__PURE__ */ jsx(Badge, { appearance: "brand", size: "sm", children: "3" }),
          trailingAction: /* @__PURE__ */ jsx(Switch, { size: "sm", state: "off" })
        },
        st
      ))
    ] }, s))
  ] }, v)) })
};
const Interactive = {
  render: () => {
    const [selected, setSelected] = useState(null);
    const items = [
      { label: "Profile settings", icon: /* @__PURE__ */ jsx(PersonIcon, { size: 20 }) },
      { label: "Notifications", icon: /* @__PURE__ */ jsx(BellIcon, { size: 20 }) },
      { label: "Search preferences", icon: /* @__PURE__ */ jsx(SearchIcon, { size: 20 }) },
      { label: "Advanced config", icon: /* @__PURE__ */ jsx(GearIcon, { size: 20 }) }
    ];
    return /* @__PURE__ */ jsx("div", { style: { width: 360, display: "flex", flexDirection: "column" }, children: items.map((item, i) => /* @__PURE__ */ jsx(
      ListItem,
      {
        variant: "iconNav",
        state: selected === i ? "selected" : void 0,
        label: item.label,
        showDivider: i < items.length - 1,
        leadingIcon: item.icon,
        trailingChevron: /* @__PURE__ */ jsx(ChevronRightIcon, { size: 20 }),
        onClick: () => setSelected(i)
      },
      i
    )) });
  }
};
const WithSkeleton = {
  render: () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const t = setTimeout(() => setLoading(false), 2e3);
      return () => clearTimeout(t);
    }, []);
    return /* @__PURE__ */ jsxs("div", { style: { width: 360, display: "flex", flexDirection: "column", gap: 12 }, children: [
      loading ? /* @__PURE__ */ jsx(SkeletonList, { size: "sm", shimmer: true, rows: 4 }) : /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column" }, children: ["Profile", "Notifications", "Search", "Settings"].map((label, i) => /* @__PURE__ */ jsx(
        ListItem,
        {
          variant: "iconNav",
          label,
          showDivider: i < 3,
          leadingIcon: /* @__PURE__ */ jsx(GearIcon, { size: 20 }),
          trailingChevron: /* @__PURE__ */ jsx(ChevronRightIcon, { size: 20 })
        },
        label
      )) }),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => setLoading(true),
          style: {
            alignSelf: "flex-start",
            padding: "6px 16px",
            fontSize: 12,
            borderRadius: 4,
            border: "1px solid var(--color-border-base)",
            background: "var(--color-surface-1)",
            color: "var(--color-text-primary)",
            cursor: "pointer"
          },
          children: "Reload (2s delay)"
        }
      )
    ] });
  }
};
const InteractiveCheckboxSelect = {
  render: () => {
    const [checked, setChecked] = useState({ 0: false, 1: true, 2: false });
    const items = ["Enable dark mode", "Auto-sync data", "Send notifications"];
    return /* @__PURE__ */ jsx("div", { style: { width: 360, display: "flex", flexDirection: "column" }, children: items.map((label, i) => /* @__PURE__ */ jsx(
      ListItem,
      {
        variant: "checkboxSelect",
        state: checked[i] ? "selected" : void 0,
        label,
        showDivider: i < items.length - 1,
        leadingCheckbox: /* @__PURE__ */ jsx(
          Checkbox,
          {
            size: "sm",
            checked: checked[i],
            onChange: (e) => setChecked((prev) => ({ ...prev, [i]: e.target.checked }))
          }
        ),
        trailingAction: /* @__PURE__ */ jsx(
          Switch,
          {
            size: "sm",
            state: checked[i] ? "on" : "off",
            onClick: () => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))
          }
        ),
        onClick: () => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))
      },
      i
    )) });
  }
};
export {
  AllSizes,
  AllStates,
  AllVariants,
  AvatarContact,
  CheckboxSelect,
  Default,
  FullMatrix,
  IconMeta,
  IconNav,
  Interactive,
  InteractiveCheckboxSelect,
  WithSkeleton,
  WithSubtitle
};
