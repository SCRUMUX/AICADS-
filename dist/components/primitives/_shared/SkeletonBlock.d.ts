import React from 'react';
/**
 * SkeletonBlock — базовый блок-заглушка.
 *
 * Анимация shimmer реализована корректно:
 * - Внешний div стоит на месте, имеет `overflow: hidden` и `position: relative`.
 * - Внутренний абсолютный div со скользящим градиентом анимируется translateX.
 * - Это гарантирует, что градиент ОБРЕЗАЕТСЯ границами блока, а не уезжает за его пределы.
 *
 * shimmer=true  → скользящий градиент поверх surface-3
 * shimmer=false → статичный surface-3
 */
interface SkeletonBlockProps {
    shimmer?: boolean;
    width?: number | string;
    height?: number | string;
    radius?: number | string;
    className?: string;
    style?: React.CSSProperties;
}
export declare const SkeletonBlock: React.MemoExoticComponent<React.ForwardRefExoticComponent<SkeletonBlockProps & React.RefAttributes<HTMLDivElement>>>;
export {};
//# sourceMappingURL=SkeletonBlock.d.ts.map