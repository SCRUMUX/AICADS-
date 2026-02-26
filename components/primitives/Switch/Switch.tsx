import React, { useState, useCallback } from 'react';
import type { SwitchProps, SwitchSize, SwitchState } from './Switch.types';
import contract from '../../../contracts/components/Switch.contract.json';

type VR = { when: Record<string, string>; tailwindClasses: string[] };
const rules = (contract.variantRules || []) as unknown as VR[];

function findClasses(args: Record<string, string>): string[] {
  return rules
    .filter(r => { for (const k of Object.keys(r.when)) { if (r.when[k] !== args[k]) return false; } return true; })
    .flatMap(r => r.tailwindClasses);
}

function cn(...c: (string | undefined | false | null)[]): string {
  return c.filter(Boolean).join(' ');
}

const isOnState   = (s: SwitchState) => s === 'on'          || s === 'disabled-on';
const isDisabledState = (s: SwitchState) => s === 'disabled-on' || s === 'disabled-off';

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>((props, ref) => {
  const {
    size = 'sm',
    state: controlledState,
    disabled = false,
    defaultChecked = false,
    onToggle,
    onClick,
    children,
    className,
    ...rest
  } = props;

  // Uncontrolled internal state — used when `state` prop is not provided
  const [internalOn, setInternalOn] = useState<boolean>(
    controlledState !== undefined ? isOnState(controlledState) : defaultChecked
  );

  // Derive effective on/off from controlled or internal state
  const isControlled = controlledState !== undefined;
  const effectiveOn  = isControlled ? isOnState(controlledState!) : internalOn;

  // Resolve effective state string for variant lookup
  const effectiveState: SwitchState = (() => {
    const isDisabled = disabled || (isControlled && isDisabledState(controlledState!));
    if (isDisabled) return effectiveOn ? 'disabled-on' : 'disabled-off';
    return effectiveOn ? 'on' : 'off';
  })();

  const effectiveDisabled = effectiveState === 'disabled-on' || effectiveState === 'disabled-off';

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (effectiveDisabled) return;
    if (!isControlled) {
      setInternalOn(prev => {
        const next = !prev;
        onToggle?.(next);
        return next;
      });
    } else {
      onToggle?.(!effectiveOn);
    }
    onClick?.(e);
  }, [effectiveDisabled, isControlled, effectiveOn, onToggle, onClick]);

  const vc = findClasses({ size: size, state: effectiveState });
  const focusRing = (contract.focusRing as string) ?? '';

  return (
    <button
      ref={ref}
      type="button"
      disabled={effectiveDisabled}
      role="switch"
      aria-checked={effectiveOn}
      onClick={handleClick}
      className={cn(
        'transition-colors duration-200 box-border relative inline-flex items-center shrink-0 bg-[var(--track-bg,transparent)] border-[var(--border-width-base)] border-solid border-transparent',
        ...vc,
        !effectiveDisabled && focusRing,
        effectiveDisabled && 'cursor-not-allowed pointer-events-none',
        className
      )}
      {...rest}
    >
      {/* Thumb — slides via translateX */}
      <span
        className="absolute rounded-full transition-transform duration-200 bg-[var(--thumb-bg,var(--color-icon-on-brand))] border border-[var(--thumb-border,transparent)] shadow-sm"
        style={{
          width:     'var(--thumb-size, 12px)',
          height:    'var(--thumb-size, 12px)',
          transform: effectiveOn
            ? 'translateX(calc(100% + var(--space-2, 2px)))'
            : 'translateX(var(--space-2, 2px))',
          top:       '50%',
          marginTop: 'calc(var(--thumb-size, 12px) / -2)',
          left:      0,
        }}
      />
    </button>
  );
});

Switch.displayName = 'Switch';
