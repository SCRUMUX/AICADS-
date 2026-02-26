import React from 'react';
import type { AvatarProps } from './Avatar.types';
import { Badge } from '../Badge/Badge';
import { PersonCircleIcon } from '../../icons';

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

/**
 * Размеры из Figma API (xs=24, sm=32, md=40, lg=48, xl=56) через CSS-переменные токенов.
 */
const SIZE_TOKENS: Record<string, string> = {
  xs: 'var(--space-avatar-xs)',
  sm: 'var(--space-avatar-sm)',
  md: 'var(--space-avatar-md)',
  lg: 'var(--space-avatar-lg)',
  xl: 'var(--space-avatar-xl)',
};

/** Размер иконки person-circle (из contract.iconSizeMap) */
const ICON_SIZE: Record<string, number> = {
  xs: 16,
  sm: 20,
  md: 20,
  lg: 24,
  xl: 24,
};

/** Размер шрифта инициалов — пропорционально размеру аватара */
const INITIALS_FONT: Record<string, string> = {
  xs: '9px',
  sm: '11px',
  md: '14px',
  lg: '16px',
  xl: '18px',
};

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>((props, ref) => {
  const {
    variant = 'guest',
    size = 'xs',
    showBadge = false,
    badge,
    initials = 'VK',
    src,
    badgeContent,
    className,
    style,
    ...rest
  } = props;

  const sizeToken = SIZE_TOKENS[size];
  const iconSize = ICON_SIZE[size] ?? 20;

  const bgClass =
    variant === 'registered-no-photo'
      ? 'bg-[var(--color-brand-primary)]'
      : 'bg-[var(--color-surface-3)]';

  return (
    /*
     * Корневой div — НЕ имеет overflow-hidden, чтобы badge не обрезался.
     * position: relative нужен для абсолютного позиционирования badge.
     */
    <div
      ref={ref}
      className={cn('relative inline-flex shrink-0', className)}
      style={{ width: sizeToken, height: sizeToken, ...style }}
      {...rest}
    >
      {/*
       * Внутренний круглый контейнер — clipping только здесь.
       * Абсолютный, занимает весь родитель.
       */}
      <span
        className={cn(
          'absolute inset-0 rounded-full overflow-hidden',
          bgClass,
        )}
      >
        {/* guest — иконка PersonCircle */}
        {variant === 'guest' && (
          <span
            className="absolute inset-0 flex items-center justify-center"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <PersonCircleIcon
              size={iconSize}
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          </span>
        )}

        {/* registered-no-photo — инициалы */}
        {variant === 'registered-no-photo' && (
          <span
            className="absolute inset-0 flex items-center justify-center font-semibold leading-none select-none"
            style={{ color: 'var(--color-text-on-brand)', fontSize: INITIALS_FONT[size] }}
          >
            {initials}
          </span>
        )}

        {/* registered-with-photo — фото */}
        {variant === 'registered-with-photo' && src && (
          <img
            src={src}
            alt={initials}
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Fallback для registered-with-photo без src */}
        {variant === 'registered-with-photo' && !src && (
          <span
            className="absolute inset-0 flex items-center justify-center font-semibold leading-none select-none"
            style={{ color: 'var(--color-text-on-brand)', fontSize: INITIALS_FONT[size] }}
          >
            {initials}
          </span>
        )}
      </span>

      {/*
       * Badge — вне clipping-контейнера, абсолютно в правом нижнем углу.
       * bottom/right отрицательные чтобы badge выступал наружу как в Figma.
       */}
      {showBadge && (
        <span
          className="absolute z-10 flex items-center justify-center"
          style={{ bottom: '-3px', right: '-3px' }}
        >
          {badge ?? (
            <Badge
              appearance="brand"
              size="sm"
              style={{
                padding: '1px 4px',
                minWidth: '16px',
                minHeight: '16px',
                fontSize: '10px',
                lineHeight: '14px',
                borderRadius: '9999px',
                boxSizing: 'border-box',
              }}
            >
              {badgeContent}
            </Badge>
          )}
        </span>
      )}
    </div>
  );
});

Avatar.displayName = 'Avatar';
