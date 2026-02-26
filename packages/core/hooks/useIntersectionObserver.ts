import { useEffect, useRef, useState, type RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
  /** Set to false to skip observing (e.g. when lazy loading is disabled) */
  enabled?: boolean;
}

/**
 * Observe an element's visibility via IntersectionObserver.
 *
 * Overload 1 (no external ref): returns [ref, isIntersecting, entry].
 * Overload 2 (external ref): returns isIntersecting boolean.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  options?: UseIntersectionObserverOptions,
): [RefObject<T | null>, boolean, IntersectionObserverEntry | null];

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  externalRef: RefObject<T | null>,
  options?: UseIntersectionObserverOptions,
): boolean;

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  refOrOptions?: RefObject<T | null> | UseIntersectionObserverOptions,
  maybeOptions?: UseIntersectionObserverOptions,
): [RefObject<T | null>, boolean, IntersectionObserverEntry | null] | boolean {
  const hasExternalRef = refOrOptions !== undefined && 'current' in (refOrOptions as object);
  const externalRef = hasExternalRef ? (refOrOptions as RefObject<T | null>) : undefined;
  const options: UseIntersectionObserverOptions = hasExternalRef
    ? (maybeOptions ?? {})
    : ((refOrOptions as UseIntersectionObserverOptions) ?? {});

  const internalRef = useRef<T | null>(null);
  const ref = externalRef ?? internalRef;
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

  const enabled = options.enabled !== false;

  useEffect(() => {
    const node = ref.current;
    if (!enabled || !node || typeof IntersectionObserver === 'undefined') {
      if (!enabled) setIsIntersecting(false);
      return;
    }

    const { root = null, rootMargin = '0px', threshold = 0, once = false } = options;

    const observer = new IntersectionObserver(
      ([e]) => {
        setIsIntersecting(e.isIntersecting);
        setEntry(e);
        if (once && e.isIntersecting) observer.disconnect();
      },
      { root, rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, enabled, options.root, options.rootMargin, options.threshold, options.once]);

  if (hasExternalRef) return isIntersecting;
  return [ref as RefObject<T | null>, isIntersecting, entry];
}
