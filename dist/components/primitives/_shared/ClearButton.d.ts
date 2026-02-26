import React from 'react';
interface ClearButtonProps {
    onClick: (e: React.MouseEvent) => void;
    size?: string;
    label?: string;
    className?: string;
    visible?: boolean;
}
/**
 * Shared inline clear (×) button for Input, Autocomplete, etc.
 * Only renders when `visible` is true (or defaults to true).
 */
export declare const ClearButton: React.FC<ClearButtonProps>;
export {};
//# sourceMappingURL=ClearButton.d.ts.map