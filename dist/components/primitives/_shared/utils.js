function findClasses(rules, args) {
  return rules.filter((r) => {
    for (const k of Object.keys(r.when)) {
      if (r.when[k] !== args[k]) return false;
    }
    return true;
  }).flatMap((r) => r.tailwindClasses);
}
function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}
function getFocusRing(contract, appearance) {
  if (appearance?.includes("danger")) {
    return contract.focusRingDanger ?? "";
  }
  return contract.focusRing ?? "";
}
export {
  cn,
  findClasses,
  getFocusRing
};
