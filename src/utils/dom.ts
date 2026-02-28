/**
 * Resolve a target to an HTMLElement.
 * Accepts a CSS selector string or an HTMLElement directly.
 */
export function getElement(target: string | HTMLElement): HTMLElement | null {
  if (target instanceof HTMLElement) return target;
  return document.querySelector<HTMLElement>(target);
}

/**
 * Get the bounding rect of an element as a plain object.
 */
export function getRect(el: HTMLElement): DOMRect {
  return el.getBoundingClientRect();
}

/**
 * Simple className joiner — filters falsy values.
 */
export function clsx(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
