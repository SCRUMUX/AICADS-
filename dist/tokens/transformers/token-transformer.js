import {
  BREAKPOINTS
} from "./token-types";
function colorToCSS(color) {
  if (color.alpha !== void 0 && color.alpha < 1) {
    if (color.rgb) {
      return `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.alpha})`;
    }
    const hex = color.hex.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${color.alpha})`;
  }
  return color.hex;
}
function shadowsToCSS(shadows) {
  return shadows.map((s) => {
    const color = colorToCSS({ ...s.color, alpha: s.opacity });
    const inset = s.type === "INNER_SHADOW" ? "inset " : "";
    return `${inset}${s.offsetX}px ${s.offsetY}px ${s.blur}px ${s.spread}px ${color}`;
  }).join(", ");
}
function generateCSSVariables(tokens, mode) {
  const root = {};
  const light = {};
  const dark = {};
  if (tokens.color) {
    Object.entries(tokens.color.primitives).forEach(([name, value]) => {
      root[`--color-${name}`] = colorToCSS(value);
    });
  }
  if (tokens.typography) {
    Object.entries(tokens.typography.primitives.fontFamily).forEach(([name, value]) => {
      root[`--font-family-${name}`] = value;
    });
    Object.entries(tokens.typography.primitives.fontWeight).forEach(([name, value]) => {
      root[`--font-weight-${name}`] = String(value);
    });
    Object.entries(tokens.typography.primitives.fontSize).forEach(([name, value]) => {
      root[`--font-size-${name}`] = `${value}px`;
    });
    Object.entries(tokens.typography.primitives.lineHeight).forEach(([name, value]) => {
      root[`--line-height-${name}`] = `${value}px`;
    });
  }
  if (tokens.space) {
    Object.entries(tokens.space.primitives).forEach(([name, value]) => {
      root[`--space-${name}`] = `${value}px`;
    });
  }
  if (tokens.radius) {
    Object.entries(tokens.radius.primitives).forEach(([name, value]) => {
      root[`--radius-${name}`] = value === "full" ? "9999px" : `${value}px`;
    });
  }
  if (tokens.effect) {
    Object.entries(tokens.effect.semantic).forEach(([category, effects]) => {
      Object.entries(effects).forEach(([name, effect]) => {
        if (effect.shadows) {
          root[`--effect-${category}-${name}`] = shadowsToCSS(effect.shadows);
        }
        if (effect.backdropBlur !== void 0) {
          root[`--effect-${category}-${name}-blur`] = `${effect.backdropBlur}px`;
        }
        if (effect.backgroundColor) {
          root[`--effect-${category}-${name}-bg`] = colorToCSS(effect.backgroundColor);
        }
      });
    });
  }
  if (tokens.layout) {
    Object.entries(tokens.layout.semantic.grids).forEach(([name, grid]) => {
      root[`--grid-${name}-columns`] = String(grid.count);
      root[`--grid-${name}-gutter`] = `${grid.gutterSize}px`;
      root[`--grid-${name}-offset`] = `${grid.offset}px`;
      root[`--grid-${name}-section-size`] = `${grid.sectionSize}px`;
    });
    Object.entries(tokens.layout.semantic.baseline).forEach(([name, grid]) => {
      root[`--baseline-${name}-size`] = `${grid.sectionSize}px`;
      root[`--baseline-${name}-offset`] = `${grid.offset}px`;
    });
  }
  return { root, light, dark };
}
function generateCSSFile(variables) {
  const lines = [];
  lines.push(":root {");
  Object.entries(variables.root).forEach(([key, value]) => {
    lines.push(`  ${key}: ${value};`);
  });
  lines.push("}");
  lines.push("");
  if (Object.keys(variables.light).length > 0) {
    lines.push(':root, [data-theme="light"] {');
    Object.entries(variables.light).forEach(([key, value]) => {
      lines.push(`  ${key}: ${value};`);
    });
    lines.push("}");
    lines.push("");
  }
  if (Object.keys(variables.dark).length > 0) {
    lines.push('[data-theme="dark"] {');
    Object.entries(variables.dark).forEach(([key, value]) => {
      lines.push(`  ${key}: ${value};`);
    });
    lines.push("}");
    lines.push("");
    lines.push("@media (prefers-color-scheme: dark) {");
    lines.push('  :root:not([data-theme="light"]) {');
    Object.entries(variables.dark).forEach(([key, value]) => {
      lines.push(`    ${key}: ${value};`);
    });
    lines.push("  }");
    lines.push("}");
  }
  return lines.join("\n");
}
function generateTailwindConfig(tokens) {
  const config = {
    theme: {
      extend: {
        colors: {},
        fontFamily: {},
        fontSize: {},
        fontWeight: {},
        spacing: {},
        borderRadius: {},
        boxShadow: {},
        screens: {}
      }
    }
  };
  if (tokens.color) {
    Object.keys(tokens.color.primitives).forEach((name) => {
      config.theme.extend.colors[name] = `var(--color-${name})`;
    });
  }
  if (tokens.typography) {
    Object.entries(tokens.typography.primitives.fontFamily).forEach(([name, value]) => {
      config.theme.extend.fontFamily[name] = [value, "sans-serif"];
    });
    Object.entries(tokens.typography.primitives.fontSize).forEach(([name, value]) => {
      const lineHeight = tokens.typography.primitives.lineHeight[name] ?? value * 1.5;
      config.theme.extend.fontSize[name] = [
        `var(--font-size-${name})`,
        { lineHeight: `var(--line-height-${name}, ${lineHeight}px)` }
      ];
    });
    Object.entries(tokens.typography.primitives.fontWeight).forEach(([name, value]) => {
      config.theme.extend.fontWeight[name] = `var(--font-weight-${name})`;
    });
  }
  if (tokens.space) {
    Object.keys(tokens.space.primitives).forEach((name) => {
      config.theme.extend.spacing[name] = `var(--space-${name})`;
    });
  }
  if (tokens.radius) {
    Object.keys(tokens.radius.primitives).forEach((name) => {
      config.theme.extend.borderRadius[name] = `var(--radius-${name})`;
    });
  }
  if (tokens.effect) {
    Object.entries(tokens.effect.semantic.elevation || {}).forEach(([name]) => {
      config.theme.extend.boxShadow[`elevation-${name}`] = `var(--effect-elevation-${name})`;
    });
    Object.entries(tokens.effect.semantic.focus || {}).forEach(([name]) => {
      config.theme.extend.boxShadow[`focus-${name}`] = `var(--effect-focus-${name})`;
    });
  }
  BREAKPOINTS.forEach((bp) => {
    config.theme.extend.screens[bp.name] = `${bp.min}px`;
  });
  return config;
}
function generateTailwindConfigFile(config) {
  return `/** @type {import('tailwindcss').Config} */
/*
 * AUTO-GENERATED FROM DESIGN TOKENS
 * DO NOT EDIT MANUALLY
 * 
 * This configuration is derived from design tokens.
 * All values reference CSS custom properties to maintain single source of truth.
 * 
 * To update: modify source tokens and run token transformation.
 */

module.exports = ${JSON.stringify(config, null, 2)};
`;
}
function generateTypeScriptConstants(tokens) {
  const lines = [];
  lines.push("/**");
  lines.push(" * AUTO-GENERATED FROM DESIGN TOKENS");
  lines.push(" * DO NOT EDIT MANUALLY");
  lines.push(" */");
  lines.push("");
  lines.push("// Color token names");
  lines.push("export const COLOR_TOKENS = {");
  if (tokens.color) {
    Object.keys(tokens.color.primitives).forEach((name) => {
      lines.push(`  ${name.toUpperCase().replace(/-/g, "_")}: 'var(--color-${name})',`);
    });
  }
  lines.push("} as const;");
  lines.push("");
  lines.push("// Space token names");
  lines.push("export const SPACE_TOKENS = {");
  if (tokens.space) {
    Object.keys(tokens.space.primitives).forEach((name) => {
      lines.push(`  SPACE_${name.toUpperCase()}: 'var(--space-${name})',`);
    });
  }
  lines.push("} as const;");
  lines.push("");
  lines.push("// Radius token names");
  lines.push("export const RADIUS_TOKENS = {");
  if (tokens.radius) {
    Object.keys(tokens.radius.primitives).forEach((name) => {
      lines.push(`  RADIUS_${name.toUpperCase()}: 'var(--radius-${name})',`);
    });
  }
  lines.push("} as const;");
  lines.push("");
  lines.push("// Breakpoints");
  lines.push("export const BREAKPOINTS = {");
  BREAKPOINTS.forEach((bp) => {
    lines.push(`  ${bp.name.toUpperCase()}: { min: ${bp.min}, max: ${bp.max ?? "null"} },`);
  });
  lines.push("} as const;");
  lines.push("");
  lines.push("export type ColorToken = keyof typeof COLOR_TOKENS;");
  lines.push("export type SpaceToken = keyof typeof SPACE_TOKENS;");
  lines.push("export type RadiusToken = keyof typeof RADIUS_TOKENS;");
  lines.push("export type BreakpointName = keyof typeof BREAKPOINTS;");
  return lines.join("\n");
}
export {
  generateCSSFile,
  generateCSSVariables,
  generateTailwindConfig,
  generateTailwindConfigFile,
  generateTypeScriptConstants
};
