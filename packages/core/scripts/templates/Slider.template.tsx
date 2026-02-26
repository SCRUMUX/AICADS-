import React, { useState, useCallback, useId } from 'react';
import type { SliderProps, SliderSize } from './Slider.types';
import { cn } from '../_shared/utils';

const SIZE_CONFIG: Record<SliderSize, {
  trackH: number;
  trackRadius: number;
  thumbSize: number;
}> = {
  sm: { trackH: 4,  trackRadius: 2, thumbSize: 16 },
  md: { trackH: 6,  trackRadius: 3, thumbSize: 20 },
  lg: { trackH: 8,  trackRadius: 4, thumbSize: 24 },
};

const thumbResetStyle = `
  appearance: none;
  -webkit-appearance: none;
  pointer-events: auto;
  cursor: pointer;
`;

const rangeInputStyle = (thumbSize: number): React.CSSProperties => ({
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: thumbSize,
  marginTop: -(thumbSize / 2),
  top: '50%',
  opacity: 0,
  pointerEvents: 'none',
  cursor: 'pointer',
});

export const Slider = React.forwardRef<HTMLDivElement, SliderProps>((props, ref) => {
  const {
    size = 'md',
    thumbs = '1',
    min = 0,
    max = 100,
    step = 1,
    value: controlledValue,
    rangeValue: controlledRange,
    onChange,
    onRangeChange,
    disabled = false,
    className,
    ...rest
  } = props;

  const instanceId = useId();
  const scopedClass = `slider-${instanceId.replace(/:/g, '')}`;

  const isRange = thumbs === '2';
  const [internalValue, setInternalValue] = useState(50);
  const [internalRange, setInternalRange] = useState<[number, number]>([25, 75]);

  const value = controlledValue ?? internalValue;
  const rangeVal = controlledRange ?? internalRange;

  const { trackH, trackRadius, thumbSize } = SIZE_CONFIG[size];
  const halfThumb = thumbSize / 2;

  const pct = (v: number) => ((v - min) / (max - min)) * 100;

  const handleSingleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    if (controlledValue === undefined) setInternalValue(v);
    onChange?.(v);
  }, [controlledValue, onChange]);

  const handleRangeFrom = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    const next: [number, number] = [Math.min(v, rangeVal[1] - step), rangeVal[1]];
    if (controlledRange === undefined) setInternalRange(next);
    onRangeChange?.(next);
  }, [rangeVal, step, controlledRange, onRangeChange]);

  const handleRangeTo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const v = Number(e.target.value);
    const next: [number, number] = [rangeVal[0], Math.max(v, rangeVal[0] + step)];
    if (controlledRange === undefined) setInternalRange(next);
    onRangeChange?.(next);
  }, [rangeVal, step, controlledRange, onRangeChange]);

  const fillLeft  = isRange ? pct(rangeVal[0]) : 0;
  const fillWidth = isRange ? pct(rangeVal[1]) - pct(rangeVal[0]) : pct(value);

  const thumbStyle = (pctVal: number): React.CSSProperties => ({
    left: `calc(${pctVal}% - ${halfThumb}px)`,
    width:  thumbSize,
    height: thumbSize,
    top: '50%',
    transform: 'translateY(-50%)',
  });

  const fromCloserToMax = isRange && pct(rangeVal[0]) > 50;

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex items-center w-full',
        disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed',
        className,
      )}
      style={{ height: thumbSize }}
      {...rest}
    >
      <style>{`
        .${scopedClass}::-webkit-slider-thumb { ${thumbResetStyle} width: ${thumbSize}px; height: ${thumbSize}px; }
        .${scopedClass}::-moz-range-thumb { ${thumbResetStyle} width: ${thumbSize}px; height: ${thumbSize}px; border: none; background: transparent; }
      `}</style>

      {/* Track */}
      <div
        className="absolute left-0 right-0 bg-[var(--color-surface-3)]"
        style={{
          height: trackH,
          borderRadius: trackRadius,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />

      {/* Fill */}
      <div
        className="absolute bg-[var(--color-brand-primary)]"
        style={{
          height: trackH,
          borderRadius: trackRadius,
          left: `${fillLeft}%`,
          width: `${fillWidth}%`,
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      />

      {/* Visual thumb(s) */}
      {isRange ? (
        <>
          <span
            className="absolute rounded-full bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] shadow-sm pointer-events-none"
            style={thumbStyle(pct(rangeVal[0]))}
          />
          <span
            className="absolute rounded-full bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] shadow-sm pointer-events-none"
            style={thumbStyle(pct(rangeVal[1]))}
          />
        </>
      ) : (
        <span
          className="absolute rounded-full bg-[var(--color-surface-1)] border border-[var(--color-border-strong)] shadow-sm pointer-events-none"
          style={thumbStyle(pct(value))}
        />
      )}

      {/* Native range input(s) — pointer-events only on thumbs via pseudo-element overrides */}
      {isRange ? (
        <>
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={rangeVal[0]}
            disabled={disabled}
            className={cn(scopedClass, disabled && 'cursor-not-allowed')}
            style={{ ...rangeInputStyle(thumbSize), zIndex: fromCloserToMax ? 3 : 2 }}
            onChange={handleRangeFrom}
            aria-label="Minimum"
            aria-valuemin={min}
            aria-valuemax={rangeVal[1]}
            aria-valuenow={rangeVal[0]}
          />
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={rangeVal[1]}
            disabled={disabled}
            className={cn(scopedClass, disabled && 'cursor-not-allowed')}
            style={{ ...rangeInputStyle(thumbSize), zIndex: fromCloserToMax ? 2 : 3 }}
            onChange={handleRangeTo}
            aria-label="Maximum"
            aria-valuemin={rangeVal[0]}
            aria-valuemax={max}
            aria-valuenow={rangeVal[1]}
          />
        </>
      ) : (
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          disabled={disabled}
          className={cn(scopedClass, disabled && 'cursor-not-allowed')}
          style={rangeInputStyle(thumbSize)}
          onChange={handleSingleChange}
          aria-label="Value"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
        />
      )}
    </div>
  );
});

Slider.displayName = 'Slider';
