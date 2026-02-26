import { useEffect } from "react";
function useClickOutside(refs, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const targets = Array.isArray(refs) ? refs : [refs];
    const onMouseDown = (e) => {
      const inside = targets.some(
        (r) => r.current && r.current.contains(e.target)
      );
      if (!inside) handler();
    };
    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [refs, handler, enabled]);
}
export {
  useClickOutside
};
