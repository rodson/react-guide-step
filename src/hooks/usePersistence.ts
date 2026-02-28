import { useCallback, useState } from 'react';

const STORAGE_PREFIX = 'rgs:';

function readCompleted(fullKey: string | null): boolean {
  if (!fullKey) return false;
  try {
    return localStorage.getItem(fullKey) === 'done';
  } catch {
    return false;
  }
}

/**
 * Hook for persisting guide completion state in localStorage.
 */
export function usePersistence(persistKey?: string) {
  const fullKey = persistKey ? `${STORAGE_PREFIX}${persistKey}` : null;

  const [isCompleted, setIsCompleted] = useState(() => readCompleted(fullKey));

  const markCompleted = useCallback(() => {
    if (!fullKey) return;
    try {
      localStorage.setItem(fullKey, 'done');
    } catch {
      // Silently fail if localStorage is unavailable
    }
    setIsCompleted(true);
  }, [fullKey]);

  const reset = useCallback(() => {
    if (!fullKey) return;
    try {
      localStorage.removeItem(fullKey);
    } catch {
      // Silently fail
    }
    setIsCompleted(false);
  }, [fullKey]);

  return { isCompleted, markCompleted, reset };
}
