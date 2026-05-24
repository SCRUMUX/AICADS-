import React from 'react';
import { AppSidebarBlock, type AppSidebarNavItem } from '../AppSidebarBlock';

export interface AppShellBlockProps {
  sidebarItems: AppSidebarNavItem[];
  sidebarFooter?: React.ReactNode;
  header?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

/**
 * App shell: sidebar + main content column (dashboard layout).
 */
export const AppShellBlock: React.FC<AppShellBlockProps> = ({
  sidebarItems,
  sidebarFooter,
  header,
  children,
  className,
}) => (
  <div
    className={`min-h-screen flex flex-row bg-[var(--color-bg-base)] ${className ?? ''}`}
  >
    <AppSidebarBlock items={sidebarItems} footer={sidebarFooter} />
    <main className="flex flex-col flex-1 min-w-0 bg-[var(--color-surface-1)]">
      {header}
      {children}
    </main>
  </div>
);

AppShellBlock.displayName = 'AppShellBlock';
