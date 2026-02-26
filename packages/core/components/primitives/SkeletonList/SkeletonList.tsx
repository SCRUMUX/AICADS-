import React from 'react';
import type { SkeletonListProps, SkeletonListSize } from './SkeletonList.types';
import { cn } from '../_shared';
import { SkeletonBlock } from '../_shared/SkeletonBlock';

// в”Ђв”Ђв”Ђ Size config в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// From Figma: sm=320, md=480, lg=800
// padding L16 T8 R16 B8, rows height=36, avatar 16Г—16 (circle), label varies, meta=36Г—8
// divider=1px, color=border-base
const SIZE: Record<SkeletonListSize, {
  width: number; avatarPx: number; labelWidths: number[]; metaW: number; rowH: number;
}> = {
  sm: { width: 320, avatarPx: 16, labelWidths: [168, 112, 146, 130], metaW: 36, rowH: 36 },
  md: { width: 480, avatarPx: 20, labelWidths: [240, 180, 210, 195], metaW: 48, rowH: 40 },
  lg: { width: 800, avatarPx: 24, labelWidths: [360, 280, 320, 300], metaW: 64, rowH: 44 },
};

const SkeletonListInner = React.forwardRef<HTMLDivElement, SkeletonListProps>(({ 
  size = 'sm',
  shimmer = true,
  rows = 4,
  className,
  style,
}, ref) => {
  const s = SIZE[size];
  const labelWidths = s.labelWidths;

  return (
    <div
      ref={ref}
      className={cn('rounded-[4px] bg-[var(--color-surface-1)]', className)}
      style={{ width: s.width, paddingLeft: 16, paddingRight: 16, paddingTop: 8, paddingBottom: 8, ...style }}
      role="status"
      aria-label="LoadingвЂ¦"
      aria-busy="true"
    >
      {Array.from({ length: rows }).map((_, i) => (
        <React.Fragment key={i}>
          {/* Row */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 6, height: s.rowH }}>
            {/* Avatar circle */}
            <SkeletonBlock shimmer={shimmer} width={s.avatarPx} height={s.avatarPx} radius={9999} />
            {/* Label вЂ” flexible fill */}
            <SkeletonBlock shimmer={shimmer} width={labelWidths[i % labelWidths.length]} height={8} radius={2} />
            {/* Push meta to the right */}
            <div style={{ flex: 1 }} />
            {/* Meta block */}
            <SkeletonBlock shimmer={shimmer} width={s.metaW} height={8} radius={2} />
          </div>
          {/* Divider вЂ” not after last row */}
          {i < rows - 1 && (
            <div style={{ height: 1, backgroundColor: 'var(--color-border-base)', width: '100%' }} aria-hidden="true" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
});

SkeletonListInner.displayName = 'SkeletonList';
export const SkeletonList = React.memo(SkeletonListInner);

