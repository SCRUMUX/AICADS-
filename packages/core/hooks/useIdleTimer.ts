import { useEffect, useRef, useCallback, useState } from 'react';

export interface UseIdleTimerOptions {
  /** Timeout in ms before considered idle (default 300000 = 5 min) */
  timeout?: number;
  /** Events that reset the idle timer */
  events?: string[];
  /** Called when user becomes idle */
  onIdle?: () => void;
  /** Called when user becomes active after being idle */
  onActive?: () => void;
  /** Whether the timer is enabled */
  enabled?: boolean;
}

const DEFAULT_EVENTS = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];

/**
 * Detects user inactivity after a configurable timeout.
 * Useful for auto-logout, session warnings, etc.
 */
export function useIdleTimer({
  timeout = 300_000,
  events = DEFAULT_EVENTS,
  onIdle,
  onActive,
  enabled = true,
}: UseIdleTimerOptions = {}) {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const isIdleRef = useRef(false);

  const handleActivity = useCallback(() => {
    if (isIdleRef.current) {
      isIdleRef.current = false;
      setIsIdle(false);
      onActive?.();
    }
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      isIdleRef.current = true;
      setIsIdle(true);
      onIdle?.();
    }, timeout);
  }, [timeout, onIdle, onActive]);

  const reset = useCallback(() => {
    handleActivity();
  }, [handleActivity]);

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return;

    handleActivity();

    for (const event of events) {
      window.addEventListener(event, handleActivity, { passive: true });
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      for (const event of events) {
        window.removeEventListener(event, handleActivity);
      }
    };
  }, [enabled, events, handleActivity]);

  return { isIdle, reset };
}
