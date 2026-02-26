/**
 * Token Type Definitions
 *
 * These types define the structure of design tokens as they flow through the system.
 * All types are derived from the token contracts.
 */
export interface ColorValue {
    hex: string;
    rgb?: {
        r: number;
        g: number;
        b: number;
    };
    alpha?: number;
}
export interface TypographyPrimitives {
    fontFamily: string;
    fontWeight: number;
    fontSize: number;
    lineHeight: number;
    letterSpacing?: number;
    textCase?: 'UPPER' | 'LOWER' | 'CAPITALIZE' | null;
    textDecoration?: 'UNDERLINE' | 'STRIKETHROUGH' | null;
}
export interface SpaceValue {
    value: number;
    unit: 'px';
}
export interface RadiusValue {
    value: number | 'full';
    unit: 'px' | '%';
}
export interface ShadowLayer {
    type: 'DROP_SHADOW' | 'INNER_SHADOW';
    offsetX: number;
    offsetY: number;
    blur: number;
    spread: number;
    color: ColorValue;
    opacity: number;
}
export interface EffectValue {
    type: 'elevation' | 'focus' | 'scrim' | 'blur';
    shadows?: ShadowLayer[];
    backgroundColor?: ColorValue;
    backdropBlur?: number;
}
export interface GridConfig {
    pattern: 'COLUMNS' | 'ROWS';
    count: number;
    sectionSize: number;
    gutterSize: number;
    offset: number;
    alignment: 'STRETCH' | 'MIN' | 'CENTER' | 'MAX';
}
export type ColorSemanticCategory = 'bg' | 'surface' | 'text' | 'brand' | 'link' | 'focus' | 'border' | 'divide' | 'success' | 'warning' | 'danger' | 'info' | 'viz';
export type SpaceSemanticCategory = 'layout' | 'content' | 'control' | 'inset';
export type SpaceSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type RadiusSemanticName = 'none' | 'subtle' | 'default' | 'medium' | 'large' | 'xl' | 'pill';
export type EffectSemanticCategory = 'elevation' | 'focus' | 'scrim' | 'blur';
export type LayoutSemanticName = 'grid_desktop' | 'grid_tablet' | 'grid_mobile' | 'baseline_8pt';
export interface ColorTokens {
    primitives: Record<string, ColorValue>;
    semantic: Record<ColorSemanticCategory, Record<string, string>>;
}
export interface TypographyTokens {
    primitives: {
        fontFamily: Record<string, string>;
        fontWeight: Record<string, number>;
        fontSize: Record<string, number>;
        lineHeight: Record<string, number>;
    };
    semantic: {
        roles: Record<string, string>;
        emphasis: Record<string, string>;
        context: Record<string, string>;
    };
    textStyles: Record<string, TypographyPrimitives>;
}
export interface SpaceTokens {
    primitives: Record<string, number>;
    semantic: Record<SpaceSemanticCategory, Record<SpaceSize, string>>;
}
export interface RadiusTokens {
    primitives: Record<string, number | 'full'>;
    semantic: Record<RadiusSemanticName, string>;
}
export interface EffectTokens {
    primitives: {
        offset: Record<string, number>;
        blur: Record<string, number>;
        spread: Record<string, number>;
        opacity: Record<string, number>;
    };
    semantic: Record<EffectSemanticCategory, Record<string, EffectValue>>;
}
export interface LayoutTokens {
    primitives: {
        columns: Record<string, number>;
        sectionSize: Record<string, number>;
        gutter: Record<string, number>;
        offset: Record<string, number>;
    };
    semantic: {
        grids: Record<string, GridConfig>;
        baseline: Record<string, GridConfig>;
    };
}
export interface DesignTokens {
    color: ColorTokens;
    typography: TypographyTokens;
    space: SpaceTokens;
    radius: RadiusTokens;
    effect: EffectTokens;
    layout: LayoutTokens;
}
export type ThemeMode = 'light' | 'dark';
export interface ThemedTokens {
    light: DesignTokens;
    dark: DesignTokens;
}
export interface Breakpoint {
    name: string;
    min: number;
    max: number | null;
    grid: LayoutSemanticName;
}
export declare const BREAKPOINTS: Breakpoint[];
//# sourceMappingURL=token-types.d.ts.map