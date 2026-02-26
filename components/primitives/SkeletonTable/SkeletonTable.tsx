import React from 'react';
import type { SkeletonTableProps, SkeletonTableSize } from './SkeletonTable.types';
import { SkeletonBlock } from '../_shared/SkeletonBlock';

// в”Ђв”Ђв”Ђ Size config в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// From Figma:
//   sm: W=320  вЂ” 4 cols, col widths [48,112,80,80], rowH=28, cellPad L12 T3 R12 B3
//   md: W=460  вЂ” 4 cols, col widths proportionally wider
//   lg: W=600  вЂ” 4 cols
// Header row has a darker bg (surface-2), data rows alternate with dividers.
const SIZE: Record<SkeletonTableSize, {
  width: number; rowH: number; cellPadX: number; cellPadY: number;
  colWidths: number[]; headerCellH: number;
}> = {
  sm: { width: 320, rowH: 28, cellPadX: 12, cellPadY: 3, colWidths: [48, 112, 80, 80], headerCellH: 8 },
  md: { width: 460, rowH: 32, cellPadX: 14, cellPadY: 4, colWidths: [64, 160, 112, 120], headerCellH: 8 },
  lg: { width: 600, rowH: 36, cellPadX: 16, cellPadY: 5, colWidths: [80, 200, 150, 170], headerCellH: 8 },
};

// Line widths inside cells (skeleton content block)
const CELL_LINE_WIDTHS = [
  [17, 53, 45, 28], // row 1
  [22, 70, 38, 40], // row 2
  [17, 53, 45, 28], // row 3
  [22, 70, 38, 40], // row 4
];

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

const SkeletonTableInner = React.forwardRef<HTMLDivElement, SkeletonTableProps>(({ 
  size = 'sm',
  shimmer = true,
  rows = 4,
  cols = 4,
  className,
  style,
}, ref) => {
  const s = SIZE[size];
  const colWidths = s.colWidths.slice(0, cols);
  const totalW = s.width;

  const renderRow = (rowIdx: number, isHeader: boolean) => {
    const lineWidths = CELL_LINE_WIDTHS[rowIdx % CELL_LINE_WIDTHS.length];
    return (
      <div
        key={rowIdx}
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: totalW,
          height: s.rowH,
          backgroundColor: isHeader ? 'var(--color-surface-2)' : undefined,
        }}
      >
        {colWidths.map((colW, colIdx) => (
          <React.Fragment key={colIdx}>
            {/* Cell */}
            <div
              style={{
                width: colW,
                height: s.rowH,
                flexShrink: 0,
                paddingLeft: s.cellPadX,
                paddingRight: s.cellPadX,
                paddingTop: s.cellPadY,
                paddingBottom: s.cellPadY,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <SkeletonBlock
                shimmer={shimmer}
                width={isHeader
                  ? Math.round(colW * 0.55) // header labels slightly wider
                  : (lineWidths[colIdx] ?? Math.round(colW * 0.4))}
                height={s.headerCellH}
                radius={2}
              />
            </div>
            {/* Vertical column divider вЂ” not after last col */}
            {colIdx < colWidths.length - 1 && (
              <div
                style={{ width: 1, height: s.rowH, backgroundColor: 'var(--color-border-base)', flexShrink: 0 }}
                aria-hidden="true"
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div
      ref={ref}
      className={cn('rounded-[4px] bg-[var(--color-surface-1)] overflow-hidden', className)}
      style={{ width: totalW, border: '1px solid var(--color-border-base)', ...style }}
      role="status"
      aria-label="LoadingвЂ¦"
      aria-busy="true"
    >
      {/* Header row */}
      {renderRow(-1, true)}

      {/* Data rows with dividers */}
      {Array.from({ length: rows }).map((_, i) => (
        <React.Fragment key={i}>
          <div style={{ height: 1, backgroundColor: 'var(--color-border-base)', width: '100%' }} aria-hidden="true" />
          {renderRow(i, false)}
        </React.Fragment>
      ))}
    </div>
  );
});

SkeletonTableInner.displayName = 'SkeletonTable';
export const SkeletonTable = React.memo(SkeletonTableInner);

