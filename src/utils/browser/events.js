/**
 * @param {Element} el
 * @param {string} event
 * @param {Function} cb
 */
export function addOnceEventListener (el, event, cb) {
  const once = () => {
    cb();
    el.removeEventListener(event, once, false);
  };

  el.addEventListener(event, once, false);
}
