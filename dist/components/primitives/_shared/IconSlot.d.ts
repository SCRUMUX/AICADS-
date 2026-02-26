/**
 * Shared IconSlot — обёртка для иконок в компонентах.
 * Масштабирует SVG до 100%×100% контейнера, применяет currentColor.
 */
import React from 'react';
interface IconSlotProps {
    icon: React.ReactNode;
    color?: string;
    /** CSS переменная или пиксельное значение, default: var(--icon-size, 20px) */
    size?: string;
    className?: string;
}
export declare const IconSlot: React.NamedExoticComponent<IconSlotProps>;
export {};
//# sourceMappingURL=IconSlot.d.ts.map