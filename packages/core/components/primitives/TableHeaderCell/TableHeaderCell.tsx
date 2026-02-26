import React, { useCallback } from 'react';
import type { TableHeaderCellProps, TableHeaderCellSize, TableHeaderCellSort } from './TableHeaderCell.types';
import { ArrowUpIcon, ArrowDownIcon } from '../../icons';
import { cn } from '../_shared/utils';
import { TABLE_SIZE_MAP } from '../_shared/table-tokens';

function nextSort(current: TableHeaderCellSort): TableHeaderCellSort {
  if (current === 'none') return 'asc';
  if (current === 'asc')  return 'desc';
  return 'none';
}

export const TableHeaderCell = React.forwardRef<HTMLTableCellElement, TableHeaderCellProps>((props, ref) => {
  const {
    size = 'md',
    sort = 'none',
    iconLeft,
    showIconLeft = false,
    onSortChange,
    align = 'left',
    children,
    className,
    onClick,
    ...rest
  } = props;

  const { padding, gap, iconSize, headerFont: font } = TABLE_SIZE_MAP[size];
  const isSorted = sort !== 'none';

  const labelColor = isSorted
    ? 'text-[var(--color-text-primary)]'
    : 'text-[var(--color-text-muted)]';

  const handleClick = useCallback((e: React.MouseEvent<HTMLTableCellElement>) => {
    if (onSortChange) onSortChange(nextSort(sort));
    onClick?.(e);
  }, [sort, onSortChange, onClick]);

  const SortIconComponent = sort === 'asc' ? ArrowUpIcon : ArrowDownIcon;

  return (
    <th
      ref={ref}
      scope="col"
      className={cn(
        /* table-cell чтобы ячейки выравнивались корректно */
        'bg-[var(--color-surface-1)]',
        'border-b border-[var(--color-border-base)]',
        'whitespace-nowrap align-middle text-left',
        padding,
        font,
        onSortChange ? 'cursor-pointer select-none hover:bg-[var(--color-surface-2)] transition-colors duration-150' : '',
        className,
      )}
      onClick={onSortChange ? handleClick : onClick}
      {...rest}
    >
      <span className={cn('flex flex-row items-center', gap, align === 'right' && 'justify-end')}>
        {/* Icon Left */}
        {showIconLeft && iconLeft && (
          <span
            className="shrink-0 flex items-center justify-center text-[var(--color-icon-muted)]"
            style={{ width: iconSize, height: iconSize }}
            aria-hidden="true"
          >
            {iconLeft}
          </span>
        )}

        {/* Label */}
        <span className={cn(
          'flex-1 min-w-0',
          labelColor,
          align === 'right' && 'text-right',
          align === 'center' && 'text-center',
        )}>
          {children}
        </span>

        {/* Sort Icon */}
        {isSorted && (
          <span
            className="shrink-0 flex items-center justify-center text-[var(--color-text-primary)]"
            style={{ width: iconSize, height: iconSize }}
            aria-hidden="true"
          >
            <SortIconComponent size={iconSize} />
          </span>
        )}

        {/* Sort placeholder (invisible) для стабильной ширины */}
        {!isSorted && onSortChange && (
          <span
            className="shrink-0 invisible"
            style={{ width: iconSize, height: iconSize }}
            aria-hidden="true"
          />
        )}
      </span>
    </th>
  );
});

TableHeaderCell.displayName = 'TableHeaderCell';
