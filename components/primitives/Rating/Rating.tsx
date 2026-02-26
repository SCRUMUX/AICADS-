/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */
import React, { useState, useCallback } from 'react';
import type { RatingProps, RatingSize, RatingValue } from './Rating.types';
import { cn, findClasses, getFocusRing, type VR } from '../_shared';
import contract from '../../../contracts/components/Rating.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>((props, ref) => {
  const {
    size = 'sm',
    value = '0',
    children,
    className,
    ...rest
  } = props;

  const vc = findClasses(rules, { size: size, value: value });
  const focusRing = getFocusRing(contract);

  return (
    <div
      ref={ref as any}
      className={cn(
        'transition-colors duration-150 font-base box-border',
        ...vc,
        focusRing,
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
});

Rating.displayName = 'Rating';
