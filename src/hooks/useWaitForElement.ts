import { useEffect, useState } from 'react';
import { getElement } from '../utils/dom';

/**
 * Hook that waits for an element to appear in the DOM using MutationObserver.
 * Returns the element once it's found, or null while waiting.
 */
export function useWaitForElement(
  target: string | HTMLElement | undefined,
  enabled: boolean,
): { element: HTMLElement | null; isWaiting: boolean } {
  const [element, setElement] = useState<HTMLElement | null>(null);
  const [isWaiting, setIsWaiting] = useState(false);

  useEffect(() => {
    if (!enabled || !target) {
      setElement(null);
      setIsWaiting(false);
      return;
    }

    // Try to find element immediately
    const found = getElement(target as string | HTMLElement);
    if (found) {
      setElement(found);
      setIsWaiting(false);
      return;
    }

    // Element not found — start observing
    setIsWaiting(true);

    if (typeof target !== 'string') {
      // If target is an HTMLElement but not in DOM, can't use MutationObserver on selector
      setIsWaiting(false);
      return;
    }

    const observer = new MutationObserver(() => {
      const el = document.querySelector<HTMLElement>(target);
      if (el) {
        setElement(el);
        setIsWaiting(false);
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [target, enabled]);

  return { element, isWaiting };
}
