import React, { useState, useCallback, useEffect, useRef, useId, useMemo } from 'react';
import type { DropdownProps, DropdownSize, DropdownOption } from './Dropdown.types';
import { cn, findClasses, type VR } from '../_shared';
import { IconSlot } from '../_shared/IconSlot';
import { ClearButton } from '../_shared/ClearButton';
import { Popover } from '../_shared/Popover';
import { Chip } from '../Chip/Chip';
import { Checkbox } from '../Checkbox/Checkbox';
import { Badge } from '../Badge/Badge';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import { useControllableState } from '../../../hooks/useControllableState';
import { useClickOutside } from '../../../hooks/useClickOutside';
import { useEscapeKey } from '../../../hooks/useEscapeKey';
import { usePopoverState } from '../../../hooks/usePopoverState';
import { useOverflowCounter } from '../../../hooks/useOverflowCounter';
import { mergeRefs } from '../../../hooks/mergeRefs';
import contract from '../../../contracts/components/Dropdown.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

const SIZE_CLASSES: Record<DropdownSize, string> = {
  sm: 'px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)] min-h-[var(--space-28)] min-w-[var(--space-container-compact-min)] max-w-[var(--space-container-compact-max)] gap-[var(--space-button-gap-sm)] text-style-caption rounded-[var(--radius-default)]',
  md: 'px-[var(--space-button-x-md)] py-[var(--space-button-y-md)] min-h-[var(--space-36)] min-w-[var(--space-container-content-min)] max-w-[var(--space-container-content-max)] gap-[var(--space-button-gap-md)] text-style-body rounded-[var(--radius-default)]',
  lg: 'px-[var(--space-button-x-lg)] py-[var(--space-button-y-lg)] min-h-[var(--space-40)] min-w-[var(--space-container-content-min)] max-w-[var(--space-container-wide-max)] gap-[var(--space-button-gap-lg)] text-style-body-lg rounded-[var(--radius-default)]',
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

export const Dropdown = React.forwardRef<HTMLDivElement, DropdownProps>((props, ref) => {
  const {
    state = 'closed',
    size = 'sm',
    appearance,
    iconLeft,
    tagRow,
    badge,
    chevron,
    showSubmenu = true,
    showIconLeft = false,
    showBadge = false,
    showTagRow = false,
    items,
    options,
    value: valueProp,
    defaultValue,
    onChange,
    multiple = false,
    allowExclude = false,
    excludedValues: excludedProp,
    defaultExcludedValues,
    onExcludedChange,
    disabled = false,
    placeholder = 'Select...',
    'aria-label': ariaLabel,
    onOpenChange,
    fullWidth = false,
    showClearButton = false,
    onClear,
    children,
    className,
    ...rest
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    if (showSubmenu !== undefined) console.warn('[Dropdown] `showSubmenu` is deprecated and has no effect. Submenu is controlled via `submenuItems` on DropdownItem.');
    if ((props as any).maxVisibleChips !== undefined) console.warn('[Dropdown] `maxVisibleChips` is deprecated. Chips now dynamically fill available width.');
  }

  const listboxId = useId();

  const normalizedValue = useMemo(
    () => {
      if (valueProp === undefined) return undefined;
      return Array.isArray(valueProp) ? valueProp : [valueProp];
    },
    [valueProp],
  );

  const normalizedDefault = useMemo(
    () => {
      if (defaultValue === undefined) return [];
      return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
    },
    [defaultValue],
  );

  const [selected, setSelected] = useControllableState<string[]>({
    value: normalizedValue,
    defaultValue: normalizedDefault,
    onChange: (v) => onChange?.(multiple ? v : v[0] ?? ''),
  });

  const [excluded, setExcluded] = useControllableState<string[]>({
    value: excludedProp,
    defaultValue: defaultExcludedValues ?? [],
    onChange: (v) => onExcludedChange?.(v),
  });

  const { isOpen, open: openPopover, close: closePopover, toggle } = usePopoverState({
    defaultOpen: state === 'open',
    onOpenChange,
    disabled,
  });

  const [activeIndex, setActiveIndex] = useState(-1);

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

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const mergedRef = mergeRefs(ref, containerRef);

  const optionList = options ?? [];
  const itemCount = items?.length ?? optionList.length;

  const allChipValues = useMemo(() => [...selected, ...excluded], [selected, excluded]);
  const { renderCount, overflowCount, showGradient } = useOverflowCounter(chipsRef, allChipValues.length);

  const close = useCallback(() => {
    closePopover();
    setActiveIndex(-1);
  }, [closePopover]);

  const open = useCallback(() => {
    openPopover();
    setActiveIndex(0);
  }, [openPopover]);

  useClickOutside(containerRef, close, isOpen);
  useEscapeKey(close, isOpen);

  const toggleOption = useCallback(
    (val: string) => {
      if (multiple) {
        if (allowExclude) {
          const isSelected = selected.includes(val);
          const isExcluded = excluded.includes(val);
          if (!isSelected && !isExcluded) {
            setSelected((prev) => [...prev, val]);
          } else if (isSelected) {
            setSelected((prev) => prev.filter((v) => v !== val));
            setExcluded((prev) => [...prev, val]);
          } else {
            setExcluded((prev) => prev.filter((v) => v !== val));
          }
        } else {
          setSelected((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val],
          );
        }
      } else {
        setSelected([val]);
        close();
      }
    },
    [multiple, allowExclude, selected, excluded, setSelected, setExcluded, close],
  );

  const removeChip = useCallback(
    (val?: string) => {
      if (val) {
        setSelected((prev) => prev.filter((v) => v !== val));
        setExcluded((prev) => prev.filter((v) => v !== val));
      }
    },
    [setSelected, setExcluded],
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setSelected([]);
      setExcluded([]);
      onClear?.();
    },
    [setSelected, setExcluded, onClear],
  );

  const findNextEnabled = useCallback(
    (from: number, direction: 1 | -1): number => {
      if (itemCount === 0) return -1;
      for (let attempt = 0; attempt < itemCount; attempt++) {
        const idx = (from + direction * (attempt + 1) + itemCount * itemCount) % itemCount;
        const opt = optionList[idx];
        if (!opt || !opt.disabled) return idx;
      }
      return from;
    },
    [itemCount, optionList],
  );

  const findFirstEnabled = useCallback(
    (from: number, direction: 1 | -1): number => {
      const start = direction === 1 ? 0 : itemCount - 1;
      for (let i = start; direction === 1 ? i < itemCount : i >= 0; i += direction) {
        const opt = optionList[i];
        if (!opt || !opt.disabled) return i;
      }
      return from;
    },
    [itemCount, optionList],
  );

  const handleTriggerKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;

      if (!isOpen) {
        if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open();
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
          setActiveIndex(findFirstEnabled(0, 1));
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(findFirstEnabled(itemCount - 1, -1));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (activeIndex >= 0) {
            if (optionList.length > 0) {
              const opt = optionList[activeIndex];
              if (opt && !opt.disabled) toggleOption(opt.value);
            } else if (items?.[activeIndex]) {
              items[activeIndex].onClick?.();
              close();
            }
          }
          break;
      }
    },
    [isOpen, disabled, activeIndex, itemCount, optionList, items, open, close, toggleOption, findNextEnabled, findFirstEnabled],
  );

  useEffect(() => {
    if (activeIndex < 0 || !popoverRef.current) return;
    const el = popoverRef.current.children[activeIndex] as HTMLElement | undefined;
    el?.scrollIntoView?.({ block: 'nearest' });
  }, [activeIndex]);

  const vcArgs: Record<string, string> = { state: isOpen ? 'open' : 'closed', size };
  if (appearance) vcArgs.appearance = appearance;
  const vc = findClasses(rules, vcArgs);
  const focusRing = (contract.focusRing as string) ?? '';

  const optionMap = useMemo(
    () => new Map(optionList.map((o) => [o.value, o.label ?? o.value])),
    [optionList],
  );

  const hasSelection = allChipValues.length > 0;
  const hasMeaningfulSelection = allChipValues.length > 0 && allChipValues.some(v => v !== '');
  const useStructuredOptions = optionList.length > 0;
  const clearVisible = showClearButton && hasMeaningfulSelection && !disabled;

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
        style={{
          ...(fullWidth ? { maxWidth: 'none', minWidth: 0 } : undefined),
        }}
        onClick={toggle}
        onKeyDown={handleTriggerKeyDown}
        role="combobox"
        tabIndex={disabled ? -1 : 0}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        aria-activedescendant={activeIndex >= 0 ? `dropdown-opt-${activeIndex}` : undefined}
        aria-label={ariaLabel}
        aria-disabled={disabled || undefined}
      >
        {showIconLeft && iconLeft && <IconSlot icon={iconLeft} color={iconBaseColor} hoverColor={iconHoverColor} />}

        {multiple && hasSelection ? (
          <div className="flex-1 min-w-0 flex items-center gap-1">
            <div
              ref={chipsRef}
              className="flex items-center gap-1 overflow-hidden flex-1 min-w-0"
              style={showGradient ? {
                maskImage: 'linear-gradient(to right, black calc(100% - 24px), transparent)',
                WebkitMaskImage: 'linear-gradient(to right, black calc(100% - 24px), transparent)',
              } : undefined}
            >
              {allChipValues.slice(0, renderCount).map((val) => {
                const isExcluded = excluded.includes(val);
                return (
                  <Chip
                    key={`${isExcluded ? 'ex-' : ''}${val}`}
                    size="sm"
                    value={val}
                    state={isExcluded ? 'exclude' : undefined}
                    onClose={removeChip}
                    onClick={(e) => e.stopPropagation()}
                    className="shrink-0"
                  >
                    {isExcluded ? `\u2212 ${optionMap.get(val) ?? val}` : (optionMap.get(val) ?? val)}
                  </Chip>
                );
              })}
            </div>
            {overflowCount > 0 && (
              <Badge appearance="brand" size="sm" className="shrink-0">+{overflowCount}</Badge>
            )}
          </div>
        ) : (
          <>
            {showTagRow && tagRow && <div className="shrink-0 flex items-center">{tagRow}</div>}
            <span className={cn('flex-1 min-w-0 text-left truncate', !hasSelection && 'text-[var(--color-text-muted)]')}>
              {hasSelection && !multiple
                ? optionMap.get(selected[0]) ?? selected[0] ?? children
                : children ?? placeholder}
            </span>
          </>
        )}

        {showBadge && badge && <div className="shrink-0 flex items-center">{badge}</div>}

        {clearVisible && <ClearButton onClick={handleClear} visible />}

        <IconSlot icon={chevron ?? <DefaultChevron open={isOpen} />} color={iconBaseColor} hoverColor={iconHoverColor} />
      </div>

      <Popover ref={popoverRef} anchorRef={triggerRef} open={isOpen} id={listboxId} aria-multiselectable={multiple}>
        {multiple && hasSelection && (
          <div className="flex flex-wrap gap-1 pb-1 border-b border-[var(--color-divider)] mb-1">
            {selected.map((val) => (
              <Chip key={val} size="sm" value={val} onClose={removeChip}>
                {optionMap.get(val) ?? val}
              </Chip>
            ))}
            {excluded.map((val) => (
              <Chip key={`ex-${val}`} size="sm" value={val} state="exclude" onClose={removeChip}>
                {`\u2212 ${optionMap.get(val) ?? val}`}
              </Chip>
            ))}
          </div>
        )}

        {useStructuredOptions
          ? optionList.map((opt, i) => {
              const isSelected = selected.includes(opt.value);
              const isExcluded = excluded.includes(opt.value);
              return (
                <div
                  key={opt.value}
                  id={`dropdown-opt-${i}`}
                  role="option"
                  aria-selected={isSelected}
                  aria-disabled={opt.disabled || undefined}
                  className={cn(
                    'flex items-center cursor-pointer rounded-[var(--radius-default)]',
                    multiple ? 'gap-[var(--space-20)]' : 'gap-2',
                    'px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)]',
                    'hover:bg-[var(--color-surface-3)] transition-colors duration-100',
                    i === activeIndex && 'bg-[var(--color-surface-3)]',
                    opt.disabled && 'opacity-50 cursor-not-allowed',
                  )}
                  onClick={() => !opt.disabled && toggleOption(opt.value)}
                >
                  {multiple && (
                    <span className="pointer-events-none shrink-0 flex items-center">
                      <Checkbox size="md" checked={isSelected} exclude={isExcluded} onChange={() => {}} />
                    </span>
                  )}
                  <span className={cn('flex-1 min-w-0 truncate', isExcluded && 'line-through text-[var(--color-text-muted)]')}>
                    {opt.label ?? opt.value}
                  </span>
                  {!multiple && isSelected && (
                    <span className="shrink-0 flex items-center text-[var(--color-brand-primary)]"><CheckIcon /></span>
                  )}
                </div>
              );
            })
          : items
            ? items.map(({ onClick, children: itemChildren, ...itemProps }, i) => (
                <DropdownItem
                  key={i}
                  id={`dropdown-opt-${i}`}
                  size={size}
                  {...itemProps}
                  className={cn(
                    'cursor-pointer rounded-[var(--radius-default)] hover:bg-[var(--color-surface-3)] transition-colors duration-100 px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)]',
                    i === activeIndex && 'bg-[var(--color-surface-3)]',
                    itemProps.className,
                  )}
                  onClick={() => {
                    onClick?.();
                    close();
                  }}
                  role="option"
                  aria-selected={i === activeIndex}
                >
                  {itemChildren}
                </DropdownItem>
              ))
            : children}
      </Popover>
    </div>
  );
});

Dropdown.displayName = 'Dropdown';
