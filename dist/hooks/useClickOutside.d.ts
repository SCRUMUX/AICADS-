import { type RefObject } from 'react';
/**
 * Calls `handler` when a click occurs outside all provided refs.
 * Attaches on mousedown for reliable detection before focus shifts.
 */
export declare function useClickOutside(refs: RefObject<HTMLElement | null> | RefObject<HTMLElement | null>[], handler: () => void, enabled?: boolean): void;
//# sourceMappingURL=useClickOutside.d.ts.map