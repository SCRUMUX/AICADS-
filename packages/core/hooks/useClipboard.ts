import { useState, useCallback, useRef } from 'react';

export interface UseClipboardOptions {
  /** Duration in ms to show "copied" state (default 2000) */
  resetDelay?: number;
}

/**
 * Copy text to clipboard with a "copied" state indicator.
 */
export function useClipboard(options: UseClipboardOptions = {}) {
  const { resetDelay = 2000 } = options;
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const copy = useCallback(
    async (text: string) => {
      try {
        if (timerRef.current) clearTimeout(timerRef.current);
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setError(null);
        timerRef.current = setTimeout(() => setCopied(false), resetDelay);
      } catch (err) {
        setCopied(false);
        setError(err instanceof Error ? err : new Error('Copy failed'));
      }
    },
    [resetDelay],
  );

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCopied(false);
    setError(null);
  }, []);

  return { copy, copied, error, reset };
}
