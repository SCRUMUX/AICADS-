/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */

/** Star rating component. 3 sizes (sm/md/lg), readonly or interactive, values 0-5. */

export type RatingSize = 'sm' | 'md' | 'lg';

export interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  size?: RatingSize;
  /** Контролируемое значение (0..max) */
  value?: number;
  /** Начальное значение при неконтролируемом режиме */
  defaultValue?: number;
  /** Максимальное количество звёзд (default 5) */
  max?: number;
  /** Callback при клике */
  onChange?: (value: number) => void;
  /** Только отображение, без интерактивности */
  readonly?: boolean;
}
