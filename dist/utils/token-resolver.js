function parseTokenReference(ref) {
  const parts = ref.split(".");
  if (parts.length < 2) return null;
  const category = parts[0];
  const name = parts.slice(1).join("-");
  return { category, name };
}
function getCSSVariableName(ref) {
  return `--${ref.category}-${ref.name}`;
}
function getCSSVariableRef(ref, fallback) {
  if (fallback !== void 0) {
    return `var(${getCSSVariableName(ref)}, ${fallback})`;
  }
  return `var(${getCSSVariableName(ref)})`;
}
function resolveToken(ref, tokenValues, fallback) {
  const categoryTokens = tokenValues[ref.category];
  const value = categoryTokens?.[ref.name];
  if (value !== void 0) {
    return {
      cssVariable: getCSSVariableName(ref),
      value,
      reference: ref
    };
  }
  if (fallback !== void 0) {
    return {
      cssVariable: getCSSVariableName(ref),
      value: fallback,
      reference: ref
    };
  }
  return null;
}
function resolveTokens(refs, tokenValues) {
  const results = /* @__PURE__ */ new Map();
  for (const ref of refs) {
    const parsed = typeof ref === "string" ? parseTokenReference(ref) : ref;
    if (!parsed) continue;
    const resolved = resolveToken(parsed, tokenValues);
    if (resolved) {
      const key = typeof ref === "string" ? ref : `${ref.category}.${ref.name}`;
      results.set(key, resolved);
    }
  }
  return results;
}
function getComputedTokenValue(ref) {
  if (typeof window === "undefined") return null;
  const varName = getCSSVariableName(ref);
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || null;
}
function setTokenValue(ref, value) {
  if (typeof window === "undefined") return;
  const varName = getCSSVariableName(ref);
  document.documentElement.style.setProperty(varName, value);
}
function clearTokenOverride(ref) {
  if (typeof window === "undefined") return;
  const varName = getCSSVariableName(ref);
  document.documentElement.style.removeProperty(varName);
}
function getCurrentTheme() {
  if (typeof window === "undefined") return null;
  const theme = document.documentElement.getAttribute("data-theme");
  if (theme === "light" || theme === "dark") return theme;
  if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    return "dark";
  }
  return "light";
}
function setTheme(mode) {
  if (typeof window === "undefined") return;
  document.documentElement.setAttribute("data-theme", mode);
}
function toggleTheme() {
  const current = getCurrentTheme();
  const next = current === "dark" ? "light" : "dark";
  setTheme(next);
  return next;
}
function isValidTokenReference(ref) {
  const parsed = typeof ref === "string" ? parseTokenReference(ref) : ref;
  if (!parsed) return false;
  const validCategories = [
    "color",
    "typography",
    "space",
    "radius",
    "effect",
    "layout"
  ];
  return validCategories.includes(parsed.category);
}
function tokenExists(ref) {
  return getComputedTokenValue(ref) !== null;
}
export {
  clearTokenOverride,
  getCSSVariableName,
  getCSSVariableRef,
  getComputedTokenValue,
  getCurrentTheme,
  isValidTokenReference,
  parseTokenReference,
  resolveToken,
  resolveTokens,
  setTheme,
  setTokenValue,
  toggleTheme,
  tokenExists
};
