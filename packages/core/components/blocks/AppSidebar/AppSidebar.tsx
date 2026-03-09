/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run blocks:generate-components
 */

import React from 'react';
import type { AppSidebarProps } from './AppSidebar.types';

export const AppSidebar: React.FC<AppSidebarProps> = ({
  navItems,
  infoCard,
  footer,
  className,
  children,
}) => {
  return (
    <div className={`flex flex-col w-[260px] min-w-[260px] shrink-0 h-full px-[var(--space-12)] py-[var(--space-16)] gap-[var(--space-8)] bg-[var(--color-bg-base)]${className ? ' ' + className : ''}`} data-theme="dark" style={{ boxShadow: 'var(--effect-elevation-1)' }}>
      <div className="flex flex-col gap-[var(--space-8)]">
        {navItems}
      </div>
      {infoCard}
      {footer}
      {children}
    </div>
  );
};

export default AppSidebar;
