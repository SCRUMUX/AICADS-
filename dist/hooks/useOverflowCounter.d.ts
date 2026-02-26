import { type RefObject } from 'react';
interface OverflowResult {
    /** Number of items that fully fit within the container */
    visibleCount: number;
    /** Total items to render (visibleCount + 1 gradient chip if applicable) */
    renderCount: number;
    /** Number of completely hidden items (not rendered at all) */
    overflowCount: number;
    /** Whether the last rendered chip should be gradient-faded */
    showGradient: boolean;
}
/**
 * Measures children of a flex container and determines how many fit,
 * whether a partially-visible chip should be gradient-faded,
 * and how many are completely hidden.
 *
 * Layout contract:
 *   <wrapper flex>
 *     <container ref={containerRef} overflow-hidden flex-1>
 *       {selected.slice(0, renderCount).map(chip)}
 *     </container>
 *     {overflowCount > 0 && <Badge>+{overflowCount}</Badge>}
 *   </wrapper>
 *
 * The container must hold ONLY chip elements.
 * The badge is a sibling outside the container.
 *
 * Handles containers that conditionally mount/unmount (e.g. chips hidden
 * while a popover is open). When containerRef.current reappears after
 * being null, the hook re-attaches its ResizeObserver and re-measures.
 */
export declare function useOverflowCounter(containerRef: RefObject<HTMLElement | null>, totalCount: number, gap?: number): OverflowResult;
export {};
//# sourceMappingURL=useOverflowCounter.d.ts.map