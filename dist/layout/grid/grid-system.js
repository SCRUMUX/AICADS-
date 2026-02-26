const BREAKPOINTS = {
  mobile: { min: 320, max: 767 },
  tablet: { min: 768, max: 1439 },
  desktop: { min: 1440, max: null }
};
const GRID_CONFIGS = {
  mobile: {
    columns: 4,
    gutter: "var(--grid-mobile-gutter)",
    offset: "var(--grid-mobile-offset)",
    sectionSize: "var(--grid-mobile-section-size)"
  },
  tablet: {
    columns: 8,
    gutter: "var(--grid-tablet-gutter)",
    offset: "var(--grid-tablet-offset)",
    sectionSize: "var(--grid-tablet-section-size)"
  },
  desktop: {
    columns: 12,
    gutter: "var(--grid-desktop-gutter)",
    offset: "var(--grid-desktop-offset)",
    sectionSize: "var(--grid-desktop-section-size)"
  }
};
function getCurrentBreakpoint(width) {
  if (width >= BREAKPOINTS.desktop.min) return "desktop";
  if (width >= BREAKPOINTS.tablet.min) return "tablet";
  return "mobile";
}
function getGridConfig(breakpoint) {
  return GRID_CONFIGS[breakpoint];
}
function getMaxColumns(breakpoint) {
  return GRID_CONFIGS[breakpoint].columns;
}
function validateGridSpan(span, breakpoint) {
  const maxCols = getMaxColumns(breakpoint);
  if (typeof span === "number") {
    if (span < 1 || span > maxCols) {
      return {
        valid: false,
        error: `Span ${span} is invalid for ${breakpoint} (max: ${maxCols})`
      };
    }
    return { valid: true };
  }
  if (span.start < 1 || span.start > maxCols) {
    return {
      valid: false,
      error: `Start position ${span.start} is invalid for ${breakpoint} (max: ${maxCols})`
    };
  }
  if (span.end < span.start || span.end > maxCols + 1) {
    return {
      valid: false,
      error: `End position ${span.end} is invalid for ${breakpoint}`
    };
  }
  return { valid: true };
}
function normalizeSpan(span, breakpoint) {
  if (typeof span === "number") {
    return { start: 1, end: span + 1 };
  }
  return span;
}
function spanToCSS(span) {
  if (typeof span === "number") {
    return `span ${span}`;
  }
  return `${span.start} / ${span.end}`;
}
function generateResponsiveGridCSS(spans) {
  const styles = {};
  if (spans.mobile !== void 0) {
    styles["gridColumn"] = spanToCSS(spans.mobile);
  }
  return styles;
}
function generateGridContainerCSS(breakpoint) {
  const config = GRID_CONFIGS[breakpoint];
  return {
    display: "grid",
    gridTemplateColumns: `repeat(${config.columns}, 1fr)`,
    gap: config.gutter,
    paddingLeft: config.offset,
    paddingRight: config.offset
  };
}
function generateResponsiveGridContainerCSS() {
  return `
.grid-container {
  display: grid;
  width: 100%;
}

/* Mobile (default) */
.grid-container {
  grid-template-columns: repeat(var(--grid-mobile-columns, 4), 1fr);
  gap: var(--grid-mobile-gutter);
  padding-left: var(--grid-mobile-offset);
  padding-right: var(--grid-mobile-offset);
}

/* Tablet */
@media (min-width: ${BREAKPOINTS.tablet.min}px) {
  .grid-container {
    grid-template-columns: repeat(var(--grid-tablet-columns, 8), 1fr);
    gap: var(--grid-tablet-gutter);
    padding-left: var(--grid-tablet-offset);
    padding-right: var(--grid-tablet-offset);
  }
}

/* Desktop */
@media (min-width: ${BREAKPOINTS.desktop.min}px) {
  .grid-container {
    grid-template-columns: repeat(var(--grid-desktop-columns, 12), 1fr);
    gap: var(--grid-desktop-gutter);
    padding-left: var(--grid-desktop-offset);
    padding-right: var(--grid-desktop-offset);
  }
}
`.trim();
}
function resolveLayoutIntent(intent) {
  const css = {};
  const breakpoints = ["mobile", "tablet", "desktop"];
  let lastSpan;
  for (const bp of breakpoints) {
    const span = intent.spans[bp];
    if (span !== void 0) {
      lastSpan = span;
    }
    if (bp === "mobile" && lastSpan !== void 0) {
      css.gridColumn = spanToCSS(lastSpan);
    }
  }
  if (intent.alignment) {
    css.justifySelf = intent.alignment;
  }
  return css;
}
export {
  BREAKPOINTS,
  GRID_CONFIGS,
  generateGridContainerCSS,
  generateResponsiveGridCSS,
  generateResponsiveGridContainerCSS,
  getCurrentBreakpoint,
  getGridConfig,
  getMaxColumns,
  normalizeSpan,
  resolveLayoutIntent,
  spanToCSS,
  validateGridSpan
};
