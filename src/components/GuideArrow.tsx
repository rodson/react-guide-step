import React from 'react';
import type { Placement } from '../types';
import { getArrowStyle } from '../engine/arrow';

interface GuideArrowProps {
  arrowPos: { x: number; y: number };
  placement: Placement;
}

export const GuideArrow: React.FC<GuideArrowProps> = ({ arrowPos, placement }) => {
  const style = getArrowStyle(arrowPos, placement);
  return <div className="rgs-arrow" style={style} />;
};
