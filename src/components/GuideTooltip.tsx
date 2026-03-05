import React, { useEffect, useRef, useState } from 'react';
import type { GuideLabels, GuideStep, PositionResult, StepRenderProps } from '../types';
import { GuideArrow } from './GuideArrow';
import { clsx } from '../utils/dom';

interface GuideTooltipProps {
  step: GuideStep;
  stepIndex: number;
  totalSteps: number;
  position: PositionResult | null;
  tooltipRef: React.Ref<HTMLDivElement>;
  labels: Required<GuideLabels>;
  showSkip?: boolean;
  onNext: () => void;
  onPrev: () => void;
  onSkip: () => void;
}

const DEFAULT_LABELS: Required<GuideLabels> = {
  next: 'Next',
  prev: 'Previous',
  skip: 'Skip',
  finish: 'Finish',
  stepOf: '{current} of {total}',
};

export function resolveLabels(labels?: GuideLabels): Required<GuideLabels> {
  return { ...DEFAULT_LABELS, ...labels };
}

export const GuideTooltip: React.FC<GuideTooltipProps> = ({
  step,
  stepIndex,
  totalSteps,
  position,
  tooltipRef,
  labels,
  showSkip = true,
  onNext,
  onPrev,
  onSkip,
}) => {
  // Fade-in/out on step change — delay content swap until after fade-out
  const [visible, setVisible] = useState(false);
  const [displayPos, setDisplayPos] = useState(position);
  const [displayStep, setDisplayStep] = useState(step);
  const [displayIndex, setDisplayIndex] = useState(stepIndex);
  const prevStepRef = useRef(stepIndex);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    const stepChanged = prevStepRef.current !== stepIndex;
    prevStepRef.current = stepIndex;

    if (fadeTimerRef.current) {
      clearTimeout(fadeTimerRef.current);
    }

    if (!stepChanged) {
      // Same step — just sync position (scroll/resize)
      if (position) {
        setDisplayPos(position);
        setDisplayStep(step);
        setDisplayIndex(stepIndex);
        if (!visible) {
          requestAnimationFrame(() => setVisible(true));
        }
      }
      return;
    }

    // Step changed: fade out (keep old content) → swap content + position → fade in
    setVisible(false);
    fadeTimerRef.current = setTimeout(() => {
      setDisplayStep(step);
      setDisplayIndex(stepIndex);
      setDisplayPos(position);
      requestAnimationFrame(() => setVisible(true));
    }, 200);

    return () => {
      if (fadeTimerRef.current) {
        clearTimeout(fadeTimerRef.current);
      }
    };
  }, [stepIndex, position, step]); // eslint-disable-line react-hooks/exhaustive-deps

  const isFirst = displayIndex === 0;
  const isLast = displayIndex === totalSteps - 1;
  const showArrow = displayStep.showArrow !== false && displayPos?.resolvedPlacement !== 'center';

  const style: React.CSSProperties = displayPos
    ? { left: displayPos.x, top: displayPos.y }
    : { left: -9999, top: -9999 };

  const counter = labels.stepOf
    .replace('{current}', String(displayIndex + 1))
    .replace('{total}', String(totalSteps));

  const arrowElement = showArrow && displayPos && (
    <GuideArrow arrowPos={displayPos.arrow} placement={displayPos.resolvedPlacement} />
  );

  // Shared wrapper props
  const wrapperProps = {
    ref: tooltipRef,
    className: clsx('rgs-tooltip', visible && 'rgs-tooltip--visible'),
    style,
    role: 'dialog' as const,
    'aria-modal': true as const,
    'aria-label': displayStep.title || 'Guide step',
    tabIndex: -1 as const,
  };

  // Custom render support
  if (displayStep.customRender) {
    const renderProps: StepRenderProps = {
      step: displayStep,
      stepIndex: displayIndex,
      totalSteps,
      next: onNext,
      prev: onPrev,
      skip: onSkip,
      finish: onNext,
    };

    return (
      <div {...wrapperProps} key={displayIndex}>
        {displayStep.customRender(renderProps)}
        {arrowElement}
      </div>
    );
  }

  return (
    <div {...wrapperProps}>
      {displayStep.title && <div className="rgs-tooltip__title">{displayStep.title}</div>}
      {displayStep.content && <div key={displayIndex} className="rgs-tooltip__content">{displayStep.content}</div>}

      <div className="rgs-tooltip__footer">
        <span className="rgs-tooltip__counter">{counter}</span>
        <div className="rgs-tooltip__actions">
          {showSkip && !isLast && (
            <button className="rgs-btn rgs-btn--text" onClick={onSkip} type="button">
              {labels.skip}
            </button>
          )}
          {!isFirst && (
            <button className="rgs-btn rgs-btn--default" onClick={onPrev} type="button">
              {labels.prev}
            </button>
          )}
          <button className="rgs-btn rgs-btn--primary" onClick={onNext} type="button">
            {isLast ? labels.finish : labels.next}
          </button>
        </div>
      </div>

      {arrowElement}
    </div>
  );
};
