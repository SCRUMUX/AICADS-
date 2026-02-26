import React, { useState, useRef, useCallback, useId, useEffect } from 'react';
import ReactDOM from 'react-dom';
import type {
  TooltipProps,
  TooltipBubbleProps,
  TooltipPosition,
  TooltipAppearance,
} from './Tooltip.types';
import { cn } from '../_shared';

type AppearanceStyle = { bubbleBg: string; textColor: string };

const APPEARANCE: Record<TooltipAppearance, AppearanceStyle> = {
  base:    { bubbleBg: 'var(--color-tooltip-bg)',   textColor: 'var(--color-tooltip-text)' },
  success: { bubbleBg: 'var(--color-success-base)', textColor: 'var(--color-text-on-brand)' },
  warning: { bubbleBg: 'var(--color-warning-base)', textColor: 'var(--color-text-primary)' },
  danger:  { bubbleBg: 'var(--color-danger-base)',  textColor: 'var(--color-text-on-brand)' },
};

// ─── Arrow SVG ─────────────────────────────────────────────────────────────────
// Figma: REGULAR_POLYGON (equilateral triangle)
// top/bottom: 12×6 px; left/right: 6×12 px
// The arrow points AWAY from the bubble — i.e.:
//   position=top    → arrow is below bubble, points DOWN  (tip at bottom)
//   position=bottom → arrow is above bubble, points UP    (tip at top)
//   position=left   → arrow is right of bubble, points RIGHT
//   position=right  → arrow is left of bubble, points LEFT

interface ArrowProps {
  position: TooltipPosition;
  color: string;
}

const Arrow: React.FC<ArrowProps> = ({ position, color }) => {
  if (position === 'top') {
    // Triangle pointing down: 12 wide, 6 tall
    return (
      <svg width={12} height={6} viewBox="0 0 12 6" style={{ display: 'block', flexShrink: 0 }} aria-hidden="true">
        <polygon points="0,0 12,0 6,6" fill={color} />
      </svg>
    );
  }
  if (position === 'bottom') {
    // Triangle pointing up: 12 wide, 6 tall
    return (
      <svg width={12} height={6} viewBox="0 0 12 6" style={{ display: 'block', flexShrink: 0 }} aria-hidden="true">
        <polygon points="0,6 12,6 6,0" fill={color} />
      </svg>
    );
  }
  if (position === 'left') {
    // Triangle pointing right: 6 wide, 12 tall
    return (
      <svg width={6} height={12} viewBox="0 0 6 12" style={{ display: 'block', flexShrink: 0 }} aria-hidden="true">
        <polygon points="0,0 0,12 6,6" fill={color} />
      </svg>
    );
  }
  // right — triangle pointing left: 6 wide, 12 tall
  return (
    <svg width={6} height={12} viewBox="0 0 6 12" style={{ display: 'block', flexShrink: 0 }} aria-hidden="true">
      <polygon points="6,0 6,12 0,6" fill={color} />
    </svg>
  );
};

// ─── TooltipBubble ─────────────────────────────────────────────────────────────
// The standalone bubble — matches Figma exactly.
// Figma layout:
//   top:    VERTICAL → [Bubble] [Arrow↓]      (arrow below)
//   bottom: VERTICAL → [Arrow↑] [Bubble]      (arrow above)
//   left:   HORIZONTAL → [Bubble] [Arrow→]    (arrow right)
//   right:  HORIZONTAL → [Arrow←] [Bubble]    (arrow left)
//
// Bubble: padding L8 T6 R8 B6, radius 4px, text 12px/400/lh16 centered
// Arrow: aligned to center of bubble edge

export const TooltipBubble: React.FC<TooltipBubbleProps> = ({
  content,
  position = 'top',
  appearance = 'base',
  className,
  style,
}) => {
  const { bubbleBg, textColor } = APPEARANCE[appearance];
  const isVertical = position === 'top' || position === 'bottom';

  const bubble = (
    <div
      className="inline-flex items-center justify-center px-[var(--space-8)] py-[var(--space-6)] rounded-[var(--radius-medium)] text-style-caption whitespace-nowrap"
      style={{
        backgroundColor: bubbleBg,
        color: textColor,
      }}
    >
      {content}
    </div>
  );

  const arrow = <Arrow position={position} color={bubbleBg} />;

  return (
    <div
      className={cn('inline-flex animate-tooltip-in', isVertical ? 'flex-col items-center' : 'flex-row items-center', className)}
      style={style}
    >
      {(position === 'top' || position === 'left') ? (
        <>{bubble}{arrow}</>
      ) : (
        <>{arrow}{bubble}</>
      )}
    </div>
  );
};

// ─── Tooltip wrapper ───────────────────────────────────────────────────────────
// Wraps a trigger element and shows TooltipBubble on hover/focus.
// Renders the bubble in a portal (document.body) so overflow:hidden ancestors
// can never clip it. Position is computed from trigger's getBoundingClientRect.

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  appearance = 'base',
  children,
  delayMs = 0,
  className,
}) => {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipId = useId();
  const [coords, setCoords] = useState<React.CSSProperties>({});

  const GAP = 6;

  const computePosition = useCallback(() => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    switch (position) {
      case 'top':
        setCoords({ top: rect.top + scrollY - GAP, left: rect.left + scrollX + rect.width / 2, transform: 'translate(-50%, -100%)' });
        break;
      case 'bottom':
        setCoords({ top: rect.bottom + scrollY + GAP, left: rect.left + scrollX + rect.width / 2, transform: 'translateX(-50%)' });
        break;
      case 'left':
        setCoords({ top: rect.top + scrollY + rect.height / 2, left: rect.left + scrollX - GAP, transform: 'translate(-100%, -50%)' });
        break;
      case 'right':
        setCoords({ top: rect.top + scrollY + rect.height / 2, left: rect.right + scrollX + GAP, transform: 'translateY(-50%)' });
        break;
    }
  }, [position]);

  const show = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      computePosition();
      setVisible(true);
    }, delayMs);
  }, [delayMs, computePosition]);

  const hide = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  }, []);

  useEffect(() => {
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, []);

  const bubble = visible
    ? ReactDOM.createPortal(
        <div
          id={tooltipId}
          role="tooltip"
          style={{
            position: 'absolute',
            zIndex: 'var(--z-tooltip)',
            pointerEvents: 'none',
            ...coords,
          } as React.CSSProperties}
        >
          <TooltipBubble content={content} position={position} appearance={appearance} />
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      <div
        ref={triggerRef}
        className={cn('inline-flex items-center justify-center', className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
      >
        {React.isValidElement(children)
          ? React.cloneElement(children as React.ReactElement<{ 'aria-describedby'?: string }>, {
              'aria-describedby': visible ? tooltipId : undefined,
            })
          : children}
      </div>
      {bubble}
    </>
  );
};

Tooltip.displayName = 'Tooltip';
TooltipBubble.displayName = 'TooltipBubble';
