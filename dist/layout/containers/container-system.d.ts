/**
 * Container System Foundation
 *
 * Token-driven container abstractions for machine-readable layout generation.
 * Containers are the primary building blocks for page structure.
 *
 * Integrates with:
 * - Layout.contract.json (grid constraints)
 * - Space.contract.json (padding/margins)
 * - Radius.contract.json (border-radius)
 * - Effect.contract.json (elevation)
 * - Color.contract.json (background/border)
 */
import { SpaceCategory, SpaceSize } from '../spacing/spacing-system';
export type ContainerType = 'page' | 'section' | 'card' | 'panel' | 'modal' | 'content';
export type ContainerVariant = 'default' | 'elevated' | 'bordered' | 'transparent';
export interface ContainerConfig {
    type: ContainerType;
    variant?: ContainerVariant;
    padding?: {
        category: SpaceCategory;
        size: SpaceSize;
    };
    radius?: RadiusToken;
    elevation?: ElevationToken;
    background?: BackgroundToken;
    border?: boolean;
    maxWidth?: 'mobile' | 'tablet' | 'desktop' | 'full' | number;
}
export type RadiusToken = 'none' | 'subtle' | 'default' | 'medium' | 'large' | 'xl' | 'pill';
export type ElevationToken = '1' | '2' | '3' | 'glow' | 'none';
export type BackgroundToken = 'base' | 'muted' | 'surface-1' | 'surface-2' | 'surface-3' | 'disabled' | 'brand-muted' | 'transparent';
export declare const CONTAINER_DEFAULTS: Record<ContainerType, Partial<ContainerConfig>>;
/**
 * Merge container config with defaults
 */
export declare function resolveContainerConfig(config: ContainerConfig): Required<ContainerConfig>;
/**
 * Get max-width value for container
 */
export declare function getContainerMaxWidth(maxWidth: ContainerConfig['maxWidth']): string;
/**
 * Generate CSS for container
 */
export declare function generateContainerCSS(config: ContainerConfig): Record<string, string>;
/**
 * Generate Tailwind classes for container
 */
export declare function generateContainerTailwindClasses(config: ContainerConfig): string[];
export interface ContainerIntent {
    type: 'container';
    containerType: ContainerType;
    variant?: ContainerVariant;
    padding?: {
        category: SpaceCategory;
        size: SpaceSize;
    };
    radius?: RadiusToken;
    elevation?: ElevationToken;
    background?: BackgroundToken;
    border?: boolean;
    maxWidth?: ContainerConfig['maxWidth'];
}
/**
 * Resolve container intent to CSS properties
 */
export declare function resolveContainerIntent(intent: ContainerIntent): Record<string, string>;
//# sourceMappingURL=container-system.d.ts.map