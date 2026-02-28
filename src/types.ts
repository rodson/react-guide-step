export type Placement =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end'
  | 'center';

export interface GuideStep {
  /** CSS selector or Element ref for the target element */
  target: string | HTMLElement;
  /** Step title */
  title?: string;
  /** Step description content — supports text, JSX, images, or any React node */
  content?: React.ReactNode;
  /** Preferred tooltip placement relative to target */
  placement?: Placement;
  /** Custom render function for the tooltip content */
  customRender?: (props: StepRenderProps) => React.ReactNode;
  /** Async hook called before entering this step */
  beforeEnter?: () => void | Promise<void>;
  /** Async hook called after leaving this step */
  afterLeave?: () => void | Promise<void>;
  /** Extra padding around the spotlight highlight (px) */
  highlightPadding?: number;
  /** If true, wait for the target element to appear in the DOM */
  waitForElement?: boolean;
  /** Whether to show the arrow pointing to the target (default: true) */
  showArrow?: boolean;
  /** Allow user interaction with the highlighted target element */
  allowInteraction?: boolean;
  /** Image URLs to preload before this step is displayed */
  preloadImages?: string[];
}

export interface GuideTheme {
  primaryColor?: string;
  textColor?: string;
  bgColor?: string;
  overlayColor?: string;
  borderRadius?: number;
  zIndex?: number;
  animationDuration?: number;
}

export interface GuideLabels {
  next?: string;
  prev?: string;
  skip?: string;
  finish?: string;
  /** Template for step counter, e.g. "{current} of {total}" */
  stepOf?: string;
}

export interface GuideOptions {
  steps: GuideStep[];
  onComplete?: () => void;
  onSkip?: (stepIndex: number) => void;
  onStepChange?: (stepIndex: number) => void;
  initialStep?: number;
  /** Close guide when clicking the mask overlay */
  maskClosable?: boolean;
  /** Show the skip button in the tooltip (default: true) */
  showSkip?: boolean;
  /** Enable keyboard navigation (default: true) */
  keyboardNavigation?: boolean;
  /** Scroll behavior when scrolling target into view */
  scrollBehavior?: ScrollBehavior;
  theme?: GuideTheme;
  /** localStorage key for persistence; if set, completed tours won't re-show */
  persistKey?: string;
  /** Auto-start the guide on mount (default: false) */
  autoStart?: boolean;
  /** Custom labels for i18n */
  labels?: GuideLabels;
}

export interface GuideController {
  start: () => void;
  stop: () => void;
  next: () => void;
  prev: () => void;
  goTo: (stepIndex: number) => void;
  isActive: boolean;
  currentStep: number;
  totalSteps: number;
  isCompleted: boolean;
}

export interface GuideState {
  isActive: boolean;
  currentStep: number;
  targetElement: HTMLElement | null;
  isWaiting: boolean;
}

export interface StepRenderProps {
  step: GuideStep;
  stepIndex: number;
  totalSteps: number;
  next: () => void;
  prev: () => void;
  skip: () => void;
  finish: () => void;
}

export interface PositionResult {
  x: number;
  y: number;
  resolvedPlacement: Placement;
  arrow: { x: number; y: number };
}
