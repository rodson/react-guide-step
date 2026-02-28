import type { GuideTheme } from '../types';

export const DEFAULT_THEME: GuideTheme = {
  primaryColor: '#1677ff',
  textColor: '#333333',
  bgColor: '#ffffff',
  overlayColor: 'rgba(0, 0, 0, 0.5)',
  borderRadius: 8,
  zIndex: 99999,
  animationDuration: 150,
};

/**
 * Merge user theme with defaults and generate CSS variable declarations.
 */
export function resolveTheme(theme?: GuideTheme): Required<GuideTheme> {
  return { ...DEFAULT_THEME, ...theme } as Required<GuideTheme>;
}

/**
 * Convert a resolved theme to CSS custom property declarations.
 */
export function themeToCssVars(theme: Required<GuideTheme>): string {
  return `
    --rgs-primary: ${theme.primaryColor};
    --rgs-text: ${theme.textColor};
    --rgs-bg: ${theme.bgColor};
    --rgs-overlay: ${theme.overlayColor};
    --rgs-radius: ${theme.borderRadius}px;
    --rgs-z: ${theme.zIndex};
    --rgs-duration: ${theme.animationDuration}ms;
  `;
}
