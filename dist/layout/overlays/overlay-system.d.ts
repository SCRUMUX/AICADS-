/**
 * Overlay System Foundation
 *
 * Token-driven overlay abstractions for modals, dialogs, and scrims.
 *
 * From: Effect.contract.json (scrim, blur effects)
 * From: Color.contract.json (scrim colors)
 */
export type ScrimVariant = 'light' | 'strong';
export type BlurVariant = 'none' | 'background';
export interface OverlayConfig {
    scrim: ScrimVariant;
    blur?: BlurVariant;
    closeOnClick?: boolean;
    closeOnEscape?: boolean;
    centered?: boolean;
    zIndex?: number;
}
export interface OverlayPosition {
    type: 'centered' | 'top' | 'bottom' | 'left' | 'right' | 'fullscreen';
    offset?: string;
}
export declare const SCRIM_DEFAULTS: Record<ScrimVariant, {
    opacity: number;
    usage: string;
}>;
export declare const BLUR_DEFAULTS: Record<BlurVariant, {
    blur: number;
}>;
export declare const DEFAULT_OVERLAY_CONFIG: OverlayConfig;
export declare const Z_INDEX_LAYERS: {
    readonly base: 0;
    readonly dropdown: 100;
    readonly sticky: 200;
    readonly modal: 1000;
    readonly popover: 1100;
    readonly tooltip: 1200;
    readonly toast: 1300;
};
/**
 * Generate scrim CSS
 */
export declare function generateScrimCSS(variant: ScrimVariant): Record<string, string>;
/**
 * Generate overlay backdrop CSS with blur
 */
export declare function generateBackdropCSS(scrim: ScrimVariant, blur?: BlurVariant): Record<string, string>;
/**
 * Generate overlay container CSS
 */
export declare function generateOverlayContainerCSS(position: OverlayPosition, zIndex?: number): Record<string, string>;
/**
 * Generate Tailwind classes for scrim
 */
export declare function getScrimTailwindClasses(variant: ScrimVariant): string[];
/**
 * Generate Tailwind classes for overlay container
 */
export declare function getOverlayContainerTailwindClasses(position: OverlayPosition['type'], blur?: BlurVariant): string[];
export interface OverlayIntent {
    type: 'overlay';
    scrim: ScrimVariant;
    blur?: BlurVariant;
    position: OverlayPosition;
    closeOnClick?: boolean;
    closeOnEscape?: boolean;
}
/**
 * Resolve overlay intent to CSS for both backdrop and container
 */
export declare function resolveOverlayIntent(intent: OverlayIntent): {
    backdrop: Record<string, string>;
    container: Record<string, string>;
};
//# sourceMappingURL=overlay-system.d.ts.map