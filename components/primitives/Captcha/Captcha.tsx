import React from 'react';
import type { CaptchaProps, CaptchaState } from './Captcha.types';
import { cn } from '../_shared';
import { Spinner } from '../Spinner/Spinner';

type StateStyle = {
  bg:         string;
  border:     string;
  textColor:  string;
};

const STATE_STYLES: Record<CaptchaState, StateStyle> = {
  idle: {
    bg:        'bg-[var(--color-surface-2)]',
    border:    'border-[var(--color-border-base)]',
    textColor: 'text-[var(--color-text-muted)]',
  },
  loading: {
    bg:        'bg-[var(--color-surface-2)]',
    border:    'border-[var(--color-border-base)]',
    textColor: 'text-[var(--color-text-muted)]',
  },
  success: {
    bg:        'bg-[var(--color-success-surface)]',
    border:    'border-[var(--color-success-base)]',
    textColor: 'text-[var(--color-success-base)]',
  },
  error: {
    bg:        'bg-[var(--color-danger-surface)]',
    border:    'border-[var(--color-danger-base)]',
    textColor: 'text-[var(--color-danger-base)]',
  },
};

const CheckIcon: React.FC = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
    <path d="M3 8l3.5 3.5L13 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AlertIcon: React.FC = () => (
  <svg width={16} height={16} viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    <path d="M8 5v3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="8" cy="11.5" r="0.75" fill="currentColor" />
  </svg>
);

// ─── reCAPTCHA-style checkbox (idle state) ────────────────────────────────────
const CaptchaCheckbox: React.FC = () => (
  <span
    className="shrink-0 w-6 h-6 rounded border-2 border-[var(--color-border-strong)] bg-[var(--color-surface-1)] flex items-center justify-center"
    aria-hidden="true"
  />
);

// ─── Component ────────────────────────────────────────────────────────────────
export const Captcha = React.forwardRef<HTMLDivElement, CaptchaProps>((props, ref) => {
  const {
    state = 'idle',
    placeholder = 'Captcha',
    onVerify,
    onExpire,
    className,
    style,
    ...rest
  } = props;

  const { bg, border, textColor } = STATE_STYLES[state];

  // Icon slot per state
  const iconNode = (() => {
    switch (state) {
      case 'loading': return <Spinner size="xs" appearance="inherit" />;
      case 'success': return <CheckIcon />;
      case 'error':   return <AlertIcon />;
      default:        return <CaptchaCheckbox />;
    }
  })();

  // Status text per state
  const statusLabel = (() => {
    switch (state) {
      case 'loading': return 'Verifying…';
      case 'success': return 'Verified';
      case 'error':   return 'Verification failed';
      default:        return placeholder;
    }
  })();

  return (
    <div
      ref={ref}
      role="group"
      aria-label="CAPTCHA verification"
      className={cn(
        // Figma: 160×72, padding L16/T12/R16/B12, border-radius 4px, border 1px
        'flex flex-row items-center justify-center gap-2',
        'px-4 py-3',                       // L16/R16 T12/B12
        'w-[var(--space-160)] h-[var(--space-72)]',
        'rounded-[var(--radius-medium)]',
        'border border-solid',
        'transition-colors duration-200',
        bg,
        border,
        className,
      )}
      style={style}
      {...rest}
    >
      {/* Icon/checkbox */}
      <span className={cn('flex items-center justify-center', textColor)}>
        {iconNode}
      </span>

      {/* Label text — 12px/400/lh16, centered */}
      <span
        className={cn(
          'text-style-caption select-none',
          textColor,
        )}
      >
        {statusLabel}
      </span>
    </div>
  );
});

Captcha.displayName = 'Captcha';
