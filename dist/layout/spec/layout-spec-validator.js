import { GRID_CONFIGS } from "../grid/grid-system";
const VALID_NODE_TYPES = ["container", "grid-item", "spacer"];
const VALID_CONTAINER_TYPES = ["page", "section", "card", "panel", "modal", "content"];
const VALID_CONTAINER_VARIANTS = ["default", "elevated", "bordered", "transparent"];
const VALID_RADIUS_TOKENS = ["none", "subtle", "default", "medium", "large", "xl", "pill"];
const VALID_ELEVATION_TOKENS = ["none", "1", "2", "3", "glow"];
const VALID_BACKGROUND_TOKENS = ["base", "muted", "surface-1", "surface-2", "surface-3", "disabled", "brand-muted", "transparent"];
const VALID_SPACING_CATEGORIES = ["layout", "content", "control", "inset"];
const VALID_SPACING_SIZES = ["xs", "s", "m", "l", "xl"];
const VALID_SPACING_SIDES = ["top", "right", "bottom", "left", "x", "y", "all"];
const VALID_ALIGNMENTS = ["start", "center", "end", "stretch"];
function isIn(value, allowed) {
  return allowed.includes(value);
}
function validateSpacingIntent(intent, path, errors) {
  if (typeof intent !== "object" || intent === null) {
    errors.push(`${path}: must be an object`);
    return;
  }
  const si = intent;
  if (!si.category || !isIn(si.category, VALID_SPACING_CATEGORIES)) {
    errors.push(`${path}.category: must be one of ${VALID_SPACING_CATEGORIES.join(", ")}`);
  }
  if (!si.size || !isIn(si.size, VALID_SPACING_SIZES)) {
    errors.push(`${path}.size: must be one of ${VALID_SPACING_SIZES.join(", ")}`);
  }
  if (si.side !== void 0 && !isIn(si.side, VALID_SPACING_SIDES)) {
    errors.push(`${path}.side: must be one of ${VALID_SPACING_SIDES.join(", ")}`);
  }
}
function validateNode(node, path, errors, seenIds) {
  if (typeof node !== "object" || node === null) {
    errors.push(`${path}: must be an object`);
    return;
  }
  const n = node;
  if (typeof n.id !== "string" || n.id.length === 0) {
    errors.push(`${path}.id: required non-empty string`);
  } else if (seenIds.has(n.id)) {
    errors.push(`${path}.id: duplicate id '${n.id}'`);
  } else {
    seenIds.add(n.id);
  }
  if (!isIn(n.type, VALID_NODE_TYPES)) {
    errors.push(`${path}.type: must be one of ${VALID_NODE_TYPES.join(", ")}`);
  }
  if (n.container !== void 0) {
    const c = n.container;
    if (c.type !== void 0 && !isIn(c.type, VALID_CONTAINER_TYPES)) {
      errors.push(`${path}.container.type: must be one of ${VALID_CONTAINER_TYPES.join(", ")}`);
    }
    if (c.variant !== void 0 && !isIn(c.variant, VALID_CONTAINER_VARIANTS)) {
      errors.push(`${path}.container.variant: must be one of ${VALID_CONTAINER_VARIANTS.join(", ")}`);
    }
    if (c.radius !== void 0 && !isIn(c.radius, VALID_RADIUS_TOKENS)) {
      errors.push(`${path}.container.radius: must be one of ${VALID_RADIUS_TOKENS.join(", ")}`);
    }
    if (c.elevation !== void 0 && !isIn(c.elevation, VALID_ELEVATION_TOKENS)) {
      errors.push(`${path}.container.elevation: must be one of ${VALID_ELEVATION_TOKENS.join(", ")}`);
    }
    if (c.background !== void 0 && !isIn(c.background, VALID_BACKGROUND_TOKENS)) {
      errors.push(`${path}.container.background: must be one of ${VALID_BACKGROUND_TOKENS.join(", ")}`);
    }
    if (c.padding !== void 0) {
      validateSpacingIntent(c.padding, `${path}.container.padding`, errors);
    }
  }
  if (n.grid !== void 0) {
    const g = n.grid;
    if (g.alignment !== void 0 && !isIn(g.alignment, VALID_ALIGNMENTS)) {
      errors.push(`${path}.grid.alignment: must be one of ${VALID_ALIGNMENTS.join(", ")}`);
    }
    if (g.spans !== void 0) {
      const spans = g.spans;
      for (const bp of ["mobile", "tablet", "desktop"]) {
        if (spans[bp] !== void 0) {
          const v = spans[bp];
          const maxCols = GRID_CONFIGS[bp].columns;
          if (typeof v !== "number" || v < 1 || v > maxCols || !Number.isInteger(v)) {
            errors.push(`${path}.grid.spans.${bp}: must be integer 1-${maxCols}`);
          }
        }
      }
    }
  }
  if (n.spacing !== void 0) {
    const s = n.spacing;
    if (s.margin !== void 0) validateSpacingIntent(s.margin, `${path}.spacing.margin`, errors);
    if (s.padding !== void 0) validateSpacingIntent(s.padding, `${path}.spacing.padding`, errors);
    if (s.gap !== void 0) validateSpacingIntent(s.gap, `${path}.spacing.gap`, errors);
  }
  if (n.type === "spacer" && n.children !== void 0) {
    const children = n.children;
    if (Array.isArray(children) && children.length > 0) {
      errors.push(`${path}: spacer nodes must not have children`);
    }
  }
  if (n.children !== void 0) {
    if (!Array.isArray(n.children)) {
      errors.push(`${path}.children: must be an array`);
    } else {
      n.children.forEach((child, i) => {
        validateNode(child, `${path}.children[${i}]`, errors, seenIds);
      });
    }
  }
}
function validateLayoutSpec(spec) {
  const errors = [];
  if (typeof spec !== "object" || spec === null) {
    return { valid: false, errors: ["Spec must be a non-null object"] };
  }
  const s = spec;
  if (s.type !== "layout") {
    errors.push('root.type: must be "layout"');
  }
  if (typeof s.name !== "string" || s.name.length === 0) {
    errors.push("root.name: required non-empty string");
  }
  if (s.root === void 0) {
    errors.push("root.root: required");
  } else {
    const seenIds = /* @__PURE__ */ new Set();
    validateNode(s.root, "root.root", errors, seenIds);
  }
  return { valid: errors.length === 0, errors };
}
export {
  validateLayoutSpec
};
