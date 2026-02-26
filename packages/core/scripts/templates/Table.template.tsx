import React from 'react';
import type { TableProps, TableSize, TableAppearance, TableColumn } from './Table.types';
import { TableHeaderRow } from '../TableHeaderRow/TableHeaderRow';
import { TableRow } from '../TableRow/TableRow';
import { TableCell } from '../TableCell/TableCell';
import { cn } from '../_shared';

/**
 * Figma API (161:92875):
 *
 * Appearance (внешний контейнер):
 *   base     → border 1px border-base   (#E5E7EB), cornerRadius=4px
 *   striped  → border 1px border-base   (#E5E7EB), cornerRadius=4px + чётные строки surface-2
 *   bordered → border 1px border-strong (#CBD5E1), cornerRadius=4px
 *
 * Структура: <div wrapper rounded> → <table border-collapse> → <thead> → <tbody>
 *
 * overflow-hidden на wrapper даёт скругление, border-collapse на table — корректные границы ячеек.
 *
 * striped: чётные tbody tr получают bg surface-2 через :nth-child(even).
 */

function getWrapperBorder(appearance: TableAppearance): string {
  if (appearance === 'bordered') return 'border border-[var(--color-border-strong)]';
  return 'border border-[var(--color-border-base)]';
}

export const Table = React.forwardRef<HTMLTableElement, TableProps>((props, ref) => {
  const {
    size = 'md',
    appearance = 'base',
    showCheckboxColumn = false,
    headerCheckbox,
    columns,
    rows,
    getRowKey,
    getRowCheckbox,
    selectedRowKeys,
    disabledRowKeys,
    onRowSelect,
    children,
    className,
    style,
    ...rest
  } = props;

  const headerColumns = columns?.map((col) => ({
    key:          col.key,
    label:        col.label,
    iconLeft:     col.headerIconLeft,
    showIconLeft: !!col.headerIconLeft,
    sort:         col.sort ?? 'none' as const,
    onSortChange: col.onSortChange,
    align:        col.align ?? 'left' as const,
  }));

  return (
    /* Обёртка нужна для overflow-hidden + border-radius, т.к. на <table> они не работают */
    <div
      className={cn(
        'rounded-[4px] overflow-hidden',
        getWrapperBorder(appearance),
        className,
      )}
      style={style}
    >
      <table
        ref={ref}
        className={cn(
          'border-collapse w-full',
          'bg-[var(--color-surface-1)]',
          /* striped: чётные строки получают surface-2 */
          appearance === 'striped' && '[&_tbody_tr:nth-child(even)]:bg-[var(--color-surface-2)]',
        )}
        {...rest}
      >
        {/* ── THEAD ── */}
        {(columns || headerCheckbox !== undefined) && (
          <thead>
            <TableHeaderRow
              size={size}
              showCheckboxColumn={showCheckboxColumn}
              checkbox={headerCheckbox}
              columns={headerColumns}
            />
          </thead>
        )}

        {/* ── TBODY через columns/rows ── */}
        {rows && columns && (
          <tbody>
            {rows.map((row, rowIndex) => {
              const key = getRowKey ? getRowKey(row, rowIndex) : rowIndex;
              const isSelected = selectedRowKeys?.includes(key) ?? false;
              const isDisabled = disabledRowKeys?.includes(key) ?? false;
              const rowCheckbox = getRowCheckbox ? getRowCheckbox(row, rowIndex) : undefined;

              return (
                <TableRow
                  key={key}
                  size={size}
                  selected={isSelected}
                  disabled={isDisabled}
                  showCheckboxColumn={showCheckboxColumn}
                  checkbox={rowCheckbox}
                  onSelect={onRowSelect ? () => onRowSelect(row, key) : undefined}
                >
                  {columns.map((col) => {
                    const cellContent = col.render
                      ? col.render(row, rowIndex)
                      : String((row as Record<string, unknown>)[col.key] ?? '');

                    const colAlign = col.align ?? 'left';

                    return (
                      <TableCell
                        key={col.key}
                        size={size}
                        type={col.cellType ?? 'text'}
                        align={colAlign}
                        showIconLeft={!!col.cellIconLeft}
                        iconLeft={col.cellIconLeft}
                        style={col.width ? { width: col.width } : undefined}
                      >
                        {cellContent}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </tbody>
        )}

        {/* ── TBODY через children ── */}
        {!rows && children && (
          <tbody>
            {children}
          </tbody>
        )}
      </table>
    </div>
  );
}) as <T = Record<string, unknown>>(
  props: TableProps<T> & { ref?: React.Ref<HTMLTableElement> }
) => React.ReactElement;

(Table as React.FC).displayName = 'Table';

export default Table;
