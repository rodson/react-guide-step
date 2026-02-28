const STYLE_PREFIX = 'rgs';

/**
 * Inject a <style> tag into <head> with a given id.
 * If a style tag with the same id already exists, it will be updated.
 */
export function injectStyles(id: string, css: string): void {
  const fullId = `${STYLE_PREFIX}-${id}`;
  let styleEl = document.getElementById(fullId) as HTMLStyleElement | null;

  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = fullId;
    styleEl.setAttribute('data-rgs', '');
    document.head.appendChild(styleEl);
  }

  styleEl.textContent = css;
}

/**
 * Remove a previously injected <style> tag by id.
 */
export function removeStyles(id: string): void {
  const fullId = `${STYLE_PREFIX}-${id}`;
  const styleEl = document.getElementById(fullId);
  if (styleEl) {
    styleEl.remove();
  }
}
