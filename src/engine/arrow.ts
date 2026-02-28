import type { Placement } from '../types';
import { ARROW_SIZE } from './constants';

type ArrowSide = 'top' | 'bottom' | 'left' | 'right';

/**
 * Get which side of the tooltip the arrow should appear on.
 * The arrow points FROM the tooltip TOWARD the target.
 */
export function getArrowSide(placement: Placement): ArrowSide {
  const side = placement.split('-')[0];
  // If tooltip is on top, arrow is at the bottom of the tooltip pointing down
  const map: Record<string, ArrowSide> = {
    top: 'bottom',
    bottom: 'top',
    left: 'right',
    right: 'left',
    center: 'top',
  };
  return map[side] || 'top';
}

/**
 * Get CSS styles for the arrow element based on its position and the resolved placement.
 */
export function getArrowStyle(
  arrowPos: { x: number; y: number },
  placement: Placement,
): React.CSSProperties {
  const arrowSide = getArrowSide(placement);
  const size = ARROW_SIZE;

  const base: React.CSSProperties = {
    position: 'absolute',
    width: 0,
    height: 0,
    borderStyle: 'solid',
    borderTopWidth: size,
    borderBottomWidth: size,
    borderLeftWidth: size,
    borderRightWidth: size,
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  };

  switch (arrowSide) {
    case 'bottom':
      return {
        ...base,
        left: arrowPos.x - size,
        bottom: -size,
        borderBottomWidth: 0,
        borderTopColor: 'var(--rgs-bg)',
      };
    case 'top':
      return {
        ...base,
        left: arrowPos.x - size,
        top: -size,
        borderTopWidth: 0,
        borderBottomColor: 'var(--rgs-bg)',
      };
    case 'right':
      return {
        ...base,
        top: arrowPos.y - size,
        right: -size,
        borderRightWidth: 0,
        borderLeftColor: 'var(--rgs-bg)',
      };
    case 'left':
      return {
        ...base,
        top: arrowPos.y - size,
        left: -size,
        borderLeftWidth: 0,
        borderRightColor: 'var(--rgs-bg)',
      };
  }
}
