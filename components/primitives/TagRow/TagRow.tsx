/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */
import React, { useState, useCallback } from 'react';
import type { TagRowProps } from './TagRow.types';
import { cn, findClasses, getFocusRing, type VR } from '../_shared';
import contract from '../../../contracts/components/TagRow.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

export const TagRow = React.forwardRef<HTMLDivElement, TagRowProps>((props, ref) => {
  const {
    children,
    className,
    ...rest
  } = props;

  const vc = findClasses(rules, {  });
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

TagRow.displayName = 'TagRow';
