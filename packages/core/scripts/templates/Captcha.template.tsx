import React, { useState, useCallback, useEffect, useRef } from 'react';
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

const CaptchaCheckbox: React.FC<{ hovered: boolean }> = ({ hovered }) => (
  <span
    className={cn(
      'shrink-0 w-6 h-6 rounded border-2 bg-[var(--color-surface-1)] flex items-center justify-center transition-colors',
      hovered ? 'border-[var(--color-brand-primary)]' : 'border-[var(--color-border-strong)]',
    )}
    aria-hidden="true"
  />
);

const DEFAULT_VERIFY_DELAY = 1500;
const DEFAULT_EXPIRE_DELAY = 120_000;

export const Captcha = React.forwardRef<HTMLDivElement, CaptchaProps>((props, ref) => {
  const {
    state: controlledState,
    placeholder = 'Captcha',
    onVerify,
    onExpire,
    verifyDelay = DEFAULT_VERIFY_DELAY,
    expireTimeout = DEFAULT_EXPIRE_DELAY,
    disabled = false,
    className,
    style,
    ...rest
  } = props;

  const [internalState, setInternalState] = useState<CaptchaState>('idle');
  const [hovered, setHovered] = useState(false);
  const expireTimerRef = useRef<ReturnType<typeof setTimeout>>();
  const isControlled = controlledState !== undefined;
  const state = isControlled ? controlledState : internalState;

  const clearExpireTimer = useCallback(() => {
    if (expireTimerRef.current) {
      clearTimeout(expireTimerRef.current);
      expireTimerRef.current = undefined;
    }
  }, []);

  useEffect(() => () => clearExpireTimer(), [clearExpireTimer]);

  const startExpireTimer = useCallback(() => {
    clearExpireTimer();
    if (expireTimeout > 0) {
      expireTimerRef.current = setTimeout(() => {
        if (!isControlled) setInternalState('idle');
        onExpire?.();
      }, expireTimeout);
    }
  }, [expireTimeout, isControlled, onExpire, clearExpireTimer]);

  const handleClick = useCallback(() => {
    if (disabled || state !== 'idle') return;

    if (!isControlled) setInternalState('loading');

    const token = `captcha_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;

    setTimeout(() => {
      if (!isControlled) setInternalState('success');
      onVerify?.(token);
      startExpireTimer();
    }, verifyDelay);
  }, [disabled, state, isControlled, onVerify, verifyDelay, startExpireTimer]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  const iconNode = (() => {
    switch (state) {
      case 'loading': return <Spinner size="xs" appearance="inherit" />;
      case 'success': return <CheckIcon />;
      case 'error':   return <AlertIcon />;
      default:        return <CaptchaCheckbox hovered={hovered && !disabled} />;
    }
  })();

  const statusLabel = (() => {
    switch (state) {
      case 'loading': return 'Verifying…';
      case 'success': return 'Verified';
      case 'error':   return 'Verification failed';
      default:        return placeholder;
    }
  })();

  const { bg, border, textColor } = STATE_STYLES[state];
  const isClickable = state === 'idle' && !disabled;

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={isClickable ? 0 : -1}
      aria-label="CAPTCHA verification"
      aria-disabled={disabled || state !== 'idle' || undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        'flex flex-row items-center justify-center gap-2',
        'px-4 py-3',
        'w-[var(--space-160)] h-[var(--space-72)]',
        'rounded-[var(--radius-medium)]',
        'border border-solid',
        'transition-colors duration-200',
        'outline-none focus-visible:shadow-[var(--effect-focus-brand)]',
        bg,
        border,
        isClickable ? 'cursor-pointer' : 'cursor-default',
        disabled && 'opacity-[var(--opacity-disabled)] cursor-not-allowed',
        className,
      )}
      style={style}
      {...rest}
    >
      <span className={cn('flex items-center justify-center', textColor)}>
        {iconNode}
      </span>

      <span className={cn('text-style-caption select-none', textColor)}>
        {statusLabel}
      </span>
    </div>
  );
});

Captcha.displayName = 'Captcha';
