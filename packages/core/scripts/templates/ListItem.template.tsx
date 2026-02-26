import React, { useState, useCallback } from 'react';
import type { ListItemProps, ListItemSize, ListItemState, ListItemVariant } from './ListItem.types';
import { cn } from '../_shared';
import { IconSlot } from '../_shared/IconSlot';

// ─── Typography per size ──────────────────────────────────────────────────────
// Figma: sm → 12px/400/lh16, md → 14px/400/lh20, lg → 16px/400/lh24
// Subtitle: sm → 10px/400/lh12, md → 12px/400/lh16, lg → 14px/400/lh20
const LABEL_FONT: Record<ListItemSize, string> = {
  sm: 'text-style-caption font-normal',
  md: 'text-style-body font-normal',
  lg: 'text-style-body-lg font-normal',
};

const SUBTITLE_FONT: Record<ListItemSize, string> = {
  sm: 'text-style-body-xs font-normal',
  md: 'text-style-caption font-normal',
  lg: 'text-style-body font-normal',
};

// Leading element sizes (px): icon 20, avatar 24, checkbox 14
const LEADING_ICON_SIZE: Record<ListItemSize, number> = { sm: 20, md: 20, lg: 20 };
const LEADING_AVATAR_SIZE: Record<ListItemSize, number> = { sm: 24, md: 24, lg: 24 };
const TRAILING_ICON_SIZE = 20; // chevron

// ─── Background per interaction ───────────────────────────────────────────────
// base: surface-1 (white), hover: surface-2, selected: brand-muted, disabled: surface-2 + opacity-50
function getBg(state: ListItemState): string {
  switch (state) {
    case 'hover':    return 'bg-[var(--color-surface-2)]';
    case 'selected': return 'bg-[var(--color-brand-muted)]';
    case 'disabled': return 'bg-[var(--color-surface-2)]';
    default:         return 'bg-[var(--color-surface-1)]';
  }
}

// Trailing meta color: muted in base/hover/disabled, brand-primary in selected
function getMetaColor(state: ListItemState): string {
  return state === 'selected'
    ? 'text-[var(--color-brand-primary)]'
    : 'text-[var(--color-text-muted)]';
}

const SIZE_SPACING: Record<ListItemSize, string> = {
  sm: 'px-[var(--space-list-item-x-sm)] py-[var(--space-list-item-y-sm)] gap-[var(--space-list-item-gap-sm)] min-h-[var(--space-list-item-h-sm)]',
  md: 'px-[var(--space-list-item-x-md)] py-[var(--space-list-item-y-md)] gap-[var(--space-list-item-gap-md)] min-h-[var(--space-list-item-h-md)]',
  lg: 'px-[var(--space-list-item-x-lg)] py-[var(--space-list-item-y-lg)] gap-[var(--space-list-item-gap-lg)] min-h-[var(--space-list-item-h-lg)]',
};

// ─── Icon wrapper ─────────────────────────────────────────────────────────────
interface IconWrapProps {
  node: React.ReactNode;
  size: number;
  className?: string;
}
const IconWrap: React.FC<IconWrapProps> = ({ node, size, className }) => (
  <IconSlot icon={node} size={`${size}px`} className={className} />
);

// ─── Component ────────────────────────────────────────────────────────────────
export const ListItem = React.forwardRef<HTMLDivElement, ListItemProps>((props, ref) => {
  const {
    size = 'md',
    variant = 'iconNav',
    state: stateProp,
    interaction: interactionProp,
    label = 'List item label',
    subtitle = 'Secondary description text',
    trailingMeta = '12:00',
    leadingIcon,
    leadingAvatar,
    leadingCheckbox,
    trailingChevron,
    trailingBadge,
    trailingAction,
    showSubtitle = false,
    showDivider = true,
    value,
    onSelect,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    onKeyDown,
    ...rest
  } = props;

  const controlledState = stateProp ?? interactionProp;

  const [hovered, setHovered] = useState(false);

  const isDisabled = controlledState === 'disabled';

  const effectiveState: ListItemState = (() => {
    if (controlledState) return controlledState;
    if (hovered) return 'hover';
    return 'base';
  })();

  const he = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDisabled) setHovered(true);
    onMouseEnter?.(e);
  }, [isDisabled, onMouseEnter]);

  const hl = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setHovered(false);
    onMouseLeave?.(e);
  }, [onMouseLeave]);

  const handleClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isDisabled) return;
    if (value !== undefined) onSelect?.(value);
    onClick?.(e);
  }, [isDisabled, value, onSelect, onClick]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLDivElement>) => {
    if ((e.key === 'Enter' || e.key === ' ') && !isDisabled) {
      e.preventDefault();
      if (value !== undefined) onSelect?.(value);
    }
    onKeyDown?.(e);
  }, [isDisabled, value, onSelect, onKeyDown]);

  const iconSize = LEADING_ICON_SIZE[size];
  const avatarSize = LEADING_AVATAR_SIZE[size];

  // Determine which leading/trailing elements are active per variant
  const showLeadingIcon   = variant === 'iconNav' || variant === 'iconMeta';
  const showLeadingAvatar = variant === 'avatarContact';
  const showLeadingCb     = variant === 'checkboxSelect';
  const showChevron       = variant === 'iconNav';
  const showBadge         = variant === 'iconMeta';
  const showMeta          = variant === 'avatarContact';
  const showAction        = variant === 'checkboxSelect';

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-row items-center w-full',
        SIZE_SPACING[size],
        'transition-colors duration-150',
        getBg(effectiveState),
        showDivider && 'border-b border-[var(--color-border-base)]',
        isDisabled && 'opacity-50 pointer-events-none',
        !isDisabled && 'cursor-pointer',
        className,
      )}
      tabIndex={isDisabled ? -1 : 0}
      role={onSelect || onClick ? 'option' : undefined}
      aria-disabled={isDisabled || undefined}
      aria-selected={effectiveState === 'selected' || undefined}
      onMouseEnter={he}
      onMouseLeave={hl}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {/* ── Leading ── */}
      {showLeadingIcon && leadingIcon && (
        <IconWrap
          node={leadingIcon}
          size={iconSize}
          className="text-[var(--color-icon-on-base)]"
        />
      )}
      {showLeadingAvatar && leadingAvatar && (
        <span
          className="shrink-0 flex items-center justify-center"
          style={{ width: avatarSize, height: avatarSize }}
        >
          {leadingAvatar}
        </span>
      )}
      {showLeadingCb && leadingCheckbox && (
        <span className="shrink-0 flex items-center justify-center">
          {leadingCheckbox}
        </span>
      )}

      {/* ── Text block ── */}
      <div className="flex flex-col flex-1 min-w-0 gap-[2px]">
        <span className={cn(LABEL_FONT[size], 'text-[var(--color-text-primary)] truncate')}>
          {label}
        </span>
        {showSubtitle && (
          <span className={cn(SUBTITLE_FONT[size], 'text-[var(--color-text-muted)] truncate')}>
            {subtitle}
          </span>
        )}
      </div>

      {/* ── Trailing ── */}
      {showBadge && trailingBadge && (
        <span className="shrink-0 flex items-center">
          {trailingBadge}
        </span>
      )}

      {showMeta && (
        <span className={cn(
          LABEL_FONT[size],
          'shrink-0 tabular-nums',
          getMetaColor(effectiveState),
        )}>
          {trailingMeta}
        </span>
      )}

      {showChevron && trailingChevron && (
        <IconWrap
          node={trailingChevron}
          size={TRAILING_ICON_SIZE}
          className="text-[var(--color-icon-on-base)]"
        />
      )}

      {showAction && trailingAction && (
        <span className="shrink-0 flex items-center">
          {trailingAction}
        </span>
      )}
    </div>
  );
});

ListItem.displayName = 'ListItem';
