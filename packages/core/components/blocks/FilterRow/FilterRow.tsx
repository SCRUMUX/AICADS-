/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run blocks:generate-components
 */

import React from 'react';
import type { FilterRowProps } from './FilterRow.types';

export const FilterRow: React.FC<FilterRowProps> = ({
  label,
  control,
  className,
  children,
}) => {
  return (
    <div className={`flex flex-col flex-1 min-w-0 gap-[var(--space-4)]${className ? ' ' + className : ''}`}>
      {label != null && <div className="text-style-caption-xs text-[var(--color-text-muted)]">{label}</div>}
      {control}
      {children}
    </div>
  );
};

export default FilterRow;
