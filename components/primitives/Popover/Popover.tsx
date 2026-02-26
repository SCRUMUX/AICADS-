import React, { useState, useEffect } from 'react';
import type { PopoverProps } from './Popover.types';

/**
 * Popover — positioned floating panel, anchored to a reference element.
 * Used by Dropdown, Autocomplete, and available for custom popover patterns.
 * Handles viewport flip detection and animation.
 */
export const Popover = React.forwardRef<HTMLDivElement, PopoverProps>(
  (
    {
      anchorRef,
      open,
      children,
      className = '',
      maxHeight = 'var(--popover-max-h, 320px)',
      autoFlip = true,
      style,
      'aria-multiselectable': ariaMultiselectable,
      'aria-label': ariaLabel,
      id,
    },
    ref,
  ) => {
    const [flipUp, setFlipUp] = useState(false);

    useEffect(() => {
      if (!open || !autoFlip || !anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const threshold = parseInt(maxHeight, 10) || 320;
      setFlipUp(spaceBelow < threshold && rect.top > spaceBelow);
    }, [open, autoFlip, anchorRef, maxHeight]);

    if (!open) return null;

    return (
      <div
        ref={ref}
        id={id}
        role="listbox"
        aria-multiselectable={ariaMultiselectable || undefined}
        aria-label={ariaLabel}
        className={[
          'absolute left-0 w-full z-popover',
          'rounded-[var(--popover-radius,var(--radius-default))]',
          'border border-[var(--popover-border,var(--color-border-base))]',
          'bg-[var(--popover-bg,var(--color-surface-1))]',
          'shadow-elevation-2 overflow-y-auto',
          'flex flex-col gap-[var(--item-gap,4px)]',
          'animate-dropdown-in',
          flipUp
            ? 'bottom-full mb-[var(--space-2,2px)]'
            : 'top-full mt-[var(--space-2,2px)]',
          className,
        ].join(' ')}
        style={{
          padding: 'var(--popover-pad, 6px)',
          maxHeight,
          ...style,
        }}
      >
        {children}
      </div>
    );
  },
);

Popover.displayName = 'Popover';
