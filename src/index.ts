/**
 * Frontend Core - Machine-Readable Design System Architecture
 * 
 * Main entry point exporting all modules.
 * 
 * @packageDocumentation
 */

// =============================================================================
// LAYOUT SYSTEM
// =============================================================================

export * from './layout';

// =============================================================================
// TOKEN TRANSFORMERS
// =============================================================================

export * from './tokens/transformers';

// =============================================================================
// UTILITIES
// =============================================================================

export * from './utils/token-resolver';
export * from './utils/breakpoint-utils';

// =============================================================================
// RE-EXPORTS FOR CONVENIENCE
// =============================================================================

// Core types
export type {
  // Token types
  DesignTokens,
  ColorTokens,
  TypographyTokens,
  SpaceTokens,
  RadiusTokens,
  EffectTokens,
  LayoutTokens,
  ThemeMode,
  ThemedTokens,
  
  // Value types
  ColorValue,
  TypographyPrimitives,
  SpaceValue,
  RadiusValue,
  ShadowLayer,
  EffectValue,
  GridConfig,
} from './tokens/transformers/token-types';

// Layout intent types
export type {
  GridLayoutIntent,
  SpacingIntent,
  ContainerIntent,
  OverlayIntent,
} from './layout';

// =============================================================================
// BEHAVIORS
// =============================================================================

export * from './behaviors';

// =============================================================================
// COMPONENTS (React)
// =============================================================================

export { Button } from './components/primitives/Button';
export type { ButtonProps, ButtonAppearance, ButtonSize, ButtonState } from './components/primitives/Button';

// =============================================================================
// VERSION
// =============================================================================

export const VERSION = '1.0.0';
