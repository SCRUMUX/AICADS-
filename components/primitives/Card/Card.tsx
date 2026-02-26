import React, { useState, useCallback } from 'react';
import type { CardProps, CardVariant, CardSize, CardState } from './Card.types';

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

/**
 * Figma API (160:75500):
 *
 * Размеры (padding / gap / title / content):
 *   sm: 6px / 4px / 12px w500 lh16 / 10px w400 lh12
 *   md: 9px / 6px / 14px w600 lh20 / 12px w400 lh16
 *   lg: 12px / 8px / 16px w600 lh24 / 14px w400 lh20
 *
 * cornerRadius = 4px на всех вариантах.
 *
 * Варианты (fill | border):
 *   base     → surface-2    | border-base (VariableID:159:42941)
 *   outlined → surface-1    | border-strong (VariableID:159:42942)
 *   elevated → surface-1    | нет + DROP_SHADOW 0 1 3 rgba(0,0,0,0.12)
 *   filled   → surface-3    | border-base
 *
 * Состояния:
 *   hover    → fill: surface-3 (все варианты)
 *   focus    → fill: surface-2 + border: border-strong + focus ring
 *   disabled → opacity-disabled
 */

const SIZE_CONFIG: Record<CardSize, {
  padding:     string;
  gap:         string;
  titleFont:   string;
  contentFont: string;
}> = {
  sm: {
    padding:     'p-[6px]',
    gap:         'gap-1',
    titleFont:   'text-[12px] font-medium leading-4',
    contentFont: 'text-[10px] font-normal leading-3',
  },
  md: {
    padding:     'p-[9px]',
    gap:         'gap-1.5',
    titleFont:   'text-[14px] font-semibold leading-5',
    contentFont: 'text-[12px] font-normal leading-4',
  },
  lg: {
    padding:     'p-3',
    gap:         'gap-2',
    titleFont:   'text-[16px] font-semibold leading-6',
    contentFont: 'text-[14px] font-normal leading-5',
  },
};

type StyleSpec = {
  bg:      string;
  border:  string;
  shadow:  string;
};

function getBaseStyle(variant: CardVariant): StyleSpec {
  switch (variant) {
    case 'outlined':
      return {
        bg:     'bg-[var(--color-surface-1)]',
        border: 'border border-[var(--color-border-strong)]',
        shadow: '',
      };
    case 'elevated':
      return {
        bg:     'bg-[var(--color-surface-1)]',
        border: 'border-0',
        shadow: 'shadow-[0_1px_3px_rgba(0,0,0,0.12)]',
      };
    case 'filled':
      return {
        bg:     'bg-[var(--color-surface-3)]',
        border: 'border border-[var(--color-border-base)]',
        shadow: '',
      };
    default: // base
      return {
        bg:     'bg-[var(--color-surface-2)]',
        border: 'border border-[var(--color-border-base)]',
        shadow: '',
      };
  }
}

function getStateStyle(state: CardState): Partial<StyleSpec> & { focusRing: boolean; opacity: boolean } {
  switch (state) {
    case 'hover':
      return {
        bg:        'bg-[var(--color-surface-3)]',
        focusRing: false,
        opacity:   false,
      };
    case 'focus':
      return {
        bg:        'bg-[var(--color-surface-2)]',
        border:    'border border-[var(--color-border-strong)]',
        focusRing: true,
        opacity:   false,
      };
    case 'disabled':
      return {
        focusRing: false,
        opacity:   true,
      };
    default:
      return { focusRing: false, opacity: false };
  }
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => {
  const {
    variant = 'base',
    size = 'sm',
    state: stateProp,
    title,
    description,
    header,
    footer,
    children,
    disabled = false,
    className,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const [internalState, setInternalState] = useState<CardState>('base');

  const effectiveState: CardState = (() => {
    if (stateProp) return stateProp;
    if (disabled)  return 'disabled';
    return internalState;
  })();

  const baseStyle   = getBaseStyle(variant);
  const stateStyle  = getStateStyle(effectiveState);

  const bg     = stateStyle.bg     ?? baseStyle.bg;
  const border = stateStyle.border ?? baseStyle.border;
  const shadow = baseStyle.shadow;

  const { padding, gap, titleFont, contentFont } = SIZE_CONFIG[size];

  const he = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) setInternalState('hover');
    onMouseEnter?.(e);
  }, [disabled, onMouseEnter]);

  const hl = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!disabled) setInternalState('base');
    onMouseLeave?.(e);
  }, [disabled, onMouseLeave]);

  const hf = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    if (!disabled) setInternalState('focus');
    onFocus?.(e);
  }, [disabled, onFocus]);

  const hb = useCallback((e: React.FocusEvent<HTMLDivElement>) => {
    setInternalState('base');
    onBlur?.(e);
  }, [onBlur]);

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col w-full rounded-[4px] transition-colors duration-150 box-border',
        padding,
        gap,
        bg,
        border,
        shadow,
        stateStyle.focusRing && 'shadow-[var(--effect-focus-brand)]',
        stateStyle.opacity   && 'opacity-[var(--opacity-disabled)] cursor-not-allowed',
        className,
      )}
      onMouseEnter={he}
      onMouseLeave={hl}
      onFocus={hf}
      onBlur={hb}
      {...rest}
    >
      {/* Header slot (медиа / изображение) */}
      {header && (
        <div className="w-full">{header}</div>
      )}

      {/* Content area */}
      {(title !== undefined || description !== undefined || children !== undefined) && (
        <div className={cn('flex flex-col w-full', gap)}>
          {title !== undefined && (
            <span className={cn(titleFont, 'text-[var(--color-text-primary)] leading-none')}>
              {title}
            </span>
          )}
          {description !== undefined && (
            <span className={cn(contentFont, 'text-[var(--color-text-primary)]')}>
              {description}
            </span>
          )}
          {children}
        </div>
      )}

      {/* Footer slot (actions) */}
      {footer && (
        <div className="w-full mt-auto">{footer}</div>
      )}
    </div>
  );
});

Card.displayName = 'Card';
