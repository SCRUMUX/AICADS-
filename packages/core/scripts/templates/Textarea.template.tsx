import React, { useState, useCallback, useRef, useId } from 'react';
import type { TextareaProps, TextareaSize, TextareaState, TextareaResize } from './Textarea.types';
import { cn } from '../_shared';
import { useControllableState } from '../../../hooks/useControllableState';

const SIZE_CONFIG: Record<TextareaSize, {
  padding: string;
  minHeight: string;
  textStyle: string;
  fontWeight: string;
}> = {
  sm: { padding: 'px-3 py-[6px]', minHeight: 'min-h-[64px]', textStyle: 'text-style-caption', fontWeight: 'font-medium' },
  md: { padding: 'px-4 py-2', minHeight: 'min-h-[96px]', textStyle: 'text-style-body', fontWeight: 'font-normal' },
  lg: { padding: 'px-5 py-[10px]', minHeight: 'min-h-[120px]', textStyle: 'text-style-body-lg', fontWeight: 'font-medium' },
};

const RESIZE_CLASS: Record<TextareaResize, string> = {
  none: 'resize-none',
  vertical: 'resize-y',
  horizontal: 'resize-x',
  both: 'resize',
};

type VisualStyle = { bg: string; border: string; focus: boolean; opacity: boolean };

function getVisualStyle(state: TextareaState, invalid: boolean): VisualStyle {
  if (invalid) {
    return {
      bg: state === 'focus' || state === 'hover' ? 'bg-[var(--color-surface-3)]' : 'bg-[var(--color-surface-2)]',
      border: 'border-[var(--color-danger-base)]',
      focus: state === 'focus',
      opacity: false,
    };
  }
  switch (state) {
    case 'hover':
      return { bg: 'bg-[var(--color-surface-3)]', border: 'border-[var(--color-border-strong)]', focus: false, opacity: false };
    case 'focus':
      return { bg: 'bg-[var(--color-surface-3)]', border: 'border-[var(--color-border-strong)]', focus: true, opacity: false };
    case 'disabled':
      return { bg: 'bg-[var(--color-surface-2)]', border: 'border-[var(--color-border-base)]', focus: false, opacity: true };
    default:
      return { bg: 'bg-[var(--color-surface-2)]', border: 'border-[var(--color-border-base)]', focus: false, opacity: false };
  }
}

const ResizerIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
    <path d="M13 10L10 13M13 6L6 13" stroke="var(--color-border-strong)" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

export const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>((props, ref) => {
  const {
    size = 'md',
    state: stateProp,
    value: controlledValue,
    defaultValue = '',
    placeholder = 'Enter text...',
    disabled = false,
    readOnly = false,
    required = false,
    name,
    id: idProp,
    maxLength,
    minLength,
    rows,
    invalid = false,
    resize = 'vertical',
    showCharCount = false,
    'aria-describedby': ariaDescribedBy,
    'aria-label': ariaLabel,
    onChange,
    textareaProps,
    className,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    ...rest
  } = props;

  const generatedId = useId();
  const textareaId = idProp ?? generatedId;

  const [internalState, setInternalState] = useState<TextareaState>('base');
  const [value, setValue] = useControllableState({
    value: controlledValue,
    defaultValue,
    onChange: undefined,
  });

  const effectiveState: TextareaState = (() => {
    if (stateProp) return stateProp;
    if (disabled) return 'disabled';
    return internalState;
  })();

  const { padding, minHeight, textStyle, fontWeight } = SIZE_CONFIG[size];
  const { bg, border, focus, opacity } = getVisualStyle(effectiveState, invalid);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      onChange?.(e);
    },
    [setValue, onChange],
  );

  const he = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled && internalState !== 'focus') setInternalState('hover');
      onMouseEnter?.(e);
    },
    [disabled, internalState, onMouseEnter],
  );
  const hl = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!disabled && internalState !== 'focus') setInternalState('base');
      onMouseLeave?.(e);
    },
    [disabled, internalState, onMouseLeave],
  );
  const hf = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      if (!disabled) setInternalState('focus');
      onFocus?.(e);
    },
    [disabled, onFocus],
  );
  const hb = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      setInternalState('base');
      onBlur?.(e);
    },
    [onBlur],
  );

  const charCount = value.length;
  const isOverLimit = maxLength !== undefined && charCount > maxLength;

  return (
    <div
      ref={ref}
      className={cn(
        'relative flex flex-col w-full',
        'rounded-[var(--radius-default)] border border-solid',
        'transition-colors duration-150',
        bg,
        border,
        focus && (invalid ? 'shadow-[var(--effect-focus-danger)]' : 'shadow-[var(--effect-focus-brand)]'),
        opacity && 'opacity-[var(--opacity-disabled)]',
        disabled ? 'cursor-not-allowed' : 'cursor-text',
        className,
      )}
      data-state={effectiveState}
      data-invalid={invalid || undefined}
      onMouseEnter={he}
      onMouseLeave={hl}
      onFocus={hf}
      onBlur={hb}
      {...rest}
    >
      <div className={cn('flex-1 w-full', padding)}>
        <textarea
          id={textareaId}
          name={name}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          rows={rows}
          onChange={handleChange}
          aria-invalid={invalid || undefined}
          aria-describedby={ariaDescribedBy}
          aria-label={ariaLabel}
          aria-required={required || undefined}
          className={cn(
            'w-full bg-transparent outline-none',
            RESIZE_CLASS[resize],
            '[&::-webkit-resizer]:!appearance-none [&::-webkit-resizer]:!bg-transparent',
            'text-[var(--color-text-primary)]',
            'placeholder:text-[var(--color-text-muted)]',
            textStyle,
            fontWeight,
            minHeight,
            disabled ? 'cursor-not-allowed' : 'cursor-text',
          )}
          {...textareaProps}
        />
      </div>

      {/* Char count */}
      {showCharCount && (
        <div className="flex items-center px-2 pb-1">
          <span className={cn('text-[10px] leading-3', isOverLimit ? 'text-[var(--color-danger-base)]' : 'text-[var(--color-text-muted)]')}>
            {charCount}{maxLength !== undefined ? `/${maxLength}` : ''}
          </span>
        </div>
      )}

      {/* Resizer icon — purely decorative, positioned over the native (hidden) resize handle */}
      {resize !== 'none' && (
        <div className="absolute bottom-[2px] right-[2px] pointer-events-none">
          <ResizerIcon />
        </div>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';
