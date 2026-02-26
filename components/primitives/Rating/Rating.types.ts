/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */

/** Star rating component. 3 sizes (sm/md/lg), readonly or interactive, values 0-5. */

export type RatingSize = 'sm' | 'md' | 'lg';

export type RatingValue = '0' | '1' | '2' | '3' | '4' | '5';

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: RatingSize;
  value?: RatingValue;
}