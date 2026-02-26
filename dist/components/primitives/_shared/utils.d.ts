/**
 * Shared utilities for all primitive components.
 * Single source of truth — import from this file instead of duplicating in each component.
 */
export type VR = {
    when: Record<string, string>;
    tailwindClasses: string[];
};
/** Returns all tailwindClasses from rules where all `when` fields match `args`. */
export declare function findClasses(rules: VR[], args: Record<string, string>): string[];
/** Joins class names, filtering out falsy values. */
export declare function cn(...classes: (string | undefined | false | null)[]): string;
/** Determines the correct focus ring class based on appearance. */
export declare function getFocusRing(contract: Record<string, unknown>, appearance?: string): string;
//# sourceMappingURL=utils.d.ts.map