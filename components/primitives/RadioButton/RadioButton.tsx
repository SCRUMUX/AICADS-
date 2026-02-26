import React, { useId } from 'react';
import type { RadioButtonProps, RadioButtonSize, RadioButtonState } from './RadioButton.types';
import { cn, findClasses, type VR } from '../_shared';
import contract from '../../../contracts/components/RadioButton.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

const SIZE_CONFIG: Record<RadioButtonSize, {
  ringPx: number;
  innerPx: number;
  labelSize: string;
}> = {
  xs: { ringPx: 12, innerPx: 6,  labelSize: 'text-style-caption-xs' },
  sm: { ringPx: 16, innerPx: 6,  labelSize: 'text-style-caption-xs' },
  md: { ringPx: 20, innerPx: 8,  labelSize: 'text-style-caption' },
  lg: { ringPx: 24, innerPx: 10, labelSize: 'text-style-body' },
};

function showInnerDot(state: RadioButtonState): boolean {
  return state === 'filled' || state === 'always-filled';
}

export const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
  const {
    size = 'md',
    state: stateProp,
    label,
    checked,
    disabled = false,
    onChange,
    className,
    id: idProp,
    ...rest
  } = props;

  const autoId = useId();
  const id = idProp ?? autoId;

  /* Вычисляем эффективное состояние */
  const effectiveState: RadioButtonState = (() => {
    if (stateProp) return stateProp;
    if (disabled)  return 'disabled';
    if (checked)   return 'filled';
    return 'base';
  })();

  const { ringPx, innerPx, labelSize } = SIZE_CONFIG[size];
  const vc = findClasses(rules, { state: effectiveState, size });
  const showInner = showInnerDot(effectiveState);

  return (
    <label
      htmlFor={id}
      className={cn(
        'inline-flex items-center gap-[var(--space-4)]',
        disabled ? 'cursor-not-allowed opacity-[var(--opacity-disabled)]' : 'cursor-pointer',
        className,
      )}
    >
      {/* Скрытый нативный input для доступности */}
      <input
        ref={ref}
        id={id}
        type="radio"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        className="sr-only"
        {...rest}
      />

      {/* Визуальный круговой индикатор */}
      <span
        aria-hidden="true"
        className={cn(
          'relative inline-flex shrink-0 items-center justify-center',
          'transition-all duration-150',
          ...vc,
        )}
        style={{ width: ringPx, height: ringPx }}
      >
        {/* Inner white dot — только для filled/always-filled */}
        {showInner && (
          <span
            className="rounded-full bg-[var(--color-text-on-brand)] shrink-0 block"
            style={{ width: innerPx, height: innerPx }}
          />
        )}
      </span>

      {/* Label */}
      {label && (
        <span
          className={cn(
            labelSize,
            'leading-none select-none',
            disabled
              ? 'text-[var(--color-text-disabled)]'
              : 'text-[var(--color-text-primary)]',
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
});

RadioButton.displayName = 'RadioButton';
