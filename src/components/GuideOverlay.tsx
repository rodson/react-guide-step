import React from 'react';
import { getRect } from '../utils/dom';
import { clsx } from '../utils/dom';
import { DEFAULT_HIGHLIGHT_PADDING } from '../engine/constants';
import type { Placement } from '../types';

interface GuideOverlayProps {
  targetElement: HTMLElement | null;
  highlightPadding?: number;
  allowInteraction?: boolean;
  onMaskClick?: () => void;
  placement?: Placement;
}

export const GuideOverlay: React.FC<GuideOverlayProps> = ({
  targetElement,
  highlightPadding = DEFAULT_HIGHLIGHT_PADDING,
  allowInteraction = false,
  onMaskClick,
  placement,
}) => {
  const isCenter = placement === 'center';

  // Center placement: full-screen mask without spotlight cutout
  if (isCenter) {
    return (
      <div
        className="rgs-spotlight"
        style={{ top: 0, left: 0, width: 0, height: 0 }}
        onClick={onMaskClick}
      />
    );
  }

  const spotlightStyle: React.CSSProperties = targetElement
    ? (() => {
        const rect = getRect(targetElement);
        return {
          top: rect.top - highlightPadding,
          left: rect.left - highlightPadding,
          width: rect.width + highlightPadding * 2,
          height: rect.height + highlightPadding * 2,
        };
      })()
    : { top: 0, left: 0, width: 0, height: 0 };

  return (
    <>
      {/* Invisible overlay to block clicks (and optionally close on mask click) */}
      <div className="rgs-overlay" onClick={onMaskClick} />
      {/* Spotlight cutout */}
      <div
        className={clsx('rgs-spotlight', allowInteraction && 'rgs-spotlight--interactive')}
        style={spotlightStyle}
      />
    </>
  );
};
