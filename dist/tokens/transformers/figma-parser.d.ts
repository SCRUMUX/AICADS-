/**
 * Figma Token Parser
 *
 * Parses raw Figma token exports and transforms them into normalized token structures.
 * This is the first stage of the token ingestion pipeline.
 */
import { ColorValue, TypographyPrimitives, ShadowLayer, GridConfig, DesignTokens, ThemeMode } from './token-types';
interface FigmaColorValue {
    colorSpace?: string;
    components?: number[];
    alpha?: number;
    hex?: string;
}
interface FigmaShadow {
    type: 'DROP_SHADOW' | 'INNER_SHADOW';
    visible?: boolean;
    color: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    blendMode?: string;
    offset: {
        x: number;
        y: number;
    };
    radius: number;
    spread?: number;
    showShadowBehindNode?: boolean;
}
interface FigmaGrid {
    pattern: 'COLUMNS' | 'ROWS';
    sectionSize: number;
    visible?: boolean;
    color?: {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    alignment: 'STRETCH' | 'MIN' | 'CENTER' | 'MAX';
    gutterSize: number;
    offset: number;
    count: number;
}
/**
 * Parse Figma color value to normalized ColorValue
 */
export declare function parseFigmaColor(raw: FigmaColorValue | {
    r: number;
    g: number;
    b: number;
    a?: number;
}): ColorValue;
/**
 * Parse Figma shadow to normalized ShadowLayer
 */
export declare function parseFigmaShadow(raw: FigmaShadow): ShadowLayer;
/**
 * Parse Figma grid to normalized GridConfig
 */
export declare function parseFigmaGrid(raw: FigmaGrid): GridConfig;
/**
 * Parse Figma typography style
 */
export declare function parseFigmaTypography(raw: {
    fontFamily: string;
    fontPostScriptName?: string | null;
    fontWeight: number;
    fontSize: number;
    lineHeightPx: number;
    lineHeightPercent?: number;
    letterSpacing: number;
    textCase?: string | null;
    textDecoration?: string | null;
}): TypographyPrimitives;
/**
 * Tokenize a Figma style name into a consistent format
 * e.g., "Color/Light/BG/Base" -> "color_light_bg_base"
 */
export declare function tokenizeName(name: string): string;
/**
 * Extract semantic category from token name
 */
export declare function extractSemanticCategory(tokenName: string): string | null;
/**
 * Extract theme mode from token name
 */
export declare function extractThemeMode(tokenName: string): ThemeMode | null;
export interface ValidationResult {
    valid: boolean;
    errors: string[];
    warnings: string[];
}
/**
 * Validate parsed tokens against contracts
 */
export declare function validateTokens(tokens: Partial<DesignTokens>): ValidationResult;
export {};
//# sourceMappingURL=figma-parser.d.ts.map