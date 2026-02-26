import React from 'react';
import type { ParagraphProps, ParagraphSize, ParagraphBreakpoint } from './Paragraph.types';
import { cn } from '../_shared';

/**
 * Figma API (160:82623):
 *
 * Все варианты: padding=32px, layout=VERTICAL, нет fills/strokes/effects.
 *
 * Размеры текста (fontSize / fontWeight / lineHeight):
 *   sm: 12px / 400 / 16px
 *   md: 14px / 400 / 20px
 *   lg: 16px / 400 / 24px
 *
 * Ширина контейнера (breakpoint):
 *   mobile:     320px
 *   tablet:     480px
 *   desktop-sm: 640px
 *   desktop-lg: 800px
 *
 * Цвет текста: --color-text-primary (VariableID:159:42926)
 */

const SIZE_CLASSES: Record<ParagraphSize, string> = {
  sm: 'text-style-caption',
  md: 'text-style-body',
  lg: 'text-style-body-lg',
};

const BREAKPOINT_WIDTH: Record<ParagraphBreakpoint, string> = {
  'mobile':     'w-[var(--space-paragraph-max-mobile)]',
  'tablet':     'w-[var(--space-paragraph-max-tablet)]',
  'desktop-sm': 'w-[var(--space-paragraph-max-desktop-sm)]',
  'desktop-lg': 'w-[var(--space-paragraph-max-desktop-lg)]',
};

const ALIGN_CLASSES: Record<string, string> = {
  left:    'text-left',
  center:  'text-center',
  right:   'text-right',
  justify: 'text-justify',
};

const ParagraphInner = React.forwardRef<HTMLParagraphElement, ParagraphProps>((props, ref) => {
  const {
    size = 'md',
    breakpoint,
    align = 'left',
    color,
    children,
    className,
    style,
    ...rest
  } = props;

  return (
    <p
      ref={ref}
      className={cn(
        'font-normal box-border',
        SIZE_CLASSES[size],
        breakpoint ? BREAKPOINT_WIDTH[breakpoint] : 'w-full',
        ALIGN_CLASSES[align] ?? 'text-left',
        className,
      )}
      style={{
        color: color ?? 'var(--color-text-primary)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </p>
  );
});

ParagraphInner.displayName = 'Paragraph';
export const Paragraph = React.memo(ParagraphInner);
