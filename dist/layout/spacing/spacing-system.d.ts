/**
 * Spacing System Foundation
 *
 * Token-driven spacing system abstractions for machine-readable layout generation.
 *
 * From: Space.contract.json
 *
 * Semantic Categories:
 * - layout: Margins between large sections
 * - content: Gaps within content blocks
 * - control: Padding/gaps for interactive elements
 * - inset: Padding for containers
 */
export type SpaceSize = 'xs' | 's' | 'm' | 'l' | 'xl';
export type SpaceCategory = 'layout' | 'content' | 'control' | 'inset';
export interface SpaceIntent {
    category: SpaceCategory;
    size: SpaceSize;
}
export type SpacingSide = 'top' | 'right' | 'bottom' | 'left' | 'x' | 'y' | 'all';
export interface SpacingSpec {
    category: SpaceCategory;
    size: SpaceSize;
    side: SpacingSide;
}
/**
 * Primitive space values in pixels
 * These are the raw values - use semantic tokens in production
 */
export declare const SPACE_PRIMITIVES: {
    readonly 1: 1;
    readonly 2: 2;
    readonly 3: 3;
    readonly 4: 4;
    readonly 6: 6;
    readonly 8: 8;
    readonly 9: 9;
    readonly 12: 12;
    readonly 16: 16;
    readonly 24: 24;
    readonly 32: 32;
};
/**
 * Semantic spacing mappings
 * Maps category + size to primitive space token
 */
export declare const SPACE_SEMANTICS: Record<SpaceCategory, Record<SpaceSize, number>>;
/**
 * CSS property mapping for spacing sides
 */
export declare const SPACING_PROPERTY_MAP: Record<SpacingSide, string[]>;
/**
 * Get CSS variable name for a space token
 */
export declare function getSpaceVarName(category: SpaceCategory, size: SpaceSize): string;
/**
 * Get CSS variable reference for a space token
 */
export declare function getSpaceVar(category: SpaceCategory, size: SpaceSize): string;
/**
 * Get primitive space CSS variable
 */
export declare function getPrimitiveSpaceVar(value: keyof typeof SPACE_PRIMITIVES): string;
/**
 * Validate spacing specification
 */
export declare function validateSpacingSpec(spec: SpacingSpec): {
    valid: boolean;
    error?: string;
};
/**
 * Generate padding CSS from spacing specification
 */
export declare function generatePaddingCSS(spec: SpacingSpec): Record<string, string>;
/**
 * Generate margin CSS from spacing specification
 */
export declare function generateMarginCSS(spec: SpacingSpec): Record<string, string>;
/**
 * Generate gap CSS for flex/grid containers
 */
export declare function generateGapCSS(category: SpaceCategory, size: SpaceSize): Record<string, string>;
export interface SpacingIntent {
    type: 'padding' | 'margin' | 'gap';
    category: SpaceCategory;
    size: SpaceSize;
    side?: SpacingSide;
}
/**
 * Resolve spacing intent to CSS properties
 */
export declare function resolveSpacingIntent(intent: SpacingIntent): Record<string, string>;
/**
 * Get Tailwind class for spacing
 */
export declare function getSpacingTailwindClass(type: 'p' | 'm' | 'gap', category: SpaceCategory, size: SpaceSize, side?: SpacingSide): string;
//# sourceMappingURL=spacing-system.d.ts.map