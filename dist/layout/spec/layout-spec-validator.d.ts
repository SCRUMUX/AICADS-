/**
 * Layout Spec Validator
 *
 * Validates incoming layout specifications against the canonical format.
 * Does NOT depend on external libraries (Ajv, Zod) — uses manual validation
 * to keep the core dependency-free.
 *
 * IMPORTANT: Allowed-value arrays are derived from subsystem modules and contracts.
 * The validator does NOT maintain its own parallel list of valid values.
 */
export interface ValidationResult {
    valid: boolean;
    errors: string[];
}
/**
 * Validate a Layout Specification against the canonical format.
 */
export declare function validateLayoutSpec(spec: unknown): ValidationResult;
//# sourceMappingURL=layout-spec-validator.d.ts.map