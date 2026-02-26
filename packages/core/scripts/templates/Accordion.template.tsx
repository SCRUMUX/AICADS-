/**
 * AUTO-GENERATED – do not edit by hand.
 * Regenerate: npm run components:generate
 */
import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { AccordionProps, AccordionState, AccordionSize, AccordionInteraction } from './Accordion.types';
import contract from '../../../contracts/components/Accordion.contract.json';
import { cn, findClasses, type VR } from '../_shared';
import { IconSlot } from '../_shared/IconSlot';
import { useControllableState } from '../../../hooks/useControllableState';

const AccordionChevron: React.FC<{ open: boolean }> = ({ open }) => (
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

const rules = (contract.variantRules || []) as unknown as VR[];

const HEADER_CLASSES: Record<AccordionSize, string> = {
  sm: 'px-[var(--space-button-x-sm)] py-[var(--space-button-y-sm)] gap-[var(--space-button-gap-sm)] text-style-caption [--icon-size:20px]',
  md: 'px-[var(--space-button-x-md)] py-[var(--space-button-y-md)] gap-[var(--space-button-gap-md)] text-style-body [--icon-size:20px]',
  lg: 'px-[var(--space-button-x-lg)] py-[var(--space-button-y-lg)] gap-[var(--space-button-gap-lg)] text-style-body-lg [--icon-size:24px]',
};

const ROOT_CLASSES: Record<AccordionSize, string> = {
  sm: '',
  md: '',
  lg: '',
};

const CONTENT_PAD: Record<AccordionSize, string> = {
  sm: 'px-[var(--space-button-x-sm)] pb-[var(--space-button-y-sm)]',
  md: 'px-[var(--space-button-x-md)] pb-[var(--space-button-y-md)]',
  lg: 'px-[var(--space-button-x-lg)] pb-[var(--space-button-y-lg)]',
};

const CONTENT_TEXT_MAP: Record<AccordionSize, string> = {
  sm: 'text-style-caption-xs',
  md: 'text-style-body-sm',
  lg: 'text-style-body',
};

export const Accordion = React.forwardRef<HTMLDivElement, AccordionProps>((props, ref) => {
  const {
    state: stateProp,
    size = 'sm',
    interaction: controlledState,
    iconLeft1,
    iconLeft2,
    badge,
    chevron,
    showIconLeft1 = false,
    showIconLeft2 = false,
    showBadge = false,
    showTopBorder = false,
    fullWidth = false,
    content,
    onToggle,
    children,
    className,
    ...rest
  } = props;

  if (process.env.NODE_ENV !== 'production') {
    if (chevron !== undefined) console.warn('[Accordion] `chevron` is deprecated. The chevron icon is now rendered internally.');
  }

  const [isOpen, setIsOpen] = useControllableState<boolean>({
    value: stateProp !== undefined ? stateProp === 'open' : undefined,
    defaultValue: false,
  });
  const handleToggle = useCallback(() => { setIsOpen(p => !p); onToggle?.(); }, [setIsOpen, onToggle]);

  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState(0);
  const [transitionDone, setTransitionDone] = useState(!isOpen);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
    if (!isOpen) setTransitionDone(false);
  }, [isOpen, content, children]);

  const handleTransitionEnd = useCallback(() => {
    if (isOpen && contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
      setTransitionDone(true);
    }
  }, [isOpen]);

  const effectiveState: AccordionInteraction = controlledState === 'disabled' ? 'disabled' : 'base';
  const isDisabled = effectiveState === 'disabled';

  const vc = findClasses(rules, { state: isOpen ? 'open' : 'closed', size: size, interaction: effectiveState });
  const vcFiltered = vc.filter(c => !c.startsWith('border') && !c.startsWith('rounded'));
  const focusRing = (contract.focusRing as string) ?? '';

  const iconBaseColor = isDisabled
    ? 'var(--color-text-disabled)'
    : isOpen
      ? 'var(--color-brand-primary)'
      : 'var(--color-icon-on-base)';
  const iconHoverColor = isDisabled
    ? undefined
    : isOpen
      ? 'var(--color-icon-on-base)'
      : 'var(--color-brand-primary)';

  return (
    <div
      ref={ref as any}
      className={cn(
        'transition-colors duration-150 font-base box-border flex flex-col relative overflow-hidden',
        showTopBorder && isOpen && 'border-t-2 border-t-[var(--color-brand-primary)]',
        ...vcFiltered,
        ROOT_CLASSES[size],
        !isOpen && focusRing,
        fullWidth && 'w-full max-w-none min-w-0',
        className
      )}
      data-state={isOpen ? 'open' : 'closed'}
      {...rest}
    >
      <div
        className={cn(
          'flex min-w-0 items-center cursor-pointer w-full',
          HEADER_CLASSES[size],
        )}
        role="button"
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleToggle(); } }}
      >
        {showIconLeft1 && iconLeft1 && (
          <IconSlot icon={iconLeft1} color={iconBaseColor} hoverColor={iconHoverColor} onClick={(e) => e.stopPropagation()} />
        )}
        {showIconLeft2 && iconLeft2 && (
          <IconSlot icon={iconLeft2} color={iconBaseColor} hoverColor={iconHoverColor} onClick={(e) => e.stopPropagation()} />
        )}
        <span className="flex-1 min-w-0">{children}</span>
        {showBadge && badge && <div className="shrink-0">{badge}</div>}
        <IconSlot icon={<AccordionChevron open={isOpen} />} color={iconBaseColor} hoverColor={iconHoverColor} />
      </div>
      <div
        style={{
          maxHeight: isOpen ? contentHeight : 0,
          overflow: isOpen && transitionDone ? 'visible' : 'hidden',
          transition: 'max-height 200ms ease-out',
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <div ref={contentRef} className={cn('w-full', CONTENT_TEXT_MAP[size], CONTENT_PAD[size], 'pt-[var(--space-8)]')}>
          {content ?? 'Accordion content...'}
        </div>
      </div>
    </div>
  );
});

Accordion.displayName = 'Accordion';
