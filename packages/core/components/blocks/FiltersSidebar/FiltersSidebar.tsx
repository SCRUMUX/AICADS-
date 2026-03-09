/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run blocks:generate-components
 */

import React from 'react';
import type { FiltersSidebarProps } from './FiltersSidebar.types';

export const FiltersSidebar: React.FC<FiltersSidebarProps> = ({
  title = 'Filters',
  filters,
  resetButton,
  applyButton,
  className,
  children,
}) => {
  return (
    <div className={`flex flex-col w-[260px] min-w-[260px] shrink-0 h-full px-[var(--space-16)] py-[var(--space-16)] gap-[var(--space-8)] bg-[var(--color-surface-1)] border-r border-r-[var(--color-border-base)]${className ? ' ' + className : ''}`}>
      <div className="flex items-center justify-between items-center">
        {title != null && <div className="text-style-body text-[var(--color-text-primary)] font-semibold">{title}</div>}
      </div>
      <div className="flex flex-col gap-[var(--space-8)]">
        {filters}
      </div>
      <div className="flex items-center justify-end gap-[var(--space-8)]">
        {resetButton}
        {applyButton}
      </div>
      {children}
    </div>
  );
};

export default FiltersSidebar;
