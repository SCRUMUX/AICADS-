import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from "react";
import { SkeletonCard } from "../SkeletonCard/SkeletonCard";
import { SkeletonTable } from "../SkeletonTable/SkeletonTable";
import { SkeletonList } from "../SkeletonList/SkeletonList";
import { SkeletonChart } from "../SkeletonChart/SkeletonChart";
import { SkeletonPage } from "../SkeletonPage/SkeletonPage";
import { Card } from "../Card/Card";
import { Badge } from "../Badge/Badge";
import { Button } from "../Button/Button";
const meta = {
  title: "Primitives/Skeleton/Overview",
  parameters: {
    docs: {
      description: {
        component: "\u041E\u0431\u0437\u043E\u0440 \u0432\u0441\u0435\u0445 \u0441\u043A\u0435\u043B\u0435\u0442\u043E\u043D\u043E\u0432 \u0434\u0438\u0437\u0430\u0439\u043D-\u0441\u0438\u0441\u0442\u0435\u043C\u044B. \u041A\u0430\u0436\u0434\u044B\u0439 \u0441\u043A\u0435\u043B\u0435\u0442\u043E\u043D \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0440\u0435\u0430\u043B\u044C\u043D\u043E\u043C\u0443 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0443 \u0438 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u043A\u0430\u043A \u043F\u043B\u0435\u0439\u0441\u0445\u043E\u043B\u0434\u0435\u0440 \u0432\u043E \u0432\u0440\u0435\u043C\u044F \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \xABReload\xBB \u0434\u043B\u044F \u0434\u0435\u043C\u043E\u043D\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u0430 skeleton \u2192 content."
      }
    },
    layout: "padded"
  }
};
export default meta;
const SectionLabel = ({ children }) => /* @__PURE__ */ jsx("div", { style: {
  fontSize: 13,
  fontWeight: 600,
  color: "var(--color-text-primary)",
  marginBottom: 8,
  paddingBottom: 4,
  borderBottom: "1px solid var(--color-border-base)"
}, children });
function useLoadingCycle(delay = 2e3) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, [delay]);
  const reload = useCallback(() => setLoading(true), []);
  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(t);
  }, [loading, delay]);
  return { loading, reload };
}
const AllSkeletons = {
  render: () => {
    const card = useLoadingCycle(2e3);
    const table = useLoadingCycle(2500);
    const list = useLoadingCycle(1800);
    const chart = useLoadingCycle(3e3);
    const page = useLoadingCycle(3500);
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 40, maxWidth: 900 }, children: [
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "SkeletonCard \u2192 Card" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }, children: [
          card.loading ? /* @__PURE__ */ jsx(SkeletonCard, { size: "md", shimmer: true }) : /* @__PURE__ */ jsx(
            Card,
            {
              variant: "base",
              size: "md",
              title: "Dashboard KPIs",
              description: "Revenue, users, and conversion metrics for Q4 2025.",
              style: { width: 480 },
              header: /* @__PURE__ */ jsx("div", { style: {
                height: 110,
                background: "linear-gradient(135deg, var(--color-brand-muted), var(--color-info-surface))",
                borderRadius: "4px 4px 0 0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-text-muted)",
                fontSize: 12
              }, children: "Chart / Image" }),
              footer: /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 8 }, children: [
                /* @__PURE__ */ jsx(Badge, { appearance: "success", size: "sm", children: "+12%" }),
                /* @__PURE__ */ jsx(Badge, { appearance: "info", size: "sm", children: "Updated" })
              ] })
            }
          ),
          /* @__PURE__ */ jsx(Button, { size: "sm", appearance: "ghost", onClick: card.reload, children: "Reload" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "SkeletonTable \u2192 Table" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
          table.loading ? /* @__PURE__ */ jsx(SkeletonTable, { size: "md", shimmer: true, rows: 4, cols: 4 }) : /* @__PURE__ */ jsxs("table", { style: {
            width: 460,
            borderCollapse: "collapse",
            border: "1px solid var(--color-border-base)",
            borderRadius: 4,
            overflow: "hidden",
            fontSize: 12
          }, children: [
            /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsx("tr", { style: { background: "var(--color-surface-2)" }, children: ["Name", "Role", "Status", "Score"].map((h) => /* @__PURE__ */ jsx("th", { style: { padding: "8px 12px", textAlign: "left", color: "var(--color-text-muted)", fontWeight: 500 }, children: h }, h)) }) }),
            /* @__PURE__ */ jsx("tbody", { children: [
              { name: "Alice", role: "Designer", status: "Active", score: 98 },
              { name: "Bob", role: "Engineer", status: "Pending", score: 73 },
              { name: "Carol", role: "Manager", status: "Active", score: 85 },
              { name: "Dave", role: "Designer", status: "Inactive", score: 60 }
            ].map((r) => /* @__PURE__ */ jsxs("tr", { style: { borderTop: "1px solid var(--color-border-base)" }, children: [
              /* @__PURE__ */ jsx("td", { style: { padding: "8px 12px", color: "var(--color-text-primary)" }, children: r.name }),
              /* @__PURE__ */ jsx("td", { style: { padding: "8px 12px", color: "var(--color-text-muted)" }, children: r.role }),
              /* @__PURE__ */ jsx("td", { style: { padding: "8px 12px" }, children: /* @__PURE__ */ jsx(Badge, { size: "sm", appearance: r.status === "Active" ? "success" : r.status === "Pending" ? "warning" : "danger", children: r.status }) }),
              /* @__PURE__ */ jsx("td", { style: { padding: "8px 12px", textAlign: "right", color: "var(--color-text-primary)" }, children: r.score })
            ] }, r.name)) })
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "sm", appearance: "ghost", onClick: table.reload, style: { alignSelf: "flex-start" }, children: "Reload" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "SkeletonList \u2192 List" }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 8 }, children: [
          list.loading ? /* @__PURE__ */ jsx(SkeletonList, { size: "sm", shimmer: true, rows: 4 }) : /* @__PURE__ */ jsx("div", { style: { width: 320, background: "var(--color-surface-1)", borderRadius: 4, padding: "8px 16px" }, children: ["Alice Johnson", "Bob Smith", "Carol White", "Dave Brown"].map((name, i, arr) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { style: {
              display: "flex",
              alignItems: "center",
              gap: 8,
              height: 36,
              fontSize: 12,
              color: "var(--color-text-primary)"
            }, children: [
              /* @__PURE__ */ jsx("div", { style: { width: 16, height: 16, borderRadius: "50%", background: "var(--color-brand-muted)", flexShrink: 0 } }),
              /* @__PURE__ */ jsx("span", { style: { flex: 1 }, children: name }),
              /* @__PURE__ */ jsx("span", { style: { color: "var(--color-text-muted)", fontSize: 10 }, children: "Online" })
            ] }),
            i < arr.length - 1 && /* @__PURE__ */ jsx("div", { style: { height: 1, background: "var(--color-border-base)" } })
          ] }, name)) }),
          /* @__PURE__ */ jsx(Button, { size: "sm", appearance: "ghost", onClick: list.reload, style: { alignSelf: "flex-start" }, children: "Reload" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "SkeletonChart \u2192 Chart" }),
        /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, flexWrap: "wrap" }, children: ["bar", "line", "donut"].map((type) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("div", { style: { fontSize: 10, color: "var(--color-text-muted)", marginBottom: 4 }, children: type }),
          chart.loading ? /* @__PURE__ */ jsx(SkeletonChart, { size: "sm", shimmer: true, chartType: type }) : /* @__PURE__ */ jsxs("div", { style: {
            width: 320,
            height: 146,
            background: "var(--color-surface-2)",
            borderRadius: 4,
            padding: 12,
            display: "flex",
            flexDirection: "column",
            gap: 8
          }, children: [
            /* @__PURE__ */ jsxs("span", { style: { fontSize: 12, fontWeight: 600, color: "var(--color-text-primary)" }, children: [
              "Revenue (",
              type,
              ")"
            ] }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: 20, fontWeight: 600, color: "var(--color-brand-primary)" }, children: "$12,450" }),
            /* @__PURE__ */ jsxs("div", { style: { flex: 1, background: "var(--color-surface-3)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--color-text-muted)", fontSize: 11 }, children: [
              type,
              " chart area"
            ] })
          ] })
        ] }, type)) }),
        /* @__PURE__ */ jsx(Button, { size: "sm", appearance: "ghost", onClick: chart.reload, style: { marginTop: 8 }, children: "Reload" })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(SectionLabel, { children: "SkeletonPage \u2192 Full Page" }),
        page.loading ? /* @__PURE__ */ jsx(SkeletonPage, { size: "md", shimmer: true }) : /* @__PURE__ */ jsxs("div", { style: {
          width: 480,
          background: "var(--color-surface-1)",
          borderRadius: 4,
          padding: 12,
          display: "flex",
          flexDirection: "column",
          gap: 12
        }, children: [
          /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 8, fontSize: 11, color: "var(--color-text-muted)" }, children: "Home / Dashboard / Analytics" }),
          /* @__PURE__ */ jsx("div", { style: { height: 120, background: "linear-gradient(135deg, var(--color-brand-muted), var(--color-success-surface))", borderRadius: 4 } }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 14, fontWeight: 600, color: "var(--color-text-primary)" }, children: "Analytics Dashboard" }),
          /* @__PURE__ */ jsx("span", { style: { fontSize: 12, color: "var(--color-text-muted)" }, children: "Key metrics and performance indicators for your application." }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 6 }, children: [
            /* @__PURE__ */ jsx(Badge, { appearance: "brand", size: "sm", children: "Analytics" }),
            /* @__PURE__ */ jsx(Badge, { appearance: "info", size: "sm", children: "Q4" }),
            /* @__PURE__ */ jsx(Badge, { appearance: "success", size: "sm", children: "Live" })
          ] }),
          /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }, children: ["Users", "Revenue", "Growth"].map((label) => /* @__PURE__ */ jsxs("div", { style: {
            background: "var(--color-surface-2)",
            borderRadius: 4,
            padding: 8,
            textAlign: "center"
          }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: 10, color: "var(--color-text-muted)" }, children: label }),
            /* @__PURE__ */ jsx("div", { style: { fontSize: 16, fontWeight: 600, color: "var(--color-text-primary)" }, children: label === "Users" ? "1.2k" : label === "Revenue" ? "$8.4k" : "+15%" })
          ] }, label)) })
        ] }),
        /* @__PURE__ */ jsx(Button, { size: "sm", appearance: "ghost", onClick: page.reload, style: { marginTop: 8 }, children: "Reload" })
      ] })
    ] });
  }
};
export {
  AllSkeletons
};
