import React, { useRef, useState, useCallback, useEffect } from 'react';
import type { PinInputProps, PinInputSize, PinInputState } from './PinInput.types';

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

/**
 * Figma API (160:82793):
 *
 * Размеры ячеек:
 *   sm: 32×32, gap=2px, cornerRadius=8px
 *   md: 40×40, gap=4px, cornerRadius=10px
 *   lg: 48×48, gap=6px, cornerRadius=12px
 *
 * Состояния (border и dot color):
 *   unfilled  → border: --color-border-base,     dot: --color-border-base
 *   filled    → border: --color-border-strong,    dot: --color-text-muted
 *   error     → border: --color-danger-base,      dot: --color-danger-base
 *   disabled  → border: --color-border-disabled,  dot: --color-text-disabled
 *
 * Ячейка: белый фон (--color-surface-1), border 1px solid, cornerRadius.
 * Dot: ELLIPSE ~8px — отображается когда ячейка не сфокусирована или mask=true.
 * Cursor: вертикальная черта когда ячейка активна (не в Figma, но стандартно для PinInput).
 */

const SIZE_CONFIG: Record<PinInputSize, {
  cellSize: string;
  gap: string;
  radius: string;
  dotSize: string;
  fontSize: string;
}> = {
  sm: { cellSize: 'w-8 h-8',  gap: 'gap-[var(--space-2)]', radius: 'rounded-[8px]',  dotSize: 'w-2 h-2',   fontSize: 'text-style-caption' },
  md: { cellSize: 'w-10 h-10', gap: 'gap-[var(--space-4)]', radius: 'rounded-[10px]', dotSize: 'w-2.5 h-2.5', fontSize: 'text-style-body' },
  lg: { cellSize: 'w-12 h-12', gap: 'gap-[var(--space-6)]', radius: 'rounded-[12px]', dotSize: 'w-3 h-3',   fontSize: 'text-style-body-lg' },
};

/**
 * Цвета бордера ячейки по состоянию.
 * active (сфокусированная) — brand-primary.
 */
function getCellBorderColor(state: PinInputState, isActive: boolean): string {
  if (isActive) return 'border-[var(--color-brand-primary)]';
  if (state === 'error')    return 'border-[var(--color-danger-base)]';
  if (state === 'filled')   return 'border-[var(--color-border-strong)]';
  if (state === 'disabled') return 'border-[var(--color-border-disabled)]';
  return 'border-[var(--color-border-base)]';
}

/** Цвет точки/контента по состоянию */
function getDotColor(state: PinInputState): string {
  if (state === 'error')    return 'bg-[var(--color-danger-base)]';
  if (state === 'filled')   return 'bg-[var(--color-text-muted)]';
  if (state === 'disabled') return 'bg-[var(--color-text-disabled)]';
  return 'bg-[var(--color-border-base)]';
}

/** Одна ячейка PIN-кода */
const PinCell: React.FC<{
  value: string;
  index: number;
  size: PinInputSize;
  state: PinInputState;
  isActive: boolean;
  mask: boolean;
  inputRef: React.RefObject<HTMLInputElement>;
  onCellClick: (index: number) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
}> = ({ value, index, size, state, isActive, mask, inputRef, onCellClick, onKeyDown, onInputChange, onPaste }) => {
  const { cellSize, radius, dotSize, fontSize } = SIZE_CONFIG[size];
  const isDisabled = state === 'disabled';
  const hasValue = value !== '';

  const borderColor = getCellBorderColor(state, isActive);
  const dotColor = getDotColor(state);

  return (
    <div
      className={cn(
        'relative inline-flex items-center justify-center shrink-0',
        'bg-[var(--color-surface-1)] border border-solid',
        'transition-colors duration-150',
        cellSize,
        radius,
        borderColor,
        isActive && 'shadow-[var(--effect-focus-brand)]',
        isDisabled && 'cursor-not-allowed opacity-[var(--opacity-disabled)]',
      )}
      onClick={() => !isDisabled && onCellClick(index)}
    >
      {/* Скрытый input для захвата ввода */}
      <input
        ref={inputRef}
        type={mask ? 'password' : 'text'}
        inputMode="numeric"
        pattern="[0-9]*"
        maxLength={1}
        value={value}
        disabled={isDisabled}
        aria-label={`PIN digit ${index + 1}`}
        className="absolute inset-0 w-full h-full opacity-0 cursor-default"
        onChange={(e) => onInputChange(e, index)}
        onKeyDown={(e) => onKeyDown(e, index)}
        onPaste={onPaste}
        tabIndex={isActive ? 0 : -1}
        autoComplete="one-time-code"
      />

      {/* Визуальное содержимое ячейки */}
      {hasValue && !mask && (
        /* Цифра — отображается открытым текстом */
        <span
          className={cn(
            'font-semibold leading-none select-none',
            fontSize,
            state === 'error'    ? 'text-[var(--color-danger-base)]' :
            state === 'disabled' ? 'text-[var(--color-text-disabled)]' :
                                   'text-[var(--color-text-primary)]',
          )}
        >
          {value}
        </span>
      )}

      {(hasValue && mask) && (
        /* Точка для masked mode */
        <span className={cn('rounded-full shrink-0', dotSize, dotColor)} />
      )}

      {!hasValue && (
        /* Пустая ячейка — dot placeholder (из Figma: ELLIPSE с цветом бордера) */
        isActive
          /* Курсор-моргание вместо dot когда активна */
          ? <span className="w-px h-4 bg-[var(--color-brand-primary)] animate-pulse" />
          : <span className={cn('rounded-full shrink-0', dotSize, dotColor)} />
      )}
    </div>
  );
};

export const PinInput = React.forwardRef<HTMLDivElement, PinInputProps>((props, ref) => {
  const {
    size = 'sm',
    state: stateProp = 'unfilled',
    length = 6,
    value: controlledValue,
    onChange,
    onComplete,
    mask = true,
    className,
    ...rest
  } = props;

  const [internalValue, setInternalValue] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  /* Синхронизируем с controlledValue */
  useEffect(() => {
    if (controlledValue !== undefined) {
      const chars = controlledValue.split('').slice(0, length);
      const padded = [...chars, ...Array(length - chars.length).fill('')];
      setInternalValue(padded);
    }
  }, [controlledValue, length]);

  const values = controlledValue !== undefined
    ? controlledValue.split('').slice(0, length).concat(Array(length).fill('')).slice(0, length)
    : internalValue;

  /* Вычисляем визуальное состояние: если все заполнено — filled, иначе unfilled */
  const computedState: PinInputState = stateProp !== 'unfilled' ? stateProp
    : values.every(v => v !== '') ? 'filled'
    : 'unfilled';

  const focusCell = useCallback((index: number) => {
    const el = inputRefs.current[index];
    if (el) { el.focus(); setActiveIndex(index); }
  }, []);

  const updateValue = useCallback((newValues: string[]) => {
    if (controlledValue === undefined) setInternalValue(newValues);
    const str = newValues.join('');
    onChange?.(str);
    if (newValues.every(v => v !== '')) onComplete?.(str);
  }, [controlledValue, onChange, onComplete]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const char = e.target.value.replace(/\D/g, '').slice(-1);
    const newValues = [...values];
    newValues[index] = char;
    updateValue(newValues);
    if (char && index < length - 1) focusCell(index + 1);
  }, [values, length, updateValue, focusCell]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      e.preventDefault();
      const newValues = [...values];
      if (newValues[index]) {
        newValues[index] = '';
        updateValue(newValues);
      } else if (index > 0) {
        newValues[index - 1] = '';
        updateValue(newValues);
        focusCell(index - 1);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault(); focusCell(index - 1);
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault(); focusCell(index + 1);
    }
  }, [values, length, updateValue, focusCell]);

  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length);
    const newValues = [...Array(length).fill('')];
    pasted.split('').forEach((ch, i) => { newValues[i] = ch; });
    updateValue(newValues);
    const nextFocus = Math.min(pasted.length, length - 1);
    focusCell(nextFocus);
  }, [length, updateValue, focusCell]);

  const handleCellClick = useCallback((index: number) => {
    focusCell(index);
  }, [focusCell]);

  const { gap } = SIZE_CONFIG[size];

  return (
    <div
      ref={ref}
      className={cn('inline-flex flex-row items-center', gap, className)}
      role="group"
      aria-label="PIN input"
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setActiveIndex(-1);
      }}
      {...rest}
    >
      {Array.from({ length }).map((_, i) => (
        <PinCell
          key={i}
          index={i}
          value={values[i] ?? ''}
          size={size}
          state={computedState}
          isActive={activeIndex === i}
          mask={mask}
          inputRef={{ current: inputRefs.current[i] } as React.RefObject<HTMLInputElement>}
          onCellClick={handleCellClick}
          onKeyDown={handleKeyDown}
          onInputChange={handleInputChange}
          onPaste={handlePaste}
        />
      ))}
    </div>
  );
});

PinInput.displayName = 'PinInput';
