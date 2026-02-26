import { useState, useCallback } from 'react';

export interface UseKeyboardNavigationOptions {
  /** Total number of navigable items */
  itemCount: number;
  /** Whether the list is currently visible/active */
  enabled?: boolean;
  /** Wrap around when reaching the end/start */
  loop?: boolean;
  /** Orientation for arrow key mapping */
  orientation?: 'vertical' | 'horizontal';
  /** Called when an item is activated (Enter/Space) */
  onActivate?: (index: number) => void;
  /** Called when Escape is pressed */
  onEscape?: () => void;
  /** Check if an item at index is disabled */
  isItemDisabled?: (index: number) => boolean;
}

/**
 * Keyboard navigation for lists, dropdowns, menus.
 * Returns [activeIndex, setActiveIndex, onKeyDown].
 */
export function useKeyboardNavigation({
  itemCount,
  enabled = true,
  loop = true,
  orientation = 'vertical',
  onActivate,
  onEscape,
  isItemDisabled,
}: UseKeyboardNavigationOptions): [
  number,
  React.Dispatch<React.SetStateAction<number>>,
  (e: React.KeyboardEvent) => void,
] {
  const [activeIndex, setActiveIndex] = useState(-1);

  const findNext = useCallback(
    (from: number, direction: 1 | -1): number => {
      if (itemCount === 0) return -1;
      for (let attempt = 0; attempt < itemCount; attempt++) {
        const candidate = loop
          ? (from + direction * (attempt + 1) + itemCount * itemCount) % itemCount
          : from + direction * (attempt + 1);
        if (candidate < 0 || candidate >= itemCount) return from;
        if (!isItemDisabled?.(candidate)) return candidate;
      }
      return from;
    },
    [itemCount, loop, isItemDisabled],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!enabled || itemCount === 0) return;

      const prev = orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
      const next = orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';

      switch (e.key) {
        case next:
          e.preventDefault();
          setActiveIndex((i) => findNext(i, 1));
          break;
        case prev:
          e.preventDefault();
          setActiveIndex((i) => findNext(i, -1));
          break;
        case 'Home':
          e.preventDefault();
          setActiveIndex(findNext(-1, 1));
          break;
        case 'End':
          e.preventDefault();
          setActiveIndex(findNext(itemCount, -1));
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (activeIndex >= 0) onActivate?.(activeIndex);
          break;
        case 'Escape':
          e.preventDefault();
          onEscape?.();
          break;
      }
    },
    [enabled, itemCount, orientation, activeIndex, findNext, onActivate, onEscape],
  );

  return [activeIndex, setActiveIndex, onKeyDown];
}
