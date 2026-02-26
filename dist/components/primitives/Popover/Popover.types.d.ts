import React from 'react';
export interface PopoverProps {
    /** Reference to the anchor element for positioning */
    anchorRef: React.RefObject<HTMLElement | null>;
    /** Whether the popover is open */
    open: boolean;
    children: React.ReactNode;
    className?: string;
    /** Maximum height of the popover. Accepts CSS value. Default: '320px'. */
    maxHeight?: string;
    /** When true the popover flips above the anchor if space below is insufficient */
    autoFlip?: boolean;
    style?: React.CSSProperties;
    /** Marks the listbox as supporting multiple selection */
    'aria-multiselectable'?: boolean;
    /** Accessible label for the listbox */
    'aria-label'?: string;
    /** ID attribute */
    id?: string;
}
//# sourceMappingURL=Popover.types.d.ts.map