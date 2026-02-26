import { useState, useCallback, useRef } from 'react';

export interface DragItem {
  id: string;
  index: number;
  data?: unknown;
}

export interface UseDragAndDropOptions<T = unknown> {
  /** List of items */
  items: T[];
  /** Extract unique id from item */
  getId: (item: T) => string;
  /** Called with reordered items after a drop */
  onReorder: (items: T[]) => void;
  /** Orientation of the list */
  orientation?: 'vertical' | 'horizontal';
  /** Whether drag is enabled */
  enabled?: boolean;
}

/**
 * Lightweight drag-and-drop reorder hook for lists.
 * Uses HTML5 Drag and Drop API.
 */
export function useDragAndDrop<T>({
  items,
  getId,
  onReorder,
  orientation = 'vertical',
  enabled = true,
}: UseDragAndDropOptions<T>) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const dragItemRef = useRef<number | null>(null);

  const handleDragStart = useCallback(
    (index: number) => (e: React.DragEvent) => {
      if (!enabled) { e.preventDefault(); return; }
      dragItemRef.current = index;
      setDragIndex(index);
      e.dataTransfer.effectAllowed = 'move';
      e.dataTransfer.setData('text/plain', getId(items[index]));
    },
    [enabled, items, getId],
  );

  const handleDragOver = useCallback(
    (index: number) => (e: React.DragEvent) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      setOverIndex(index);
    },
    [],
  );

  const handleDragEnd = useCallback(() => {
    setDragIndex(null);
    setOverIndex(null);
    dragItemRef.current = null;
  }, []);

  const handleDrop = useCallback(
    (targetIndex: number) => (e: React.DragEvent) => {
      e.preventDefault();
      const sourceIndex = dragItemRef.current;
      if (sourceIndex === null || sourceIndex === targetIndex) {
        handleDragEnd();
        return;
      }
      const reordered = [...items];
      const [removed] = reordered.splice(sourceIndex, 1);
      reordered.splice(targetIndex, 0, removed);
      onReorder(reordered);
      handleDragEnd();
    },
    [items, onReorder, handleDragEnd],
  );

  const getDragProps = useCallback(
    (index: number) => ({
      draggable: enabled,
      onDragStart: handleDragStart(index),
      onDragOver: handleDragOver(index),
      onDragEnd: handleDragEnd,
      onDrop: handleDrop(index),
      'data-dragging': dragIndex === index || undefined,
      'data-drag-over': overIndex === index || undefined,
    }),
    [enabled, dragIndex, overIndex, handleDragStart, handleDragOver, handleDragEnd, handleDrop],
  );

  return {
    getDragProps,
    dragIndex,
    overIndex,
    isDragging: dragIndex !== null,
  };
}
