/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */

/** Side panel overlay. Slides from left/right. Sizes sm (320px), md (480px), lg (640px). Has close button, header, body. */

export type DrawerSize = 'sm' | 'md' | 'lg';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  size?: DrawerSize;
  side?: DrawerSide;
  open?: boolean;
  onClose?: () => void;
  title?: React.ReactNode;
  /** When true, drawer is positioned absolutely inside its parent instead of fixed fullscreen */
  container?: boolean;
}
