import React, { useCallback, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { GuideContext } from '../context/GuideContext';
import { GuideOverlay } from './GuideOverlay';
import { GuideTooltip, resolveLabels } from './GuideTooltip';
import { usePosition } from '../hooks/usePosition';
import { useKeyboard } from '../hooks/useKeyboard';
import { useWaitForElement } from '../hooks/useWaitForElement';
import { useScrollIntoView } from '../hooks/useScrollIntoView';
import { usePreloadImages } from '../hooks/usePreloadImages';
import { getElement } from '../utils/dom';
import { resolveTheme } from '../styles/theme';
import { DEFAULT_HIGHLIGHT_PADDING } from '../engine/constants';
import type { GuideStep } from '../types';

/**
 * Inner component that uses hooks — only rendered when context exists.
 */
const GuideInner: React.FC = () => {
  const ctx = useContext(GuideContext)!;
  const { controller, options } = ctx;
  const {
    steps,
    maskClosable = false,
    showSkip = true,
    keyboardNavigation = true,
    scrollBehavior = 'smooth',
    labels,
  } = options;

  const { isActive, currentStep, next, prev, stop } = controller;
  const resolvedLabels = resolveLabels(labels);

  const currentStepDef: GuideStep | undefined = steps[currentStep];

  // Resolve target element
  const shouldWait = !!currentStepDef?.waitForElement;
  const { element: waitedElement, isWaiting } = useWaitForElement(
    currentStepDef?.target,
    isActive && shouldWait,
  );

  // Direct element resolution for non-waiting steps
  const [directElement, setDirectElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!isActive || !currentStepDef || shouldWait) {
      setDirectElement(null);
      return;
    }
    // Resolve the new target element synchronously — avoid setting null in between
    // to prevent position from resetting and causing a flicker
    const el = getElement(currentStepDef.target as string | HTMLElement);
    if (el) {
      setDirectElement(el);
    } else {
      setDirectElement(null);
    }
  }, [isActive, currentStep, currentStepDef, shouldWait]);

  const targetElement = shouldWait ? waitedElement : directElement;

  // Preload images for upcoming steps in the background (non-blocking)
  usePreloadImages(steps, currentStep, isActive);

  // Scroll target into view
  const scrollIntoView = useScrollIntoView(scrollBehavior);
  useEffect(() => {
    if (targetElement) {
      scrollIntoView(targetElement);
    }
  }, [targetElement, scrollIntoView]);

  // Tooltip positioning
  const { position, tooltipRef } = usePosition({
    targetElement,
    placement: currentStepDef?.placement || 'bottom',
    enabled: isActive && !!targetElement,
    highlightPadding: currentStepDef?.highlightPadding ?? DEFAULT_HIGHLIGHT_PADDING,
  });

  // Focus the tooltip when step changes
  useEffect(() => {
    if (isActive && position && tooltipRef.current) {
      tooltipRef.current.focus();
    }
  }, [isActive, currentStep, position, tooltipRef]);

  // Keyboard navigation
  const handleSkip = useCallback(() => {
    options.onSkip?.(currentStep);
    stop();
  }, [options, currentStep, stop]);

  useKeyboard({
    enabled: isActive && keyboardNavigation,
    onNext: next,
    onPrev: prev,
    onSkip: handleSkip,
  });

  // Mask click handler
  const handleMaskClick = useCallback(() => {
    if (maskClosable) {
      handleSkip();
    }
  }, [maskClosable, handleSkip]);

  // Portal container
  const portalRef = useRef<HTMLDivElement | null>(null);
  const [portalReady, setPortalReady] = useState(false);

  useLayoutEffect(() => {
    if (isActive) {
      const el = document.createElement('div');
      el.className = 'rgs-portal';
      el.setAttribute('aria-live', 'polite');
      el.style.zIndex = String(resolveTheme(options.theme).zIndex);
      document.body.appendChild(el);
      portalRef.current = el;
      setPortalReady(true);
      return () => {
        el.remove();
        portalRef.current = null;
        setPortalReady(false);
      };
    } else {
      setPortalReady(false);
    }
  }, [isActive, options.theme]);

  if (!isActive || !currentStepDef || !portalReady || !portalRef.current) return null;

  return createPortal(
    <>
      <GuideOverlay
        targetElement={targetElement}
        highlightPadding={currentStepDef.highlightPadding}
        allowInteraction={currentStepDef.allowInteraction}
        onMaskClick={handleMaskClick}
        placement={currentStepDef.placement}
      />
      {isWaiting ? (
        <div className="rgs-waiting">Loading...</div>
      ) : (
        <GuideTooltip
          step={currentStepDef}
          stepIndex={currentStep}
          totalSteps={steps.length}
          position={position}
          tooltipRef={tooltipRef}
          labels={resolvedLabels}
          showSkip={showSkip}
          onNext={next}
          onPrev={prev}
          onSkip={handleSkip}
        />
      )}
    </>,
    portalRef.current,
  );
};

export const Guide: React.FC = () => {
  const ctx = useContext(GuideContext);
  if (!ctx) return null;
  return <GuideInner />;
};
