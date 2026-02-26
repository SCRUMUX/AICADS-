/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */
import React, { useState, useCallback } from 'react';
import type { RangeSliderProps, RangeSliderSize, RangeSliderState } from './RangeSlider.types';
import { cn, findClasses, getFocusRing, type VR } from '../_shared';
import contract from '../../../contracts/components/RangeSlider.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

export const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>((props, ref) => {
  const {
    size = 'sm',
    state: controlledState,
    children,
    className,
    onMouseEnter, onMouseLeave, onFocus, onBlur,
    ...rest
  } = props;

  const [internalState, setInternalState] = useState<RangeSliderState>('base');
  const effectiveState: RangeSliderState = controlledState === 'disabled' ? 'disabled' : controlledState ?? internalState;

  const vc = findClasses(rules, { size: size, state: effectiveState });
  const focusRing = getFocusRing(contract);

  const he = useCallback((e: React.MouseEvent) => { setInternalState('hover'); onMouseEnter?.(e as any); }, [onMouseEnter]);
  const hl = useCallback((e: React.MouseEvent) => { setInternalState('base'); onMouseLeave?.(e as any); }, [onMouseLeave]);
  const hf = useCallback((e: React.FocusEvent) => { setInternalState('hover'); onFocus?.(e as any); }, [onFocus]);
  const hb = useCallback((e: React.FocusEvent) => { setInternalState('base'); onBlur?.(e as any); }, [onBlur]);

  return (
    <div
      ref={ref as any}
      className={cn(
        'transition-colors duration-150 font-base box-border',
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

RangeSlider.displayName = 'RangeSlider';
