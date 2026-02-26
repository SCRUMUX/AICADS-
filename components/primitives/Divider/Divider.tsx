import React from 'react';
import type { DividerProps, DividerSize, DividerAppearance } from './Divider.types';

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

// ─── Size → thickness ─────────────────────────────────────────────────────────
// From Figma: horizontal H=4/6/8px, vertical W=4/6/8px
const THICKNESS: Record<DividerSize, number> = {
  sm: 4,
  md: 6,
  lg: 8,
};

// ─── Appearance → color token ────────────────────────────────────────────────
// base:   border-base  (#E5E7EB light / #243041 dark)
// strong: border-strong (#CBD5E1 light / #485B76 dark)
const COLOR: Record<DividerAppearance, string> = {
  base:   'var(--color-border-base)',
  strong: 'var(--color-border-strong)',
};

// ─── Component ────────────────────────────────────────────────────────────────
const DividerInner = React.forwardRef<HTMLDivElement, DividerProps>(({
  orientation = 'horizontal',
  size = 'sm',
  appearance = 'base',
  length,
  className,
  style,
}, ref) => {
  const thickness = THICKNESS[size];
  const color = COLOR[appearance];

  const isHorizontal = orientation === 'horizontal';

  return (
    <div
      ref={ref}
      role="separator"
      aria-orientation={orientation}
      className={cn(
        'shrink-0 rounded-[2px]',
        isHorizontal ? 'w-full' : 'h-full',
        className,
      )}
      style={{
        backgroundColor: color,
        ...(isHorizontal
          ? { height: thickness, width: length }
          : { width: thickness, height: length }),
        ...style,
      }}
    />
  );
});

DividerInner.displayName = 'Divider';
export const Divider = React.memo(DividerInner);
