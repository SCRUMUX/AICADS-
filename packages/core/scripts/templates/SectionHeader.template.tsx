import React from 'react';
import type { SectionHeaderProps, SectionHeaderSize } from './SectionHeader.types';
import { IconSlot } from '../_shared/IconSlot';
import { cn } from '../_shared';

/**
 * Размеры из Figma API:
 * sm: padding 4/2, gap 4, fontSize 16 (H4), iconSize 16
 * md: padding 6/3, gap 6, fontSize 20 (H2), iconSize 20
 * lg: padding 8/4, gap 6, fontSize 24 (H1), iconSize 24
 */
const SIZE_CLASSES: Record<SectionHeaderSize, string> = {
  sm: 'px-[var(--space-4)] py-[var(--space-2)] gap-[var(--space-4)] text-style-h4 [--icon-size:16px]',
  md: 'px-[var(--space-6)] py-[var(--space-3)] gap-[var(--space-6)] text-style-h2 [--icon-size:20px]',
  lg: 'px-[var(--space-8)] py-[var(--space-4)] gap-[var(--space-6)] text-style-h1 [--icon-size:24px]',
};

/** Цвет текста и иконок по appearance */
const APPEARANCE_CLASSES: Record<string, string> = {
  base:    'text-[var(--color-text-primary)] [--icon-color:var(--color-text-muted)]',
  success: 'text-[var(--color-success-base)] [--icon-color:var(--color-success-base)]',
  warning: 'text-[var(--color-warning-base)] [--icon-color:var(--color-warning-base)]',
  danger:  'text-[var(--color-danger-base)]  [--icon-color:var(--color-danger-base)]',
};

const SectionHeaderInner = React.forwardRef<HTMLDivElement, SectionHeaderProps>((props, ref) => {
  const {
    size = 'sm',
    appearance = 'base',
    iconLeft,
    badge,
    iconRight,
    showLeftIcon = false,
    showBadge = false,
    showRightIcon = false,
    children,
    className,
    ...rest
  } = props;

  const iconPx = size === 'lg' ? 24 : size === 'md' ? 20 : 16;

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex flex-row items-center',
        SIZE_CLASSES[size],
        APPEARANCE_CLASSES[appearance] ?? APPEARANCE_CLASSES.base,
        className,
      )}
      {...rest}
    >
      {/* Left icon — в DOM всегда когда showLeftIcon=true */}
      {showLeftIcon && (
        <IconSlot icon={iconLeft} size={`${iconPx}px`} className="shrink-0" />
      )}

      {/* Label */}
      <span className="font-semibold leading-none">{children}</span>

      {/* Badge — инстанс <Badge> */}
      {showBadge && badge && (
        <span className="shrink-0">{badge}</span>
      )}

      {/* Right icon */}
      {showRightIcon && (
        <IconSlot icon={iconRight} size={`${iconPx}px`} className="shrink-0" />
      )}
    </div>
  );
});

SectionHeaderInner.displayName = 'SectionHeader';
export const SectionHeader = React.memo(SectionHeaderInner);
