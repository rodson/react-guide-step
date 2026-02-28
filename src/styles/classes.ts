/**
 * All CSS class definitions for react-guide-step.
 * Uses rgs- prefix and references CSS variables.
 */
export const BASE_STYLES = `
  .rgs-portal {
    position: fixed;
    inset: 0;
    z-index: var(--rgs-z);
    pointer-events: none;
  }

  .rgs-portal > * {
    pointer-events: auto;
  }

  /* Spotlight overlay — uses box-shadow for the mask */
  .rgs-spotlight {
    position: fixed;
    box-shadow: 0 0 0 9999px var(--rgs-overlay);
    border-radius: 4px;
    z-index: var(--rgs-z);
    pointer-events: none;
  }

  .rgs-spotlight--interactive {
    pointer-events: auto;
  }

  /* Clickable overlay behind everything to detect mask clicks */
  .rgs-overlay {
    position: fixed;
    inset: 0;
    z-index: calc(var(--rgs-z) - 1);
    cursor: default;
  }

  /* Tooltip container */
  .rgs-tooltip {
    position: fixed;
    z-index: calc(var(--rgs-z) + 1);
    background: var(--rgs-bg);
    color: var(--rgs-text);
    border-radius: var(--rgs-radius);
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
                0 3px 6px -4px rgba(0, 0, 0, 0.12),
                0 9px 28px 8px rgba(0, 0, 0, 0.05);
    padding: 16px;
    min-width: 280px;
    max-width: 420px;
    opacity: 0;
    transition: opacity var(--rgs-duration) ease;
    outline: none;
  }

  .rgs-tooltip--visible {
    opacity: 1;
  }

  .rgs-tooltip__title {
    font-size: 16px;
    font-weight: 600;
    margin: 0 0 8px 0;
    line-height: 1.4;
  }

  .rgs-tooltip__content {
    font-size: 14px;
    line-height: 1.6;
    margin: 0 0 16px 0;
    color: var(--rgs-text);
    opacity: 0.85;
  }

  .rgs-tooltip__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
  }

  .rgs-tooltip__counter {
    font-size: 12px;
    color: var(--rgs-text);
    opacity: 0.45;
    flex-shrink: 0;
  }

  .rgs-tooltip__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }

  /* Buttons */
  .rgs-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 4px 16px;
    font-size: 14px;
    line-height: 1.5;
    border-radius: calc(var(--rgs-radius) - 2px);
    cursor: pointer;
    border: 1px solid transparent;
    transition: all 0.2s ease;
    white-space: nowrap;
    font-family: inherit;
  }

  .rgs-btn:focus-visible {
    outline: 2px solid var(--rgs-primary);
    outline-offset: 2px;
  }

  .rgs-btn--primary {
    background: var(--rgs-primary);
    color: #fff;
    border-color: var(--rgs-primary);
  }

  .rgs-btn--primary:hover {
    opacity: 0.85;
  }

  .rgs-btn--default {
    background: transparent;
    color: var(--rgs-text);
    border-color: #d9d9d9;
  }

  .rgs-btn--default:hover {
    color: var(--rgs-primary);
    border-color: var(--rgs-primary);
  }

  .rgs-btn--text {
    background: transparent;
    color: var(--rgs-text);
    opacity: 0.65;
    padding: 4px 8px;
  }

  .rgs-btn--text:hover {
    opacity: 1;
  }

  /* Arrow (styles applied inline, this is a fallback) */
  .rgs-arrow {
    position: absolute;
  }

  /* Waiting state */
  .rgs-waiting {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: calc(var(--rgs-z) + 1);
    color: var(--rgs-bg);
    font-size: 14px;
  }
`;
