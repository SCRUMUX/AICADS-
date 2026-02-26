import { jsx, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Captcha } from "./Captcha";
const meta = {
  title: "Primitives/Captcha",
  component: Captcha,
  parameters: {
    docs: {
      description: {
        component: "`@UI/Captcha` \u2014 placeholder-\u0432\u0438\u0434\u0436\u0435\u0442 \u0434\u043B\u044F \u0432\u0441\u0442\u0440\u0430\u0438\u0432\u0430\u043D\u0438\u044F reCAPTCHA / hCaptcha. \u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0440\u0430\u0437\u043C\u0435\u0440 160\xD772px. \u0421\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F: `idle`, `loading`, `success`, `error`."
      }
    }
  },
  argTypes: {
    state: { control: "select", options: ["idle", "loading", "success", "error"] },
    placeholder: { control: "text" }
  }
};
export default meta;
const Default = {
  args: {
    state: "idle",
    placeholder: "Captcha"
  }
};
const AllStates = {
  render: () => /* @__PURE__ */ jsx("div", { style: { display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }, children: ["idle", "loading", "success", "error"].map((s) => /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }, children: [
    /* @__PURE__ */ jsxs("span", { style: { fontSize: 11, color: "#888" }, children: [
      "state=",
      s
    ] }),
    /* @__PURE__ */ jsx(Captcha, { state: s })
  ] }, s)) })
};
const Idle = {
  args: {
    state: "idle",
    placeholder: "Captcha"
  }
};
const Loading = {
  args: {
    state: "loading"
  }
};
const Success = {
  args: {
    state: "success"
  }
};
const Error = {
  args: {
    state: "error"
  }
};
const Interactive = {
  render: () => {
    const [state, setState] = useState("idle");
    const [log, setLog] = useState([]);
    const addLog = (msg) => setLog((prev) => [...prev.slice(-4), msg]);
    const handleClick = () => {
      if (state === "idle") {
        setState("loading");
        addLog("\u2192 Verifying\u2026");
        setTimeout(() => {
          const ok = Math.random() > 0.3;
          setState(ok ? "success" : "error");
          addLog(ok ? "\u2713 Verified!" : "\u2717 Verification failed");
        }, 1800);
      } else if (state === "error" || state === "success") {
        setState("idle");
        setLog([]);
        addLog("\u21BA Reset");
      }
    };
    return /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "#666" }, children: "Click the widget to simulate verification (70% success rate)." }),
      /* @__PURE__ */ jsx("div", { onClick: handleClick, style: { cursor: state === "loading" ? "not-allowed" : "pointer" }, children: /* @__PURE__ */ jsx(Captcha, { state }) }),
      /* @__PURE__ */ jsx("div", { style: { fontSize: 11, color: "#888", display: "flex", flexDirection: "column", gap: 2 }, children: log.map((l, i) => /* @__PURE__ */ jsx("span", { children: l }, i)) }),
      (state === "success" || state === "error") && /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            setState("idle");
            setLog([]);
          },
          style: {
            fontSize: 12,
            padding: "4px 12px",
            border: "1px solid #ccc",
            borderRadius: 4,
            cursor: "pointer",
            background: "white"
          },
          children: "Reset"
        }
      )
    ] });
  }
};
const CustomPlaceholder = {
  args: {
    state: "idle",
    placeholder: "I'm not a robot"
  }
};
export {
  AllStates,
  CustomPlaceholder,
  Default,
  Error,
  Idle,
  Interactive,
  Loading,
  Success
};
