/**
 * Token Resolver Utilities
 *
 * Runtime utilities for resolving token references to values.
 * Used when CSS variables are not available or for server-side rendering.
 */
export type TokenCategory = 'color' | 'typography' | 'space' | 'radius' | 'effect' | 'layout';
export interface TokenReference {
    category: TokenCategory;
    name: string;
    variant?: string;
    mode?: 'light' | 'dark';
}
export interface ResolvedToken {
    cssVariable: string;
    value: string | number;
    reference: TokenReference;
}
/**
 * Parse a token reference string into structured format
 *
 * Examples:
 * - "color.bg.base" → { category: "color", name: "bg-base" }
 * - "space.inset.m" → { category: "space", name: "inset-m" }
 * - "effect.elevation.2" → { category: "effect", name: "elevation-2" }
 */
export declare function parseTokenReference(ref: string): TokenReference | null;
/**
 * Get CSS variable name for a token reference
 */
export declare function getCSSVariableName(ref: TokenReference): string;
/**
 * Get CSS variable reference string.
 * Supports an optional fallback value for graceful degradation when the
 * token is not yet defined or when partial specs reference unknown tokens.
 */
export declare function getCSSVariableRef(ref: TokenReference, fallback?: string): string;
/**
 * Resolve a token reference to its CSS variable and computed value.
 * Returns a result with the fallback value if the token is not found
 * (graceful degradation) instead of returning null.
 */
export declare function resolveToken(ref: TokenReference, tokenValues: Record<string, Record<string, string | number>>, fallback?: string | number): ResolvedToken | null;
/**
 * Resolve multiple token references at once
 */
export declare function resolveTokens(refs: (string | TokenReference)[], tokenValues: Record<string, Record<string, string | number>>): Map<string, ResolvedToken>;
/**
 * Get computed CSS variable value from the DOM
 */
export declare function getComputedTokenValue(ref: TokenReference): string | null;
/**
 * Set CSS variable value at runtime
 */
export declare function setTokenValue(ref: TokenReference, value: string): void;
/**
 * Remove runtime token override
 */
export declare function clearTokenOverride(ref: TokenReference): void;
/**
 * Get current theme mode
 */
export declare function getCurrentTheme(): 'light' | 'dark' | null;
/**
 * Set theme mode
 */
export declare function setTheme(mode: 'light' | 'dark'): void;
/**
 * Toggle theme mode
 */
export declare function toggleTheme(): 'light' | 'dark';
/**
 * Check if a token reference is valid
 */
export declare function isValidTokenReference(ref: string | TokenReference): boolean;
/**
 * Check if a CSS variable exists
 */
export declare function tokenExists(ref: TokenReference): boolean;
//# sourceMappingURL=token-resolver.d.ts.map