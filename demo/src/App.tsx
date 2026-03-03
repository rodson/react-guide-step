import React, { useMemo, useState } from 'react';
import { GuideProvider, useGuide } from 'react-guide-step';
import type { GuideOptions } from 'react-guide-step';
import { ProductPage } from './components/ProductPage';
import { onboardingSteps, quickTourSteps, featureTourSteps } from './tours/onboarding';
import './App.css';

type TourType = 'onboarding' | 'quick' | 'feature';

const tourMap = {
  onboarding: onboardingSteps,
  quick: quickTourSteps,
  feature: featureTourSteps,
};

const tourDescriptions: Record<TourType, string> = {
  onboarding: 'Full onboarding walkthrough with 5 steps',
  quick: 'Quick overview of key areas in 3 steps',
  feature: 'Explore advanced features in 2 steps',
};

const features = [
  { icon: '🎯', title: 'Step-based Tours', desc: 'Define a sequence of steps targeting any DOM element' },
  { icon: '🔦', title: 'Spotlight Overlay', desc: 'Highlights target elements while dimming the rest' },
  { icon: '📐', title: 'Smart Positioning', desc: '12 placement positions with auto viewport flip' },
  { icon: '⌨️', title: 'Keyboard Navigation', desc: 'Navigate with arrow keys, Enter, and Escape' },
  { icon: '🎨', title: 'Custom Rendering', desc: 'Full control over step content via render props' },
  { icon: '💾', title: 'Persistence', desc: 'localStorage-based completion tracking' },
  { icon: '📜', title: 'Auto-scroll', desc: 'Automatically scrolls target elements into view' },
  { icon: '⏳', title: 'Element Waiting', desc: 'Waits for async/lazy DOM elements to appear' },
  { icon: '🎭', title: 'Theming', desc: 'Customize colors, radius, z-index, animations' },
  { icon: '🌍', title: 'i18n Ready', desc: 'All button labels are fully configurable' },
  { icon: '🔄', title: 'Lifecycle Hooks', desc: 'beforeEnter and afterLeave async hooks per step' },
  { icon: '🪶', title: 'Lightweight', desc: 'Zero runtime dependencies, ESM & CJS support' },
];

function TourApp({ activeTour, onReset }: { activeTour: TourType; onReset: () => void }) {
  const options: GuideOptions = useMemo(
    () => ({
      steps: tourMap[activeTour],
      maskClosable: false,
      keyboardNavigation: true,
      showSkip: true,
      persistKey: `demo-${activeTour}`,
      onComplete: () => console.log(`[${activeTour}] Tour completed!`),
      onSkip: (step: number) => console.log(`[${activeTour}] Tour skipped at step ${step}`),
      onStepChange: (step: number) => console.log(`[${activeTour}] Step changed to ${step}`),
    }),
    [activeTour],
  );

  const guide = useGuide(options);

  return (
    <GuideProvider guide={guide} options={options}>
      <ProductPage />
      <div className="demo-controls">
        <button className="demo-btn-primary" onClick={() => guide.start()}>
          ▶ Start Tour ({tourMap[activeTour].length} steps)
        </button>
        <button className="demo-btn-secondary" onClick={onReset}>
          ↺ Reset Persistence
        </button>
      </div>
    </GuideProvider>
  );
}

function HeroSection({ onTryDemo }: { onTryDemo: () => void }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <div className="hero-badge">Open Source · MIT License</div>
        <h1 className="hero-title">react-guide-step</h1>
        <p className="hero-subtitle">
          A lightweight, zero-dependency React component library for building
          interactive product tours, onboarding walkthroughs, and step-by-step guided experiences.
        </p>
        <div className="hero-links">
          <a
            href="https://www.npmjs.com/package/react-guide-step"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link-badge"
          >
            <img src="https://img.shields.io/npm/v/react-guide-step.svg?style=flat-square&color=cb3837" alt="npm version" />
          </a>
          <a
            href="https://github.com/rodson/react-guide-step"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link-badge"
          >
            <img src="https://img.shields.io/github/stars/rodson/react-guide-step?style=flat-square&color=333" alt="GitHub stars" />
          </a>
          <a
            href="https://www.npmjs.com/package/react-guide-step"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-link-badge"
          >
            <img src="https://img.shields.io/npm/dm/react-guide-step.svg?style=flat-square&color=blue" alt="npm downloads" />
          </a>
        </div>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onTryDemo}>
            ▶ Try Live Demo
          </button>
          <a
            className="btn-outline"
            href="https://github.com/nicepkg/react-guide-step"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub →
          </a>
        </div>
        <div className="hero-install">
          <code>npm install react-guide-step</code>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="features-section">
      <h2 className="section-title">Features</h2>
      <p className="section-desc">Everything you need to create delightful onboarding experiences</p>
      <div className="features-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <span className="feature-icon">{f.icon}</span>
            <h3 className="feature-title">{f.title}</h3>
            <p className="feature-desc">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function UsageSection() {
  const code = `import { GuideProvider, useGuide } from 'react-guide-step';

const steps = [
  {
    target: '#welcome',
    title: 'Welcome!',
    content: 'Let us show you around.',
    placement: 'bottom',
  },
  {
    target: '#feature',
    title: 'Key Feature',
    content: 'This is our main feature.',
    placement: 'right',
  },
];

function App() {
  const guide = useGuide({ steps });
  return (
    <GuideProvider guide={guide} options={{ steps }}>
      <button onClick={() => guide.start()}>
        Start Tour
      </button>
      <YourApp />
    </GuideProvider>
  );
}`;

  return (
    <section className="usage-section">
      <h2 className="section-title">Quick Start</h2>
      <p className="section-desc">Get up and running in minutes</p>
      <div className="code-block">
        <div className="code-header">
          <span className="code-dot red" />
          <span className="code-dot yellow" />
          <span className="code-dot green" />
          <span className="code-filename">App.tsx</span>
        </div>
        <pre className="code-content"><code>{code}</code></pre>
      </div>
    </section>
  );
}

function ApiSection() {
  const apis = [
    { name: 'GuideProvider', type: 'Component', desc: 'Context provider that wraps your app and renders the guide overlay' },
    { name: 'useGuide', type: 'Hook', desc: 'Returns a GuideController with start(), next(), prev(), stop() methods' },
    { name: 'GuideStep', type: 'Type', desc: 'Step configuration: target, title, content, placement, hooks, etc.' },
    { name: 'GuideOptions', type: 'Type', desc: 'Global options: steps, theme, persistence, keyboard, callbacks' },
    { name: 'GuideTheme', type: 'Type', desc: 'Theme customization: colors, borderRadius, zIndex, animation' },
    { name: 'GuideController', type: 'Type', desc: 'Controller interface: start, stop, next, prev, goTo, isActive' },
  ];

  return (
    <section className="api-section">
      <h2 className="section-title">API Reference</h2>
      <p className="section-desc">Simple and intuitive API surface</p>
      <div className="api-grid">
        {apis.map((api) => (
          <div key={api.name} className="api-card">
            <div className="api-header">
              <code className="api-name">{api.name}</code>
              <span className={`api-badge api-badge-${api.type.toLowerCase()}`}>{api.type}</span>
            </div>
            <p className="api-desc">{api.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function App() {
  const [showDemo, setShowDemo] = useState(false);
  const [activeTour, setActiveTour] = useState<TourType>('onboarding');

  const handleReset = () => {
    ['onboarding', 'quick', 'feature'].forEach((key) => {
      try {
        localStorage.removeItem(`rgs:demo-${key}`);
      } catch {
        // ignore
      }
    });
    window.location.reload();
  };

  if (showDemo) {
    return (
      <div>
        {/* Tour selector bar */}
        <div className="tour-bar">
          <button className="tour-bar-back" onClick={() => setShowDemo(false)}>
            ← Back
          </button>
          <span className="tour-bar-label">Demo:</span>
          {(['onboarding', 'quick', 'feature'] as TourType[]).map((tour) => (
            <button
              key={tour}
              onClick={() => setActiveTour(tour)}
              className={`tour-tab ${activeTour === tour ? 'tour-tab-active' : ''}`}
              title={tourDescriptions[tour]}
            >
              {tour.charAt(0).toUpperCase() + tour.slice(1)}
            </button>
          ))}
          <span className="tour-bar-hint">{tourDescriptions[activeTour]}</span>
        </div>
        <TourApp key={activeTour} activeTour={activeTour} onReset={handleReset} />
      </div>
    );
  }

  return (
    <div className="landing">
      <HeroSection onTryDemo={() => setShowDemo(true)} />
      <FeaturesSection />
      <UsageSection />
      <ApiSection />
      <footer className="footer">
        <p>
          MIT License · Made with ♥ ·{' '}
          <a href="https://github.com/nicepkg/react-guide-step" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>{' '}
          ·{' '}
          <a href="https://www.npmjs.com/package/react-guide-step" target="_blank" rel="noopener noreferrer">
            npm
          </a>
        </p>
      </footer>
    </div>
  );
}
