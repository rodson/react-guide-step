import { useCallback } from 'react';

/**
 * Hook that scrolls a target element into the viewport if needed.
 */
export function useScrollIntoView(behavior: ScrollBehavior = 'smooth') {
  const scrollTo = useCallback(
    (el: HTMLElement | null) => {
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const inView =
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth;

      if (!inView) {
        el.scrollIntoView({ behavior, block: 'center', inline: 'center' });
      }
    },
    [behavior],
  );

  return scrollTo;
}
