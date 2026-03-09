import React, { useState, useRef, useEffect, useCallback } from 'react';
import type { NavbarProps, NavbarSize } from './Navbar.types';

const sizeH: Record<NavbarSize, string> = {
  default: 'h-[var(--space-64)] py-[var(--space-12)]',
  compact: 'h-[var(--space-48)] py-[var(--space-8)]',
};

const navGap: Record<NavbarSize, string> = {
  default: 'gap-[var(--space-8)]',
  compact: 'gap-[var(--space-4)]',
};

const navItem: Record<NavbarSize, string> = {
  default: 'text-style-body px-[var(--space-8)] py-[var(--space-4)]',
  compact: 'text-style-body-sm px-[var(--space-4)] py-[var(--space-2)]',
};

const rightGap: Record<NavbarSize, string> = {
  default: 'gap-[var(--space-12)]',
  compact: 'gap-[var(--space-8)]',
};

const HamburgerIcon: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M3 5h14M3 10h14M3 15h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ChevronDown: React.FC<{ open?: boolean; size?: number }> = ({ open, size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
    className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
  >
    <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  size = 'default',
  logo,
  nav,
  search,
  notifications,
  avatar,
  username,
  userMenuItems,
  sticky = false,
  centerNav = false,
  activeIndex,
  mobileMenu,
  onMobileMenuToggle,
  mobileMenuOpen = false,
  className,
  children,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setUserMenuOpen(false), []);

  useEffect(() => {
    if (!userMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) closeMenu();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [userMenuOpen, closeMenu]);

  return (
    <nav
      className={[
        'flex items-center w-full',
        'px-[var(--space-24)]',
        'bg-[var(--color-surface-1)]',
        'border-b border-b-[var(--color-border-base)]',
        sizeH[size],
        sticky ? 'sticky top-0 z-50' : '',
        className || '',
      ].filter(Boolean).join(' ')}
    >
      {/* Mobile hamburger */}
      {onMobileMenuToggle && (
        <button
          className="flex items-center justify-center mr-[var(--space-8)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] md:hidden"
          onClick={onMobileMenuToggle}
          aria-label="Toggle menu"
        >
          <HamburgerIcon size={size === 'compact' ? 18 : 20} />
        </button>
      )}

      {/* Logo */}
      <div className="flex items-center shrink-0 mr-[var(--space-16)]">
        {logo}
      </div>

      {/* Nav links */}
      {nav && nav.length > 0 && (
        <div
          className={[
            'flex items-center',
            centerNav ? 'flex-1 justify-center' : '',
            navGap[size],
          ].filter(Boolean).join(' ')}
        >
          {nav.map((item, i) => (
            <span
              key={i}
              className={[
                navItem[size],
                'rounded-[var(--radius-default)] transition-colors cursor-pointer whitespace-nowrap',
                i === activeIndex
                  ? 'text-[var(--color-brand-primary)] font-semibold'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]',
              ].join(' ')}
            >
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Search */}
      {search && (
        <div className="flex items-center flex-1 max-w-[360px] mx-[var(--space-16)]">
          {search}
        </div>
      )}

      {/* Spacer */}
      <div className="flex-1 min-w-[var(--space-8)]" />

      {/* Right section */}
      <div className={`flex items-center shrink-0 ${rightGap[size]}`}>
        {/* Notifications */}
        {notifications}

        {/* Avatar */}
        {avatar}

        {/* Username + dropdown */}
        {username && (
          <div className="relative" ref={menuRef}>
            <button
              className="flex items-center gap-[var(--space-4)] cursor-pointer bg-transparent border-0 p-0"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              aria-expanded={userMenuOpen}
              aria-haspopup="true"
            >
              <span className="text-style-body text-[var(--color-text-primary)] whitespace-nowrap">
                {username}
              </span>
              <ChevronDown open={userMenuOpen} />
            </button>

            {userMenuOpen && userMenuItems && userMenuItems.length > 0 && (
              <div
                className={[
                  'absolute right-0 top-full mt-[var(--space-4)]',
                  'min-w-[160px] py-[var(--space-4)]',
                  'bg-[var(--color-surface-1)] border border-[var(--color-border-base)]',
                  'rounded-[var(--radius-default)] shadow-lg z-50',
                ].join(' ')}
              >
                {userMenuItems.map((item, i) => (
                  <button
                    key={i}
                    className={[
                      'w-full text-left px-[var(--space-12)] py-[var(--space-8)]',
                      'text-style-body text-[var(--color-text-primary)]',
                      'hover:bg-[var(--color-surface-2)] transition-colors',
                      'bg-transparent border-0 cursor-pointer',
                    ].join(' ')}
                    onClick={() => {
                      item.onClick?.();
                      closeMenu();
                    }}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {children}

      {/* Mobile overlay menu */}
      {mobileMenuOpen && mobileMenu && (
        <div className="fixed inset-0 top-[var(--space-64)] bg-[var(--color-surface-1)] z-40 p-[var(--space-16)] md:hidden">
          {mobileMenu}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
