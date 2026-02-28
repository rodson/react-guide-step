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
          Start Tour ({tourMap[activeTour].length} steps)
        </button>
        <button className="demo-btn-secondary" onClick={onReset}>
          Reset Persistence
        </button>
      </div>
    </GuideProvider>
  );
}

export default function App() {
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

  return (
    <div>
      {/* Tour selector tabs */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 240,
          right: 0,
          zIndex: 100,
          background: '#f0f5ff',
          borderBottom: '1px solid #d6e4ff',
          display: 'flex',
          alignItems: 'center',
          padding: '0 16px',
          gap: 4,
          height: 36,
          fontSize: 13,
        }}
      >
        <span style={{ fontWeight: 600, marginRight: 8, color: '#1677ff' }}>Demo:</span>
        {(['onboarding', 'quick', 'feature'] as TourType[]).map((tour) => (
          <button
            key={tour}
            onClick={() => setActiveTour(tour)}
            style={{
              padding: '4px 12px',
              border: 'none',
              borderRadius: 4,
              cursor: 'pointer',
              fontSize: 12,
              fontWeight: activeTour === tour ? 600 : 400,
              background: activeTour === tour ? '#1677ff' : 'transparent',
              color: activeTour === tour ? '#fff' : '#666',
            }}
          >
            {tour.charAt(0).toUpperCase() + tour.slice(1)}
          </button>
        ))}
      </div>
      {/* Keyed component forces re-mount when tour type changes */}
      <TourApp key={activeTour} activeTour={activeTour} onReset={handleReset} />
    </div>
  );
}
