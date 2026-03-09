/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run blocks:generate-components
 */

import React from 'react';
import type { AppTopBarProps } from './AppTopBar.types';

export const AppTopBar: React.FC<AppTopBarProps> = ({
  controls,
  search,
  notifications,
  avatar,
  meta,
  className,
  children,
}) => {
  return (
    <div className={`flex items-center flex-1 min-w-0 px-[var(--space-24)] py-[var(--space-12)] gap-[var(--space-24)] min-h-[var(--space-72)] bg-[var(--color-surface-1)] border-b border-b-[var(--color-border-base)]${className ? ' ' + className : ''}`}>
      {controls}
      {search}
      <div className="flex items-center gap-[var(--space-12)] items-center">
        {notifications}
        {avatar}
        {meta != null && <div className="">{meta}</div>}
      </div>
      {children}
    </div>
  );
};

export default AppTopBar;
