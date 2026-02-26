const SPACE_PRIMITIVES = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  6: 6,
  8: 8,
  9: 9,
  12: 12,
  16: 16,
  24: 24,
  32: 32
};
const SPACE_SEMANTICS = {
  layout: {
    xs: 1,
    s: 2,
    m: 3,
    l: 6,
    xl: 9
  },
  content: {
    xs: 2,
    s: 4,
    m: 6,
    l: 9,
    xl: 12
    // extended
  },
  control: {
    xs: 1,
    s: 2,
    m: 3,
    l: 4,
    xl: 6
    // extended
  },
  inset: {
    xs: 4,
    s: 6,
    m: 9,
    l: 12,
    xl: 16
  }
};
const SPACING_PROPERTY_MAP = {
  top: ["padding-top", "margin-top"],
  right: ["padding-right", "margin-right"],
  bottom: ["padding-bottom", "margin-bottom"],
  left: ["padding-left", "margin-left"],
  x: ["padding-left", "padding-right", "margin-left", "margin-right"],
  y: ["padding-top", "padding-bottom", "margin-top", "margin-bottom"],
  all: ["padding", "margin"]
};
function getSpaceVarName(category, size) {
  return `--space-${category}-${size}`;
}
function getSpaceVar(category, size) {
  return `var(${getSpaceVarName(category, size)})`;
}
function getPrimitiveSpaceVar(value) {
  return `var(--space-${value})`;
}
function validateSpacingSpec(spec) {
  const validCategories = ["layout", "content", "control", "inset"];
  const validSizes = ["xs", "s", "m", "l", "xl"];
  const validSides = ["top", "right", "bottom", "left", "x", "y", "all"];
  if (!validCategories.includes(spec.category)) {
    return { valid: false, error: `Invalid category: ${spec.category}` };
  }
  if (!validSizes.includes(spec.size)) {
    return { valid: false, error: `Invalid size: ${spec.size}` };
  }
  if (!validSides.includes(spec.side)) {
    return { valid: false, error: `Invalid side: ${spec.side}` };
  }
  if (spec.category === "layout" && spec.side === "all") {
    return { valid: false, error: 'Layout spacing should not use "all" - use margin directionally' };
  }
  if (spec.category === "inset" && !["all", "x", "y"].includes(spec.side)) {
    console.warn("Inset spacing is typically used for padding all around");
  }
  return { valid: true };
}
function generatePaddingCSS(spec) {
  const varRef = getSpaceVar(spec.category, spec.size);
  const css = {};
  switch (spec.side) {
    case "all":
      css.padding = varRef;
      break;
    case "x":
      css.paddingLeft = varRef;
      css.paddingRight = varRef;
      break;
    case "y":
      css.paddingTop = varRef;
      css.paddingBottom = varRef;
      break;
    default:
      css[`padding${capitalize(spec.side)}`] = varRef;
  }
  return css;
}
function generateMarginCSS(spec) {
  const varRef = getSpaceVar(spec.category, spec.size);
  const css = {};
  switch (spec.side) {
    case "all":
      css.margin = varRef;
      break;
    case "x":
      css.marginLeft = varRef;
      css.marginRight = varRef;
      break;
    case "y":
      css.marginTop = varRef;
      css.marginBottom = varRef;
      break;
    default:
      css[`margin${capitalize(spec.side)}`] = varRef;
  }
  return css;
}
function generateGapCSS(category, size) {
  return {
    gap: getSpaceVar(category, size)
  };
}
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function resolveSpacingIntent(intent) {
  const spec = {
    category: intent.category,
    size: intent.size,
    side: intent.side ?? "all"
  };
  switch (intent.type) {
    case "padding":
      return generatePaddingCSS(spec);
    case "margin":
      return generateMarginCSS(spec);
    case "gap":
      return generateGapCSS(intent.category, intent.size);
    default:
      return {};
  }
}
function getSpacingTailwindClass(type, category, size, side) {
  const sizeMap = {
    top: "t",
    right: "r",
    bottom: "b",
    left: "l",
    x: "x",
    y: "y",
    all: ""
  };
  const sidePrefix = side && side !== "all" ? sizeMap[side] : "";
  const tokenName = `${category}-${size}`;
  if (type === "gap") {
    return `gap-${tokenName}`;
  }
  return `${type}${sidePrefix}-${tokenName}`;
}
export {
  SPACE_PRIMITIVES,
  SPACE_SEMANTICS,
  SPACING_PROPERTY_MAP,
  generateGapCSS,
  generateMarginCSS,
  generatePaddingCSS,
  getPrimitiveSpaceVar,
  getSpaceVar,
  getSpaceVarName,
  getSpacingTailwindClass,
  resolveSpacingIntent,
  validateSpacingSpec
};
