import React from 'react';
import type { ImageProps, ImageLayout, ImageSize, ImageRatio, ImageState } from './Image.types';

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

/**
 * Figma API (161:93092):
 *
 * Размеры (layout=image):
 *   xs: 120px, cornerRadius=4px (мобильные карточки)
 *   sm: 200px, cornerRadius=4px
 *   md: 320px, cornerRadius=4px
 *   lg: 480px, cornerRadius=4px
 *
 * Ratio → aspect-ratio CSS:
 *   1:1  → aspect-square (1/1)
 *   4:3  → 4/3
 *   16:9 → 16/9
 *   3:2  → 3/2
 *
 * Состояния:
 *   loading → surface-3 (#EDF2F8) + shimmer (горизонтальный градиент, animation)
 *   loaded  → <img object-cover w-full h-full>
 *   error   → surface-2 + иконка 16px + текст 12px/500/muted/center
 *   empty   → surface-2 + иконка 16px + текст 10px/400/muted/center
 *
 * Hero layouts — нет cornerRadius, фиксированные размеры:
 *   hero-full: 1920×1080
 *   hero-half: 960×1080
 */

/* Ширина контейнера по size */
const SIZE_WIDTH: Record<ImageSize, number> = {
  xs: 120,
  sm: 200,
  md: 320,
  lg: 480,
};

/* aspect-ratio по ratio */
const RATIO_STYLE: Record<ImageRatio, React.CSSProperties> = {
  '1:1':  { aspectRatio: '1 / 1' },
  '4:3':  { aspectRatio: '4 / 3' },
  '16:9': { aspectRatio: '16 / 9' },
  '3:2':  { aspectRatio: '3 / 2' },
};

/* Shimmer — бегущий градиент слева направо */
const ShimmerOverlay: React.FC = () => (
  <span
    className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
    style={{
      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)',
    }}
    aria-hidden="true"
  />
);

/* Иконка-заглушка для error/empty */
const ImagePlaceholderIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    aria-hidden="true"
  >
    <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5.5" cy="5.5" r="1.5" fill="currentColor" />
    <path d="M1 11l3.5-3.5L7 10l3-3 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Image = React.forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
  const {
    layout = 'image',
    size = 'md',
    ratio = '1:1',
    state = 'empty',
    src,
    alt = '',
    errorText = 'Failed to load',
    emptyText = 'No image',
    icon,
    onLoad,
    onError,
    className,
    style,
    ...rest
  } = props;

  const isHero = layout === 'hero-full' || layout === 'hero-half';

  /* Размеры контейнера */
  const containerStyle: React.CSSProperties = isHero
    ? {
        width:  layout === 'hero-full' ? '100%' : '50%',
        height: '100%',
        minHeight: 480,
        ...style,
      }
    : {
        width: SIZE_WIDTH[size],
        ...RATIO_STYLE[ratio],
        ...style,
      };

  const radiusClass = isHero ? '' : 'rounded-[4px]';

  /* Фон по состоянию */
  const bgClass = state === 'loading'
    ? 'bg-[var(--color-surface-3)]'
    : 'bg-[var(--color-surface-2)]';

  const iconNode = icon ?? <ImagePlaceholderIcon size={16} />;

  return (
    <div
      ref={ref}
      className={cn(
        'relative overflow-hidden shrink-0',
        radiusClass,
        bgClass,
        className,
      )}
      style={containerStyle}
      role={state === 'loaded' ? 'img' : undefined}
      aria-label={state === 'loaded' ? alt : undefined}
      {...rest}
    >
      {/* ── loading: shimmer skeleton + hidden preloader ── */}
      {state === 'loading' && (
        <>
          <span className="absolute inset-0 bg-[var(--color-surface-3)]" aria-hidden="true" />
          <ShimmerOverlay />
          {src && (
            <img
              src={src}
              alt=""
              className="sr-only"
              onLoad={onLoad}
              onError={onError}
              aria-hidden="true"
            />
          )}
          <span className="sr-only">Loading…</span>
        </>
      )}

      {/* ── loaded: реальное изображение ── */}
      {state === 'loaded' && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      )}

      {/* ── error / empty: иконка + текст ── */}
      {(state === 'error' || state === 'empty') && (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3">
          <span className="shrink-0 text-[var(--color-text-muted)]">
            {iconNode}
          </span>
          <span
            className={cn(
              'text-center text-[var(--color-text-muted)] select-none',
              state === 'error'
                ? 'text-[12px] font-medium leading-4'
                : 'text-[10px] font-normal leading-3',
            )}
          >
            {state === 'error' ? errorText : emptyText}
          </span>
        </span>
      )}
    </div>
  );
});

Image.displayName = 'Image';
