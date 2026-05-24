import React from 'react';
import { Tab } from '../../../components/primitives/Tab';
import { cn } from '../../../components/primitives/_shared';

export interface AppSidebarNavItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  active?: boolean;
  badge?: React.ReactNode;
  onClick?: () => void;
}

export interface AppSidebarBlockProps {
  items: AppSidebarNavItem[];
  footer?: React.ReactNode;
  width?: string;
  className?: string;
}

const SIDEBAR_TAB =
  'w-full justify-start pl-[var(--space-16)] pr-[var(--space-16)] min-h-[var(--space-32)] max-h-[var(--space-40)]';

export const AppSidebarBlock: React.FC<AppSidebarBlockProps> = ({
  items,
  footer,
  width = '260px',
  className,
}) => (
  <div data-theme="dark">
    <aside
      className={cn(
        'flex flex-col shrink-0 pt-[var(--space-16)] pb-[var(--space-16)] pl-[var(--space-12)] pr-[var(--space-12)] gap-[var(--space-8)] bg-[var(--color-surface-2)] border-r border-solid border-[var(--color-border-base)]',
        className,
      )}
      style={{ width, boxShadow: 'var(--effect-elevation-1)' }}
      aria-label="Application sidebar"
    >
      <nav className="flex flex-col gap-[var(--space-8)] flex-1 min-h-0">
        {items.map((item) => (
          <Tab
            key={item.id}
            size="lg"
            appearance={item.active ? 'brand' : 'base'}
            iconLeft={item.icon}
            showLeftIcon={Boolean(item.icon)}
            badge={item.badge}
            showBadge={Boolean(item.badge)}
            showRightIcon={false}
            className={SIDEBAR_TAB}
            onClick={item.onClick}
          >
            {item.label}
          </Tab>
        ))}
      </nav>
      {footer && <div className="shrink-0">{footer}</div>}
    </aside>
  </div>
);

AppSidebarBlock.displayName = 'AppSidebarBlock';
