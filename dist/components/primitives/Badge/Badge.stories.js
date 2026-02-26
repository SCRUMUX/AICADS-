import { jsx } from "react/jsx-runtime";
import { Badge } from "./Badge";
const APPEARANCES = ["brand", "base", "ghost", "outline", "success", "warning", "danger", "info"];
const SIZES = ["sm", "md", "lg"];
const meta = {
  title: "Primitives/Badge",
  component: Badge,
  parameters: {
    docs: { description: { component: "Badge: appearance (brand/base/ghost/outline/success/warning/danger/info). 3 \u0440\u0430\u0437\u043C\u0435\u0440\u0430. \u0422\u043E\u043B\u044C\u043A\u043E \u0442\u0435\u043A\u0441\u0442/\u0447\u0438\u0441\u043B\u043E." } }
  },
  argTypes: {
    appearance: { control: "select", options: APPEARANCES },
    size: { control: "select", options: SIZES }
  }
};
export default meta;
const Default = {
  args: { children: "99", appearance: "brand", size: "sm" }
};
const AllAppearances = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", padding: 16 }, children: APPEARANCES.map((a) => /* @__PURE__ */ jsx(Badge, { ...args, appearance: a, children: a }, a)) }),
  args: { size: "md" }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 12, alignItems: "center", padding: 16 }, children: SIZES.map((s) => /* @__PURE__ */ jsx(Badge, { ...args, size: s, children: s }, s)) }),
  args: { appearance: "brand" }
};
const VariantMatrix = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "grid", gridTemplateColumns: `repeat(${SIZES.length}, auto)`, gap: 8, padding: 16 }, children: APPEARANCES.flatMap(
    (a) => SIZES.map((s) => /* @__PURE__ */ jsx(Badge, { ...args, appearance: a, size: s, children: a }, a + s))
  ) }),
  args: {}
};
export {
  AllAppearances,
  AllSizes,
  Default,
  VariantMatrix
};
