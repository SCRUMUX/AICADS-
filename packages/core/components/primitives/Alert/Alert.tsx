import React, { useEffect, useRef, useCallback } from 'react';
import type { AlertProps, AlertAppearance, AlertVariant } from './Alert.types';
import { cn, findClasses, type VR } from '../_shared';
import { IconSlot } from '../_shared/IconSlot';
import contract from '../../../contracts/components/Alert.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

const DefaultCloseIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const {
    appearance = 'warning',
    variant = 'basic',
    iconLeft,
    iconRight,
    showLeftIcon = false,
    showRightIcon = false,
    showTitle = true,
    showParagraph = true,
    title = 'Alert title',
    paragraph = 'Alert message',
    onClose,
    open = true,
    autoDismiss = 0,
    actionLabel,
    onAction,
    children,
    className,
    ...rest
  } = props;

  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const startTimer = useCallback(() => {
    if (autoDismiss > 0 && onClose) {
      timerRef.current = setTimeout(onClose, autoDismiss);
    }
  }, [autoDismiss, onClose]);

  const clearTimer = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  useEffect(() => {
    if (open) startTimer();
    return clearTimer;
  }, [open, startTimer, clearTimer]);

  if (!open) return null;

  const vc = findClasses(rules, { appearance, variant });
  const focusRing = appearance?.includes('danger')
    ? ((contract.focusRingDanger as string) ?? '')
    : ((contract.focusRing as string) ?? '');

  const titleTextCls = vc.find(c => c.startsWith('[--title-text-class:'))?.match(/\[--title-text-class:([^\]]+)\]/)?.[1] || '';
  const paragraphTextCls = vc.find(c => c.startsWith('[--paragraph-text-class:'))?.match(/\[--paragraph-text-class:([^\]]+)\]/)?.[1] || '';

  const isSolid = variant === 'solid';
  const iconColor = isSolid
    ? `var(--color-${appearance}-text)`
    : `var(--color-${appearance}-base)`;

  return (
    <div
      ref={ref as any}
      className={cn(
        'transition-colors duration-150 font-base box-border flex flex-row justify-center items-start animate-alert-in',
        ...vc,
        focusRing,
        className
      )}
      role="alert"
      onMouseEnter={clearTimer}
      onMouseLeave={startTimer}
      {...rest}
    >
      {showLeftIcon && iconLeft && (
        <IconSlot icon={iconLeft} color={iconColor} />
      )}

      <div className="flex flex-col flex-1 min-w-0 items-start gap-[inherit]">
        {showTitle && (
          <span className={cn('flex-1 min-w-0', titleTextCls)}>
            {title}
          </span>
        )}
        {showParagraph && (
          <span className={cn('flex-1 min-w-0', paragraphTextCls)}>
            {paragraph}
          </span>
        )}
        {actionLabel && onAction && (
          <button
            type="button"
            onClick={onAction}
            className={cn(
              'text-style-caption-xs font-semibold bg-transparent border-0 p-0 cursor-pointer transition-opacity hover:opacity-80',
              isSolid ? `text-[var(--color-${appearance}-text)]` : `text-[var(--color-${appearance}-base)]`,
            )}
          >
            {actionLabel}
          </button>
        )}
      </div>

      {onClose ? (
        <button
          type="button"
          onClick={onClose}
          className="shrink-0 flex items-center justify-center rounded cursor-pointer bg-transparent border-0 p-0 opacity-60 hover:opacity-100 transition-opacity focus-visible:outline-none focus-visible:shadow-[var(--effect-focus-brand)]"
          aria-label="Close alert"
        >
          <IconSlot icon={iconRight ?? <DefaultCloseIcon />} color={iconColor} />
        </button>
      ) : showRightIcon && iconRight ? (
        <IconSlot icon={iconRight} color={iconColor} />
      ) : null}
    </div>
  );
});

Alert.displayName = 'Alert';
