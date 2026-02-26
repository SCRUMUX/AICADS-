import React, { useEffect, useRef } from 'react';
import type { DrawerProps, DrawerSize, DrawerSide } from './Drawer.types';
import { cn } from '../_shared/utils';
import { IconSlot } from '../_shared/IconSlot';
import { useScrollLock } from '../../../hooks/useScrollLock';
import { useEscapeKey } from '../../../hooks/useEscapeKey';

const SIZE_MAP: Record<DrawerSize, string> = {
  sm: 'var(--space-320)',
  md: 'var(--space-480)',
  lg: 'var(--space-640)',
};

const PADDING_MAP: Record<DrawerSize, string> = {
  sm: 'px-[var(--space-16)] py-[var(--space-12)]',
  md: 'px-[var(--space-20)] py-[var(--space-16)]',
  lg: 'px-[var(--space-24)] py-[var(--space-20)]',
};

const CONTENT_PADDING_MAP: Record<DrawerSize, string> = {
  sm: 'px-[var(--space-16)] py-[var(--space-16)]',
  md: 'px-[var(--space-20)] py-[var(--space-20)]',
  lg: 'px-[var(--space-24)] py-[var(--space-24)]',
};

const CloseIcon: React.FC = () => (
  <svg width={20} height={20} viewBox="0 0 20 20" fill="none" aria-hidden="true">
    <path d="M5 5l10 10M15 5l-10 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Drawer = React.forwardRef<HTMLDivElement, DrawerProps>((props, ref) => {
  const {
    open = false,
    onClose,
    size = 'md',
    side = 'right',
    title = 'Drawer',
    children,
    className,
    container,
    ...rest
  } = props;

  const panelRef = useRef<HTMLDivElement>(null);
  useScrollLock(open);
  useEscapeKey(() => onClose?.(), open);

  const sizeWidth = SIZE_MAP[size];
  const isLeft = side === 'left';

  useEffect(() => {
    if (open) panelRef.current?.focus();
  }, [open]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className={cn(
        'inset-0 z-[var(--z-modal,50)]',
        container ? 'absolute' : 'fixed',
      )}
      {...rest}
    >
      <div
        className="absolute inset-0 bg-black/40 transition-opacity"
        onClick={onClose}
        aria-hidden
      />

      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === 'string' ? title : 'Drawer'}
        className={cn(
          'absolute top-0 bottom-0 flex flex-col bg-[var(--color-bg-base)] shadow-xl outline-none',
          'transition-transform duration-300',
          isLeft ? 'left-0 border-r border-[var(--color-border-base)]' : 'right-0 border-l border-[var(--color-border-base)]',
          className,
        )}
        style={{
          width: container ? `min(${sizeWidth}, 100%)` : sizeWidth,
          maxWidth: container ? '100%' : '90vw',
        }}
      >
        <div className={cn('flex items-center gap-[var(--space-12)] shrink-0 border-b border-[var(--color-border-base)]', PADDING_MAP[size])}>
          <h2 className="flex-1 min-w-0 text-style-body-lg font-semibold text-[var(--color-text-primary)] truncate">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="shrink-0 flex items-center justify-center bg-transparent border-0 cursor-pointer p-0"
            aria-label="Close"
          >
            <IconSlot
              icon={<CloseIcon />}
              color="var(--color-text-secondary)"
              hoverColor="var(--color-brand-primary)"
            />
          </button>
        </div>

        <div className={cn('flex-1 overflow-auto', CONTENT_PADDING_MAP[size])}>
          {children}
        </div>
      </div>
    </div>
  );
});

Drawer.displayName = 'Drawer';
