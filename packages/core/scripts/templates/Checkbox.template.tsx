import React, { useId, useRef, useEffect, useState, useCallback } from 'react';
import type { CheckboxProps, CheckboxSize, CheckboxState } from './Checkbox.types';
import { cn, findClasses, type VR } from '../_shared';
import contract from '../../../contracts/components/Checkbox.contract.json';
import { useControllableState } from '../../../hooks/useControllableState';

// MANUAL OVERRIDES:
// - Tri-state checkbox cycle (exclude state)
// - Icon rendering logic (check/plus/minus)
// - Label strikethrough for exclude state

const rules = (contract.variantRules || []) as unknown as VR[];

const SIZE_CONFIG: Record<CheckboxSize, {
  px: number;
  iconPx: number;
  labelSize: string;
}> = {
  xs: { px: 12, iconPx: 8,  labelSize: 'text-style-caption-xs' },
  sm: { px: 16, iconPx: 10, labelSize: 'text-style-caption-xs' },
  md: { px: 20, iconPx: 12, labelSize: 'text-style-caption' },
  lg: { px: 24, iconPx: 14, labelSize: 'text-style-body' },
};

function getIconFlags(state: CheckboxState) {
  const isCheck = state === 'checked' || state === 'focus-checked' || state === 'disabled-checked';
  const isPlus  = state === 'indeterminate' || state === 'disabled-indeterminate';
  const isMinus = state === 'exclude' || state === 'focus-exclude' || state === 'disabled-exclude';
  const isStrike = state === 'exclude' || state === 'focus-exclude' || state === 'disabled-exclude';
  return { showCheck: isCheck, showPlus: isPlus, showMinus: isMinus, strikethrough: isStrike };
}

const CheckIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className="animate-check-pop">
    <path d="M2.5 8L6.5 12L13.5 4.5" stroke="var(--color-text-on-brand)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** Plus — indeterminate (частичный выбор) */
const PlusIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className="animate-check-pop">
    <path d="M8 3.5V12.5M3.5 8H12.5" stroke="var(--color-text-on-brand)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

/** Minus — exclude (кроме) */
const MinusIcon: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true" className="animate-check-pop">
    <path d="M3.5 8H12.5" stroke="var(--color-text-on-brand)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
  const {
    size = 'md',
    state: stateProp,
    indeterminate = false,
    exclude = false,
    label,
    checked: checkedProp,
    defaultChecked,
    disabled = false,
    onChange,
    onFocus,
    onBlur,
    className,
    id: idProp,
    ...rest
  } = props;

  const autoId = useId();
  const id = idProp ?? autoId;
  const innerRef = useRef<HTMLInputElement>(null);
  const resolvedRef = (ref as React.RefObject<HTMLInputElement> | null) ?? innerRef;

  const [effectiveChecked, setChecked] = useControllableState<boolean>({
    value: checkedProp,
    defaultValue: defaultChecked ?? false,
  });

  useEffect(() => {
    if (resolvedRef.current) {
      resolvedRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate, resolvedRef]);

  const [isFocused, setIsFocused] = useState(false);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(e.target.checked);
    onChange?.(e);
  }, [setChecked, onChange]);

  const handleFocus = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }, [onFocus]);

  const handleBlur = useCallback((e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }, [onBlur]);

  const effectiveState: CheckboxState = (() => {
    if (stateProp) return stateProp;
    if (disabled && exclude)         return 'disabled-exclude';
    if (disabled && indeterminate)   return 'disabled-indeterminate';
    if (disabled && effectiveChecked) return 'disabled-checked';
    if (disabled)                    return 'disabled-unchecked';
    if (exclude)                     return isFocused ? 'focus-exclude' : 'exclude';
    if (indeterminate)               return 'indeterminate';
    if (isFocused && effectiveChecked) return 'focus-checked';
    if (isFocused)                     return 'focus-unchecked';
    if (effectiveChecked)              return 'checked';
    return 'unchecked';
  })();

  const { px, iconPx, labelSize } = SIZE_CONFIG[size];
  const visualState = effectiveState
    .replace('disabled-exclude', 'disabled-checked')
    .replace('focus-exclude', 'focus-checked')
    .replace('exclude', 'checked') as CheckboxState;
  const vc = findClasses(rules, { state: visualState, size });
  const { showCheck, showPlus, showMinus, strikethrough } = getIconFlags(effectiveState);
  const isDisabled = effectiveState.startsWith('disabled') || disabled;

  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center gap-[var(--space-20)]',
        isDisabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
    >
      <span
        className="relative shrink-0 inline-flex items-center justify-center"
        style={{ width: px, height: px }}
      >
        <input
          ref={resolvedRef}
          id={id}
          type="checkbox"
          checked={effectiveChecked}
          disabled={isDisabled}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          aria-checked={exclude ? 'mixed' : indeterminate ? 'mixed' : effectiveChecked}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0,
            cursor: isDisabled ? 'not-allowed' : 'pointer',
            zIndex: 1,
            margin: 0,
          }}
          {...rest}
        />

        <span
          aria-hidden="true"
          className={cn(
            'inline-flex shrink-0 items-center justify-center',
            'border-solid transition-all duration-150',
            ...vc,
          )}
          style={{ width: px, height: px, pointerEvents: 'none' }}
        >
          {showCheck && <CheckIcon size={iconPx} />}
          {showPlus  && <PlusIcon  size={iconPx} />}
          {showMinus && <MinusIcon size={iconPx} />}
        </span>
      </span>

      {label && (
        <span
          className={cn(
            labelSize,
            'leading-none select-none',
            isDisabled
              ? 'text-[var(--color-text-disabled)]'
              : 'text-[var(--color-text-primary)]',
            strikethrough && 'line-through',
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
});

Checkbox.displayName = 'Checkbox';
