/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */

/** Dual-thumb range slider for min/max value selection. 3 sizes (sm/md/lg), states base/hover/disabled. */

export type RangeSliderSize = 'sm' | 'md' | 'lg';

/** Interactive state — auto-managed via hover/focus/active */
export type RangeSliderState = 'base' | 'hover' | 'disabled';

export interface RangeSliderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: RangeSliderSize;
  state?: RangeSliderState;
}