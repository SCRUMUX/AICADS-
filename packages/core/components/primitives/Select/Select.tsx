import React, { useState, useCallback, useEffect, useRef, useId } from 'react';
import type { SelectProps, SelectSize, SelectState, SelectAppearance, SelectOption } from './Select.types';
import { cn, findClasses, type VR } from '../_shared';
import { IconSlot } from '../_shared/IconSlot';
import { Popover } from '../_shared/Popover';
import { useControllableState } from '../../../hooks/useControllableState';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { usePopoverState } from '../../../hooks/usePopoverState';
import { mergeRefs } from '../../../hooks/mergeRefs';
import contract from '../../../contracts/components/Select.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

const SIZE_CLASSES: Record<SelectSize, string> = {
  sm: 'px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)] min-h-[var(--space-28)] min-w-[var(--space-container-compact-min)] gap-[var(--space-button-gap-sm)] text-style-caption rounded-[var(--radius-default)]',
  md: 'px-[var(--space-button-x-md)] py-[var(--space-button-y-md)] min-h-[var(--space-36)] min-w-[var(--space-container-content-min)] gap-[var(--space-button-gap-md)] text-style-body rounded-[var(--radius-default)]',
  lg: 'px-[var(--space-button-x-lg)] py-[var(--space-button-y-lg)] min-h-[var(--space-40)] min-w-[var(--space-container-content-min)] gap-[var(--space-button-gap-lg)] text-style-body-lg rounded-[var(--radius-default)]',
};

const DefaultChevron: React.FC<{ open: boolean }> = ({ open }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    aria-hidden="true"
    className={cn('transition-transform duration-200', open && 'rotate-180')}
  >
    <path d="M5 8l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const CheckIcon: React.FC = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3.5 8.5L6.5 11.5L12.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const Select = React.forwardRef<HTMLDivElement, SelectProps>((props, ref) => {
  const {
    appearance = 'base',
    size = 'sm',
    options = [],
    placeholder = 'Select...',
    value: valueProp,
    defaultValue,
    onChange,
    disabled = false,
    error = false,
    fullWidth = false,
    iconLeft,
    badge,
    chevron,
    showIconLeft = false,
    showBadge = false,
    onOpenChange,
    'aria-label': ariaLabel,
    className,
    ...rest
  } = props;

  const listboxId = useId();

  const [selected, setSelected] = useControllableState<string>({
    value: valueProp,
    defaultValue: defaultValue ?? '',
    onChange,
  });

  const { isOpen, open, close, toggle } = usePopoverState({
    defaultOpen: false,
    onOpenChange,
    disabled,
  });

  const [activeIndex, setActiveIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const mergedRef = mergeRefs(ref, containerRef);

  const iconBaseColor = disabled
    ? 'var(--color-text-disabled)'
    : isOpen
      ? 'var(--color-brand-primary)'
      : 'var(--color-icon-on-base)';
  const iconHoverColor = disabled
    ? undefined
    : isOpen
      ? 'var(--color-icon-on-base)'
      : 'var(--color-brand-primary)';

  useClickOutside(containerRef, close, isOpen);
  useEscapeKey(close, isOpen);

  const selectOption = useCallback(
    (val: string) => {
      setSelected(val);
      close();
    },
    [setSelected, close],
  );

  const findNextEnabled = useCallback(
    (from: number, direction: 1 | -1): number => {
      if (options.length === 0) return -1;
      for (let attempt = 0; attempt < options.length; attempt++) {
        const idx = (from + direction * (attempt + 1) + options.length * options.length) % options.length;
        const opt = options[idx];
        if (opt && !opt.disabled) return idx;
      }
      return from;
    },
    [options],
  );

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
          setActiveIndex(0);
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((i) => findNextEnabled(i, 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((i) => findNextEnabled(i, -1));
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(options.length - 1);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (activeIndex >= 0 && options[activeIndex] && !options[activeIndex].disabled) {
            selectOption(options[activeIndex].value);
          }
          break;
      }
    },
    [isOpen, disabled, activeIndex, options, open, selectOption, findNextEnabled],
  );

  useEffect(() => {
    if (activeIndex < 0 || !popoverRef.current) return;
    const el = popoverRef.current.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIndex]);

  const vcArgs: Record<string, string> = { state: isOpen ? 'open' : 'base', size };
  if (appearance) vcArgs.appearance = appearance;
  const vc = findClasses(rules, vcArgs);
  const focusRing = (contract.focusRing as string) ?? '';

  const selectedLabel = selected
    ? (() => {
        const found = options.find((o) => o.value === selected);
        return found ? (found.label ?? found.value) : selected;
      })()
    : null;

  return (
    <div ref={mergedRef} className={cn('relative', fullWidth && 'w-full min-w-0 max-w-none', className)} {...rest}>
      <div
        ref={triggerRef}
        className={cn(
          'transition-colors duration-150 font-base box-border flex flex-row items-center w-full',
          SIZE_CLASSES[size],
          ...vc,
          !disabled && !isOpen && focusRing,
          disabled ? 'cursor-not-allowed opacity-[var(--opacity-disabled)]' : 'cursor-pointer select-none',
          fullWidth && 'min-w-0 max-w-none',
        )}
        onClick={toggle}
        onKeyDown={handleTriggerKeyDown}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={activeIndex >= 0 ? `select-opt-${activeIndex}` : undefined}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
      >
        {showIconLeft && iconLeft && <IconSlot icon={iconLeft} color={iconBaseColor} hoverColor={iconHoverColor} />}

        <span className={cn('flex-1 min-w-0 text-left truncate', !selectedLabel && 'text-[var(--color-text-muted)]')}>
          {selectedLabel ?? placeholder}
        </span>

        {showBadge && badge && <div className="shrink-0 flex items-center">{badge}</div>}

        <IconSlot icon={chevron ?? <DefaultChevron open={isOpen} />} color={iconBaseColor} hoverColor={iconHoverColor} />
      </div>

      <Popover ref={popoverRef} anchorRef={triggerRef} open={isOpen} id={listboxId}>
        {options.map((opt, i) => {
          const isSelected = selected === opt.value;
          return (
            <div
              key={opt.value}
              id={`select-opt-${i}`}
              role="option"
              aria-selected={isSelected}
              aria-disabled={opt.disabled || undefined}
              className={cn(
                'flex items-center gap-2 cursor-pointer rounded-[var(--radius-default)]',
                'px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)]',
                'hover:bg-[var(--color-brand-hover-bg)] transition-colors duration-100',
                i === activeIndex && 'bg-[var(--color-brand-hover-bg)]',
                opt.disabled && 'opacity-50 cursor-not-allowed',
              )}
              onClick={() => !opt.disabled && selectOption(opt.value)}
            >
              <span className="flex-1 min-w-0 truncate">
                {opt.label ?? opt.value}
              </span>
              {isSelected && (
                <span className="shrink-0 flex items-center text-[var(--color-brand-primary)]"><CheckIcon /></span>
              )}
            </div>
          );
        })}
      </Popover>
    </div>
  );
});

Select.displayName = 'Select';
