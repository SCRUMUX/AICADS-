import React, { useState, useCallback } from 'react';
import type { TagProps, TagSize, TagState } from './Tag.types';
import { cn, findClasses, getFocusRing, IconSlot, type VR } from '../_shared';
import contract from '../../../contracts/components/Tag.contract.json';

const rules = (contract.variantRules || []) as unknown as VR[];

const SIZE_CLASSES: Record<TagSize, string> = {
  sm: 'px-[var(--space-tag-x-sm)] py-[var(--space-tag-y-sm)] min-h-[var(--space-22)] max-h-[var(--space-22)] min-w-[var(--space-22)] gap-[var(--space-tag-gap)] text-style-caption-xs rounded-[var(--radius-pill)] [--icon-size:16px]',
  md: 'px-[var(--space-tag-x-md)] py-[var(--space-tag-y-md)] min-h-[var(--space-24)] max-h-[var(--space-24)] min-w-[var(--space-24)] gap-[var(--space-tag-gap)] text-style-caption rounded-[var(--radius-pill)] [--icon-size:16px]',
  lg: 'px-[var(--space-tag-x-lg)] py-[var(--space-tag-y-lg)] min-h-[var(--space-32)] max-h-[var(--space-32)] min-w-[var(--space-32)] gap-[var(--space-tag-gap)] text-style-body rounded-[var(--radius-pill)] [--icon-size:20px]',
};

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>((props, ref) => {
  const {
    appearance = 'base',
    size = 'sm',
    state: controlledState,
    iconLeft,
    iconRight,
    showLeftIcon = false,
    showRightIcon = false,
    removable = false,
    onRemove,
    value,
    children,
    className,
    onClick,
    onMouseEnter,
    onMouseLeave,
    ...rest
  } = props;

  const [internalState, setInternalState] = useState<TagState>('base');
  const effectiveState: TagState = controlledState ?? internalState;

  const vc = findClasses(rules, { appearance, size, state: effectiveState });
  const focusRing = getFocusRing(contract, appearance);

  const he = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (!controlledState) setInternalState('hover');
      onMouseEnter?.(e);
    },
    [controlledState, onMouseEnter],
  );
  const hl = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (!controlledState) setInternalState('base');
      onMouseLeave?.(e);
    },
    [controlledState, onMouseLeave],
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onRemove?.(value);
    },
    [onRemove, value],
  );

  const isClickable = !!onClick;

  return (
    <span
      ref={ref}
      className={cn(
        'transition-colors duration-150 font-base box-border inline-flex flex-row justify-center items-center border-[var(--border-width-base)] border-solid',
        SIZE_CLASSES[size],
        ...vc,
        focusRing,
        className,
      )}
      onMouseEnter={he}
      onMouseLeave={hl}
      onClick={onClick}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      {...rest}
    >
      {showLeftIcon && iconLeft && <IconSlot icon={iconLeft} />}
      <span className="truncate">{children}</span>
      {showRightIcon && iconRight && !removable && <IconSlot icon={iconRight} />}
      {removable && (
        <span
          role="button"
          tabIndex={-1}
          aria-label={`Remove ${typeof children === 'string' ? children : ''}`}
          onClick={handleRemove}
          className="shrink-0 flex items-center justify-center cursor-pointer opacity-60 hover:opacity-100 transition-opacity"
          style={{ width: 'var(--icon-size, 16px)', height: 'var(--icon-size, 16px)' }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
            <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      )}
    </span>
  );
});

Tag.displayName = 'Tag';
