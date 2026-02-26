import {
  BREAKPOINTS as GRID_BREAKPOINTS
} from "../layout/grid/grid-system";
const BREAKPOINTS = {
  mobile: { name: "mobile", min: GRID_BREAKPOINTS.mobile.min, max: GRID_BREAKPOINTS.mobile.max },
  tablet: { name: "tablet", min: GRID_BREAKPOINTS.tablet.min, max: GRID_BREAKPOINTS.tablet.max },
  desktop: { name: "desktop", min: GRID_BREAKPOINTS.desktop.min, max: GRID_BREAKPOINTS.desktop.max }
};
const BREAKPOINT_ORDER = ["mobile", "tablet", "desktop"];
function getCurrentBreakpoint() {
  if (typeof window === "undefined") return "desktop";
  const width = window.innerWidth;
  if (width >= BREAKPOINTS.desktop.min) return "desktop";
  if (width >= BREAKPOINTS.tablet.min) return "tablet";
  return "mobile";
}
function matchesBreakpoint(breakpoint) {
  if (typeof window === "undefined") return false;
  const width = window.innerWidth;
  const bp = BREAKPOINTS[breakpoint];
  const matchesMin = width >= bp.min;
  const matchesMax = bp.max === null || width <= bp.max;
  return matchesMin && matchesMax;
}
function isAtLeast(breakpoint) {
  if (typeof window === "undefined") return false;
  const width = window.innerWidth;
  return width >= BREAKPOINTS[breakpoint].min;
}
function isAtMost(breakpoint) {
  if (typeof window === "undefined") return false;
  const width = window.innerWidth;
  const max = BREAKPOINTS[breakpoint].max;
  return max === null ? true : width <= max;
}
function resolveResponsiveValue(value, breakpoint) {
  if (!isResponsiveValue(value)) {
    return value;
  }
  const bp = breakpoint ?? getCurrentBreakpoint();
  const responsiveValue = value;
  const bpIndex = BREAKPOINT_ORDER.indexOf(bp);
  for (let i = bpIndex; i >= 0; i--) {
    const checkBp = BREAKPOINT_ORDER[i];
    if (responsiveValue[checkBp] !== void 0) {
      return responsiveValue[checkBp];
    }
  }
  return void 0;
}
function isResponsiveValue(value) {
  if (typeof value !== "object" || value === null) return false;
  const keys = Object.keys(value);
  return keys.some((k) => BREAKPOINT_ORDER.includes(k));
}
function getMediaQuery(breakpoint) {
  const bp = BREAKPOINTS[breakpoint];
  if (bp.max === null) {
    return `(min-width: ${bp.min}px)`;
  }
  return `(min-width: ${bp.min}px) and (max-width: ${bp.max}px)`;
}
function getMinWidthQuery(breakpoint) {
  return `(min-width: ${BREAKPOINTS[breakpoint].min}px)`;
}
function generateResponsiveCSS(property, value, valueTransform) {
  const lines = [];
  const transform = valueTransform ?? ((v) => String(v));
  if (value.mobile !== void 0) {
    lines.push(`${property}: ${transform(value.mobile)};`);
  }
  if (value.tablet !== void 0) {
    lines.push(`@media ${getMinWidthQuery("tablet")} {`);
    lines.push(`  ${property}: ${transform(value.tablet)};`);
    lines.push(`}`);
  }
  if (value.desktop !== void 0) {
    lines.push(`@media ${getMinWidthQuery("desktop")} {`);
    lines.push(`  ${property}: ${transform(value.desktop)};`);
    lines.push(`}`);
  }
  return lines.join("\n");
}
function onBreakpointChange(callback) {
  if (typeof window === "undefined") return () => {
  };
  let currentBp = getCurrentBreakpoint();
  const handler = () => {
    const newBp = getCurrentBreakpoint();
    if (newBp !== currentBp) {
      currentBp = newBp;
      callback(newBp);
    }
  };
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}
function responsiveClasses(prefix, value, valueTransform) {
  if (!isResponsiveValue(value)) {
    const transform2 = valueTransform ?? ((v) => String(v));
    return `${prefix}-${transform2(value)}`;
  }
  const classes = [];
  const transform = valueTransform ?? ((v) => String(v));
  if (value.mobile !== void 0) {
    classes.push(`${prefix}-${transform(value.mobile)}`);
  }
  if (value.tablet !== void 0) {
    classes.push(`tablet:${prefix}-${transform(value.tablet)}`);
  }
  if (value.desktop !== void 0) {
    classes.push(`desktop:${prefix}-${transform(value.desktop)}`);
  }
  return classes.join(" ");
}
export {
  BREAKPOINTS,
  BREAKPOINT_ORDER,
  generateResponsiveCSS,
  getCurrentBreakpoint,
  getMediaQuery,
  getMinWidthQuery,
  isAtLeast,
  isAtMost,
  isResponsiveValue,
  matchesBreakpoint,
  onBreakpointChange,
  resolveResponsiveValue,
  responsiveClasses
};
