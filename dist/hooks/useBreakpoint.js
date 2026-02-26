import { useSyncExternalStore } from "react";
import {
  getCurrentBreakpoint
} from "../utils/breakpoint-utils";
let listeners = [];
let currentBp = typeof window !== "undefined" ? getCurrentBreakpoint() : "desktop";
function subscribe(listener) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
function handleResize() {
  const next = getCurrentBreakpoint();
  if (next !== currentBp) {
    currentBp = next;
    for (const l of listeners) l();
  }
}
if (typeof window !== "undefined") {
  window.addEventListener("resize", handleResize);
}
function getSnapshot() {
  return currentBp;
}
function getServerSnapshot() {
  return "desktop";
}
function useBreakpoint() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
function useMinBreakpoint(bp) {
  const current = useBreakpoint();
  const order = ["mobile", "tablet", "desktop"];
  return order.indexOf(current) >= order.indexOf(bp);
}
export {
  useBreakpoint,
  useMinBreakpoint
};
