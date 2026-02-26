function parseFigmaColor(raw) {
  if ("hex" in raw && raw.hex) {
    return {
      hex: raw.hex.toUpperCase(),
      alpha: raw.alpha ?? 1
    };
  }
  if ("components" in raw && raw.components) {
    const [r, g, b] = raw.components;
    const hex = rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
    return {
      hex,
      rgb: { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) },
      alpha: raw.alpha ?? 1
    };
  }
  if ("r" in raw) {
    const hex = rgbToHex(
      Math.round(raw.r * 255),
      Math.round(raw.g * 255),
      Math.round(raw.b * 255)
    );
    return {
      hex,
      rgb: {
        r: Math.round(raw.r * 255),
        g: Math.round(raw.g * 255),
        b: Math.round(raw.b * 255)
      },
      alpha: raw.a ?? 1
    };
  }
  throw new Error("Unknown color format");
}
function rgbToHex(r, g, b) {
  return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("").toUpperCase();
}
function parseFigmaShadow(raw) {
  const color = parseFigmaColor(raw.color);
  return {
    type: raw.type,
    offsetX: raw.offset.x,
    offsetY: raw.offset.y,
    blur: raw.radius,
    spread: raw.spread ?? 0,
    color,
    opacity: raw.color.a
  };
}
function parseFigmaGrid(raw) {
  return {
    pattern: raw.pattern,
    count: raw.count,
    sectionSize: raw.sectionSize,
    gutterSize: raw.gutterSize,
    offset: raw.offset,
    alignment: raw.alignment
  };
}
function parseFigmaTypography(raw) {
  return {
    fontFamily: raw.fontFamily,
    fontWeight: raw.fontWeight,
    fontSize: raw.fontSize,
    lineHeight: raw.lineHeightPx,
    letterSpacing: raw.letterSpacing,
    textCase: raw.textCase,
    textDecoration: raw.textDecoration
  };
}
function tokenizeName(name) {
  return name.replace(/\//g, "_").replace(/\s+/g, "_").replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
}
function extractSemanticCategory(tokenName) {
  const parts = tokenName.split("_");
  const semanticPart = parts.find(
    (p) => [
      "bg",
      "text",
      "brand",
      "link",
      "focus",
      "border",
      "divide",
      "success",
      "warning",
      "danger",
      "info",
      "viz",
      "surface"
    ].includes(p.toLowerCase())
  );
  return semanticPart?.toLowerCase() ?? null;
}
function extractThemeMode(tokenName) {
  const lower = tokenName.toLowerCase();
  if (lower.includes("light") || lower.includes("ligth")) return "light";
  if (lower.includes("dark")) return "dark";
  return null;
}
function validateTokens(tokens) {
  const errors = [];
  const warnings = [];
  if (tokens.color) {
    if (!tokens.color.primitives || Object.keys(tokens.color.primitives).length === 0) {
      errors.push("Color tokens: No primitive tokens found");
    }
  }
  if (tokens.typography) {
    if (!tokens.typography.primitives.fontFamily || Object.keys(tokens.typography.primitives.fontFamily).length === 0) {
      errors.push("Typography tokens: No font family primitives found");
    }
  }
  if (tokens.space) {
    if (!tokens.space.primitives || Object.keys(tokens.space.primitives).length === 0) {
      errors.push("Space tokens: No primitive tokens found");
    }
  }
  if (tokens.radius) {
    if (!tokens.radius.primitives || Object.keys(tokens.radius.primitives).length === 0) {
      errors.push("Radius tokens: No primitive tokens found");
    }
  }
  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}
export {
  extractSemanticCategory,
  extractThemeMode,
  parseFigmaColor,
  parseFigmaGrid,
  parseFigmaShadow,
  parseFigmaTypography,
  tokenizeName,
  validateTokens
};
