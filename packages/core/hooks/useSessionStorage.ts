import { useState, useCallback } from 'react';

/**
 * Like useLocalStorage, but for sessionStorage.
 * Persists state across page reloads within the same tab.
 */
export function useSessionStorage<T>(
  key: string,
  initialValue: T,
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue;
    try {
      const item = sessionStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          sessionStorage.setItem(key, JSON.stringify(next));
        } catch { /* quota exceeded — fail silently */ }
        return next;
      });
    },
    [key],
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    try { sessionStorage.removeItem(key); } catch { /* noop */ }
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}
