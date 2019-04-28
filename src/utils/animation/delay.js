/**
 * @param {number} delayMs
 * @returns {Promise<any>}
 */
export function animationDelay (delayMs = 0) {
  return new Promise(resolve => {
    setTimeout(_ => requestAnimationFrame( resolve ), delayMs);
  });
}
