import React from 'react';
import type { SkeletonPageProps, SkeletonPageSize } from './SkeletonPage.types';
import { cn } from '../_shared';
import { SkeletonBlock } from '../_shared/SkeletonBlock';

// в”Ђв”Ђв”Ђ Size config в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// From Figma: sm=320, md=480, lg=800
// Padding=6px, gap=12px between sections for all sizes
// Hero height scales: sm=80, md=120, lg=200
// Card media height: sm=80, md=100, lg=120
const SIZE: Record<SkeletonPageSize, {
  width: number; heroPx: number; cardMediaPx: number; navBlockH: number;
  subtitleW1: number; subtitleW2: number;
  tagWidths: number[]; cardContentTitleW: number; cardContentDescW: number;
}> = {
  sm: { width: 320, heroPx: 80,  cardMediaPx: 80,  navBlockH: 14, subtitleW1: 169, subtitleW2: 108, tagWidths: [40,31,25], cardContentTitleW: 56, cardContentDescW: 40 },
  md: { width: 480, heroPx: 120, cardMediaPx: 100, navBlockH: 16, subtitleW1: 240, subtitleW2: 160, tagWidths: [56,44,34], cardContentTitleW: 80, cardContentDescW: 60 },
  lg: { width: 800, heroPx: 200, cardMediaPx: 140, navBlockH: 18, subtitleW1: 380, subtitleW2: 240, tagWidths: [80,60,48], cardContentTitleW: 120, cardContentDescW: 90 },
};

const SkeletonPageInner = React.forwardRef<HTMLDivElement, SkeletonPageProps>(({ 
  size = 'sm',
  shimmer = true,
  className,
  style,
}, ref) => {
  const s = SIZE[size];
  const inner = s.width - 12; // padding 6 each side
  const cardW = Math.floor((inner - 18) / 3); // 3 cards, gap=9

  return (
    <div
      ref={ref}
      className={cn('rounded-[4px] bg-[var(--color-surface-1)] flex flex-col', className)}
      style={{ width: s.width, padding: 6, gap: 12, ...style }}
      role="status"
      aria-label="LoadingвЂ¦"
      aria-busy="true"
    >
      {/* Header вЂ” nav breadcrumbs */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}>
        <SkeletonBlock shimmer={shimmer} width={55} height={s.navBlockH} radius={2} />
        <SkeletonBlock shimmer={shimmer} width={31} height={s.navBlockH} radius={2} />
        <SkeletonBlock shimmer={shimmer} width={22} height={s.navBlockH} radius={2} />
      </div>

      {/* Hero block */}
      <SkeletonBlock shimmer={shimmer} width="100%" height={s.heroPx} radius={4} />

      {/* Subtitle lines */}
      <SkeletonBlock shimmer={shimmer} width={s.subtitleW1} height={8} radius={2} />
      <SkeletonBlock shimmer={shimmer} width={s.subtitleW2} height={8} radius={2} />

      {/* Tags row */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 8 }}>
        {s.tagWidths.map((w, i) => (
          <SkeletonBlock key={i} shimmer={shimmer} width={w} height={12} radius={9999} />
        ))}
      </div>

      {/* Card grid вЂ” 3 cards */}
      <div style={{ display: 'flex', flexDirection: 'row', gap: 9 }}>
        {[0, 1, 2].map((i) => (
          <div key={i} style={{ width: cardW, borderRadius: 4, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <SkeletonBlock shimmer={shimmer} width={cardW} height={s.cardMediaPx} radius={4} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 8, paddingRight: 8 }}>
              <SkeletonBlock shimmer={shimmer} width={s.cardContentTitleW} height={8} radius={2} />
              <SkeletonBlock shimmer={shimmer} width={s.cardContentDescW} height={8} radius={2} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

SkeletonPageInner.displayName = 'SkeletonPage';
export const SkeletonPage = React.memo(SkeletonPageInner);

