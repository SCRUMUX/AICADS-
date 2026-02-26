import { jsx, jsxs } from "react/jsx-runtime";
import { useRef, useState } from "react";
import { Popover } from "./Popover";
import { Button } from "../Button/Button";
const meta = {
  title: "Primitives/Popover",
  component: Popover,
  parameters: {
    docs: {
      description: {
        component: "`Popover` \u2014 positioned floating panel anchored to a reference element. Handles viewport flip detection. Used internally by Dropdown and Autocomplete; also available for custom popover patterns."
      }
    }
  }
};
export default meta;
const Default = {
  render: () => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(false);
    return /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "inline-block", padding: 40 }, children: [
      /* @__PURE__ */ jsx(Button, { ref: anchorRef, size: "sm", onClick: () => setOpen((p) => !p), children: "Toggle Popover" }),
      /* @__PURE__ */ jsx(Popover, { anchorRef, open, "aria-label": "Demo popover", children: /* @__PURE__ */ jsx("div", { style: { padding: 12 }, children: /* @__PURE__ */ jsx("p", { style: { margin: 0 }, children: "Popover content goes here." }) }) })
    ] });
  }
};
const WithAutoFlip = {
  render: () => {
    const anchorRef = useRef(null);
    const [open, setOpen] = useState(true);
    return /* @__PURE__ */ jsxs("div", { style: { position: "relative", display: "inline-block", marginTop: 300 }, children: [
      /* @__PURE__ */ jsx(Button, { ref: anchorRef, size: "sm", onClick: () => setOpen((p) => !p), children: "Flip demo (scroll down)" }),
      /* @__PURE__ */ jsx(Popover, { anchorRef, open, autoFlip: true, "aria-label": "Flip demo", children: /* @__PURE__ */ jsx("div", { style: { padding: 12 }, children: /* @__PURE__ */ jsx("p", { style: { margin: 0 }, children: "This popover will flip above the anchor if there is not enough space below." }) }) })
    ] });
  }
};
export {
  Default,
  WithAutoFlip
};
