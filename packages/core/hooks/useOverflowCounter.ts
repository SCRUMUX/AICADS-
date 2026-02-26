import { useState, useLayoutEffect, useCallback, useRef, useEffect, type RefObject } from 'react';

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

const MIN_PARTIAL_WIDTH = 24;

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
export function useOverflowCounter(
  containerRef: RefObject<HTMLElement | null>,
  totalCount: number,
  gap = 4,
  enabled = true,
): OverflowResult {
  const [state, setState] = useState<OverflowResult>({
    visibleCount: totalCount,
    renderCount: totalCount,
    overflowCount: 0,
    showGradient: false,
  });
  const prevTotalRef = useRef(totalCount);
  const skipMeasureRef = useRef(false);

  const measure = useCallback(() => {
    if (!enabled) return;
    const container = containerRef.current;
    if (!container || totalCount === 0) {
      setState((prev) => {
        const next = { visibleCount: totalCount, renderCount: totalCount, overflowCount: 0, showGradient: false };
        if (
          prev.visibleCount === next.visibleCount &&
          prev.renderCount === next.renderCount &&
          prev.overflowCount === next.overflowCount &&
          prev.showGradient === next.showGradient
        ) {
          return prev;
        }
        return next;
      });
      return;
    }

    const containerWidth = container.clientWidth;
    const children = Array.from(container.children) as HTMLElement[];
    let usedWidth = 0;
    let fits = 0;
    let showGradient = false;

    for (let i = 0; i < children.length; i++) {
      const childWidth = children[i].offsetWidth + (i > 0 ? gap : 0);
      if (usedWidth + childWidth > containerWidth) {
        const remainingSpace = containerWidth - usedWidth - (i > 0 ? gap : 0);
        if (remainingSpace >= MIN_PARTIAL_WIDTH) {
          showGradient = true;
        }
        break;
      }
      usedWidth += childWidth;
      fits++;
    }

    const raw = fits + (showGradient ? 1 : 0);
    const renderCount = totalCount > 0 ? Math.max(1, raw) : 0;
    const overflowCount = Math.max(0, totalCount - renderCount);

    setState((prev) => {
      if (
        prev.visibleCount === fits &&
        prev.renderCount === renderCount &&
        prev.overflowCount === overflowCount &&
        prev.showGradient === showGradient
      ) {
        return prev;
      }
      return { visibleCount: fits, renderCount, overflowCount, showGradient };
    });
  }, [containerRef, totalCount, gap, enabled]);

  useLayoutEffect(() => {
    if (!enabled) return;
    if (prevTotalRef.current !== totalCount) {
      prevTotalRef.current = totalCount;
      setState({ visibleCount: totalCount, renderCount: totalCount, overflowCount: 0, showGradient: false });
      skipMeasureRef.current = true;
    }
  }, [totalCount, enabled]);

  useLayoutEffect(() => {
    if (!enabled) return;
    if (skipMeasureRef.current) {
      skipMeasureRef.current = false;
      return;
    }
    measure();
  }, [measure]);

  const observedElRef = useRef<HTMLElement | null>(null);
  const roRef = useRef<ResizeObserver | null>(null);
  const lastMeasureRef = useRef(measure);

  useEffect(() => () => { roRef.current?.disconnect(); }, []);

  useLayoutEffect(() => {
    if (!enabled) {
      roRef.current?.disconnect();
      observedElRef.current = null;
      return;
    }
    const container = containerRef.current;
    const elementChanged = container !== observedElRef.current;
    const measureChanged = measure !== lastMeasureRef.current;

    if (!elementChanged && !measureChanged) return;

    roRef.current?.disconnect();
    observedElRef.current = container;
    lastMeasureRef.current = measure;

    if (!container) {
      roRef.current = null;
      return;
    }

    if (elementChanged && !skipMeasureRef.current) {
      measure();
    }

    const ro = new ResizeObserver(measure);
    ro.observe(container);
    roRef.current = ro;
  }, [containerRef, measure, totalCount, enabled]);

  useEffect(() => {
    if (enabled) return;
    setState((prev) => {
      const next = { visibleCount: totalCount, renderCount: totalCount, overflowCount: 0, showGradient: false };
      if (
        prev.visibleCount === next.visibleCount &&
        prev.renderCount === next.renderCount &&
        prev.overflowCount === next.overflowCount &&
        prev.showGradient === next.showGradient
      ) {
        return prev;
      }
      return next;
    });
  }, [enabled, totalCount]);

  return state;
}
