import { jsx } from "react/jsx-runtime";
import { Breadcrumb } from "./Breadcrumb";
import { Badge } from "../Badge/Badge";
import { BellIcon } from "../../icons";
const meta = {
  title: "Primitives/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    docs: {
      description: {
        component: "Breadcrumb (@UI/Breadcrumb): 4 \u0443\u0440\u043E\u0432\u043D\u044F \u0432\u043B\u043E\u0436\u0435\u043D\u043D\u043E\u0441\u0442\u0438. \u041A\u0430\u0436\u0434\u044B\u0439 item \u2014 \u0438\u043D\u0441\u0442\u0430\u043D\u0441 SectionHeader. \u0420\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u044C \u2014 ChevronRight 12\xD712. Figma: 160:72559."
      }
    }
  },
  argTypes: {
    levels: { control: "select", options: ["1", "2", "3", "4"] },
    size: { control: "select", options: ["sm", "md", "lg"] }
  }
};
export default meta;
const Default = {
  args: { levels: "1", size: "sm" }
};
const AllLevels = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: ["1", "2", "3", "4"].map((l) => /* @__PURE__ */ jsx(Breadcrumb, { ...args, levels: l }, l)) }),
  args: { size: "sm" }
};
const CustomItems = {
  args: {
    size: "sm",
    items: [
      { label: "Home", href: "#" },
      { label: "Products", href: "#" },
      { label: "Electronics", href: "#" },
      { label: "Laptops" }
    ]
  }
};
const WithSlotsInItems = {
  args: {
    size: "sm",
    items: [
      {
        label: "Dashboard",
        href: "#",
        iconLeft: /* @__PURE__ */ jsx(BellIcon, { style: { width: "100%", height: "100%" } })
      },
      {
        label: "Reports",
        href: "#",
        badge: /* @__PURE__ */ jsx(Badge, { appearance: "brand", size: "sm", children: "12" })
      },
      { label: "Monthly" }
    ]
  }
};
const AllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: ["sm", "md", "lg"].map((s) => /* @__PURE__ */ jsx(
    Breadcrumb,
    {
      size: s,
      items: [
        { label: "Section", href: "#" },
        { label: "Category", href: "#" },
        { label: "Current page" }
      ]
    },
    s
  )) })
};
const SingleItem = {
  args: {
    size: "sm",
    items: [{ label: "Current page" }]
  }
};
export {
  AllLevels,
  AllSizes,
  CustomItems,
  Default,
  SingleItem,
  WithSlotsInItems
};
