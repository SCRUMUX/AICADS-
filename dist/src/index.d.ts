/**
 * Frontend Core - Machine-Readable Design System Architecture
 *
 * Main entry point exporting all modules.
 *
 * @packageDocumentation
 */
export * from './layout';
export * from './tokens/transformers';
export * from './utils/token-resolver';
export * from './utils/breakpoint-utils';
export type { DesignTokens, ColorTokens, TypographyTokens, SpaceTokens, RadiusTokens, EffectTokens, LayoutTokens, ThemeMode, ThemedTokens, ColorValue, TypographyPrimitives, SpaceValue, RadiusValue, ShadowLayer, EffectValue, GridConfig, } from './tokens/transformers/token-types';
export type { GridLayoutIntent, SpacingIntent, ContainerIntent, OverlayIntent, } from './layout';
export * from './behaviors';
export { Button } from './components/primitives/Button';
export type { ButtonProps, ButtonAppearance, ButtonSize, ButtonState } from './components/primitives/Button';
export declare const VERSION = "1.0.0";
//# sourceMappingURL=index.d.ts.map