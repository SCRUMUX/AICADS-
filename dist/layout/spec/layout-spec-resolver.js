import { validateLayoutSpec } from "./layout-spec-validator";
import {
  generateContainerCSS,
  generateContainerTailwindClasses
} from "../containers/container-system";
import {
  resolveSpacingIntent as subsystemResolveSpacing,
  getSpacingTailwindClass
} from "../spacing/spacing-system";
import { spanToCSS } from "../grid/grid-system";
function adaptContainerConfig(config) {
  return {
    type: config.type ?? "content",
    variant: config.variant,
    padding: config.padding ? { category: config.padding.category, size: config.padding.size } : void 0,
    radius: config.radius,
    elevation: config.elevation,
    background: config.background,
    border: config.border,
    maxWidth: config.maxWidth ? void 0 : void 0
    // maxWidth uses different types; handled separately
  };
}
function adaptSpacingIntent(intent, property) {
  return {
    type: property,
    category: intent.category,
    size: intent.size,
    side: intent.side
  };
}
function resolveContainer(config) {
  const adapted = adaptContainerConfig(config);
  const css = generateContainerCSS(adapted);
  const tw = generateContainerTailwindClasses(adapted);
  if (config.maxWidth) {
    css.maxWidth = config.maxWidth;
  }
  return { css, tw };
}
function resolveGrid(config) {
  const css = {};
  const tw = [];
  if (config.spans) {
    if (config.spans.mobile) {
      css.gridColumn = spanToCSS(config.spans.mobile);
      tw.push(`col-span-${config.spans.mobile}`);
    }
    if (config.spans.tablet) {
      tw.push(`tablet:col-span-${config.spans.tablet}`);
    }
    if (config.spans.desktop) {
      tw.push(`desktop:col-span-${config.spans.desktop}`);
    }
  }
  if (config.alignment) {
    css.justifySelf = config.alignment;
    tw.push(`justify-self-${config.alignment}`);
  }
  return { css, tw };
}
function resolveSpacing(config) {
  const css = {};
  const tw = [];
  if (config.margin) {
    const adapted = adaptSpacingIntent(config.margin, "margin");
    Object.assign(css, subsystemResolveSpacing(adapted));
    tw.push(getSpacingTailwindClass("m", config.margin.category, config.margin.size, config.margin.side));
  }
  if (config.padding) {
    const adapted = adaptSpacingIntent(config.padding, "padding");
    Object.assign(css, subsystemResolveSpacing(adapted));
    tw.push(getSpacingTailwindClass("p", config.padding.category, config.padding.size, config.padding.side));
  }
  if (config.gap) {
    const adapted = adaptSpacingIntent(config.gap, "gap");
    Object.assign(css, subsystemResolveSpacing(adapted));
    tw.push(getSpacingTailwindClass("gap", config.gap.category, config.gap.size));
  }
  return { css, tw };
}
function resolveNode(node, allDiagnostics) {
  const css = {};
  const tw = [];
  const diagnostics = [];
  if (node.container) {
    try {
      const c = resolveContainer(node.container);
      Object.assign(css, c.css);
      tw.push(...c.tw);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      diagnostics.push({ nodeId: node.id, severity: "error", message: `Container resolution failed: ${msg}` });
    }
  }
  if (node.grid) {
    try {
      const g = resolveGrid(node.grid);
      Object.assign(css, g.css);
      tw.push(...g.tw);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      diagnostics.push({ nodeId: node.id, severity: "error", message: `Grid resolution failed: ${msg}` });
    }
  }
  if (node.spacing) {
    try {
      const s = resolveSpacing(node.spacing);
      Object.assign(css, s.css);
      tw.push(...s.tw);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      diagnostics.push({ nodeId: node.id, severity: "error", message: `Spacing resolution failed: ${msg}` });
    }
  }
  if (node.componentRef) {
    diagnostics.push({ nodeId: node.id, severity: "warning", message: `componentRef "${node.componentRef}" must be bound by the application layer` });
  }
  if (node.behaviorId) {
    diagnostics.push({ nodeId: node.id, severity: "warning", message: `behaviorId "${node.behaviorId}" must be resolved via the Behavior Registry` });
  }
  allDiagnostics.push(...diagnostics);
  const children = (node.children || []).map((child) => resolveNode(child, allDiagnostics));
  return {
    id: node.id,
    type: node.type,
    css,
    tailwindClasses: tw.filter(Boolean),
    children,
    componentRef: node.componentRef,
    behaviorId: node.behaviorId,
    behaviors: node.behaviors,
    diagnostics: diagnostics.length > 0 ? diagnostics : void 0
  };
}
function loadLayoutSpec(spec) {
  const validation = validateLayoutSpec(spec);
  if (!validation.valid) {
    return { success: false, validation, diagnostics: [] };
  }
  const layoutSpec = spec;
  const diagnostics = [];
  const root = resolveNode(layoutSpec.root, diagnostics);
  return {
    success: true,
    layout: {
      name: layoutSpec.name,
      version: layoutSpec.version,
      root
    },
    validation,
    diagnostics
  };
}
function loadLayoutSpecPartial(spec) {
  const validation = validateLayoutSpec(spec);
  const diagnostics = [];
  const s = spec;
  if (!s || typeof s !== "object" || !s.root) {
    return {
      success: false,
      validation,
      diagnostics: [{ nodeId: "root", severity: "error", message: "No root node to resolve" }]
    };
  }
  for (const err of validation.errors) {
    diagnostics.push({ nodeId: "validation", severity: "warning", message: err });
  }
  try {
    const root = resolveNode(s.root, diagnostics);
    return {
      success: true,
      layout: {
        name: s.name || "unknown",
        version: s.version,
        root
      },
      validation,
      diagnostics
    };
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    diagnostics.push({ nodeId: "root", severity: "error", message: `Root resolution failed: ${msg}` });
    return { success: false, validation, diagnostics };
  }
}
export {
  loadLayoutSpec,
  loadLayoutSpecPartial
};
