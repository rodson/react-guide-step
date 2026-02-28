import type { Placement, PositionResult } from '../types';
import { DEFAULT_OFFSET, OPPOSITE_SIDE } from './constants';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

function getSide(placement: Placement): string {
  return placement.split('-')[0];
}

function getAlignment(placement: Placement): string {
  return placement.split('-')[1] || 'center';
}

/**
 * Compute the raw (x, y) position for a tooltip relative to a target rect.
 */
function computeRawPosition(
  target: Rect,
  tooltip: Rect,
  placement: Placement,
  offset: number,
): { x: number; y: number } {
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  let x = 0;
  let y = 0;

  // Primary axis (which side of the target)
  switch (side) {
    case 'top':
      y = target.y - tooltip.height - offset;
      break;
    case 'bottom':
      y = target.y + target.height + offset;
      break;
    case 'left':
      x = target.x - tooltip.width - offset;
      break;
    case 'right':
      x = target.x + target.width + offset;
      break;
  }

  // Cross axis alignment
  if (side === 'top' || side === 'bottom') {
    switch (alignment) {
      case 'start':
        x = target.x;
        break;
      case 'end':
        x = target.x + target.width - tooltip.width;
        break;
      default: // center
        x = target.x + target.width / 2 - tooltip.width / 2;
        break;
    }
  } else {
    // left or right
    switch (alignment) {
      case 'start':
        y = target.y;
        break;
      case 'end':
        y = target.y + target.height - tooltip.height;
        break;
      default: // center
        y = target.y + target.height / 2 - tooltip.height / 2;
        break;
    }
  }

  return { x, y };
}

/**
 * Check if the tooltip overflows the viewport on the given side.
 */
function overflows(
  pos: { x: number; y: number },
  tooltip: Rect,
  side: string,
): boolean {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  switch (side) {
    case 'top':
      return pos.y < 0;
    case 'bottom':
      return pos.y + tooltip.height > vh;
    case 'left':
      return pos.x < 0;
    case 'right':
      return pos.x + tooltip.width > vw;
    default:
      return false;
  }
}

/**
 * Flip placement to the opposite side, preserving alignment.
 */
function flipPlacement(placement: Placement): Placement {
  const side = getSide(placement);
  const alignment = getAlignment(placement);
  const flipped = OPPOSITE_SIDE[side] || side;
  return (alignment === 'center' ? flipped : `${flipped}-${alignment}`) as Placement;
}

/**
 * Clamp the tooltip position so it doesn't overflow the viewport edges.
 */
function clampToViewport(
  pos: { x: number; y: number },
  tooltip: Rect,
  padding: number = 8,
): { x: number; y: number } {
  const vw = window.innerWidth;
  const vh = window.innerHeight;

  return {
    x: Math.max(padding, Math.min(pos.x, vw - tooltip.width - padding)),
    y: Math.max(padding, Math.min(pos.y, vh - tooltip.height - padding)),
  };
}

/**
 * Compute the arrow position based on the resolved placement.
 */
function computeArrow(
  target: Rect,
  tooltip: { x: number; y: number; width: number; height: number },
  placement: Placement,
): { x: number; y: number } {
  const side = getSide(placement);

  if (side === 'top' || side === 'bottom') {
    // Arrow on the horizontal axis, centered on target
    const arrowX = target.x + target.width / 2 - tooltip.x;
    const clampedX = Math.max(12, Math.min(arrowX, tooltip.width - 12));
    return {
      x: clampedX,
      y: side === 'top' ? tooltip.height : 0,
    };
  } else {
    // Arrow on the vertical axis, centered on target
    const arrowY = target.y + target.height / 2 - tooltip.y;
    const clampedY = Math.max(12, Math.min(arrowY, tooltip.height - 12));
    return {
      x: side === 'left' ? tooltip.width : 0,
      y: clampedY,
    };
  }
}

/**
 * Main positioning function.
 * Computes tooltip position with flip logic and viewport clamping.
 */
export function computePosition(
  targetRect: Rect,
  tooltipRect: Rect,
  placement: Placement = 'bottom',
  offset: number = DEFAULT_OFFSET,
): PositionResult {
  // Center placement: tooltip is centered over the target, no flip, no arrow
  if (placement === 'center') {
    const pos = {
      x: targetRect.x + targetRect.width / 2 - tooltipRect.width / 2,
      y: targetRect.y + targetRect.height / 2 - tooltipRect.height / 2,
    };
    const clamped = clampToViewport(pos, tooltipRect);
    return {
      x: clamped.x,
      y: clamped.y,
      resolvedPlacement: 'center',
      arrow: { x: 0, y: 0 },
    };
  }

  const side = getSide(placement);

  // Try preferred placement
  let pos = computeRawPosition(targetRect, tooltipRect, placement, offset);
  let resolvedPlacement = placement;

  // Flip if overflows
  if (overflows(pos, tooltipRect, side)) {
    const flipped = flipPlacement(placement);
    const flippedSide = getSide(flipped);
    const flippedPos = computeRawPosition(targetRect, tooltipRect, flipped, offset);

    if (!overflows(flippedPos, tooltipRect, flippedSide)) {
      pos = flippedPos;
      resolvedPlacement = flipped;
    }
  }

  // Clamp to viewport
  const clamped = clampToViewport(pos, tooltipRect);

  // Compute arrow position
  const arrow = computeArrow(
    targetRect,
    { ...clamped, width: tooltipRect.width, height: tooltipRect.height },
    resolvedPlacement,
  );

  return {
    x: clamped.x,
    y: clamped.y,
    resolvedPlacement,
    arrow,
  };
}
