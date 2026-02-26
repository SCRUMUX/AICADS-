import React from 'react';
import type { SkeletonCardProps, SkeletonCardSize } from './SkeletonCard.types';
import { SkeletonBlock } from '../_shared/SkeletonBlock';

// в”Ђв”Ђв”Ђ Size config в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// From Figma:
//   sm: W=320 H=100 вЂ” Media=80px, content pad L6 T0 R6 B0, gap=4 between media/content
//   md: W=480 H=145 вЂ” Media=~110px
//   lg: W=800 H=190 вЂ” Media=~150px
// Content: Title + DescLine1 + DescLine2 + Actions row (2 pill buttons)
const SIZE: Record<SkeletonCardSize, {
  width: number; mediaH: number; titleW: number;
  descW1: number; descW2: number; actionW1: number; actionW2: number;
}> = {
  sm: { width: 320, mediaH: 80,  titleW: 185, descW1: 277, descW2: 216, actionW1: 44, actionW2: 31 },
  md: { width: 480, mediaH: 110, titleW: 260, descW1: 400, descW2: 320, actionW1: 60, actionW2: 44 },
  lg: { width: 800, mediaH: 150, titleW: 400, descW1: 680, descW2: 540, actionW1: 80, actionW2: 60 },
};

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

const SkeletonCardInner = React.forwardRef<HTMLDivElement, SkeletonCardProps>(({ 
  size = 'sm',
  shimmer = true,
  className,
  style,
}, ref) => {
  const s = SIZE[size];

  return (
    <div
      ref={ref}
      className={cn('rounded-[4px] bg-[var(--color-surface-2)]', className)}
      style={{ width: s.width, padding: 6, display: 'flex', flexDirection: 'column', gap: 4, ...style }}
      role="status"
      aria-label="LoadingвЂ¦"
      aria-busy="true"
    >
      {/* Media */}
      <SkeletonBlock shimmer={shimmer} width="100%" height={s.mediaH} radius={2} />

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, paddingLeft: 6, paddingRight: 6 }}>
        {/* Title */}
        <SkeletonBlock shimmer={shimmer} width={s.titleW} height={10} radius={2} />
        {/* Desc lines */}
        <SkeletonBlock shimmer={shimmer} width={s.descW1} height={8} radius={2} />
        <SkeletonBlock shimmer={shimmer} width={s.descW2} height={8} radius={2} />
        {/* Action buttons (pills) */}
        <div style={{ display: 'flex', flexDirection: 'row', gap: 4 }}>
          <SkeletonBlock shimmer={shimmer} width={s.actionW1} height={14} radius={9999} />
          <SkeletonBlock shimmer={shimmer} width={s.actionW2} height={14} radius={9999} />
        </div>
      </div>
    </div>
  );
});

SkeletonCardInner.displayName = 'SkeletonCard';
export const SkeletonCard = React.memo(SkeletonCardInner);

