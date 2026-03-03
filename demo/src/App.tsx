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
      <div className="hero-bg-orb hero-bg-orb-1" />
      <div className="hero-bg-orb hero-bg-orb-2" />
      <div className="hero-content">
        <img src="logo.svg" alt="react-guide-step" className="hero-logo" />
        <h1 className="hero-title">react-guide-step</h1>
        <p className="hero-subtitle">
          A lightweight, zero-dependency React component library for building
          interactive product tours, onboarding walkthroughs, and step-by-step guided experiences.
        </p>
        <div className="hero-links">
          <a href="https://www.npmjs.com/package/react-guide-step" target="_blank" rel="noopener noreferrer" className="hero-link-badge">
            <img src="https://img.shields.io/npm/v/react-guide-step.svg?style=for-the-badge&color=cb3837&logo=npm&logoColor=white" alt="npm" />
          </a>
          <a href="https://github.com/rodson/react-guide-step" target="_blank" rel="noopener noreferrer" className="hero-link-badge">
            <img src="https://img.shields.io/github/stars/rodson/react-guide-step?style=for-the-badge&color=333&logo=github&logoColor=white" alt="stars" />
          </a>
          <a href="https://www.npmjs.com/package/react-guide-step" target="_blank" rel="noopener noreferrer" className="hero-link-badge">
            <img src="https://img.shields.io/npm/dm/react-guide-step.svg?style=for-the-badge&color=0969da&label=downloads" alt="downloads" />
          </a>
          <span className="hero-link-badge">
            <img src="https://img.shields.io/badge/license-MIT-22c55e?style=for-the-badge" alt="license" />
          </span>
        </div>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onTryDemo}>
            <span className="btn-play">▶</span> Try Live Demo
          </button>
          <a className="btn-glass" href="https://github.com/rodson/react-guide-step" target="_blank" rel="noopener noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
          </a>
        </div>
        <div className="hero-install">
          <span className="hero-install-dollar">$</span>
          <code>npm install react-guide-step</code>
          <button className="hero-install-copy" onClick={() => navigator.clipboard.writeText('npm install react-guide-step')} title="Copy">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          </button>
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
