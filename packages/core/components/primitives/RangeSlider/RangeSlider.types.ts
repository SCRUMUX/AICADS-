/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */

/** Dual-thumb range slider for min/max value selection. 3 sizes (sm/md/lg), states base/hover/disabled. */

export type RangeSliderSize = 'sm' | 'md' | 'lg';

/** Interactive state — auto-managed via hover/focus/active */
export type RangeSliderState = 'base' | 'hover' | 'disabled';

export interface RangeSliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  size?: RangeSliderSize;
  state?: RangeSliderState;
  /** Минимальное значение (default 0) */
  min?: number;
  /** Максимальное значение (default 100) */
  max?: number;
  /** Шаг (default 1) */
  step?: number;
  /** Контролируемое значение [from, to] */
  value?: [number, number];
  /** Callback при изменении */
  onChange?: (value: [number, number]) => void;
  disabled?: boolean;
}
