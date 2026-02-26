/**
 * Layout Spec Resolver
 *
 * Single entry point: takes a validated LayoutSpec and resolves all intents
 * into CSS properties or Tailwind classes.
 *
 * IMPORTANT: This module DELEGATES to subsystem resolvers (container-system,
 * spacing-system, grid-system) instead of reimplementing resolution logic.
 * The subsystem modules are the canonical implementation.
 */
import { type ValidationResult } from './layout-spec-validator';
export interface NodeDiagnostic {
    nodeId: string;
    severity: 'warning' | 'error';
    message: string;
}
export interface ResolvedNode {
    id: string;
    type: string;
    css: Record<string, string>;
    tailwindClasses: string[];
    children: ResolvedNode[];
    componentRef?: string;
    behaviorId?: string;
    /** Event-specific behavior mappings */
    behaviors?: Record<string, string>;
    /** Diagnostics for this node (warnings/errors during resolution) */
    diagnostics?: NodeDiagnostic[];
}
export interface ResolvedLayout {
    name: string;
    version?: string;
    root: ResolvedNode;
}
export interface ResolveResult {
    success: boolean;
    layout?: ResolvedLayout;
    validation: ValidationResult;
    /** Aggregate diagnostics from all nodes during resolution */
    diagnostics: NodeDiagnostic[];
}
/**
 * Strict entry point: validate + resolve a Layout Spec into CSS/Tailwind output.
 * Rejects invalid specs entirely.
 */
export declare function loadLayoutSpec(spec: unknown): ResolveResult;
/**
 * Partial (lenient) entry point: resolve what is valid, annotate what is not.
 * Returns a usable (if incomplete) result alongside diagnostics.
 * Use this when consuming specs from automated generators that may produce
 * imperfect input.
 */
export declare function loadLayoutSpecPartial(spec: unknown): ResolveResult;
//# sourceMappingURL=layout-spec-resolver.d.ts.map