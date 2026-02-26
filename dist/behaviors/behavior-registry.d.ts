/**
 * Behavior Registry
 *
 * A centralised registry of behavior configurations. Backend, AI, or config
 * files specify behavior by ID; the renderer looks up the config here and
 * binds the actual handler at the application layer.
 *
 * Usage:
 *   import { behaviorRegistry, registerBehavior, getBehavior } from './behavior-registry';
 *   registerBehavior('goToDashboard', { type: 'navigate', payload: { route: '/dashboard' } });
 *   const cfg = getBehavior('goToDashboard'); // → BehaviorConfig
 */
import type { BehaviorId, BehaviorConfig } from './behavior-types';
/**
 * Validate a behavior's payload against its schema (or the built-in schema for its type).
 * Returns an array of error messages, empty if valid.
 */
export declare function validateBehaviorPayload(config: BehaviorConfig): string[];
/**
 * Register a behavior config by ID.
 * Validates payload against schema if present.
 * Throws if the ID is already registered (call `unregisterBehavior` first to replace).
 */
export declare function registerBehavior(id: BehaviorId, config: BehaviorConfig): void;
/**
 * Get a behavior config by ID. Returns undefined if not found.
 */
export declare function getBehavior(id: BehaviorId): BehaviorConfig | undefined;
/**
 * Check if a behavior is registered.
 */
export declare function hasBehavior(id: BehaviorId): boolean;
/**
 * Unregister a behavior. Silently does nothing if ID is not found.
 */
export declare function unregisterBehavior(id: BehaviorId): void;
/**
 * Get all registered behavior IDs.
 */
export declare function listBehaviors(): BehaviorId[];
/**
 * Get the full registry snapshot (read-only).
 */
export declare function getRegistrySnapshot(): ReadonlyMap<BehaviorId, Readonly<BehaviorConfig>>;
/**
 * Clear all registered behaviors. Useful for testing.
 */
export declare function clearBehaviorRegistry(): void;
/**
 * Register a set of default / built-in behaviors.
 * Called once during app bootstrap. Safe to call multiple times
 * (skips already-registered IDs).
 */
export declare function registerDefaultBehaviors(): void;
//# sourceMappingURL=behavior-registry.d.ts.map