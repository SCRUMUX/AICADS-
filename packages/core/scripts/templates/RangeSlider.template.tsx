import React, { useState, useCallback, useId } from 'react';
import type { RangeSliderProps, RangeSliderSize } from './RangeSlider.types';
import { cn } from '../_shared/utils';

const SIZE_CONFIG: Record<RangeSliderSize, { thumbPx: number; trackPx: number }> = {
  sm: { thumbPx: 16, trackPx: 4 },
  md: { thumbPx: 24, trackPx: 6 },
  lg: { thumbPx: 32, trackPx: 8 },
};

const thumbResetCSS = `appearance:none;-webkit-appearance:none;pointer-events:auto;cursor:pointer;`;

export const RangeSlider = React.forwardRef<HTMLDivElement, RangeSliderProps>((props, ref) => {
  const {
    size = 'md',
    min = 0,
    max = 100,
    step = 1,
    value: controlled,
    onChange,
    disabled = false,
    className,
    ...rest
  } = props;

  const uid = useId().replace(/:/g, '');
  const cls = `rs-${uid}`;
  const { thumbPx, trackPx } = SIZE_CONFIG[size];
  const half = thumbPx / 2;

  const [internal, setInternal] = useState<[number, number]>([
    min + (max - min) * 0.25,
    min + (max - min) * 0.75,
  ]);
  const val = controlled ?? internal;

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const handleFrom = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    const next: [number, number] = [Math.min(v, val[1] - step), val[1]];
    if (!controlled) setInternal(next);
    onChange?.(next);
  }, [val, step, controlled, onChange]);

  const handleTo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    const next: [number, number] = [val[0], Math.max(v, val[0] + step)];
    if (!controlled) setInternal(next);
    onChange?.(next);
  }, [val, step, controlled, onChange]);

  const fillLeft = pct(val[0]);
  const fillWidth = pct(val[1]) - pct(val[0]);
  const fromCloser = pct(val[0]) > 50;

  const inputStyle: React.CSSProperties = {
    position: 'absolute', inset: 0, width: '100%',
    height: thumbPx, marginTop: -half, top: '50%',
    opacity: 0, pointerEvents: 'none', cursor: 'pointer',
  };

  const thumbStyle = (p: number): React.CSSProperties => ({
    position: 'absolute',
    left: `calc(${p}% - ${half}px)`,
    width: thumbPx,
    height: thumbPx,
    top: '50%',
    transform: 'translateY(-50%)',
    borderRadius: '50%',
    backgroundColor: 'var(--color-bg-base, #fff)',
    border: '2px solid var(--color-brand-primary, #3B82F6)',
    boxShadow: 'var(--effect-elevation-1, 0 1px 3px rgba(0,0,0,.12))',
    pointerEvents: 'none',
  });

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex items-center w-full',
        disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed',
        className,
      )}
      style={{ height: thumbPx + 16, padding: '8px 0' }}
      {...rest}
    >
      <style>{`.${cls}::-webkit-slider-thumb{${thumbResetCSS}width:${thumbPx}px;height:${thumbPx}px}.${cls}::-moz-range-thumb{${thumbResetCSS}width:${thumbPx}px;height:${thumbPx}px;border:none;background:transparent}`}</style>

      {/* Track background */}
      <div
        style={{
          position: 'absolute', left: 0, right: 0,
          height: trackPx,
          borderRadius: trackPx,
          top: '50%', transform: 'translateY(-50%)',
          backgroundColor: 'var(--color-border-base, #E5E7EB)',
        }}
      />

      {/* Active fill */}
      <div
        style={{
          position: 'absolute',
          height: trackPx,
          borderRadius: trackPx,
          left: `${fillLeft}%`,
          width: `${fillWidth}%`,
          top: '50%', transform: 'translateY(-50%)',
          backgroundColor: 'var(--color-brand-primary, #3B82F6)',
        }}
      />

      {/* Thumbs */}
      <span style={thumbStyle(pct(val[0]))} />
      <span style={thumbStyle(pct(val[1]))} />

      {/* Hidden range inputs */}
      <input type="range" min={min} max={max} step={step} value={val[0]} disabled={disabled}
        className={cls} style={{ ...inputStyle, zIndex: fromCloser ? 3 : 2 }}
        onChange={handleFrom} aria-label="Minimum" />
      <input type="range" min={min} max={max} step={step} value={val[1]} disabled={disabled}
        className={cls} style={{ ...inputStyle, zIndex: fromCloser ? 2 : 3 }}
        onChange={handleTo} aria-label="Maximum" />
    </div>
  );
});

RangeSlider.displayName = 'RangeSlider';
