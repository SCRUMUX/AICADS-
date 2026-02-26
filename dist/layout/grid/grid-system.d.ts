/**
 * Grid System Foundation
 *
 * Token-driven grid system abstractions for machine-readable layout generation.
 * This module provides the foundation for automated layout creation.
 *
 * From: Layout.contract.json
 */
export type BreakpointName = 'mobile' | 'tablet' | 'desktop';
export interface GridConfig {
    columns: number;
    gutter: string;
    offset: string;
    sectionSize: string;
}
export interface GridSpan {
    start: number;
    end: number;
}
export interface ResponsiveGridSpan {
    mobile?: GridSpan | number;
    tablet?: GridSpan | number;
    desktop?: GridSpan | number;
}
export declare const BREAKPOINTS: {
    readonly mobile: {
        readonly min: 320;
        readonly max: 767;
    };
    readonly tablet: {
        readonly min: 768;
        readonly max: 1439;
    };
    readonly desktop: {
        readonly min: 1440;
        readonly max: null;
    };
};
export declare const GRID_CONFIGS: Record<BreakpointName, GridConfig>;
/**
 * Get the current breakpoint based on window width
 */
export declare function getCurrentBreakpoint(width: number): BreakpointName;
/**
 * Get grid configuration for a breakpoint
 */
export declare function getGridConfig(breakpoint: BreakpointName): GridConfig;
/**
 * Get maximum columns for a breakpoint
 */
export declare function getMaxColumns(breakpoint: BreakpointName): number;
/**
 * Validate grid span against breakpoint constraints
 */
export declare function validateGridSpan(span: GridSpan | number, breakpoint: BreakpointName): {
    valid: boolean;
    error?: string;
};
/**
 * Normalize span to GridSpan object
 */
export declare function normalizeSpan(span: GridSpan | number, breakpoint: BreakpointName): GridSpan;
/**
 * Generate CSS grid-column value from span
 */
export declare function spanToCSS(span: GridSpan | number): string;
/**
 * Generate responsive grid column CSS
 */
export declare function generateResponsiveGridCSS(spans: ResponsiveGridSpan): Record<string, string>;
/**
 * Generate grid container CSS for a breakpoint
 */
export declare function generateGridContainerCSS(breakpoint: BreakpointName): Record<string, string>;
/**
 * Generate full responsive grid container CSS
 */
export declare function generateResponsiveGridContainerCSS(): string;
export interface GridLayoutIntent {
    type: 'grid';
    breakpoint?: BreakpointName;
    spans: ResponsiveGridSpan;
    alignment?: 'start' | 'center' | 'end' | 'stretch';
}
export interface GridLayoutNode {
    id: string;
    type: 'container' | 'item';
    gridIntent?: GridLayoutIntent;
    children?: GridLayoutNode[];
}
/**
 * Resolve layout intent to CSS properties
 */
export declare function resolveLayoutIntent(intent: GridLayoutIntent): Record<string, string>;
//# sourceMappingURL=grid-system.d.ts.map