import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { ImageProps, ImageLayout, ImageSize, ImageRatio, ImageState } from './Image.types';
import { cn } from '../_shared';
import { useIntersectionObserver } from '../../../hooks/useIntersectionObserver';

const SIZE_WIDTH: Record<ImageSize, number> = { xs: 120, sm: 200, md: 320, lg: 480 };

const RATIO_STYLE: Record<ImageRatio, React.CSSProperties> = {
  '1:1':  { aspectRatio: '1 / 1' },
  '4:3':  { aspectRatio: '4 / 3' },
  '16:9': { aspectRatio: '16 / 9' },
  '3:2':  { aspectRatio: '3 / 2' },
};

const ShimmerOverlay: React.FC = () => (
  <span
    className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite]"
    style={{ background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.6) 50%, transparent 100%)' }}
    aria-hidden="true"
  />
);

const ImagePlaceholderIcon: React.FC<{ size?: number }> = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <rect x="1" y="1" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="5.5" cy="5.5" r="1.5" fill="currentColor" />
    <path d="M1 11l3.5-3.5L7 10l3-3 5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const RetryIcon: React.FC = () => (
  <svg width={14} height={14} viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M1.5 7a5.5 5.5 0 019.37-3.9M12.5 7a5.5 5.5 0 01-9.37 3.9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M11 1v3h-3M3 13v-3h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Image = React.forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
  const {
    layout = 'image',
    size = 'md',
    ratio = '1:1',
    state: controlledState,
    src,
    alt = '',
    errorText = 'Failed to load',
    emptyText = 'No image',
    icon,
    onLoad,
    onError,
    onRetry,
    lazy = false,
    lazyRootMargin = '200px',
    className,
    style,
    ...rest
  } = props;

  const isControlled = controlledState !== undefined;
  const containerRef = useRef<HTMLDivElement>(null);

  const initialState: ImageState = src ? 'loading' : 'empty';
  const [internalState, setInternalState] = useState<ImageState>(initialState);
  const [retryKey, setRetryKey] = useState(0);
  const effectiveState = isControlled ? controlledState : internalState;

  const isInView = useIntersectionObserver(containerRef, {
    rootMargin: lazyRootMargin,
    once: true,
    enabled: lazy,
  });

  const shouldLoad = lazy ? isInView : true;

  useEffect(() => {
    if (!isControlled) {
      setInternalState(src ? 'loading' : 'empty');
    }
  }, [src, isControlled]);

  const handleLoad = useCallback(() => {
    if (!isControlled) setInternalState('loaded');
    onLoad?.();
  }, [isControlled, onLoad]);

  const handleError = useCallback(() => {
    if (!isControlled) setInternalState('error');
    onError?.();
  }, [isControlled, onError]);

  const handleRetry = useCallback(() => {
    if (!isControlled) setInternalState('loading');
    setRetryKey(k => k + 1);
    onRetry?.();
  }, [isControlled, onRetry]);

  const isHero = layout === 'hero-full' || layout === 'hero-half';

  const containerStyle: React.CSSProperties = isHero
    ? { width: layout === 'hero-full' ? '100%' : '50%', height: '100%', minHeight: 480, ...style }
    : { width: SIZE_WIDTH[size], ...RATIO_STYLE[ratio], ...style };

  const radiusClass = isHero ? '' : 'rounded-[4px]';
  const bgClass = effectiveState === 'loading' ? 'bg-[var(--color-surface-3)]' : 'bg-[var(--color-surface-2)]';
  const iconNode = icon ?? <ImagePlaceholderIcon size={16} />;

  return (
    <div
      ref={(node) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      }}
      className={cn('relative overflow-hidden shrink-0', radiusClass, bgClass, className)}
      style={containerStyle}
      role={effectiveState === 'loaded' ? 'img' : undefined}
      aria-label={effectiveState === 'loaded' ? alt : undefined}
      {...rest}
    >
      {effectiveState === 'loading' && (
        <>
          <span className="absolute inset-0 bg-[var(--color-surface-3)]" aria-hidden="true" />
          <ShimmerOverlay />
          {src && shouldLoad && (
            <img
              key={retryKey}
              src={src}
              alt=""
              className="sr-only"
              onLoad={handleLoad}
              onError={handleError}
              aria-hidden="true"
            />
          )}
          <span className="sr-only">Loading…</span>
        </>
      )}

      {effectiveState === 'loaded' && (
        <img
          src={src}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover"
          draggable={false}
        />
      )}

      {(effectiveState === 'error' || effectiveState === 'empty') && (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-3">
          <span className="shrink-0 text-[var(--color-text-muted)]">
            {iconNode}
          </span>
          <span
            className={cn(
              'text-center text-[var(--color-text-muted)] select-none',
              effectiveState === 'error' ? 'text-[12px] font-medium leading-4' : 'text-[10px] font-normal leading-3',
            )}
          >
            {effectiveState === 'error' ? errorText : emptyText}
          </span>
          {effectiveState === 'error' && src && (
            <button
              type="button"
              onClick={handleRetry}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-[var(--color-brand-primary)] hover:text-[var(--color-brand-hover)] transition-colors cursor-pointer bg-transparent border-0 p-0"
              aria-label="Retry loading image"
            >
              <RetryIcon />
              Retry
            </button>
          )}
        </span>
      )}
    </div>
  );
});

Image.displayName = 'Image';
