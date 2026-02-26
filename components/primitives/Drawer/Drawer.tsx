/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */
import React, { useState, useCallback } from 'react';
import type { DrawerProps, DrawerSize, DrawerSide } from './Drawer.types';
import { cn, findClasses, getFocusRing, type VR } from '../_shared';
import contract from '../../../contracts/components/Drawer.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
  const {
    size = 'sm',
    side = 'left',
    children,
    className,
    ...rest
  } = props;

  const vc = findClasses(rules, { size: size, side: side });
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

Drawer.displayName = 'Drawer';
