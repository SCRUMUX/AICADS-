import { useEffect } from "react";
function useEscapeKey(handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        handler();
        e.stopPropagation();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [handler, enabled]);
}
export {
  useEscapeKey
};
