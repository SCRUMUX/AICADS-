import React, { useRef, useCallback, useState, useEffect } from 'react';
import type { ScrollBarProps, ScrollBarSize, ScrollBarShape, ScrollBarOrientation } from './ScrollBar.types';
import { cn } from '../_shared';

interface SizeConfig {
  trackThickness: number;
  thumbSize: number;
  arrowContainer: number;
}

const SIZE_CONFIG: Record<ScrollBarSize, SizeConfig> = {
  sm: { trackThickness: 4,  thumbSize: 12, arrowContainer: 14 },
  md: { trackThickness: 6,  thumbSize: 16, arrowContainer: 14 },
  lg: { trackThickness: 8,  thumbSize: 20, arrowContainer: 14 },
};

const ARROW_STEP = 5;

interface ArrowIconProps {
  direction: 'left' | 'right' | 'up' | 'down';
  size: number;
}

const ArrowIcon: React.FC<ArrowIconProps> = ({ direction, size }) => {
  const rotate = { left: 0, right: 180, up: 90, down: 270 }[direction];
  return (
    <svg
      width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true"
      style={{ transform: `rotate(${rotate}deg)`, flexShrink: 0 }}
    >
      <path d="M9 3L5 7L9 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

const ScrollBarInner = React.forwardRef<HTMLDivElement, ScrollBarProps>(({
  orientation = 'horizontal',
  size = 'sm',
  shape = 'circle',
  value: controlledValue,
  defaultValue = 33,
  onChange,
  step = ARROW_STEP,
  trackLength = 120,
  showArrows = true,
  disabled = false,
  className,
  style,
}, ref) => {
  const { trackThickness, thumbSize, arrowContainer } = SIZE_CONFIG[size];
  const isHorizontal = orientation === 'horizontal';

  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const pos = clamp(isControlled ? controlledValue : internalValue, 0, 100);

  const updateValue = useCallback((next: number) => {
    const clamped = clamp(next, 0, 100);
    if (!isControlled) setInternalValue(clamped);
    onChange?.(clamped);
  }, [isControlled, onChange]);

  const trackRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);

  const posToValue = useCallback((clientPos: number) => {
    const el = trackRef.current;
    if (!el) return pos;
    const rect = el.getBoundingClientRect();
    const trackPx = isHorizontal ? rect.width : rect.height;
    const offset = isHorizontal ? clientPos - rect.left : clientPos - rect.top;
    return clamp((offset / trackPx) * 100, 0, 100);
  }, [isHorizontal, pos]);

  const handleTrackClick = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    const clientPos = isHorizontal ? e.clientX : e.clientY;
    updateValue(posToValue(clientPos));
  }, [disabled, isHorizontal, posToValue, updateValue]);

  const handleThumbMouseDown = useCallback((e: React.MouseEvent) => {
    if (disabled) return;
    e.stopPropagation();
    e.preventDefault();
    draggingRef.current = true;

    const onMove = (ev: MouseEvent) => {
      if (!draggingRef.current) return;
      const clientPos = isHorizontal ? ev.clientX : ev.clientY;
      updateValue(posToValue(clientPos));
    };
    const onUp = () => {
      draggingRef.current = false;
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseup', onUp);
    };
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onUp);
  }, [disabled, isHorizontal, posToValue, updateValue]);

  const handleArrowClick = useCallback((direction: -1 | 1) => {
    if (disabled) return;
    updateValue(pos + direction * step);
  }, [disabled, pos, step, updateValue]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (disabled) return;
    const decrease = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const increase = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    if (e.key === decrease) { e.preventDefault(); updateValue(pos - step); }
    else if (e.key === increase) { e.preventDefault(); updateValue(pos + step); }
    else if (e.key === 'Home') { e.preventDefault(); updateValue(0); }
    else if (e.key === 'End')  { e.preventDefault(); updateValue(100); }
    else if (e.key === 'PageUp')   { e.preventDefault(); updateValue(pos - step * 5); }
    else if (e.key === 'PageDown') { e.preventDefault(); updateValue(pos + step * 5); }
  }, [disabled, isHorizontal, pos, step, updateValue]);

  const trackW = isHorizontal ? trackLength : thumbSize;
  const trackH = isHorizontal ? thumbSize : trackLength;

  const trackBgStyle: React.CSSProperties = isHorizontal
    ? { position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)', height: trackThickness, borderRadius: trackThickness / 2, backgroundColor: 'var(--color-surface-3)' }
    : { position: 'absolute', top: 0, bottom: 0, left: '50%', transform: 'translateX(-50%)', width: trackThickness, borderRadius: trackThickness / 2, backgroundColor: 'var(--color-surface-3)' };

  const travel = Math.max(0, trackLength - thumbSize);
  const thumbOffset = (pos / 100) * travel;

  const rectThumbLen = Math.round(trackLength * 0.38);
  const thumbStyle: React.CSSProperties = shape === 'circle'
    ? {
        position: 'absolute', width: thumbSize, height: thumbSize, borderRadius: '50%',
        backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-border-strong)',
        boxSizing: 'border-box', cursor: disabled ? 'default' : 'grab', flexShrink: 0,
        ...(isHorizontal
          ? { left: thumbOffset, top: '50%', transform: 'translateY(-50%)' }
          : { top: thumbOffset, left: '50%', transform: 'translateX(-50%)' }),
      }
    : {
        position: 'absolute', borderRadius: 6,
        backgroundColor: 'var(--color-surface-1)', border: '1px solid var(--color-border-strong)',
        boxSizing: 'border-box', cursor: disabled ? 'default' : 'grab', flexShrink: 0,
        ...(isHorizontal
          ? { width: rectThumbLen, height: thumbSize, left: thumbOffset, top: '50%', transform: 'translateY(-50%)' }
          : { height: rectThumbLen, width: thumbSize, top: thumbOffset, left: '50%', transform: 'translateX(-50%)' }),
      };

  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    flexDirection: isHorizontal ? 'row' : 'column',
    alignItems: 'center',
    gap: 4,
    ...style,
  };

  return (
    <div
      ref={ref}
      className={cn('select-none outline-none focus-visible:shadow-[var(--effect-focus-brand)] rounded', disabled && 'opacity-[var(--opacity-disabled)]', className)}
      style={containerStyle}
      role="scrollbar"
      tabIndex={disabled ? -1 : 0}
      aria-orientation={orientation}
      aria-valuenow={Math.round(pos)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-disabled={disabled || undefined}
      onKeyDown={handleKeyDown}
    >
      {showArrows && (
        <button
          type="button"
          tabIndex={-1}
          aria-label={isHorizontal ? 'Scroll left' : 'Scroll up'}
          disabled={disabled}
          onClick={() => handleArrowClick(-1)}
          className="shrink-0 flex items-center justify-center bg-transparent border-0 p-0 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer disabled:cursor-default disabled:opacity-50"
          style={{ width: arrowContainer, height: arrowContainer }}
        >
          <ArrowIcon direction={isHorizontal ? 'left' : 'up'} size={arrowContainer} />
        </button>
      )}

      <div
        ref={trackRef}
        style={{ position: 'relative', width: trackW, height: trackH, flexShrink: 0, cursor: disabled ? 'default' : 'pointer' }}
        onClick={handleTrackClick}
      >
        <div style={trackBgStyle} aria-hidden="true" />
        <div style={thumbStyle} onMouseDown={handleThumbMouseDown} />
      </div>

      {showArrows && (
        <button
          type="button"
          tabIndex={-1}
          aria-label={isHorizontal ? 'Scroll right' : 'Scroll down'}
          disabled={disabled}
          onClick={() => handleArrowClick(1)}
          className="shrink-0 flex items-center justify-center bg-transparent border-0 p-0 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer disabled:cursor-default disabled:opacity-50"
          style={{ width: arrowContainer, height: arrowContainer }}
        >
          <ArrowIcon direction={isHorizontal ? 'right' : 'down'} size={arrowContainer} />
        </button>
      )}
    </div>
  );
});

ScrollBarInner.displayName = 'ScrollBar';
export const ScrollBar = React.memo(ScrollBarInner);
