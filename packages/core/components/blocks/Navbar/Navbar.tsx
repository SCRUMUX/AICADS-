/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run blocks:generate-components
 */

import React from 'react';
import type { NavbarProps } from './Navbar.types';

export const Navbar: React.FC<NavbarProps> = ({
  logo,
  nav,
  search,
  notifications,
  avatar,
  userDropdown,
  className,
  children,
}) => {
  return (
    <div className={`flex items-center flex-1 min-w-0 px-[var(--space-24)] py-[var(--space-0)] gap-[var(--space-0)] bg-[var(--color-surface-1)] border-b border-b-[var(--color-border-base)]${className ? ' ' + className : ''}`}>
      {logo}
      <div className="flex flex-col gap-[var(--space-8)]">
        {nav}
      </div>
      {search}
      {notifications}
      {avatar}
      {userDropdown}
      {children}
    </div>
  );
};

export default Navbar;
