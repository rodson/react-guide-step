import type { CSSProperties } from 'react';
import type { GuideStep } from 'react-guide-step';

const imgStyle: CSSProperties = {
  display: 'block',
  width: '100%',
  borderRadius: 6,
  marginBottom: 8,
  backgroundColor: '#f0f0f0',
};

export const onboardingSteps: GuideStep[] = [
  {
    target: '#logo',
    title: 'Welcome!',
    content: (
      <div>
        <img src="https://picsum.photos/seed/welcome/280/120" style={ imgStyle} alt="Welcome" width={280} height={120}  />
        <p style={{ margin: 0 }}>Welcome to our product dashboard. Let us show you around.</p>
      </div>
    ),
    preloadImages: ['https://picsum.photos/seed/welcome/280/120'],
    placement: 'right',
  },
  {
    target: '#nav-dashboard',
    title: 'Dashboard',
    content: (
      <div>
        <img src="https://picsum.photos/seed/dashboard/280/120" style={ imgStyle} alt="Dashboard" width={280} height={120} />
        <p style={{ margin: 0 }}>This is your main dashboard where you can see an overview of all your data.</p>
      </div>
    ),
    preloadImages: ['https://picsum.photos/seed/dashboard/280/120'],
    placement: 'right',
  },
  {
    target: '#nav-analytics',
    title: 'Analytics',
    content: (
      <div>
        <img src="https://picsum.photos/seed/analytics/280/120" style={ imgStyle} alt="Analytics" width={280} height={120}  />
        <p style={{ margin: 0 }}>View detailed analytics and reports for your projects here.</p>
      </div>
    ),
    preloadImages: ['https://picsum.photos/seed/analytics/280/120'],
    placement: 'right',
  },
  {
    target: '#create-btn',
    title: 'Create New Project',
    content: (
      <div>
        <img src="https://picsum.photos/seed/create/280/120" style={ imgStyle} alt="Create" width={280} height={120}  />
        <p style={{ margin: 0 }}>Click this button to create a new project and get started.</p>
      </div>
    ),
    preloadImages: ['https://picsum.photos/seed/create/280/120'],
    placement: 'bottom',
    highlightPadding: 8,
  },
  {
    target: '#user-avatar',
    title: 'Your Profile',
    content: (
      <div>
        <img src="https://picsum.photos/seed/profile/280/120" style={ imgStyle} alt="Profile" width={280} height={120}  />
        <p style={{ margin: 0 }}>Access your profile settings, preferences, and sign out from here.</p>
      </div>
    ),
    preloadImages: ['https://picsum.photos/seed/profile/280/120'],
    placement: 'bottom-end',
  },
];

export const quickTourSteps: GuideStep[] = [
  {
    target: '#search-input',
    title: 'Search',
    content: (
      <div>
        <img src="https://picsum.photos/seed/search/280/120" style={ imgStyle} alt="Search" width={280} height={120} />
        <p style={{ margin: 0 }}>Use the search bar to quickly find projects, documents, and team members.</p>
      </div>
    ),
    preloadImages: ['https://picsum.photos/seed/search/280/120'],
    placement: 'bottom',
  },
  {
    target: '#stats-card',
    title: 'Statistics',
    content: (
      <div>
        <img src="https://picsum.photos/seed/stats/280/120" style={ imgStyle} alt="Statistics" width={280} height={120} />
        <p style={{ margin: 0 }}>Key metrics for your account are displayed here at a glance.</p>
      </div>
    ),
    preloadImages: ['https://picsum.photos/seed/stats/280/120'],
    placement: 'top',
  },
  {
    target: '#recent-list',
    title: 'Recent Activity',
    content: (
      <div>
        <img src="https://picsum.photos/seed/recent/280/120" style={ imgStyle} alt="Recent"width={280} height={120}  />
        <p style={{ margin: 0 }}>Your recent projects and activities are listed here for quick access.</p>
      </div>
    ),
    preloadImages: ['https://picsum.photos/seed/recent/280/120'],
    placement: 'left',
  },
];

export const featureTourSteps: GuideStep[] = [
  {
    target: '#notification-btn',
    title: 'Notifications',
    content: (
      <div>
        <img src="https://picsum.photos/seed/notify/280/120" style={ imgStyle} alt="Notifications" width={280} height={120}  />
        <p style={{ margin: 0 }}>Stay up to date with the latest notifications about your projects.</p>
      </div>
    ),
    preloadImages: ['https://picsum.photos/seed/notify/280/120'],
    placement: 'bottom',
  },
  {
    target: '#settings-btn',
    title: 'Settings',
    content: (
      <div>
        <img src="https://picsum.photos/seed/settings/280/120" style={ imgStyle} alt="Settings" width={280} height={120}  />
        <p style={{ margin: 0 }}>Customize your workspace, manage integrations, and configure preferences.</p>
      </div>
    ),
    preloadImages: ['https://picsum.photos/seed/settings/280/120'],
    placement: 'bottom-end',
  },
];
