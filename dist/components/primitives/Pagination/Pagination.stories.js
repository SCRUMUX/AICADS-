import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Pagination } from "./Pagination";
const APPEARANCES = ["brand", "base", "ghost"];
const SIZES = ["sm", "md", "lg"];
const VARIANTS = ["with-numbers", "compact", "minimal"];
const meta = {
  title: "Primitives/Pagination",
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: "Pagination (@UI/Pagination): Prev/Next + \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B. \u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B: with-numbers (Button instances), compact (N / Total), minimal (\u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044F). 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430 (sm/md/lg), 3 appearance (brand/base/ghost). Figma: 160:86574."
      }
    }
  },
  argTypes: {
    size: { control: "select", options: SIZES, description: "\u0420\u0430\u0437\u043C\u0435\u0440" },
    appearance: { control: "select", options: APPEARANCES, description: "\u0412\u0438\u0437\u0443\u0430\u043B\u044C\u043D\u044B\u0439 \u0441\u0442\u0438\u043B\u044C" },
    variant: { control: "select", options: VARIANTS, description: "\u0412\u0430\u0440\u0438\u0430\u043D\u0442: with-numbers / compact / minimal" },
    currentPage: { control: { type: "number", min: 1 }, description: "\u0422\u0435\u043A\u0443\u0449\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430" },
    totalPages: { control: { type: "number", min: 1 }, description: "\u0412\u0441\u0435\u0433\u043E \u0441\u0442\u0440\u0430\u043D\u0438\u0446" },
    onPageChange: { action: "page-changed", description: "\u0412\u044B\u0437\u044B\u0432\u0430\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u0441\u043C\u0435\u043D\u0435 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u044B" },
    onPrev: { action: "prev-clicked", description: '\u041A\u043B\u0438\u043A "\u041D\u0430\u0437\u0430\u0434"' },
    onNext: { action: "next-clicked", description: '\u041A\u043B\u0438\u043A "\u0412\u043F\u0435\u0440\u0451\u0434"' }
  },
  args: {
    appearance: "brand",
    size: "sm",
    variant: "with-numbers",
    currentPage: 1,
    totalPages: 10
  }
};
export default meta;
const Default = {
  args: {
    appearance: "brand",
    size: "sm",
    variant: "with-numbers",
    totalPages: 10
  }
};
const AllAppearances = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 16 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 60, fontSize: 12, color: "var(--color-text-muted)" }, children: a }),
    /* @__PURE__ */ jsx(Pagination, { ...args, appearance: a })
  ] }, a)) }),
  args: { size: "sm", variant: "with-numbers", totalPages: 10, currentPage: 3 }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 24, fontSize: 12, color: "var(--color-text-muted)" }, children: s }),
    /* @__PURE__ */ jsx(Pagination, { ...args, size: s })
  ] }, s)) }),
  args: { appearance: "brand", variant: "with-numbers", totalPages: 10, currentPage: 3 }
};
const AllVariants = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 16 }, children: VARIANTS.map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
    /* @__PURE__ */ jsx("span", { style: { width: 100, fontSize: 12, color: "var(--color-text-muted)" }, children: v }),
    /* @__PURE__ */ jsx(Pagination, { ...args, variant: v })
  ] }, v)) }),
  args: { appearance: "brand", size: "sm", totalPages: 10, currentPage: 3 }
};
const FullMatrix = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 20, padding: 16 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
    /* @__PURE__ */ jsx("div", { style: { fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }, children: a }),
    /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: VARIANTS.map((v) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: 12 }, children: [
      /* @__PURE__ */ jsx("span", { style: { width: 100, fontSize: 12, color: "var(--color-text-muted)" }, children: v }),
      /* @__PURE__ */ jsx(Pagination, { appearance: a, variant: v, size: "sm", totalPages: 10, currentPage: 3 })
    ] }, v)) })
  ] }, a)) })
};
const Interactive = {
  render: (args) => {
    const [page, setPage] = useState(1);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, padding: 16, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsxs("div", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: [
        "\u0421\u0442\u0440\u0430\u043D\u0438\u0446\u0430 ",
        page,
        " \u0438\u0437 ",
        args.totalPages
      ] }),
      /* @__PURE__ */ jsx(
        Pagination,
        {
          ...args,
          currentPage: page,
          onPageChange: setPage
        }
      ),
      /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8 }, children: VARIANTS.map((v) => /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
          },
          style: {
            padding: "2px 8px",
            fontSize: 11,
            cursor: "pointer",
            borderRadius: 4,
            border: "1px solid var(--color-border-base)",
            background: "transparent",
            color: "var(--color-text-muted)"
          },
          children: v
        },
        v
      )) })
    ] });
  },
  args: { appearance: "brand", size: "md", variant: "with-numbers", totalPages: 10 }
};
const EdgeCases = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 12, padding: 16 }, children: [
    /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "\u041F\u0435\u0440\u0432\u0430\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 (Prev disabled)" }),
    /* @__PURE__ */ jsx(Pagination, { appearance: "brand", size: "sm", variant: "with-numbers", totalPages: 10, currentPage: 1 }),
    /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "\u041F\u043E\u0441\u043B\u0435\u0434\u043D\u044F\u044F \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 (Next disabled)" }),
    /* @__PURE__ */ jsx(Pagination, { appearance: "brand", size: "sm", variant: "with-numbers", totalPages: 10, currentPage: 10 }),
    /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "\u041E\u0434\u043D\u0430 \u0441\u0442\u0440\u0430\u043D\u0438\u0446\u0430 (\u043E\u0431\u0430 disabled)" }),
    /* @__PURE__ */ jsx(Pagination, { appearance: "brand", size: "sm", variant: "with-numbers", totalPages: 1, currentPage: 1 })
  ] })
};
export {
  AllAppearances,
  AllSizes,
  AllVariants,
  Default,
  EdgeCases,
  FullMatrix,
  Interactive
};
