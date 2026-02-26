import React from 'react';
import type { BreadcrumbProps, BreadcrumbItem } from './Breadcrumb.types';
import { SectionHeader } from '../SectionHeader/SectionHeader';
import { ChevronRightIcon } from '../../icons';
import { cn } from '../_shared';

/**
 * Separator — ChevronRight 12×12, цвет text-muted.
 * Из Figma API: Separator Frame 12×12, содержит иконку chevron-right.
 */
const Separator: React.FC = () => (
  <span
    className="shrink-0 flex items-center justify-center text-[var(--color-text-muted)]"
    style={{ width: 12, height: 12 }}
    aria-hidden="true"
  >
    <ChevronRightIcon style={{ width: '100%', height: '100%' }} />
  </span>
);

/** Дефолтные items для демонстрации по числу levels */
const DEFAULT_LABELS: Record<string, string[]> = {
  '1': ['Section'],
  '2': ['Section', 'Subsection'],
  '3': ['Section', 'Subsection', 'Category'],
  '4': ['Section', 'Subsection', 'Category', 'Current page'],
};

export const Breadcrumb = React.forwardRef<HTMLElement, BreadcrumbProps>((props, ref) => {
  const {
    levels = '1',
    items,
    size = 'sm',
    onNavigate,
    className,
    ...rest
  } = props;

  /*
   * Если items переданы — используем их.
   * Иначе генерируем дефолтные по levels.
   */
  const resolvedItems: BreadcrumbItem[] = items ?? DEFAULT_LABELS[levels].map(
    (label, i, arr) => ({ label, href: i < arr.length - 1 ? '#' : undefined })
  );

  return (
    <nav
      ref={ref}
      aria-label="breadcrumb"
      className={cn(
        'inline-flex flex-row items-center flex-wrap',
        'px-[var(--space-4)] py-[var(--space-2)] gap-[var(--space-4)]',
        className,
      )}
      {...rest}
    >
      {resolvedItems.map((item, index) => {
        const isLast = index === resolvedItems.length - 1;
        const appearance = isLast ? 'base' : 'base';

        return (
          <React.Fragment key={index}>
            {/* Separator перед каждым item кроме первого */}
            {index > 0 && <Separator />}

            {/* Item — SectionHeader как кликабельная или некликабельная метка */}
            {item.href && !isLast ? (
              <a
                href={item.href}
                onClick={(e) => {
                  if (onNavigate) {
                    e.preventDefault();
                    onNavigate(item, index);
                  }
                  item.onClick?.(e);
                }}
                className="no-underline hover:opacity-75 transition-opacity"
                aria-current={undefined}
              >
                <SectionHeader
                  size={size}
                  appearance={appearance}
                  showLeftIcon={!!item.iconLeft}
                  iconLeft={item.iconLeft}
                  showBadge={!!item.badge}
                  badge={item.badge}
                  showRightIcon={!!item.iconRight}
                  iconRight={item.iconRight}
                  className="cursor-pointer text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)]"
                  style={{ padding: 0 }}
                >
                  {item.label}
                </SectionHeader>
              </a>
            ) : (
              <SectionHeader
                size={size}
                appearance={appearance}
                showLeftIcon={!!item.iconLeft}
                iconLeft={item.iconLeft}
                showBadge={!!item.badge}
                badge={item.badge}
                showRightIcon={!!item.iconRight}
                iconRight={item.iconRight}
                style={{ padding: 0 }}
                aria-current={isLast ? 'page' : undefined}
              >
                {item.label}
              </SectionHeader>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
});

Breadcrumb.displayName = 'Breadcrumb';
