import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Tab } from "./Tab";
import { Badge } from "../Badge";
import { Card } from "../Card";
import { Button } from "../Button";
import { SectionHeader } from "../SectionHeader";
import { Input } from "../Input";
import { Diagram3Icon, AicaIcon } from "../../icons";
const iconStyle = { width: "100%", height: "100%" };
const navIcon = /* @__PURE__ */ jsx(Diagram3Icon, { style: iconStyle });
const sidebarTabClass = "w-full justify-start pl-[var(--space-16)] pr-[var(--space-16)] min-h-[var(--space-32)] max-h-[var(--space-40)]";
const meta = {
  title: "Screens/Org Dashboard (Figma 832:7566)",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "\u042D\u043A\u0440\u0430\u043D \u043F\u043E \u043C\u0430\u043A\u0435\u0442\u0443 Synaptik DS \u2014 Org Dashboard / Live Ops Console (node 832:7566)."
      }
    }
  },
  decorators: [
    (Story) => /* @__PURE__ */ jsx("div", { className: "min-h-screen flex flex-row bg-[var(--color-bg-base)]", style: { fontFamily: "var(--font-sans, inherit)" }, children: /* @__PURE__ */ jsx(Story, {}) })
  ]
};
export default meta;
const Default = {
  render: () => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx("div", { "data-theme": "dark", children: /* @__PURE__ */ jsxs(
      "aside",
      {
        className: "flex flex-col w-[260px] shrink-0 pt-[var(--space-16)] pb-[var(--space-16)] pl-[var(--space-12)] pr-[var(--space-12)] gap-[var(--space-8)] bg-[var(--color-surface-2)] border-r border-solid border-[var(--color-border-base)]",
        style: { boxShadow: "var(--effect-elevation-1)" },
        children: [
          /* @__PURE__ */ jsxs("nav", { className: "flex flex-col gap-[var(--space-8)] flex-1 min-h-0", children: [
            /* @__PURE__ */ jsx(Tab, { size: "lg", appearance: "brand", iconLeft: navIcon, showLeftIcon: true, showBadge: false, showRightIcon: false, className: sidebarTabClass, children: "Dashboard" }),
            /* @__PURE__ */ jsx(Tab, { size: "lg", appearance: "base", iconLeft: navIcon, badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "3" }), showLeftIcon: true, showBadge: true, showRightIcon: false, className: sidebarTabClass, children: "Analytics" }),
            /* @__PURE__ */ jsx(Tab, { size: "lg", appearance: "base", iconLeft: navIcon, badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "3" }), showLeftIcon: true, showBadge: true, showRightIcon: false, className: sidebarTabClass, children: "Live Ops" }),
            /* @__PURE__ */ jsx(Tab, { size: "lg", appearance: "base", iconLeft: navIcon, showLeftIcon: true, showBadge: false, showRightIcon: false, className: sidebarTabClass, children: "Reports" }),
            /* @__PURE__ */ jsx(Tab, { size: "lg", appearance: "base", iconLeft: navIcon, badge: /* @__PURE__ */ jsx(Badge, { appearance: "outline", size: "sm", children: "3" }), showLeftIcon: true, showBadge: true, showRightIcon: false, className: sidebarTabClass, children: "Campaigns" }),
            /* @__PURE__ */ jsx(Tab, { size: "lg", appearance: "base", iconLeft: navIcon, showLeftIcon: true, showBadge: false, showRightIcon: false, className: sidebarTabClass, children: "Audience" }),
            /* @__PURE__ */ jsx(Tab, { size: "lg", appearance: "base", iconLeft: navIcon, showLeftIcon: true, showBadge: false, showRightIcon: false, className: sidebarTabClass, children: "Content" }),
            /* @__PURE__ */ jsx(Tab, { size: "lg", appearance: "base", iconLeft: navIcon, showLeftIcon: true, showBadge: false, showRightIcon: false, className: sidebarTabClass, children: "Settings" }),
            /* @__PURE__ */ jsx(Tab, { size: "lg", appearance: "base", iconLeft: navIcon, showLeftIcon: true, showBadge: false, showRightIcon: false, className: sidebarTabClass, children: "Integrations" }),
            /* @__PURE__ */ jsx(Card, { variant: "filled", size: "sm", title: "Quick actions", className: "w-full shrink-0", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-[var(--space-4)]", children: [
              /* @__PURE__ */ jsx(Button, { appearance: "brand", size: "sm", className: "w-full justify-center", children: "New campaign" }),
              /* @__PURE__ */ jsx(Button, { appearance: "outline", size: "sm", className: "w-full justify-center", children: "Export" }),
              /* @__PURE__ */ jsx(Button, { appearance: "base", size: "sm", className: "w-full justify-center", children: "View all" })
            ] }) }),
            /* @__PURE__ */ jsx(Tab, { size: "lg", appearance: "base", iconLeft: navIcon, showLeftIcon: true, showBadge: false, showRightIcon: false, className: sidebarTabClass, children: "Help" })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex flex-row items-center gap-[var(--space-8)] p-[var(--space-4)] shrink-0",
              style: { fontSize: "var(--font-size-20)", lineHeight: "var(--line-height-28)", fontWeight: "var(--font-weight-medium)", color: "var(--color-text-muted)" },
              children: [
                /* @__PURE__ */ jsx("span", { className: "shrink-0 flex items-center justify-center w-[var(--space-28)] h-[var(--space-28)] [color:inherit]", children: /* @__PURE__ */ jsx(AicaIcon, { style: iconStyle }) }),
                /* @__PURE__ */ jsx("span", { className: "m-0", children: "AI ORCHESTRATOR" })
              ]
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs("main", { className: "flex flex-col flex-1 min-w-0 bg-[var(--color-surface-1)]", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex flex-row flex-wrap items-center gap-[var(--space-24)] px-[var(--space-24)] py-[var(--space-12)] border-b border-solid border-[var(--color-border-base)]", children: [
        /* @__PURE__ */ jsx(SectionHeader, { size: "lg", appearance: "base", className: "text-style-display shrink-0", children: "Live Ops Console" }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-[var(--space-24)] shrink-0", children: [
          /* @__PURE__ */ jsx(Button, { appearance: "brand", size: "md", children: "Create" }),
          /* @__PURE__ */ jsx(Button, { appearance: "outline", size: "md", children: "Filter" })
        ] }),
        /* @__PURE__ */ jsx(Input, { appearance: "base", size: "md", placeholder: "OpenRouter", className: "min-w-[var(--space-200)] flex-1 max-w-[var(--space-320)]" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center justify-between gap-[var(--space-24)] px-[var(--space-24)] py-[var(--space-12)] border-b border-solid border-[var(--color-border-base)]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-row items-center gap-[var(--space-24)]", children: [
          /* @__PURE__ */ jsx(Button, { appearance: "base", size: "sm", children: "All" }),
          /* @__PURE__ */ jsx(Button, { appearance: "ghost", size: "sm", children: "Active" }),
          /* @__PURE__ */ jsx(Button, { appearance: "ghost", size: "sm", children: "Archived" })
        ] }),
        /* @__PURE__ */ jsx(Input, { appearance: "base", size: "sm", placeholder: "Search...", className: "w-[var(--space-280)]" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-row flex-wrap gap-[var(--space-16)] p-[var(--space-24)] pt-[var(--space-48)] pb-[var(--space-48)] overflow-auto", children: [
        /* @__PURE__ */ jsx(Card, { variant: "outlined", size: "md", title: "Overview", className: "w-full min-w-[var(--space-280)] max-w-[var(--space-360)]", children: /* @__PURE__ */ jsx("p", { className: "m-0 text-[var(--font-size-14)] leading-[var(--line-height-20)] text-[var(--color-text-primary)]", children: "Metrics and summary." }) }),
        /* @__PURE__ */ jsx(Card, { variant: "outlined", size: "md", title: "Recent activity", className: "w-full min-w-[var(--space-280)] max-w-[var(--space-360)]", children: /* @__PURE__ */ jsx("p", { className: "m-0 text-[var(--font-size-14)] leading-[var(--line-height-20)] text-[var(--color-text-primary)]", children: "Latest events and changes." }) }),
        /* @__PURE__ */ jsx(Card, { variant: "outlined", size: "md", title: "Campaigns", className: "w-full min-w-[var(--space-280)] max-w-[var(--space-360)]", children: /* @__PURE__ */ jsx("p", { className: "m-0 text-[var(--font-size-14)] leading-[var(--line-height-20)] text-[var(--color-text-primary)]", children: "Active and scheduled campaigns." }) })
      ] })
    ] })
  ] })
};
export {
  Default
};
