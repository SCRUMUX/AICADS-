import { useState, useLayoutEffect, useCallback, useRef, useEffect } from "react";
const MIN_PARTIAL_WIDTH = 24;
function useOverflowCounter(containerRef, totalCount, gap = 4) {
  const [state, setState] = useState({
    visibleCount: totalCount,
    renderCount: totalCount,
    overflowCount: 0,
    showGradient: false
  });
  const prevTotalRef = useRef(totalCount);
  const skipMeasureRef = useRef(false);
  const measure = useCallback(() => {
    const container = containerRef.current;
    if (!container || totalCount === 0) {
      setState({ visibleCount: totalCount, renderCount: totalCount, overflowCount: 0, showGradient: false });
      return;
    }
    const containerWidth = container.clientWidth;
    const children = Array.from(container.children);
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
    setState({ visibleCount: fits, renderCount, overflowCount, showGradient });
  }, [containerRef, totalCount, gap]);
  useLayoutEffect(() => {
    if (prevTotalRef.current !== totalCount) {
      prevTotalRef.current = totalCount;
      setState({ visibleCount: totalCount, renderCount: totalCount, overflowCount: 0, showGradient: false });
      skipMeasureRef.current = true;
    }
  }, [totalCount]);
  useLayoutEffect(() => {
    if (skipMeasureRef.current) {
      skipMeasureRef.current = false;
      return;
    }
    measure();
  }, [measure, state.visibleCount]);
  const observedElRef = useRef(null);
  const roRef = useRef(null);
  const lastMeasureRef = useRef(measure);
  useEffect(() => () => {
    roRef.current?.disconnect();
  }, []);
  useLayoutEffect(() => {
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
  });
  return state;
}
export {
  useOverflowCounter
};
