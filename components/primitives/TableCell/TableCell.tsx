import React from 'react';
import type { TableCellProps, TableCellSize, TableCellType } from './TableCell.types';
import { IconSlot } from '../_shared/IconSlot';
import { cn } from '../_shared/utils';
import { TABLE_SIZE_MAP } from '../_shared/table-tokens';

function getLabelClasses(type: TableCellType): string {
  if (type === 'numeric')  return 'text-[var(--color-text-primary)]';
  if (type === 'actions')  return 'text-[var(--color-text-muted)]';
  return 'text-[var(--color-text-primary)]';
}

export const TableCell = React.forwardRef<HTMLTableCellElement, TableCellProps>((props, ref) => {
  const {
    size = 'md',
    type = 'text',
    checkbox,
    iconLeft,
    badge,
    iconAction,
    showCheckbox = false,
    showIconLeft = false,
    showBadge = false,
    showIconAction = false,
    children,
    className,
    ...rest
  } = props;

  const { padding, gap, iconSize, cellFont: font } = TABLE_SIZE_MAP[size];
  const isNumeric = type === 'numeric';

  return (
    <td
      ref={ref}
      className={cn(
        'border-b border-[var(--color-border-base)]',
        'whitespace-nowrap align-middle',
        padding,
        font,
        className,
      )}
      {...rest}
    >
      {/* Внутренний flex-контейнер */}
      <span className={cn(
        'flex flex-row items-center',
        gap,
        isNumeric && 'justify-end',
      )}>
        {/* Checkbox slot */}
        {showCheckbox && checkbox && (
          <span className="shrink-0 flex items-center justify-center">
            {checkbox}
          </span>
        )}

        {/* Icon Left slot */}
        {showIconLeft && iconLeft && (
          <IconSlot
            icon={iconLeft}
            size={`${iconSize}px`}
            className="shrink-0 text-[var(--color-icon-muted)]"
          />
        )}

        {/* Label */}
        <span className={cn(
          isNumeric ? 'tabular-nums' : 'flex-1 min-w-0 truncate',
          getLabelClasses(type),
        )}>
          {children}
        </span>

        {/* Badge / Tag slot */}
        {showBadge && badge && (
          <span className="shrink-0 flex items-center">
            {badge}
          </span>
        )}

        {/* Icon Action slot */}
        {showIconAction && iconAction && (
          <IconSlot
            icon={iconAction}
            size={`${iconSize}px`}
            className="shrink-0 text-[var(--color-icon-muted)] hover:text-[var(--color-icon-primary)] transition-colors duration-150"
          />
        )}
      </span>
    </td>
  );
});

TableCell.displayName = 'TableCell';
