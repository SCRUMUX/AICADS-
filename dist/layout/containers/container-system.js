import { BREAKPOINTS } from "../grid/grid-system";
import { getSpaceVar } from "../spacing/spacing-system";
const CONTAINER_DEFAULTS = {
  page: {
    variant: "transparent",
    padding: { category: "inset", size: "l" },
    radius: "none",
    elevation: "none",
    background: "base",
    maxWidth: "desktop"
  },
  section: {
    variant: "transparent",
    padding: { category: "inset", size: "m" },
    radius: "none",
    elevation: "none",
    background: "transparent"
  },
  card: {
    variant: "elevated",
    padding: { category: "inset", size: "m" },
    radius: "medium",
    elevation: "2",
    background: "surface-1",
    border: false
  },
  panel: {
    variant: "bordered",
    padding: { category: "inset", size: "m" },
    radius: "default",
    elevation: "none",
    background: "surface-1",
    border: true
  },
  modal: {
    variant: "elevated",
    padding: { category: "inset", size: "l" },
    radius: "large",
    elevation: "3",
    background: "surface-1",
    border: false
  },
  content: {
    variant: "transparent",
    padding: { category: "content", size: "m" },
    radius: "none",
    elevation: "none",
    background: "transparent"
  }
};
const RADIUS_VAR_MAP = {
  none: "var(--radius-none)",
  subtle: "var(--radius-subtle)",
  default: "var(--radius-default)",
  medium: "var(--radius-medium)",
  large: "var(--radius-large)",
  xl: "var(--radius-xl)",
  pill: "var(--radius-pill)"
};
const ELEVATION_VAR_MAP = {
  none: "none",
  "1": "var(--effect-elevation-1)",
  "2": "var(--effect-elevation-2)",
  "3": "var(--effect-elevation-3)",
  glow: "var(--effect-elevation-glow)"
};
const BACKGROUND_VAR_MAP = {
  base: "var(--color-bg-base)",
  muted: "var(--color-bg-muted)",
  "surface-1": "var(--color-surface-1)",
  "surface-2": "var(--color-surface-2)",
  "surface-3": "var(--color-surface-3)",
  disabled: "var(--color-bg-disabled)",
  "brand-muted": "var(--color-brand-muted)",
  transparent: "transparent"
};
function resolveContainerConfig(config) {
  const defaults = CONTAINER_DEFAULTS[config.type];
  return {
    type: config.type,
    variant: config.variant ?? defaults.variant ?? "default",
    padding: config.padding ?? defaults.padding ?? { category: "inset", size: "m" },
    radius: config.radius ?? defaults.radius ?? "default",
    elevation: config.elevation ?? defaults.elevation ?? "none",
    background: config.background ?? defaults.background ?? "surface-1",
    border: config.border ?? defaults.border ?? false,
    maxWidth: config.maxWidth ?? defaults.maxWidth ?? "full"
  };
}
function getContainerMaxWidth(maxWidth) {
  if (typeof maxWidth === "number") {
    return `${maxWidth}px`;
  }
  switch (maxWidth) {
    case "mobile":
      return `${BREAKPOINTS.mobile.max}px`;
    case "tablet":
      return `${BREAKPOINTS.tablet.max}px`;
    case "desktop":
      return "1440px";
    case "full":
    default:
      return "100%";
  }
}
function generateContainerCSS(config) {
  const resolved = resolveContainerConfig(config);
  const css = {};
  if (resolved.padding) {
    css.padding = getSpaceVar(resolved.padding.category, resolved.padding.size);
  }
  css.borderRadius = RADIUS_VAR_MAP[resolved.radius];
  if (resolved.elevation !== "none") {
    css.boxShadow = ELEVATION_VAR_MAP[resolved.elevation];
  }
  css.backgroundColor = BACKGROUND_VAR_MAP[resolved.background];
  if (resolved.border) {
    css.border = "1px solid var(--color-border-base)";
  }
  if (resolved.maxWidth !== "full") {
    css.maxWidth = getContainerMaxWidth(resolved.maxWidth);
    css.marginLeft = "auto";
    css.marginRight = "auto";
  }
  return css;
}
function generateContainerTailwindClasses(config) {
  const resolved = resolveContainerConfig(config);
  const classes = [];
  if (resolved.padding) {
    classes.push(`p-${resolved.padding.category}-${resolved.padding.size}`);
  }
  classes.push(`rounded-${resolved.radius}`);
  if (resolved.elevation !== "none") {
    classes.push(`shadow-elevation-${resolved.elevation}`);
  }
  if (resolved.background !== "transparent") {
    classes.push(`bg-${resolved.background}`);
  }
  if (resolved.border) {
    classes.push("border", "border-border-base");
  }
  if (resolved.maxWidth === "desktop") {
    classes.push("max-w-[1440px]", "mx-auto");
  } else if (resolved.maxWidth !== "full") {
    classes.push(`max-w-${resolved.maxWidth}`, "mx-auto");
  }
  return classes;
}
function resolveContainerIntent(intent) {
  return generateContainerCSS({
    type: intent.containerType,
    variant: intent.variant,
    padding: intent.padding,
    radius: intent.radius,
    elevation: intent.elevation,
    background: intent.background,
    border: intent.border,
    maxWidth: intent.maxWidth
  });
}
export {
  CONTAINER_DEFAULTS,
  generateContainerCSS,
  generateContainerTailwindClasses,
  getContainerMaxWidth,
  resolveContainerConfig,
  resolveContainerIntent
};
