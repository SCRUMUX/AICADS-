import React from 'react';
import type { LinearProgressProps, LinearProgressSize } from './LinearProgress.types';

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

// ─── Size config (from Figma) ─────────────────────────────────────────────────
// sm: H=4px, md: H=6px, lg: H=8px
// cornerRadius = 9999 (pill) on both track and fill
const SIZE_HEIGHT: Record<LinearProgressSize, string> = {
  sm: 'h-1',    // 4px
  md: 'h-1.5',  // 6px
  lg: 'h-2',    // 8px
};

// ─── Component ────────────────────────────────────────────────────────────────
export const LinearProgress = React.forwardRef<HTMLDivElement, LinearProgressProps>((props, ref) => {
  const {
    size = 'md',
    value = 0,
    label,
    className,
    style,
    ...rest
  } = props;

  const pct = Math.max(0, Math.min(100, value));

  return (
    <div
      ref={ref}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `Progress: ${pct}%`}
      className={cn(
        // Track: pill shape, surface-3 background, full width of container
        'relative w-full overflow-hidden rounded-full',
        SIZE_HEIGHT[size],
        'bg-[var(--color-surface-3)]',
        'transition-all duration-150',
        className,
      )}
      style={style}
      {...rest}
    >
      {/* Fill: pill shape, brand-primary, width = value% */}
      <div
        className={cn(
          'absolute left-0 top-0 h-full rounded-full',
          'bg-[var(--color-brand-primary)]',
          'transition-[width] duration-300 ease-in-out',
        )}
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      />
    </div>
  );
});

LinearProgress.displayName = 'LinearProgress';
