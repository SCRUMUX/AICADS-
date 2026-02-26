/**
 * Layout Spec Types
 *
 * Canonical TypeScript types for the Layout Specification format.
 * Aligned with schemas/layout-spec.schema.json.
 *
 * IMPORTANT: Shared token types are imported from subsystem modules
 * to maintain a single source of truth. Only spec-specific types
 * (tree structure, spec config shapes) are defined here.
 */
export type { ContainerType, ContainerVariant, RadiusToken, ElevationToken, BackgroundToken, } from '../containers/container-system';
export type { SpaceCategory, SpaceSize, SpacingSide, } from '../spacing/spacing-system';
export type { BreakpointName, } from '../grid/grid-system';
import type { ContainerType, ContainerVariant, RadiusToken, ElevationToken, BackgroundToken } from '../containers/container-system';
import type { SpaceCategory, SpaceSize, SpacingSide } from '../spacing/spacing-system';
export interface SpacingIntent {
    category: SpaceCategory;
    size: SpaceSize;
    side?: SpacingSide;
}
export interface ResponsiveValue {
    mobile?: number;
    tablet?: number;
    desktop?: number;
}
export interface ContainerConfig {
    type?: ContainerType;
    variant?: ContainerVariant;
    padding?: SpacingIntent;
    radius?: RadiusToken;
    elevation?: ElevationToken;
    background?: BackgroundToken;
    border?: boolean;
    maxWidth?: string;
}
export interface GridPlacement {
    spans?: ResponsiveValue;
    alignment?: 'start' | 'center' | 'end' | 'stretch';
}
export interface SpacingConfig {
    margin?: SpacingIntent;
    padding?: SpacingIntent;
    gap?: SpacingIntent;
}
export type LayoutNodeType = 'container' | 'grid-item' | 'spacer';
export interface LayoutNode {
    id: string;
    type: LayoutNodeType;
    container?: ContainerConfig;
    grid?: GridPlacement;
    spacing?: SpacingConfig;
    children?: LayoutNode[];
    componentRef?: string;
    /** Shorthand: single behavior ID (typically for click) */
    behaviorId?: string;
    /** Event-specific behavior mappings from the Behavior Registry */
    behaviors?: Record<string, string>;
}
export interface LayoutSpec {
    type: 'layout';
    name: string;
    version?: string;
    root: LayoutNode;
}
//# sourceMappingURL=layout-spec-types.d.ts.map