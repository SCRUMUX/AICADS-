import { useState, useCallback } from "react";
function usePopoverState({
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  disabled = false
} = {}) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = controlledOpen !== void 0;
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const setIsOpen = useCallback(
    (value) => {
      if (!isControlled) setInternalOpen(value);
      onOpenChange?.(value);
    },
    [isControlled, onOpenChange]
  );
  const open = useCallback(() => {
    if (disabled) return;
    setIsOpen(true);
  }, [disabled, setIsOpen]);
  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);
  const toggle = useCallback(() => {
    if (isOpen) close();
    else open();
  }, [isOpen, close, open]);
  return { isOpen, open, close, toggle, setIsOpen };
}
export {
  usePopoverState
};
