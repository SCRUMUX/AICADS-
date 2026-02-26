import React from 'react';
import type { TableHeaderRowProps, TableHeaderRowSize } from './TableHeaderRow.types';
import { TableHeaderCell } from '../TableHeaderCell/TableHeaderCell';
import { cn } from '../_shared/utils';
import { TABLE_SIZE_MAP } from '../_shared/table-tokens';

/**
 * Figma API (161:90330):
 *
 * Размеры (H):
 *   sm: H=28px → HeaderCell size=sm (py=3px × 2 + lh16 = 22px → row total 28)
 *   md: H=36px → HeaderCell size=md (py=6px × 2 + lh20 = 32px → row total 36... фактически py+lh+py)
 *   lg: H=44px → HeaderCell size=lg (py=8px × 2 + lh20 = 36px... в Figma H=44 для cell тоже)
 *
 * Фон: surface-1 (белый). Border: bottom 1px border-base.
 * Рендерится как <tr> внутри <thead>.
 *
 * showCheckboxColumn=true → первый <th> с Checkbox (ширина = H строки).
 */


export const TableHeaderRow = React.forwardRef<HTMLTableRowElement, TableHeaderRowProps>((props, ref) => {
  const {
    size = 'md',
    showCheckboxColumn = false,
    checkbox,
    columns,
    children,
    className,
    ...rest
  } = props;

  const checkboxPx = TABLE_SIZE_MAP[size].checkboxColWidth;

  return (
    <tr
      ref={ref}
      className={cn(
        'bg-[var(--color-surface-1)]',
        className,
      )}
      {...rest}
    >
      {/* Checkbox column */}
      {showCheckboxColumn && (
        <th
          scope="col"
          className="border-b border-[var(--color-border-base)] bg-[var(--color-surface-1)] align-middle"
          style={{ width: checkboxPx }}
        >
          <span className="flex items-center justify-center">
            {checkbox}
          </span>
        </th>
      )}

      {/* Columns via config array */}
      {columns
        ? columns.map((col, i) => (
            <TableHeaderCell
              key={col.key ?? i}
              size={size}
              sort={col.sort ?? 'none'}
              iconLeft={col.iconLeft}
              showIconLeft={col.showIconLeft}
              onSortChange={col.onSortChange}
              className={col.className}
            >
              {col.label}
            </TableHeaderCell>
          ))
        : children}
    </tr>
  );
});

TableHeaderRow.displayName = 'TableHeaderRow';
