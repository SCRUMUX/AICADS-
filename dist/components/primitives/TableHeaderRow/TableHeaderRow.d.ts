import React from 'react';
import type { TableHeaderRowProps } from './TableHeaderRow.types';
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
export declare const TableHeaderRow: React.ForwardRefExoticComponent<TableHeaderRowProps & React.RefAttributes<HTMLTableRowElement>>;
//# sourceMappingURL=TableHeaderRow.d.ts.map