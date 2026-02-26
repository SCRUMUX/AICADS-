import { jsx, jsxs } from "react/jsx-runtime";
import { Avatar } from "./Avatar";
import { Badge } from "../Badge/Badge";
const VARIANTS = ["guest", "registered-no-photo", "registered-with-photo"];
const SIZES = ["xs", "sm", "md", "lg", "xl"];
const AVATAR_SRC = "/images/Avatar.jpg";
const meta = {
  title: "Primitives/Avatar",
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: "Avatar: 3 \u0442\u0438\u043F\u0430 (guest, registered-no-photo, registered-with-photo), 5 \u0440\u0430\u0437\u043C\u0435\u0440\u043E\u0432 (xs\u2026xl). Badge \u2014 \u0438\u043D\u0441\u0442\u0430\u043D\u0441 \u043A\u043E\u043C\u043F\u043E\u043D\u0435\u043D\u0442\u0430 Badge, \u043F\u043E\u0437\u0438\u0446\u0438\u044F bottom-right."
      }
    }
  },
  argTypes: {
    variant: { control: "select", options: VARIANTS },
    size: { control: "select", options: SIZES },
    showBadge: { control: "boolean" },
    initials: { control: "text" },
    src: { control: "text" }
  }
};
export default meta;
const Default = {
  args: { variant: "guest", size: "md", showBadge: false }
};
const AllSizes = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 16, alignItems: "center" }, children: SIZES.map((s) => /* @__PURE__ */ jsx(Avatar, { ...args, size: s }, s)) }),
  args: { variant: "guest", showBadge: false }
};
const AllVariants = {
  render: (args) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, alignItems: "center" }, children: [
    /* @__PURE__ */ jsx(Avatar, { ...args, variant: "guest" }),
    /* @__PURE__ */ jsx(Avatar, { ...args, variant: "registered-no-photo", initials: "VK" }),
    /* @__PURE__ */ jsx(Avatar, { ...args, variant: "registered-with-photo", src: "/images/Avatar.png", initials: "VK" })
  ] }),
  args: { size: "md", showBadge: false }
};
const WithBadge = {
  render: (args) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, alignItems: "center" }, children: [
    /* @__PURE__ */ jsx(Avatar, { ...args, variant: "guest", showBadge: true, badgeContent: "3" }),
    /* @__PURE__ */ jsx(Avatar, { ...args, variant: "registered-no-photo", initials: "VK", showBadge: true, badgeContent: "12" }),
    /* @__PURE__ */ jsx(
      Avatar,
      {
        ...args,
        variant: "registered-with-photo",
        src: "/images/Avatar.png",
        initials: "VK",
        showBadge: true,
        badgeContent: "99+"
      }
    )
  ] }),
  args: { size: "lg" }
};
const CustomBadge = {
  render: () => /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 16, alignItems: "center" }, children: [
    /* @__PURE__ */ jsx(
      Avatar,
      {
        variant: "registered-no-photo",
        size: "xl",
        initials: "VK",
        showBadge: true,
        badge: /* @__PURE__ */ jsx(Badge, { appearance: "success", size: "sm", children: "\u25CF" })
      }
    ),
    /* @__PURE__ */ jsx(
      Avatar,
      {
        variant: "guest",
        size: "xl",
        showBadge: true,
        badge: /* @__PURE__ */ jsx(Badge, { appearance: "danger", size: "sm", children: "!" })
      }
    )
  ] })
};
const AllSizesWithBadge = {
  render: (args) => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center" }, children: SIZES.map((s) => /* @__PURE__ */ jsx(Avatar, { ...args, size: s, showBadge: true, badgeContent: "3" }, s)) }),
  args: { variant: "registered-no-photo", initials: "VK" }
};
const AllVariantsAllSizes = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", flexDirection: "column", gap: 16 }, children: VARIANTS.map((v) => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, alignItems: "center" }, children: SIZES.map((s) => /* @__PURE__ */ jsx(
    Avatar,
    {
      variant: v,
      size: s,
      initials: "VK",
      src: v === "registered-with-photo" ? AVATAR_SRC : void 0
    },
    s
  )) }, v)) })
};
export {
  AllSizes,
  AllSizesWithBadge,
  AllVariants,
  AllVariantsAllSizes,
  CustomBadge,
  Default,
  WithBadge
};
