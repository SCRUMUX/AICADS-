import React, { useState, useCallback } from 'react';
import type { RatingProps, RatingSize } from './Rating.types';
import { cn } from '../_shared/utils';

const SIZE_MAP: Record<RatingSize, number> = { sm: 16, md: 20, lg: 28 };

const Star: React.FC<{
  filled: boolean; half: boolean; size: number;
  filledColor: string; emptyColor: string;
  onClick?: () => void; onMouseEnter?: () => void;
  interactive: boolean;
}> = ({ filled, half, size, filledColor, emptyColor, onClick, onMouseEnter, interactive }) => (
  <svg
    width={size} height={size} viewBox="0 0 24 24"
    className={cn(interactive && 'cursor-pointer transition-transform hover:scale-110')}
    onClick={onClick} onMouseEnter={onMouseEnter}
    fill="none"
  >
    <defs>
      <linearGradient id={`half-${size}`}>
        <stop offset="50%" stopColor={filledColor} />
        <stop offset="50%" stopColor={emptyColor} />
      </linearGradient>
    </defs>
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"
      fill={half ? `url(#half-${size})` : filled ? filledColor : emptyColor}
    />
  </svg>
);

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>((props, ref) => {
  const {
    size = 'md',
    value: controlled,
    defaultValue = 0,
    max = 5,
    onChange,
    readonly = false,
    className,
    ...rest
  } = props;

  const [internal, setInternal] = useState(defaultValue);
  const [hovered, setHovered] = useState<number | null>(null);
  const value = controlled ?? internal;
  const starSize = SIZE_MAP[size];
  const interactive = !readonly;

  const filledColor = 'var(--color-warning-base, #FFB020)';
  const emptyColor = 'var(--color-surface-3, #E5E7EB)';

  const handleClick = useCallback((idx: number) => {
    if (!interactive) return;
    const next = idx + 1;
    if (controlled === undefined) setInternal(next);
    onChange?.(next);
  }, [interactive, controlled, onChange]);

  const display = hovered !== null ? hovered + 1 : value;

  return (
    <div
      ref={ref}
      className={cn('inline-flex items-center gap-[var(--space-2,4px)]', className)}
      onMouseLeave={() => interactive && setHovered(null)}
      role="radiogroup"
      aria-label="Rating"
      {...rest}
    >
      {Array.from({ length: max }, (_, i) => (
        <Star
          key={i}
          filled={i < Math.floor(display)}
          half={i === Math.floor(display) && display % 1 >= 0.5}
          size={starSize}
          filledColor={filledColor}
          emptyColor={emptyColor}
          interactive={interactive}
          onClick={() => handleClick(i)}
          onMouseEnter={() => interactive && setHovered(i)}
        />
      ))}
    </div>
  );
});

Rating.displayName = 'Rating';
