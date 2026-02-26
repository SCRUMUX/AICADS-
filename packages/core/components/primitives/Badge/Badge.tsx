/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */
import React, { useState, useCallback } from 'react';
import type { BadgeProps, BadgeAppearance, BadgeSize } from './Badge.types';
import contract from '../../../contracts/components/Badge.contract.json';
import { cn, findClasses, type VR } from '../_shared';

const rules = (contract.variantRules || []) as unknown as VR[];

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: 'px-[var(--space-4)] py-[var(--space-2)] min-h-[var(--space-badge-min-sm)] min-w-[var(--space-badge-min-sm)] text-style-caption-xs rounded-[var(--radius-pill)]',
  md: 'px-[var(--space-6)] py-[var(--space-3)] min-h-[var(--space-badge-min-md)] min-w-[var(--space-badge-min-md)] text-style-caption rounded-[var(--radius-pill)]',
  lg: 'px-[var(--space-8)] py-[var(--space-4)] min-h-[var(--space-badge-min-lg)] min-w-[var(--space-badge-min-lg)] text-style-body rounded-[var(--radius-pill)]',
};

const BadgeInner = React.forwardRef<HTMLSpanElement, BadgeProps>((props, ref) => {
  const {
    appearance = 'brand',
    size = 'sm',
    children,
    className,
    ...rest
  } = props;

  const vc = findClasses(rules, { appearance: appearance, size: size });
  const focusRing = appearance?.includes('danger') ? ((contract.focusRingDanger as string) ?? '') : ((contract.focusRing as string) ?? '');

  return (
    <span
      ref={ref as any}
      className={cn(
        'transition-colors duration-150 font-base box-border flex flex-row justify-end items-center border-[var(--border-width-base)] border-solid',
        SIZE_CLASSES[size],
        ...vc,
        focusRing,
        className
      )}
      {...rest}
    >
      <span>{children}</span>
    </span>
  );
});

BadgeInner.displayName = 'Badge';
export const Badge = React.memo(BadgeInner);
