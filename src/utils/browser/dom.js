import { isServer } from "../misc/system";

/**
 * @param {Element} element
 * @return {{top: number, left: number}}
 */
export function getElementOffset (element) {
  if (!element || isServer) {
    return { top: 0, left: 0 };
  }

  // Return zeros for disconnected and hidden (display: none) elements
  // Support: IE <= 11 only
  // Running getBoundingClientRect on a
  // disconnected node in IE throws an error
  if (element.getClientRects && !element.getClientRects().length) {
    return { top: 0, left: 0 };
  }

  // Get document-relative position by adding viewport scroll to viewport-relative gBCR
  const rect = element.getBoundingClientRect();
  const win = element.ownerDocument.defaultView;

  return {
    top: rect.top + win.pageYOffset,
    left: rect.left + win.pageXOffset
  };
}

/**
 * @param {Element} targetElement
 * @param {Element} relativeElement
 * @return {{ top: number, left: number }}
 */
export function getElementRelativeOffset (targetElement, relativeElement) {
  const targetOffset = getElementOffset(targetElement);
  const relativeOffset = getElementOffset(relativeElement);

  return {
    top: targetOffset.top - relativeOffset.top + relativeElement.scrollTop,
    left: targetOffset.left - relativeOffset.left + relativeElement.scrollLeft
  };
}

/**
 * @returns {number}
 */
export function getDocumentHeight () {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.offsetHeight,
    document.body.clientHeight,
    document.documentElement.clientHeight
  );
}

/**
 * @returns {number}
 */
export function getWindowHeight () {
  return window.innerHeight ||
    (document.documentElement || document.body).clientHeight;
}

/**
 * @param {Element} element
 * @returns {number}
 */
export function getElementHeight (element) {
  return element.innerHeight || element.clientHeight;
}

/**
 * @param {Element} element
 * @returns {number}
 */
export function getElementWidth (element) {
  return element.innerWidth || element.clientWidth;
}

/**
 * @param {Element} element
 * @returns {number}
 */
export function getElementScrollHeight (element) {
  return Math.max(
    element.scrollHeight,
    element.offsetHeight,
    element.clientHeight
  );
}

/**
 * @param {Element} element
 * @returns {number}
 */
export function getElementScrollWidth (element) {
  return Math.max(
    element.scrollWidth,
    element.offsetWidth,
    element.clientWidth
  );
}

/**
 * @return {number}
 */
export function getDocumentScrollTop () {
  return window.pageYOffset
    || document.documentElement.offsetTop || 0;
}

/**
 * @param {Element|*} el
 * @return {number}
 */
export function getZIndex (el) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return 0;
  }

  const zi = document.defaultView.getComputedStyle(el).getPropertyValue('z-index');
  if (isNaN(zi)) {
    return getZIndex(el.parentNode);
  }

  return zi;
}
