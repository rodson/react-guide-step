# react-guide-step

[![npm version](https://img.shields.io/npm/v/react-guide-step.svg)](https://www.npmjs.com/package/react-guide-step)
[![npm downloads](https://img.shields.io/npm/dm/react-guide-step.svg)](https://www.npmjs.com/package/react-guide-step)
[![bundle size](https://img.shields.io/bundlephobia/minzip/react-guide-step)](https://bundlephobia.com/package/react-guide-step)
[![license](https://img.shields.io/npm/l/react-guide-step.svg)](https://github.com/rodson/react-guide-step/blob/main/LICENSE)

English | [简体中文](https://github.com/rodson/react-guide-step/README.zh-CN.md)

A lightweight, zero-dependency React component library for building interactive product tours, onboarding walkthroughs, and step-by-step guided experiences.

## Features

- **Step-based tours** — Define a sequence of steps targeting any DOM element
- **Spotlight overlay** — Highlights target elements while dimming the rest of the page
- **Smart positioning** — Auto-calculates tooltip placement with 12 positions and viewport flip logic
- **Keyboard navigation** — Navigate with arrow keys, Enter, and Escape
- **Custom rendering** — Full control over step content via render props
- **Persistence** — Optional localStorage-based completion tracking to avoid re-showing tours
- **Auto-scroll** — Automatically scrolls target elements into view
- **Element waiting** — Waits for async/lazy DOM elements to appear before proceeding
- **Theming** — Customize colors, border radius, z-index, and animation duration
- **i18n ready** — All button labels are configurable
- **Lifecycle hooks** — `beforeEnter` and `afterLeave` async hooks per step
- **Image preloading** — Preload step images to prevent layout shifts
- **Tree-shakeable** — Zero runtime dependencies, ESM and CJS support

## Installation

```bash
npm install react-guide-step
```

```bash
yarn add react-guide-step
```

```bash
pnpm add react-guide-step
```

> **Peer dependencies:** `react >= 18.0.0` and `react-dom >= 18.0.0`

## Quick Start

### 1. Define your tour steps

```ts
// tours/onboarding.ts
import type { GuideStep } from 'react-guide-step';

const steps: GuideStep[] = [
  {
    target: '#welcome-header',
    title: 'Welcome!',
    content: 'Let us show you around the app.',
    placement: 'bottom',
  },
  {
    target: '#sidebar-nav',
    title: 'Navigation',
    content: 'Use the sidebar to navigate between pages.',
    placement: 'right',
  },
  {
    target: '#create-btn',
    title: 'Create',
    content: 'Click here to create a new project.',
    placement: 'bottom',
    highlightPadding: 8,
  },
];
```

### 2. Set up the provider and start the tour

```tsx
import { GuideProvider, useGuide } from 'react-guide-step';
import type { GuideOptions } from 'react-guide-step';
import { steps } from './tours/onboarding';

function App() {
  const options: GuideOptions = {
    steps,
    maskClosable: true,
    keyboardNavigation: true,
    onComplete: () => console.log('Tour completed!'),
    onSkip: (step) => console.log(`Skipped at step ${step}`),
  };

  const guide = useGuide(options);

  return (
    <GuideProvider guide={guide} options={options}>
      <YourApp />
      <button onClick={() => guide.start()}>Start Tour</button>
    </GuideProvider>
  );
}
```

## API Reference

### `useGuide(options)`

The main hook that creates a guide controller.

**Returns: `GuideController`**

| Property | Type | Description |
|---|---|---|
| `start()` | `() => void` | Start the tour |
| `stop()` | `() => void` | Stop the tour |
| `next()` | `() => void` | Go to next step |
| `prev()` | `() => void` | Go to previous step |
| `goTo(index)` | `(number) => void` | Jump to a specific step |
| `isActive` | `boolean` | Whether the tour is currently running |
| `currentStep` | `number` | Current step index |
| `totalSteps` | `number` | Total number of steps |
| `isCompleted` | `boolean` | Whether the tour has been completed |

### `GuideOptions`

| Option | Type | Default | Description |
|---|---|---|---|
| `steps` | `GuideStep[]` | *required* | Array of tour steps |
| `initialStep` | `number` | `0` | Starting step index |
| `autoStart` | `boolean` | `false` | Auto-start the guide on mount |
| `maskClosable` | `boolean` | `false` | Close guide when clicking the overlay |
| `keyboardNavigation` | `boolean` | `true` | Enable keyboard navigation |
| `scrollBehavior` | `ScrollBehavior` | `'smooth'` | Scroll behavior when scrolling target into view |
| `persistKey` | `string` | — | localStorage key; completed tours won't re-show |
| `theme` | `GuideTheme` | — | Custom theme overrides |
| `labels` | `GuideLabels` | — | Custom button labels for i18n |
| `onComplete` | `() => void` | — | Called when the tour finishes |
| `onSkip` | `(stepIndex) => void` | — | Called when the tour is skipped |
| `onStepChange` | `(stepIndex) => void` | — | Called on each step transition |

### `GuideStep`

| Property | Type | Default | Description |
|---|---|---|---|
| `target` | `string \| HTMLElement` | *required* | CSS selector or element reference |
| `title` | `string` | — | Step title |
| `content` | `ReactNode` | — | Step description (supports text, JSX, images) |
| `placement` | `Placement` | `'bottom'` | Tooltip position relative to target |
| `customRender` | `(props: StepRenderProps) => ReactNode` | — | Custom render function |
| `beforeEnter` | `() => void \| Promise<void>` | — | Async hook before entering step |
| `afterLeave` | `() => void \| Promise<void>` | — | Async hook after leaving step |
| `highlightPadding` | `number` | — | Extra padding around the spotlight (px) |
| `waitForElement` | `boolean` | `false` | Wait for target element to appear in DOM |
| `showArrow` | `boolean` | `true` | Show arrow pointing to target |
| `allowInteraction` | `boolean` | `false` | Allow user interaction with highlighted element |
| `preloadImages` | `string[]` | — | Image URLs to preload before this step is displayed |

### `Placement`

```
'top' | 'top-start' | 'top-end'
'bottom' | 'bottom-start' | 'bottom-end'
'left' | 'left-start' | 'left-end'
'right' | 'right-start' | 'right-end'
'center'
```

### `GuideTheme`

| Property | Type | Description |
|---|---|---|
| `primaryColor` | `string` | Primary button and accent color |
| `textColor` | `string` | Text color |
| `bgColor` | `string` | Tooltip background color |
| `overlayColor` | `string` | Overlay/mask color |
| `borderRadius` | `number` | Border radius in px |
| `zIndex` | `number` | Base z-index for the guide layer |
| `animationDuration` | `number` | Animation duration in ms |

### `GuideLabels`

| Property | Type | Description |
|---|---|---|
| `next` | `string` | "Next" button text |
| `prev` | `string` | "Previous" button text |
| `skip` | `string` | "Skip" button text |
| `finish` | `string` | "Finish" button text |
| `stepOf` | `string` | Step counter template, e.g. `"{current} of {total}"` |

## Advanced Usage

### Custom Step Rendering

```tsx
const steps: GuideStep[] = [
  {
    target: '#feature',
    customRender: ({ step, stepIndex, totalSteps, next, prev, skip }) => (
      <div className="my-custom-tooltip">
        <h3>Step {stepIndex + 1} of {totalSteps}</h3>
        <p>Your custom content here</p>
        <div>
          <button onClick={prev}>Back</button>
          <button onClick={next}>Continue</button>
          <button onClick={skip}>Skip Tour</button>
        </div>
      </div>
    ),
  },
];
```

### Persistence

Prevent completed tours from re-appearing by setting a `persistKey`:

```ts
const options: GuideOptions = {
  steps,
  persistKey: 'onboarding-v1',
};
```

Completion state is stored in `localStorage` under the key `rgs:<persistKey>`. To reset, remove the key:

```ts
localStorage.removeItem('rgs:onboarding-v1');
```

### Async Step Hooks

Run async operations before entering or after leaving a step:

```ts
const steps: GuideStep[] = [
  {
    target: '#dynamic-section',
    title: 'Dynamic Content',
    content: 'This section was loaded just for you.',
    waitForElement: true,
    beforeEnter: async () => {
      await fetchAndRenderSection();
    },
    afterLeave: async () => {
      await trackStepViewed();
    },
  },
];
```

## Development

```bash
# Install dependencies
npm install

# Start demo dev server
npm run dev

# Build the library
npm run build

# Preview demo production build
npm run preview
```
