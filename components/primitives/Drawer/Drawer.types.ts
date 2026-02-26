/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */

/** Side panel overlay. Slides from left/right. Sizes sm (320px), md (480px), lg (640px). Has close button, header, body. */

export type DrawerSize = 'sm' | 'md' | 'lg';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: DrawerSize;
  side?: DrawerSide;
}