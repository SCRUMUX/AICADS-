/**
 * Figma Token Parser
 * 
 * Parses raw Figma token exports and transforms them into normalized token structures.
 * This is the first stage of the token ingestion pipeline.
 */

import {
  ColorValue,
  TypographyPrimitives,
  ShadowLayer,
  GridConfig,
  DesignTokens,
  ThemeMode,
} from './token-types';

// =============================================================================
// RAW FIGMA TOKEN TYPES (as exported from Figma)
// =============================================================================

interface FigmaColorValue {
  colorSpace?: string;
  components?: number[];
  alpha?: number;
  hex?: string;
}

interface FigmaVariable {
  $type: string;
  $value: unknown;
  $extensions?: {
    'com.figma.variableId'?: string;
    'com.figma.scopes'?: string[];
    'com.figma.type'?: string;
    'com.figma.isOverride'?: boolean;
  };
}

interface FigmaShadow {
  type: 'DROP_SHADOW' | 'INNER_SHADOW';
  visible?: boolean;
  color: { r: number; g: number; b: number; a: number };
  blendMode?: string;
  offset: { x: number; y: number };
  radius: number;
  spread?: number;
  showShadowBehindNode?: boolean;
}

interface FigmaGrid {
  pattern: 'COLUMNS' | 'ROWS';
  sectionSize: number;
  visible?: boolean;
  color?: { r: number; g: number; b: number; a: number };
  alignment: 'STRETCH' | 'MIN' | 'CENTER' | 'MAX';
  gutterSize: number;
  offset: number;
  count: number;
}

// =============================================================================
// PARSING UTILITIES
// =============================================================================

/**
 * Parse Figma color value to normalized ColorValue
 */
export function parseFigmaColor(raw: FigmaColorValue | { r: number; g: number; b: number; a?: number }): ColorValue {
  // Handle hex format
  if ('hex' in raw && raw.hex) {
    return {
      hex: raw.hex.toUpperCase(),
      alpha: raw.alpha ?? 1,
    };
  }
  
  // Handle components array format
  if ('components' in raw && raw.components) {
    const [r, g, b] = raw.components;
    const hex = rgbToHex(Math.round(r * 255), Math.round(g * 255), Math.round(b * 255));
    return {
      hex,
      rgb: { r: Math.round(r * 255), g: Math.round(g * 255), b: Math.round(b * 255) },
      alpha: raw.alpha ?? 1,
    };
  }
  
  // Handle rgba object format
  if ('r' in raw) {
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
        b: Math.round(raw.b * 255),
      },
      alpha: raw.a ?? 1,
    };
  }
  
  throw new Error('Unknown color format');
}

/**
 * Convert RGB to hex
 */
function rgbToHex(r: number, g: number, b: number): string {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
}

/**
 * Parse Figma shadow to normalized ShadowLayer
 */
export function parseFigmaShadow(raw: FigmaShadow): ShadowLayer {
  const color = parseFigmaColor(raw.color);
  return {
    type: raw.type,
    offsetX: raw.offset.x,
    offsetY: raw.offset.y,
    blur: raw.radius,
    spread: raw.spread ?? 0,
    color,
    opacity: raw.color.a,
  };
}

/**
 * Parse Figma grid to normalized GridConfig
 */
export function parseFigmaGrid(raw: FigmaGrid): GridConfig {
  return {
    pattern: raw.pattern,
    count: raw.count,
    sectionSize: raw.sectionSize,
    gutterSize: raw.gutterSize,
    offset: raw.offset,
    alignment: raw.alignment,
  };
}

/**
 * Parse Figma typography style
 */
export function parseFigmaTypography(raw: {
  fontFamily: string;
  fontPostScriptName?: string | null;
  fontWeight: number;
  fontSize: number;
  lineHeightPx: number;
  lineHeightPercent?: number;
  letterSpacing: number;
  textCase?: string | null;
  textDecoration?: string | null;
}): TypographyPrimitives {
  return {
    fontFamily: raw.fontFamily,
    fontWeight: raw.fontWeight,
    fontSize: raw.fontSize,
    lineHeight: raw.lineHeightPx,
    letterSpacing: raw.letterSpacing,
    textCase: raw.textCase as TypographyPrimitives['textCase'],
    textDecoration: raw.textDecoration as TypographyPrimitives['textDecoration'],
  };
}

// =============================================================================
// TOKEN NAME UTILITIES
// =============================================================================

/**
 * Tokenize a Figma style name into a consistent format
 * e.g., "Color/Light/BG/Base" -> "color_light_bg_base"
 */
export function tokenizeName(name: string): string {
  return name
    .replace(/\//g, '_')
    .replace(/\s+/g, '_')
    .replace(/[^a-zA-Z0-9_]/g, '')
    .toLowerCase();
}

/**
 * Extract semantic category from token name
 */
export function extractSemanticCategory(tokenName: string): string | null {
  const parts = tokenName.split('_');
  // Skip "color", "Light"/"Dark" parts
  const semanticPart = parts.find(p => 
    ['bg', 'text', 'brand', 'link', 'focus', 'border', 'divide', 
     'success', 'warning', 'danger', 'info', 'viz', 'surface'].includes(p.toLowerCase())
  );
  return semanticPart?.toLowerCase() ?? null;
}

/**
 * Extract theme mode from token name
 */
export function extractThemeMode(tokenName: string): ThemeMode | null {
  const lower = tokenName.toLowerCase();
  if (lower.includes('light') || lower.includes('ligth')) return 'light';
  if (lower.includes('dark')) return 'dark';
  return null;
}

// =============================================================================
// VALIDATION
// =============================================================================

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate parsed tokens against contracts
 */
export function validateTokens(tokens: Partial<DesignTokens>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];
  
  // Validate color tokens
  if (tokens.color) {
    if (!tokens.color.primitives || Object.keys(tokens.color.primitives).length === 0) {
      errors.push('Color tokens: No primitive tokens found');
    }
  }
  
  // Validate typography tokens
  if (tokens.typography) {
    if (!tokens.typography.primitives.fontFamily || Object.keys(tokens.typography.primitives.fontFamily).length === 0) {
      errors.push('Typography tokens: No font family primitives found');
    }
  }
  
  // Validate space tokens
  if (tokens.space) {
    if (!tokens.space.primitives || Object.keys(tokens.space.primitives).length === 0) {
      errors.push('Space tokens: No primitive tokens found');
    }
  }
  
  // Validate radius tokens
  if (tokens.radius) {
    if (!tokens.radius.primitives || Object.keys(tokens.radius.primitives).length === 0) {
      errors.push('Radius tokens: No primitive tokens found');
    }
  }
  
  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
