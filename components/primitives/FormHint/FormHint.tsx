/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */
import React, { useState, useCallback } from 'react';
import type { FormHintProps, FormHintSize, FormHintAppearance } from './FormHint.types';
import contract from '../../../contracts/components/FormHint.contract.json';

type VR = { when: Record<string, string>; tailwindClasses: string[] };
const rules = (contract.variantRules || []) as unknown as VR[];

function findClasses(args: Record<string, string>): string[] {
  return rules
    .filter(r => { for (const k of Object.keys(r.when)) { if (r.when[k] !== args[k]) return false; } return true; })
    .flatMap(r => r.tailwindClasses);
}

function cn(...c: (string | undefined | false)[]): string {
  return c.filter(Boolean).join(' ');
}

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

  const vc = findClasses({ size: size, appearance: appearance });
  const focusRing = appearance?.includes('danger') ? ((contract.focusRingDanger as string) ?? '') : ((contract.focusRing as string) ?? '');

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
      {showIcon && icon && <span className="shrink-0 flex items-center justify-center" style={{ color: 'var(--icon-color, currentColor)', width: 'var(--icon-size, 20px)', height: 'var(--icon-size, 20px)' }}><span className="w-full h-full flex items-center justify-center [&>*]:w-full [&>*]:h-full [&>*]:min-w-0 [&>*]:min-h-0 [&_svg]:!w-full [&_svg]:!h-full [&_svg]:min-w-0 [&_svg]:min-h-0" style={{ width: 'var(--icon-size, 20px)', height: 'var(--icon-size, 20px)' }}>{icon && (React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<{ style?: React.CSSProperties }>, { style: { width: '100%', height: '100%', ...(icon as React.ReactElement<{ style?: React.CSSProperties }>).props?.style } }) : icon)}</span></span>}
      <span>{children}</span>
    </div>
  );
});

FormHint.displayName = 'FormHint';
