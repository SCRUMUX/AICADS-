import React, { useState } from 'react';
import type { PaginationProps, PaginationSize, PaginationAppearance } from './Pagination.types';
import { Button } from '../Button/Button';
import { ChevronLeftIcon, ChevronRightIcon } from '../../icons';

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

/**
 * Figma API (160:86574):
 * sm: H=28, gap=4, Prev/Next square 28×28, icon 16px
 * md: H=32, gap=6, Prev/Next square 32×32, icon 20px
 * lg: H=40, gap=8, Prev/Next square 40×40, icon 24px
 *
 * compact text: "currentPage / totalPages", fontSize=12, fw=500, color=text-primary
 */

const SIZE_CONFIG: Record<PaginationSize, { gap: string; btnSize: string; iconSize: number }> = {
  sm: { gap: 'gap-[var(--space-4)]',  btnSize: 'w-7 h-7',  iconSize: 16 },
  md: { gap: 'gap-[var(--space-6)]',  btnSize: 'w-8 h-8',  iconSize: 20 },
  lg: { gap: 'gap-[var(--space-8)]',  btnSize: 'w-10 h-10', iconSize: 24 },
};

/**
 * Стиль активной и неактивной страницы по appearance.
 * Неактивные всегда ghost. Активная зависит от appearance.
 */
function getActiveAppearance(appearance: PaginationAppearance): PaginationAppearance {
  return appearance; // brand → brand, base → base, ghost → ghost
}

/**
 * Квадратная кнопка Prev/Next — иконка в квадратном контейнере без padding.
 * Из Figma: cornerRadius=2, нет fills/strokes, icon color = text-muted.
 */
const NavButton: React.FC<{
  direction: 'prev' | 'next';
  size: PaginationSize;
  disabled?: boolean;
  onClick?: () => void;
}> = ({ direction, size, disabled, onClick }) => {
  const { btnSize, iconSize } = SIZE_CONFIG[size];
  const Icon = direction === 'prev' ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      aria-label={direction === 'prev' ? 'Previous page' : 'Next page'}
      className={cn(
        'inline-flex items-center justify-center shrink-0 rounded-[2px]',
        'transition-colors duration-150',
        'text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)]',
        'disabled:opacity-[var(--opacity-disabled)] disabled:cursor-not-allowed disabled:pointer-events-none',
        btnSize,
      )}
    >
      <Icon size={iconSize} />
    </button>
  );
};

export const Pagination = React.forwardRef<HTMLElement, PaginationProps>((props, ref) => {
  const {
    size = 'sm',
    appearance = 'brand',
    variant = 'with-numbers',
    currentPage: controlledPage,
    totalPages = 5,
    onPageChange,
    onPrev,
    onNext,
    pageWindowSize = 3,
    className,
    ...rest
  } = props;

  const [internalPage, setInternalPage] = useState(1);
  const currentPage = controlledPage ?? internalPage;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    if (controlledPage === undefined) setInternalPage(page);
    onPageChange?.(page);
  };

  const handlePrev = () => {
    handlePageChange(currentPage - 1);
    onPrev?.();
  };

  const handleNext = () => {
    handlePageChange(currentPage + 1);
    onNext?.();
  };

  const { gap } = SIZE_CONFIG[size];
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  /**
   * Вычисляем окно страниц вокруг текущей:
   * pageWindowSize=3 → показываем 3 страницы
   */
  const getPageWindow = (): number[] => {
    const half = Math.floor(pageWindowSize / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + pageWindowSize - 1);
    start = Math.max(1, end - pageWindowSize + 1);
    const pages: number[] = [];
    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <nav
      ref={ref as React.Ref<HTMLElement>}
      aria-label="pagination"
      className={cn('inline-flex flex-row items-center', gap, className)}
      {...rest}
    >
      {/* Prev */}
      <NavButton
        direction="prev"
        size={size}
        disabled={isPrevDisabled}
        onClick={handlePrev}
      />

      {/* with-numbers: кнопки страниц как Button instances */}
      {variant === 'with-numbers' && (
        <>
          {getPageWindow().map((page) => {
            const isActive = page === currentPage;
            return (
              <Button
                key={page}
                size={size}
                appearance={isActive ? getActiveAppearance(appearance) : 'ghost'}
                onClick={() => handlePageChange(page)}
                aria-label={`Page ${page}`}
                aria-current={isActive ? 'page' : undefined}
              >
                {String(page)}
              </Button>
            );
          })}
        </>
      )}

      {/* compact: "currentPage / totalPages" */}
      {variant === 'compact' && (
        <span
          className="text-style-caption-xs font-medium text-[var(--color-text-primary)] select-none whitespace-nowrap"
        >
          {currentPage} / {totalPages}
        </span>
      )}

      {/* minimal: только Prev + Next (уже рендерятся выше/ниже) */}

      {/* Next */}
      <NavButton
        direction="next"
        size={size}
        disabled={isNextDisabled}
        onClick={handleNext}
      />
    </nav>
  );
});

Pagination.displayName = 'Pagination';
