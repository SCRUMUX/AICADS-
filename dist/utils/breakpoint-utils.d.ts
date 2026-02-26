/**
 * Breakpoint Utilities
 *
 * Utilities for working with responsive breakpoints.
 *
 * IMPORTANT: Breakpoint values are imported from grid-system (the canonical source
 * derived from Layout.contract.json). Do NOT redeclare breakpoint constants here.
 */
import { type BreakpointName } from '../layout/grid/grid-system';
export type { BreakpointName } from '../layout/grid/grid-system';
export interface Breakpoint {
    name: BreakpointName;
    min: number;
    max: number | null;
}
export interface ResponsiveValue<T> {
    mobile?: T;
    tablet?: T;
    desktop?: T;
}
export declare const BREAKPOINTS: Record<BreakpointName, Breakpoint>;
export declare const BREAKPOINT_ORDER: BreakpointName[];
/**
 * Get current breakpoint based on window width
 */
export declare function getCurrentBreakpoint(): BreakpointName;
/**
 * Check if current viewport matches a breakpoint
 */
export declare function matchesBreakpoint(breakpoint: BreakpointName): boolean;
/**
 * Check if current viewport is at least a certain breakpoint
 */
export declare function isAtLeast(breakpoint: BreakpointName): boolean;
/**
 * Check if current viewport is at most a certain breakpoint
 */
export declare function isAtMost(breakpoint: BreakpointName): boolean;
/**
 * Resolve a responsive value for the current breakpoint
 * Uses mobile-first approach: falls back to smaller breakpoints if not defined
 */
export declare function resolveResponsiveValue<T>(value: ResponsiveValue<T> | T, breakpoint?: BreakpointName): T | undefined;
/**
 * Check if a value is responsive (has breakpoint keys)
 */
export declare function isResponsiveValue<T>(value: ResponsiveValue<T> | T): value is ResponsiveValue<T>;
/**
 * Get media query string for a breakpoint
 */
export declare function getMediaQuery(breakpoint: BreakpointName): string;
/**
 * Get min-width media query for mobile-first approach
 */
export declare function getMinWidthQuery(breakpoint: BreakpointName): string;
/**
 * Generate CSS with media queries for responsive values
 */
export declare function generateResponsiveCSS<T>(property: string, value: ResponsiveValue<T>, valueTransform?: (v: T) => string): string;
/**
 * Create a breakpoint listener
 * Returns cleanup function
 */
export declare function onBreakpointChange(callback: (breakpoint: BreakpointName) => void): () => void;
/**
 * Generate Tailwind classes for responsive values
 */
export declare function responsiveClasses<T>(prefix: string, value: ResponsiveValue<T> | T, valueTransform?: (v: T) => string): string;
//# sourceMappingURL=breakpoint-utils.d.ts.map