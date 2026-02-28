import { useEffect } from 'react';

interface UseKeyboardOptions {
  enabled: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

/**
 * Hook for keyboard navigation in the guide.
 * ArrowRight / Enter = next, ArrowLeft = prev, Escape = skip
 */
export function useKeyboard({ enabled, onNext, onPrev, onSkip }: UseKeyboardOptions) {
  useEffect(() => {
    if (!enabled) return;

    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowRight':
        case 'Enter':
          e.preventDefault();
          onNext();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          onPrev();
          break;
        case 'Escape':
          e.preventDefault();
          onSkip();
          break;
      }
    };

    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [enabled, onNext, onPrev, onSkip]);
}
