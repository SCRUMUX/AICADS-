import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card } from "./Card";
import { SkeletonCard } from "../SkeletonCard/SkeletonCard";
const VARIANTS = ["base", "outlined", "elevated", "filled"];
const SIZES = ["sm", "md", "lg"];
const STATES = ["base", "hover", "focus", "disabled"];
const SAMPLE_TITLE = "Card title";
const SAMPLE_DESCRIPTION = "Card content. \u041E\u043F\u0438\u0441\u0430\u043D\u0438\u0435, \u043C\u0435\u0442\u0440\u0438\u043A\u0438 \u0438\u043B\u0438 \u0434\u0440\u0443\u0433\u043E\u0439 \u043A\u043E\u043D\u0442\u0435\u043D\u0442.";
const meta = {
  title: "Primitives/Card",
  component: Card,
  parameters: {
    docs: {
      description: {
        component: "Card (@UI/Card): \u043A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440 \u0434\u043B\u044F \u043A\u043E\u043D\u0442\u0435\u043D\u0442\u0430. 4 \u0432\u0430\u0440\u0438\u0430\u043D\u0442\u0430 (base/outlined/elevated/filled), 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 4 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F. \u0421\u043B\u043E\u0442\u044B: title, description, header, footer, children. Figma: 160:75500."
      }
    }
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: SIZES },
    state: { control: "select", options: STATES },
    title: { control: "text" },
    description: { control: "text" },
    disabled: { control: "boolean" }
  },
  decorators: [(Story) => /* @__PURE__ */ jsx("div", { style: { padding: 24 }, children: /* @__PURE__ */ jsx(Story, {}) })]
};
export default meta;
const Default = {
  args: {
    variant: "base",
    size: "md",
    title: SAMPLE_TITLE,
    description: SAMPLE_DESCRIPTION
  }
};
const AllVariants = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12, maxWidth: 360 }, children: VARIANTS.map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 64, fontSize: 12, color: "var(--color-text-muted)", paddingTop: 10, flexShrink: 0 }, children: v }),
    /* @__PURE__ */ jsx(Card, { ...args, variant: v })
  ] }, v)) }),
  args: {
    size: "md",
    title: SAMPLE_TITLE,
    description: SAMPLE_DESCRIPTION
  }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 24, fontSize: 12, color: "var(--color-text-muted)", paddingTop: 10, flexShrink: 0 }, children: s }),
    /* @__PURE__ */ jsx(Card, { ...args, size: s, style: { maxWidth: s === "sm" ? 320 : s === "md" ? 480 : 640 } })
  ] }, s)) }),
  args: {
    variant: "base",
    title: SAMPLE_TITLE,
    description: SAMPLE_DESCRIPTION
  }
};
const AllStates = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 12, maxWidth: 480 }, children: STATES.map((st) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "flex-start", gap: 12 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 60, fontSize: 12, color: "var(--color-text-muted)", paddingTop: 10, flexShrink: 0 }, children: st }),
    /* @__PURE__ */ jsx(Card, { ...args, state: st })
  ] }, st)) }),
  args: {
    size: "md",
    variant: "base",
    title: SAMPLE_TITLE,
    description: SAMPLE_DESCRIPTION
  }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 28 }, children: VARIANTS.map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 10 }, children: [
    /* @__PURE__ */ jsx("div", { style: {
      fontSize: 11,
      fontWeight: 600,
      color: "var(--color-text-muted)",
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }, children: v }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 12 }, children: STATES.map((st) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6 }, children: [
      /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "var(--color-text-muted)" }, children: st }),
      /* @__PURE__ */ jsx(
        Card,
        {
          variant: v,
          state: st,
          size: "sm",
          title: SAMPLE_TITLE,
          description: SAMPLE_DESCRIPTION,
          style: { width: 220 }
        }
      )
    ] }, st)) })
  ] }, v)) })
};
const WithSlots = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16, maxWidth: 480 }, children: /* @__PURE__ */ jsx(
    Card,
    {
      ...args,
      header: /* @__PURE__ */ jsx("div", { style: {
        height: 120,
        background: "var(--color-surface-3)",
        borderRadius: "4px 4px 0 0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "var(--color-text-muted)",
        fontSize: 12
      }, children: "Header / Image slot" }),
      footer: /* @__PURE__ */ jsxs("div", { style: {
        paddingTop: 8,
        borderTop: "1px solid var(--color-border-base)",
        display: "flex",
        gap: 8,
        justifyContent: "flex-end"
      }, children: [
        /* @__PURE__ */ jsx("button", { style: {
          padding: "4px 12px",
          fontSize: 12,
          background: "transparent",
          border: "1px solid var(--color-border-base)",
          borderRadius: 4,
          cursor: "pointer",
          color: "var(--color-text-muted)"
        }, children: "Cancel" }),
        /* @__PURE__ */ jsx("button", { style: {
          padding: "4px 12px",
          fontSize: 12,
          background: "var(--color-brand-primary)",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
          color: "white"
        }, children: "Action" })
      ] })
    }
  ) }),
  args: {
    size: "md",
    variant: "outlined",
    title: SAMPLE_TITLE,
    description: SAMPLE_DESCRIPTION
  }
};
const Elevated = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, flexWrap: "wrap" }, children: SIZES.map((s) => /* @__PURE__ */ jsx(
    Card,
    {
      variant: "elevated",
      size: s,
      title: SAMPLE_TITLE,
      description: SAMPLE_DESCRIPTION,
      style: { width: s === "sm" ? 240 : s === "md" ? 320 : 400 }
    },
    s
  )) })
};
const WithSkeleton = {
  render: () => {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const t = setTimeout(() => setLoading(false), 2e3);
      return () => clearTimeout(t);
    }, []);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: [
      /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, flexWrap: "wrap" }, children: SIZES.map(
        (s) => loading ? /* @__PURE__ */ jsx(SkeletonCard, { size: s, shimmer: true }, s) : /* @__PURE__ */ jsx(
          Card,
          {
            variant: "base",
            size: s,
            title: SAMPLE_TITLE,
            description: SAMPLE_DESCRIPTION,
            style: { width: s === "sm" ? 320 : s === "md" ? 480 : 800 },
            header: /* @__PURE__ */ jsx("div", { style: {
              height: s === "sm" ? 80 : s === "md" ? 110 : 150,
              background: "var(--color-surface-3)",
              borderRadius: "4px 4px 0 0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-text-muted)",
              fontSize: 12
            }, children: "Image" })
          },
          s
        )
      ) }),
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
export {
  AllSizes,
  AllStates,
  AllVariants,
  Default,
  Elevated,
  FullMatrix,
  WithSkeleton,
  WithSlots
};
