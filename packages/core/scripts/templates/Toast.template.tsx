import React, { useEffect, useCallback, useRef, useState } from 'react';
import type { ToastProps, ToastAppearance, ToastItem, ToasterProps, ToastPosition } from './Toast.types';
import { cn } from '../_shared';
import ReactDOM from 'react-dom';

const APPEARANCE_CLASSES: Record<ToastAppearance, string> = {
  info:    'bg-[var(--color-info-surface)] border-[var(--color-info-base)] text-[var(--color-text-primary)]',
  success: 'bg-[var(--color-success-surface)] border-[var(--color-success-base)] text-[var(--color-text-primary)]',
  warning: 'bg-[var(--color-warning-surface)] border-[var(--color-warning-base)] text-[var(--color-text-primary)]',
  danger:  'bg-[var(--color-danger-surface)] border-[var(--color-danger-base)] text-[var(--color-text-primary)]',
};

const ICON_COLORS: Record<ToastAppearance, string> = {
  info:    'var(--color-info-base)',
  success: 'var(--color-success-base)',
  warning: 'var(--color-warning-base)',
  danger:  'var(--color-danger-base)',
};

const CloseIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Toast = React.forwardRef<HTMLDivElement, ToastProps>((props, ref) => {
  const {
    appearance = 'info',
    title,
    description,
    icon,
    showClose = true,
    onClose,
    duration = 5000,
    open = true,
    className,
    ...rest
  } = props;

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const startTimer = useCallback(() => {
    if (duration > 0 && onClose) {
      timerRef.current = setTimeout(onClose, duration);
    }
  }, [duration, onClose]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (open) startTimer();
    return clearTimer;
  }, [open, startTimer, clearTimer]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      role="alert"
      aria-live="assertive"
      className={cn(
        'flex items-start gap-[var(--space-8)] p-[var(--space-12)]',
        'border border-solid rounded-[var(--radius-default)]',
        'shadow-elevation-2 min-w-[280px] max-w-[420px]',
        'transition-all duration-200',
        APPEARANCE_CLASSES[appearance],
        className,
      )}
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
      {...rest}
    >
      {icon && (
        <span
          className="shrink-0 flex items-center justify-center mt-[2px]"
          style={{ width: 20, height: 20, color: ICON_COLORS[appearance] }}
          aria-hidden="true"
        >
          {icon}
        </span>
      )}

      <div className="flex-1 min-w-0 flex flex-col gap-[var(--space-2)]">
        {title && (
          <span className="text-style-caption font-semibold leading-tight">{title}</span>
        )}
        {description && (
          <span className="text-style-body-sm opacity-80 leading-snug">{description}</span>
        )}
      </div>

      {showClose && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 flex items-center justify-center rounded opacity-60 hover:opacity-100 transition-opacity cursor-pointer bg-transparent border-0 p-0"
          style={{ width: 20, height: 20, color: 'currentColor' }}
          aria-label="Close notification"
        >
          <CloseIcon />
        </button>
      )}
    </div>
  );
});

Toast.displayName = 'Toast';

// ── Toast container / Toaster ──────────────────────────────────────────────

const POSITION_CLASSES: Record<ToastPosition, string> = {
  'top-right':      'top-[var(--space-16)] right-[var(--space-16)] items-end',
  'top-center':     'top-[var(--space-16)] left-1/2 -translate-x-1/2 items-center',
  'top-left':       'top-[var(--space-16)] left-[var(--space-16)] items-start',
  'bottom-right':   'bottom-[var(--space-16)] right-[var(--space-16)] items-end',
  'bottom-center':  'bottom-[var(--space-16)] left-1/2 -translate-x-1/2 items-center',
  'bottom-left':    'bottom-[var(--space-16)] left-[var(--space-16)] items-start',
};

let toastIdCounter = 0;
let globalAddToast: ((toast: Omit<ToastItem, 'id'>) => void) | null = null;

export function toast(config: Omit<ToastItem, 'id'>) {
  globalAddToast?.(config);
}

export const Toaster: React.FC<ToasterProps> = ({
  position = 'top-right',
  maxVisible = 5,
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((config: Omit<ToastItem, 'id'>) => {
    const id = `toast-${++toastIdCounter}`;
    setToasts((prev) => [...prev, { ...config, id }].slice(-maxVisible));
  }, [maxVisible]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    globalAddToast = addToast;
    return () => { globalAddToast = null; };
  }, [addToast]);

  if (typeof document === 'undefined') return null;

  return ReactDOM.createPortal(
    <div
      className={cn(
        'fixed z-[var(--z-toast)] flex flex-col gap-[var(--space-8)] pointer-events-none',
        POSITION_CLASSES[position],
      )}
      aria-label="Notifications"
    >
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto">
          <Toast
            appearance={t.appearance}
            title={t.title}
            description={t.description}
            icon={t.icon}
            showClose={t.showClose}
            duration={t.duration}
            onClose={() => removeToast(t.id)}
          />
        </div>
      ))}
    </div>,
    document.body,
  );
};

Toaster.displayName = 'Toaster';
