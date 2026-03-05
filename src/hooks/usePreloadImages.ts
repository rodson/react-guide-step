import { useCallback, useEffect, useRef, useState } from 'react';
import type { GuideStep } from '../types';

/**
 * Preloads all images declared in steps[].preloadImages when the guide
 * becomes active, and tracks whether the *current* step's images are ready.
 */
export function usePreloadImages(
  steps: GuideStep[],
  currentStep: number,
  isActive: boolean,
) {
  const cache = useRef<Map<string, boolean>>(new Map());
  const [ready, setReady] = useState(true);
  const currentStepRef = useRef(currentStep);
  const stepsRef = useRef(steps);

  currentStepRef.current = currentStep;
  stepsRef.current = steps;

  const checkCurrent = useCallback(() => {
    const urls = stepsRef.current[currentStepRef.current]?.preloadImages;
    if (!urls || urls.length === 0) {
      setReady(true);
      return;
    }
    const allLoaded = urls.every((url) => cache.current.get(url) === true);
    setReady(allLoaded);
  }, []);

  // Kick off preloading for ALL steps once the guide activates
  useEffect(() => {
    if (!isActive) {
      cache.current.clear();
      return;
    }

    const allUrls = new Set<string>();
    for (const step of steps) {
      step.preloadImages?.forEach((url) => allUrls.add(url));
    }

    for (const url of allUrls) {
      if (cache.current.has(url)) continue;
      const img = new Image();
      img.src = url;
      // Check if the image is already cached by the browser
      if (img.complete && img.naturalWidth > 0) {
        cache.current.set(url, true);
      } else {
        cache.current.set(url, false);
        const onDone = () => {
          cache.current.set(url, true);
          checkCurrent();
        };
        img.onload = onDone;
        img.onerror = onDone;
      }
    }

    checkCurrent();
  }, [isActive, steps, checkCurrent]);

  // Re-check whenever the current step changes
  useEffect(() => {
    checkCurrent();
  }, [currentStep, checkCurrent]);

  return ready;
}
