import React from 'react';
import type { EmptyStateProps, EmptyStateSize, EmptyStateAppearance, EmptyStateLayout } from './EmptyState.types';

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

// ─── Size config (from Figma) ─────────────────────────────────────────────────
// sm: padding 9px, outer gap 12px, icon-frame 40px, icon 32px, title 14/600/20, desc 12/400/16
// md: padding 12px, outer gap 16px, icon-frame 64px, icon 48px, title 16/600/24, desc 14/400/20
// lg: padding 16px, outer gap 24px, icon-frame 80px, icon 64px, title 18/600/24, desc 16/400/24
type SizeSpec = {
  padding: string;
  outerGap: string;
  innerTextGap: string;
  iconFrameSize: number;
  iconSize: number;
  titleFont: string;
  descFont: string;
  actionsGap: string;
};

const SIZE_CONFIG: Record<EmptyStateSize, SizeSpec> = {
  sm: {
    padding:      'p-[9px]',
    outerGap:     'gap-3',           // 12px
    innerTextGap: 'gap-1',           // ~4px between title and desc
    iconFrameSize: 40,
    iconSize:     32,
    titleFont:    'text-[14px] font-semibold leading-5',
    descFont:     'text-[12px] font-normal leading-4',
    actionsGap:   'gap-2',
  },
  md: {
    padding:      'p-3',             // 12px
    outerGap:     'gap-4',           // 16px
    innerTextGap: 'gap-[6px]',
    iconFrameSize: 64,
    iconSize:     48,
    titleFont:    'text-[16px] font-semibold leading-6',
    descFont:     'text-[14px] font-normal leading-5',
    actionsGap:   'gap-2',
  },
  lg: {
    padding:      'p-4',             // 16px
    outerGap:     'gap-6',           // 24px
    innerTextGap: 'gap-2',
    iconFrameSize: 80,
    iconSize:     64,
    titleFont:    'text-[18px] font-semibold leading-6',
    descFont:     'text-[16px] font-normal leading-6',
    actionsGap:   'gap-3',
  },
};

// ─── Appearance backgrounds ───────────────────────────────────────────────────
// base: surface-2, info: info-surface, success: success-surface, warning: warning-surface, danger: danger-surface
const APPEARANCE_BG: Record<EmptyStateAppearance, string> = {
  base:    'bg-[var(--color-surface-2)]',
  info:    'bg-[var(--color-info-surface)]',
  success: 'bg-[var(--color-success-surface)]',
  warning: 'bg-[var(--color-warning-surface)]',
  danger:  'bg-[var(--color-danger-surface)]',
};

// Icon color per appearance
const APPEARANCE_ICON_COLOR: Record<EmptyStateAppearance, string> = {
  base:    'text-[var(--color-icon-on-base)]',
  info:    'text-[var(--color-info-base)]',
  success: 'text-[var(--color-success-base)]',
  warning: 'text-[var(--color-warning-base)]',
  danger:  'text-[var(--color-danger-base)]',
};

// ─── Icon wrapper ─────────────────────────────────────────────────────────────
interface IconFrameProps {
  node: React.ReactNode;
  frameSize: number;
  iconSize: number;
  colorClass: string;
}

const IconFrame: React.FC<IconFrameProps> = ({ node, frameSize, iconSize, colorClass }) => (
  <span
    className={cn('shrink-0 flex items-center justify-center', colorClass)}
    style={{ width: frameSize, height: frameSize }}
    aria-hidden="true"
  >
    <span
      className="flex items-center justify-center"
      style={{ width: iconSize, height: iconSize }}
    >
      {React.isValidElement(node)
        ? React.cloneElement(node as React.ReactElement<{ style?: React.CSSProperties }>, {
            style: {
              width: '100%',
              height: '100%',
              display: 'block',
              ...(node as React.ReactElement<{ style?: React.CSSProperties }>).props?.style,
            },
          })
        : node}
    </span>
  </span>
);

// ─── Component ────────────────────────────────────────────────────────────────
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>((props, ref) => {
  const {
    size = 'sm',
    appearance = 'base',
    layout = 'vertical',
    icon,
    title = 'No items yet',
    description = 'Add your first item to get started.',
    ctaButton,
    secondaryButton,
    showIcon = true,
    showCta = true,
    showSecondary = true,
    className,
    style,
    ...rest
  } = props;

  const { padding, outerGap, innerTextGap, iconFrameSize, iconSize, titleFont, descFont, actionsGap } = SIZE_CONFIG[size];
  const bgClass      = APPEARANCE_BG[appearance];
  const iconColor    = APPEARANCE_ICON_COLOR[appearance];
  const isVertical   = layout === 'vertical';

  const textAlign = isVertical ? 'text-center' : 'text-left';

  const hasActions = (showCta && ctaButton) || (showSecondary && secondaryButton);

  // Actions row — always horizontal
  const actionsRow = hasActions ? (
    <div className={cn('flex flex-row items-center flex-wrap', actionsGap)}>
      {showCta     && ctaButton      && <span className="shrink-0">{ctaButton}</span>}
      {showSecondary && secondaryButton && <span className="shrink-0">{secondaryButton}</span>}
    </div>
  ) : null;

  return (
    <div
      ref={ref}
      className={cn(
        'inline-flex rounded-[4px]',
        padding,
        bgClass,
        isVertical
          ? cn('flex-col items-center', outerGap)
          : cn('flex-row items-center', outerGap),
        className,
      )}
      style={style}
      {...rest}
    >
      {/* ── Icon ── */}
      {showIcon && icon && (
        <IconFrame
          node={icon}
          frameSize={iconFrameSize}
          iconSize={iconSize}
          colorClass={iconColor}
        />
      )}

      {isVertical ? (
        // ── Vertical: text block + actions underneath ──
        <>
          <div className={cn('flex flex-col items-center', innerTextGap)}>
            <span className={cn(titleFont, 'text-[var(--color-text-primary)]', textAlign)}>
              {title}
            </span>
            <span className={cn(descFont, 'text-[var(--color-text-muted)]', textAlign)}>
              {description}
            </span>
          </div>
          {actionsRow}
        </>
      ) : (
        // ── Horizontal: content column (text + actions) to the right of icon ──
        <div className={cn('flex flex-col', innerTextGap)}>
          <div className={cn('flex flex-col', innerTextGap)}>
            <span className={cn(titleFont, 'text-[var(--color-text-primary)]', textAlign)}>
              {title}
            </span>
            <span className={cn(descFont, 'text-[var(--color-text-muted)]', textAlign)}>
              {description}
            </span>
          </div>
          {actionsRow}
        </div>
      )}
    </div>
  );
});

EmptyState.displayName = 'EmptyState';
