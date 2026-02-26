import React from 'react';
import type { FormHintProps, FormHintSize, FormHintAppearance } from './FormHint.types';
import contract from '../../../contracts/components/FormHint.contract.json';
import { cn, findClasses, type VR } from '../_shared';
import { IconSlot } from '../_shared/IconSlot';

const rules = (contract.variantRules || []) as unknown as VR[];

const SIZE_CLASSES: Record<FormHintSize, string> = {
  sm: 'px-[var(--space-2)] py-[var(--space-1)] gap-[var(--space-2)] text-style-caption-xs [--icon-size:20px]',
  md: 'px-[var(--space-2)] py-[var(--space-1)] gap-[var(--space-4)] text-style-caption [--icon-size:20px]',
  lg: 'px-[var(--space-2)] py-[var(--space-1)] gap-[var(--space-4)] text-style-body [--icon-size:24px]',
};

export const FormHint = React.forwardRef<HTMLDivElement, FormHintProps>((props, ref) => {
  const {
    size = 'sm',
    appearance = 'base',
    icon,
    showIcon = false,
    children,
    className,
    ...rest
  } = props;

  const vc = findClasses(rules, { size, appearance });
  const focusRing = appearance?.includes('danger')
    ? ((contract.focusRingDanger as string) ?? '')
    : ((contract.focusRing as string) ?? '');

  return (
    <div
      ref={ref as any}
      className={cn(
        'transition-colors duration-150 font-base box-border flex flex-row justify-center items-center',
        SIZE_CLASSES[size],
        ...vc,
        focusRing,
        className
      )}
      {...rest}
    >
      {showIcon && icon && (
        <IconSlot icon={icon} color="var(--icon-color, currentColor)" />
      )}
      <span>{children}</span>
    </div>
  );
});

FormHint.displayName = 'FormHint';
