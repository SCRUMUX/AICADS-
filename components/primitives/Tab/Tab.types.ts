/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */

/** Tab: визуально согласован с @UI/Button. Полная матрица 4×3×5 (appearance×size×state) как у кнопок: Ghost — как ghost‑кнопка (просто текст), Brand — как brand‑кнопка, Base — как outline base с нижней границей, Outline — как outline‑кнопка без нижней границы. */

export type TabAppearance = 'brand' | 'base' | 'ghost' | 'outline';

export type TabSize = 'sm' | 'md' | 'lg';

/** Interactive state — auto-managed via hover/focus/active */
export type TabState = 'base' | 'hover' | 'active' | 'focus' | 'disabled';

export interface TabProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  appearance?: TabAppearance;
  size?: TabSize;
  state?: TabState;
  iconLeft?: React.ReactNode;
  badge?: React.ReactNode;
  iconRight?: React.ReactNode;
  showLeftIcon?: boolean;
  showBadge?: boolean;
  showRightIcon?: boolean;
  disabled?: boolean;
}