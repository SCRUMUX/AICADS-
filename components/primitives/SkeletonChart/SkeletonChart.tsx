import React from 'react';
import type { SkeletonChartProps, SkeletonChartSize, SkeletonChartType } from './SkeletonChart.types';
import { SkeletonBlock } from '../_shared/SkeletonBlock';

// в”Ђв”Ђв”Ђ Size config в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
// From Figma: sm=320, md=480, lg=800
// Padding 6px all, gap 12px
// ChartTitle: 123Г—8, MetricValue: 92Г—20, Legend row, ChartArea: W=full H=80
const SIZE: Record<SkeletonChartSize, {
  width: number; chartAreaH: number; metricValueW: number; metricValueH: number;
}> = {
  sm: { width: 320, chartAreaH: 80,  metricValueW: 92,  metricValueH: 20 },
  md: { width: 480, chartAreaH: 120, metricValueW: 130, metricValueH: 28 },
  lg: { width: 800, chartAreaH: 180, metricValueW: 200, metricValueH: 36 },
};

// Bar heights for the 5 bars (from Figma: 48, 68, 36, 76, 56)
const BAR_HEIGHTS = [48, 68, 36, 76, 56];

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

// в”Ђв”Ђв”Ђ Chart area renderers в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ

const BarChartArea: React.FC<{ shimmer: boolean; width: number; height: number }> = ({ shimmer, width, height }) => {
  const barW = Math.floor((width - 20) / 5 - 4);
  return (
    <div style={{ width, height, display: 'flex', flexDirection: 'row', alignItems: 'flex-end', gap: 4, position: 'relative' }}>
      {BAR_HEIGHTS.map((bh, i) => {
        const scaledH = Math.round(bh * height / 80);
        return (
          <SkeletonBlock key={i} shimmer={shimmer} width={barW} height={scaledH} radius={1} />
        );
      })}
      {/* Baseline */}
      <div
        style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, backgroundColor: 'var(--color-surface-3)' }}
        aria-hidden="true"
      />
    </div>
  );
};

const LineChartArea: React.FC<{ shimmer: boolean; width: number; height: number }> = ({ shimmer, width, height }) => {
  const areaH = Math.round(height * 0.6);
  return (
    <div style={{ width, height, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 0 }}>
      {/* Area fill */}
      <SkeletonBlock shimmer={shimmer} width={width} height={areaH} radius={0} />
      {/* Line */}
      <SkeletonBlock shimmer={shimmer} width={width} height={2} radius={1} />
    </div>
  );
};

const DonutChartArea: React.FC<{ shimmer: boolean; width: number; height: number }> = ({ shimmer, width, height }) => {
  const donutOuter = Math.min(height, 80);
  const donutInner = Math.round(donutOuter * 0.55);
  return (
    <div style={{ width, height, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
      {/* Outer donut circle */}
      <div style={{ position: 'relative', width: donutOuter, height: donutOuter, flexShrink: 0 }}>
        <SkeletonBlock shimmer={shimmer} width={donutOuter} height={donutOuter} radius={9999} />
        {/* Inner hole вЂ” surface-1 */}
        <div
          style={{
            position: 'absolute',
            top: '50%', left: '50%',
            transform: 'translate(-50%, -50%)',
            width: donutInner, height: donutInner,
            borderRadius: '50%',
            backgroundColor: 'var(--color-surface-1)',
          }}
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

// в”Ђв”Ђв”Ђ Legend row в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
const LegendRow: React.FC<{ shimmer: boolean }> = ({ shimmer }) => (
  <div style={{ display: 'flex', flexDirection: 'row', gap: 6, alignItems: 'center' }}>
    {[37, 37, 37].map((lw, i) => (
      <React.Fragment key={i}>
        <SkeletonBlock shimmer={shimmer} width={8} height={8} radius={9999} />
        <SkeletonBlock shimmer={shimmer} width={lw} height={6} radius={2} />
      </React.Fragment>
    ))}
  </div>
);

// в”Ђв”Ђв”Ђ Component в”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђв”Ђ
const SkeletonChartInner = React.forwardRef<HTMLDivElement, SkeletonChartProps>(({ 
  size = 'sm',
  shimmer = true,
  chartType = 'bar',
  className,
  style,
}, ref) => {
  const s = SIZE[size];
  const inner = s.width - 12;

  return (
    <div
      ref={ref}
      className={cn('rounded-[4px] bg-[var(--color-surface-2)]', className)}
      style={{ width: s.width, padding: 6, display: 'flex', flexDirection: 'column', gap: 12, ...style }}
      role="status"
      aria-label="LoadingвЂ¦"
      aria-busy="true"
    >
      {/* Chart title line */}
      <SkeletonBlock shimmer={shimmer} width={123} height={8} radius={2} />

      {/* Metric value */}
      <SkeletonBlock shimmer={shimmer} width={s.metricValueW} height={s.metricValueH} radius={2} />

      {/* Legend */}
      <LegendRow shimmer={shimmer} />

      {/* Chart area */}
      {chartType === 'bar' && <BarChartArea shimmer={shimmer} width={inner} height={s.chartAreaH} />}
      {chartType === 'line' && <LineChartArea shimmer={shimmer} width={inner} height={s.chartAreaH} />}
      {chartType === 'donut' && <DonutChartArea shimmer={shimmer} width={inner} height={s.chartAreaH} />}
    </div>
  );
});

SkeletonChartInner.displayName = 'SkeletonChart';
export const SkeletonChart = React.memo(SkeletonChartInner);

