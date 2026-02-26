/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */
import React, { useState, useCallback } from 'react';
import type { SelectProps, SelectSize, SelectState } from './Select.types';
import { cn, findClasses, getFocusRing, type VR } from '../_shared';
import contract from '../../../contracts/components/Select.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

const SIZE_CLASSES: Record<SelectSize, string> = {
  sm: 'px-[var(--space-input-inset-x-sm)] text-style-body-sm',
  md: 'px-[var(--space-input-inset-x-md)]',
  lg: 'px-[var(--space-input-inset-x-lg)] text-style-body-lg',
};

export const Select = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    size = 'sm',
    state: controlledState,
    children,
    className,
    onMouseEnter, onMouseLeave, onFocus, onBlur,
    ...rest
  } = props;

  const [internalState, setInternalState] = useState<SelectState>('base');
  const effectiveState: SelectState = controlledState === 'disabled' ? 'disabled' : controlledState ?? internalState;

  const vc = findClasses(rules, { size: size, state: effectiveState === 'focus' ? 'base' : effectiveState });
  const focusRing = getFocusRing(contract);

  const he = useCallback((e: React.MouseEvent) => { setInternalState('hover'); onMouseEnter?.(e as any); }, [onMouseEnter]);
  const hl = useCallback((e: React.MouseEvent) => { setInternalState('base'); onMouseLeave?.(e as any); }, [onMouseLeave]);
  const hf = useCallback((e: React.FocusEvent) => { setInternalState('focus'); onFocus?.(e as any); }, [onFocus]);
  const hb = useCallback((e: React.FocusEvent) => { setInternalState('base'); onBlur?.(e as any); }, [onBlur]);

  return (
    <div
      ref={ref as any}
      className={cn(
        'transition-colors duration-150 font-base box-border',
        SIZE_CLASSES[size],
        ...vc,
        focusRing,
        className
      )}
      onMouseEnter={he}
      onMouseLeave={hl}
      onFocus={hf}
      onBlur={hb}
      {...rest}
    >
      {children}
    </div>
  );
});

Select.displayName = 'Select';
