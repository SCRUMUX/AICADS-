/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */

/** Native-style select dropdown. 3 sizes (sm/md/lg), states base/hover/focus/disabled. Chevron icon on the right. */

export type SelectSize = 'sm' | 'md' | 'lg';

/** Interactive state — auto-managed via hover/focus/active */
export type SelectState = 'base' | 'hover' | 'focus' | 'disabled';

export interface SelectProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: SelectSize;
  state?: SelectState;
}