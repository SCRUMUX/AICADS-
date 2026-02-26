/**
 * Token Transformer
 *
 * Transforms parsed tokens into various output formats:
 * - CSS Custom Properties
 * - Tailwind configuration
 * - TypeScript constants
 *
 * This is the second stage of the token ingestion pipeline.
 */
import { DesignTokens, ThemeMode } from './token-types';
export interface CSSVariablesOutput {
    root: Record<string, string>;
    light: Record<string, string>;
    dark: Record<string, string>;
}
/**
 * Generate CSS custom properties from tokens
 */
export declare function generateCSSVariables(tokens: DesignTokens, mode?: ThemeMode): CSSVariablesOutput;
/**
 * Generate CSS file content from variables
 */
export declare function generateCSSFile(variables: CSSVariablesOutput): string;
export interface TailwindConfig {
    theme: {
        extend: {
            colors: Record<string, string>;
            fontFamily: Record<string, string[]>;
            fontSize: Record<string, [string, {
                lineHeight: string;
            }]>;
            fontWeight: Record<string, string>;
            spacing: Record<string, string>;
            borderRadius: Record<string, string>;
            boxShadow: Record<string, string>;
            screens: Record<string, string>;
        };
    };
}
/**
 * Generate Tailwind configuration from tokens
 * Uses CSS variables to maintain single source of truth
 */
export declare function generateTailwindConfig(tokens: DesignTokens): TailwindConfig;
/**
 * Generate Tailwind config file content
 */
export declare function generateTailwindConfigFile(config: TailwindConfig): string;
/**
 * Generate TypeScript constants file
 */
export declare function generateTypeScriptConstants(tokens: DesignTokens): string;
//# sourceMappingURL=token-transformer.d.ts.map