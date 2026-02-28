import { useCallback, useEffect, useRef, useState } from 'react';
import type { Placement, PositionResult } from '../types';
import { computePosition } from '../engine/computePosition';
import { DEFAULT_OFFSET } from '../engine/constants';
import { getRect } from '../utils/dom';

interface UsePositionOptions {
  targetElement: HTMLElement | null;
  placement: Placement;
  enabled: boolean;
  /** Extra padding around the highlight box — added to the tooltip offset */
  highlightPadding?: number;
}

/**
 * Hook that computes and tracks tooltip position relative to a target element.
 * Re-computes on scroll, resize, and when the target changes.
 * Retains the previous position during step transitions to avoid flicker.
 */
export function usePosition({ targetElement, placement, enabled, highlightPadding = 0 }: UsePositionOptions) {
  const [position, setPosition] = useState<PositionResult | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const update = useCallback(() => {
    if (!targetElement || !tooltipRef.current) return;

    const targetRect = getRect(targetElement);
    const tooltipRect = getRect(tooltipRef.current);

    const result = computePosition(targetRect, tooltipRect, placement, DEFAULT_OFFSET + highlightPadding);
    setPosition(result);
  }, [targetElement, placement, highlightPadding]);

  useEffect(() => {
    if (!enabled) {
      // Only clear position when guide is fully disabled (not during step transitions)
      setPosition(null);
      return;
    }

    if (!targetElement) {
      // Target not yet resolved — keep previous position to avoid flicker
      return;
    }

    // Synchronous attempt — works when tooltip already has dimensions
    update();
    // One RAF to correct if first mount had zero dimensions
    rafRef.current = requestAnimationFrame(update);

    const handleUpdate = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    // Watch tooltip size changes (e.g. images loading inside content)
    let resizeObserver: ResizeObserver | undefined;
    resizeObserver = new ResizeObserver(handleUpdate);
    if (tooltipRef.current) {
      resizeObserver.observe(tooltipRef.current);
    }
    // Also watch target element size changes
    resizeObserver.observe(targetElement);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
      resizeObserver?.disconnect();
    };
  }, [enabled, targetElement, update]);

  return { position, tooltipRef, updatePosition: update };
}
