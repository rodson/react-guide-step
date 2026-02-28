import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import type { GuideController, GuideOptions, GuideState } from '../types';
import { usePersistence } from './usePersistence';

// --- Reducer ---

type GuideAction =
  | { type: 'START'; step: number }
  | { type: 'STOP' }
  | { type: 'GO_TO'; step: number };

function reducer(state: GuideState, action: GuideAction): GuideState {
  switch (action.type) {
    case 'START':
      return { ...state, isActive: true, currentStep: action.step, targetElement: null, isWaiting: false };
    case 'STOP':
      return { isActive: false, currentStep: 0, targetElement: null, isWaiting: false };
    case 'GO_TO':
      return { ...state, currentStep: action.step, targetElement: null, isWaiting: false };
    default:
      return state;
  }
}

const initialState: GuideState = {
  isActive: false,
  currentStep: 0,
  targetElement: null,
  isWaiting: false,
};

// --- Hook ---

export function useGuide(options: GuideOptions): GuideController {
  const {
    steps,
    onComplete,
    onSkip,
    onStepChange,
    initialStep = 0,
    persistKey,
    autoStart = false,
  } = options;

  const [state, dispatch] = useReducer(reducer, initialState);
  const { isCompleted, markCompleted } = usePersistence(persistKey);
  const transitioningRef = useRef(false);

  // Use refs to always access the latest values in async callbacks
  const stateRef = useRef(state);
  stateRef.current = state;
  const stepsRef = useRef(steps);
  stepsRef.current = steps;
  const onStepChangeRef = useRef(onStepChange);
  onStepChangeRef.current = onStepChange;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  // Auto-start
  useEffect(() => {
    if (autoStart && !isCompleted && steps.length > 0) {
      dispatch({ type: 'START', step: initialStep });
    }
  }, [autoStart, isCompleted, steps.length, initialStep]);

  // Step transition helper — uses refs so the callback identity is stable
  const transitionTo = useCallback(
    async (nextStep: number) => {
      if (transitioningRef.current) return;
      transitioningRef.current = true;

      try {
        const current = stepsRef.current[stateRef.current.currentStep];
        const next = stepsRef.current[nextStep];

        if (current?.afterLeave) await current.afterLeave();
        if (next?.beforeEnter) await next.beforeEnter();

        dispatch({ type: 'GO_TO', step: nextStep });
        onStepChangeRef.current?.(nextStep);
      } catch (err) {
        console.error('[react-guide-step] Error during step transition:', err);
      } finally {
        transitioningRef.current = false;
      }
    },
    [], // stable — reads from refs
  );

  // --- Controller API ---

  const start = useCallback(() => {
    if (isCompleted) return;
    const step = initialStep;
    const stepDef = stepsRef.current[step];
    const doStart = async () => {
      try {
        if (stepDef?.beforeEnter) await stepDef.beforeEnter();
        dispatch({ type: 'START', step });
        onStepChangeRef.current?.(step);
      } catch (err) {
        console.error('[react-guide-step] Error in beforeEnter:', err);
      }
    };
    doStart();
  }, [isCompleted, initialStep]);

  const stop = useCallback(() => {
    dispatch({ type: 'STOP' });
  }, []);

  const next = useCallback(() => {
    const { isActive, currentStep } = stateRef.current;
    if (!isActive) return;
    const nextIdx = currentStep + 1;
    if (nextIdx >= stepsRef.current.length) {
      // Finish
      const current = stepsRef.current[currentStep];
      const doFinish = async () => {
        try {
          if (current?.afterLeave) await current.afterLeave();
          dispatch({ type: 'STOP' });
          markCompleted();
          onCompleteRef.current?.();
        } catch (err) {
          console.error('[react-guide-step] Error in afterLeave:', err);
          dispatch({ type: 'STOP' });
        }
      };
      doFinish();
    } else {
      transitionTo(nextIdx);
    }
  }, [transitionTo, markCompleted]);

  const prev = useCallback(() => {
    const { isActive, currentStep } = stateRef.current;
    if (!isActive || currentStep <= 0) return;
    transitionTo(currentStep - 1);
  }, [transitionTo]);

  const goTo = useCallback(
    (stepIndex: number) => {
      const { isActive } = stateRef.current;
      if (!isActive || stepIndex < 0 || stepIndex >= stepsRef.current.length) return;
      transitionTo(stepIndex);
    },
    [transitionTo],
  );

  const controller: GuideController = useMemo(
    () => ({
      start,
      stop,
      next,
      prev,
      goTo,
      isActive: state.isActive,
      currentStep: state.currentStep,
      totalSteps: steps.length,
      isCompleted,
    }),
    [start, stop, next, prev, goTo, state.isActive, state.currentStep, steps.length, isCompleted],
  );

  return controller;
}
