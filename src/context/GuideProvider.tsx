import React, { useEffect, useMemo } from 'react';
import type { GuideController, GuideOptions } from '../types';
import { GuideContext, type GuideContextValue } from './GuideContext';
import { Guide } from '../components/Guide';
import { injectStyles, removeStyles } from '../styles/inject';
import { resolveTheme, themeToCssVars } from '../styles/theme';
import { BASE_STYLES } from '../styles/classes';

interface GuideProviderProps {
  guide: GuideController;
  options: GuideOptions;
  children: React.ReactNode;
}

/**
 * GuideProvider wraps your app and provides guide context.
 * It also injects the base CSS styles and mounts the Guide component.
 */
export const GuideProvider: React.FC<GuideProviderProps> = ({ guide, options, children }) => {
  // Inject base styles on mount
  useEffect(() => {
    const theme = resolveTheme(options.theme);
    const themeVars = themeToCssVars(theme);
    const fullCss = `
      .rgs-portal { ${themeVars} }
      ${BASE_STYLES}
    `;
    injectStyles('base', fullCss);

    return () => removeStyles('base');
  }, [options.theme]);

  const contextValue: GuideContextValue = useMemo(
    () => ({ controller: guide, options }),
    [guide, options],
  );

  return (
    <GuideContext.Provider value={contextValue}>
      {children}
      <Guide />
    </GuideContext.Provider>
  );
};
