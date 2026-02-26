import React, { useState, useCallback } from 'react';
import type { TabProps, TabSize, TabState } from './Tab.types';
import { IconSlot } from '../_shared/IconSlot';

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

/**
 * Размеры из Figma API (node 160:84559):
 * sm: padding 4/2, gap 4, iconSize 20px, text caption-xs
 * md: padding 6/3, gap 4, iconSize 20px, text caption
 * lg: padding 8/4, gap 4, iconSize 24px, text body
 */
const SIZE_CLASSES: Record<TabSize, string> = {
  sm: 'px-[var(--space-4)] py-[var(--space-2)] gap-[var(--space-4)] text-style-caption-xs [--icon-size:20px]',
  md: 'px-[var(--space-6)] py-[var(--space-3)] gap-[var(--space-4)] text-style-caption   [--icon-size:20px]',
  lg: 'px-[var(--space-8)] py-[var(--space-4)] gap-[var(--space-4)] text-style-body       [--icon-size:24px]',
};

/**
 * Стили по appearance + state из Figma API.
 *
 * base:    individualStrokeWeights top=0 right=0 BOTTOM=1 left=0  → border-bottom только
 * outline: individualStrokeWeights TOP=1 RIGHT=1 bottom=0 LEFT=1  → border top+left+right (без bottom)
 * brand:   полная заливка, border-radius pill, нет individual strokes
 * ghost:   прозрачный фон, нет рамки в base
 */

type AppearanceState = { appearance: string; state: string };

function getStyles({ appearance, state }: AppearanceState): string {
  // brand — заливка pill
  if (appearance === 'brand') {
    const brandBase = 'rounded-pill text-[var(--color-text-on-brand)] [--icon-color:var(--color-icon-on-brand)]';
    if (state === 'hover')    return cn(brandBase, 'bg-[var(--color-brand-hover)]');
    if (state === 'active')   return cn(brandBase, 'bg-[var(--color-brand-pressed)]');
    if (state === 'disabled') return cn(brandBase, 'bg-[var(--color-brand-primary)] opacity-[var(--opacity-disabled)]');
    // base & focus
    return cn(brandBase, 'bg-[var(--color-brand-primary)]');
  }

  // base — нижняя граница 1px (border-bottom only)
  if (appearance === 'base') {
    const baseBase = 'bg-transparent border-b border-solid [--icon-color:var(--color-icon-on-base)]';
    if (state === 'hover')    return cn(baseBase, 'border-[var(--color-border-strong)]  text-[var(--color-text-muted)]');
    if (state === 'active')   return cn(baseBase, 'border-[var(--color-brand-primary)]  text-[var(--color-brand-primary)]');
    if (state === 'focus')    return cn(baseBase, 'border-[var(--color-border-base)]    text-[var(--color-text-muted)]');
    if (state === 'disabled') return cn(baseBase, 'border-[var(--color-border-disabled)] text-[var(--color-text-disabled)] opacity-[var(--opacity-disabled)]');
    // base state — нейтральный серый underline
    return cn(baseBase, 'border-[var(--color-border-base)] text-[var(--color-text-muted)]');
  }

  // outline — рамка 3 стороны: top + left + right (нет bottom)
  if (appearance === 'outline') {
    // border-t border-l border-r border-b-0 border-solid
    const outlineBase = 'border border-solid border-b-0 [--icon-color:var(--color-icon-on-outline)] text-[var(--color-brand-primary)]';
    if (state === 'hover')    return cn(outlineBase, 'bg-[var(--color-surface-1)] border-[var(--color-border-strong)]');
    if (state === 'active')   return cn(outlineBase, 'bg-[var(--color-surface-2)] border-[var(--color-border-strong)]');
    if (state === 'disabled') return cn(outlineBase, 'bg-transparent border-[var(--color-border-disabled)] text-[var(--color-text-disabled)] opacity-[var(--opacity-disabled)]');
    // base & focus
    return cn(outlineBase, 'bg-transparent border-[var(--color-border-base)]');
  }

  // ghost — transparent border in base to prevent layout shift on hover
  if (appearance === 'ghost') {
    const ghostBase = 'text-[var(--color-text-primary)] [--icon-color:var(--color-icon-on-ghost)] border border-solid';
    if (state === 'hover')    return cn(ghostBase, 'bg-[var(--color-brand-hover-bg)] border-[var(--color-border-base)]');
    if (state === 'active')   return cn(ghostBase, 'bg-[var(--color-brand-hover-bg)] border-[var(--color-border-strong)]');
    if (state === 'disabled') return cn(ghostBase, 'border-transparent opacity-[var(--opacity-disabled)]');
    // base & focus
    return cn(ghostBase, 'bg-transparent border-transparent');
  }

  return '';
}

export const Tab = React.forwardRef<HTMLButtonElement, TabProps>((props, ref) => {
  const {
    appearance = 'brand',
    size = 'sm',
    state: controlledState,
    disabled = false,
    iconLeft,
    badge,
    iconRight,
    showLeftIcon = true,
    showBadge = true,
    showRightIcon = true,
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    onMouseDown,
    onMouseUp,
    ...rest
  } = props;

  const [internalState, setInternalState] = useState<TabState>('base');
  const effectiveState: TabState = disabled ? 'disabled' : controlledState ?? internalState;

  const iconPx = size === 'lg' ? 24 : 20;
  const variantClasses = getStyles({ appearance, state: effectiveState === 'focus' ? 'base' : effectiveState });
  const focusRingClass = effectiveState === 'focus' || (!controlledState && !disabled)
    ? 'focus:outline-none focus:shadow-[var(--effect-focus-brand)]'
    : '';

  const he  = useCallback((e: React.MouseEvent<HTMLButtonElement>) => { if (!disabled) setInternalState('hover');  onMouseEnter?.(e); }, [disabled, onMouseEnter]);
  const hl  = useCallback((e: React.MouseEvent<HTMLButtonElement>) => { setInternalState('base');                 onMouseLeave?.(e); }, [onMouseLeave]);
  const hf  = useCallback((e: React.FocusEvent<HTMLButtonElement>) => { if (!disabled) setInternalState('focus'); onFocus?.(e); }, [disabled, onFocus]);
  const hb  = useCallback((e: React.FocusEvent<HTMLButtonElement>) => { setInternalState('base');                 onBlur?.(e); }, [onBlur]);
  const hmd = useCallback((e: React.MouseEvent<HTMLButtonElement>) => { if (!disabled) setInternalState('active'); onMouseDown?.(e); }, [disabled, onMouseDown]);
  const hmu = useCallback((e: React.MouseEvent<HTMLButtonElement>) => { setInternalState('hover');                onMouseUp?.(e); }, [onMouseUp]);

  return (
    <button
      ref={ref}
      disabled={disabled}
      className={cn(
        'inline-flex flex-row items-center transition-colors duration-150 box-border',
        SIZE_CLASSES[size],
        variantClasses,
        focusRingClass,
        disabled && 'cursor-not-allowed pointer-events-none',
        className,
      )}
      onMouseEnter={he}
      onMouseLeave={hl}
      onFocus={hf}
      onBlur={hb}
      onMouseDown={hmd}
      onMouseUp={hmu}
      {...rest}
    >
      {showLeftIcon && (
        <IconSlot icon={iconLeft} size={`${iconPx}px`} className="shrink-0" />
      )}
      <span>{children}</span>
      {showBadge && badge && (
        <span className="shrink-0">{badge}</span>
      )}
      {showRightIcon && (
        <IconSlot icon={iconRight} size={`${iconPx}px`} className="shrink-0" />
      )}
    </button>
  );
});

Tab.displayName = 'Tab';
