import React, { useState, useCallback } from 'react';
import type { TableRowProps, TableRowState, TableRowSize } from './TableRow.types';
import { cn } from '../_shared/utils';
import { TABLE_SIZE_MAP } from '../_shared/table-tokens';

/**
 * Figma API (161:90212):
 *
 * Размеры (H): sm=28px, md=36px, lg=44px
 * (высота определяется padding+lineHeight в TableCell, <tr> автоматически)
 *
 * Состояния (background | border-bottom):
 *   base     → surface-1 (#FFF)          | border-base
 *   hover    → surface-2 (#F7F8FA)       | border-base
 *   selected → brand-muted (#E7F0FF)     | brand-primary
 *   disabled → surface-2 + opacity=0.5   | border-base
 *
 * Рендерится как <tr> в <tbody>.
 */

type StyleSpec = {
  rowBg:   string;
  opacity: boolean;
  cursor:  string;
};

function getStyle(state: TableRowState): StyleSpec {
  switch (state) {
    case 'hover':
      return { rowBg: 'bg-[var(--color-surface-2)]',   opacity: false, cursor: 'cursor-pointer' };
    case 'selected':
      return { rowBg: 'bg-[var(--color-brand-muted)]', opacity: false, cursor: 'cursor-pointer' };
    case 'disabled':
      return { rowBg: 'bg-[var(--color-surface-2)]',   opacity: true,  cursor: 'cursor-not-allowed' };
    default:
      return { rowBg: 'bg-[var(--color-surface-1)]',   opacity: false, cursor: '' };
  }
}


export const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>((props, ref) => {
  const {
    size = 'md',
    state: controlledState,
    selected = false,
    disabled = false,
    showCheckboxColumn = false,
    checkbox,
    onSelect,
    children,
    className,
    onMouseEnter,
    onMouseLeave,
    onClick,
    ...rest
  } = props;

  const [hovered, setHovered] = useState(false);

  const effectiveState: TableRowState = (() => {
    if (controlledState) return controlledState;
    if (disabled)        return 'disabled';
    if (selected)        return 'selected';
    if (hovered)         return 'hover';
    return 'base';
  })();

  const { rowBg, opacity, cursor } = getStyle(effectiveState);
  const checkboxPx = TABLE_SIZE_MAP[size].checkboxColWidth;

  /* selected строка меняет border-color на brand-primary — передаём через CSS var */
  const selectedBorderClass = effectiveState === 'selected'
    ? '[&>td]:border-b [&>td]:border-[var(--color-brand-primary)]'
    : '';

  const he = useCallback((e: React.MouseEvent<HTMLTableRowElement>) => {
    if (!disabled) setHovered(true);
    onMouseEnter?.(e);
  }, [disabled, onMouseEnter]);

  const hl = useCallback((e: React.MouseEvent<HTMLTableRowElement>) => {
    setHovered(false);
    onMouseLeave?.(e);
  }, [onMouseLeave]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLTableRowElement>) => {
    if (!disabled) onSelect?.();
    onClick?.(e);
  }, [disabled, onSelect, onClick]);

  return (
    <tr
      ref={ref}
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
      className={cn(
        'transition-colors duration-150',
        rowBg,
        selectedBorderClass,
        opacity && 'opacity-50 pointer-events-none',
        cursor,
        className,
      )}
      onMouseEnter={he}
      onMouseLeave={hl}
      onClick={handleClick}
      {...rest}
    >
      {/* Checkbox column */}
      {showCheckboxColumn && (
        <td
          className="border-b border-[var(--color-border-base)] align-middle"
          style={{ width: checkboxPx }}
        >
          <span className="flex items-center justify-center">
            {checkbox}
          </span>
        </td>
      )}

      {children}
    </tr>
  );
});

TableRow.displayName = 'TableRow';
