export interface UsePopoverStateOptions {
    /** Initial open state (uncontrolled) or controlled via `open` */
    defaultOpen?: boolean;
    /** Controlled open state */
    open?: boolean;
    /** Callback when open state changes */
    onOpenChange?: (open: boolean) => void;
    /** Prevent opening */
    disabled?: boolean;
}
export interface UsePopoverStateReturn {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    setIsOpen: (v: boolean) => void;
}
/**
 * Unified hook for popover open/close state management.
 * Supports both controlled (`open` + `onOpenChange`) and uncontrolled (`defaultOpen`) modes.
 * Replaces the duplicated pattern across Dropdown, Autocomplete, and similar components.
 */
export declare function usePopoverState({ defaultOpen, open: controlledOpen, onOpenChange, disabled, }?: UsePopoverStateOptions): UsePopoverStateReturn;
//# sourceMappingURL=usePopoverState.d.ts.map