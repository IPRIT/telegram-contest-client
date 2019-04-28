import { isBrowser } from '../misc/system';

/**
 * @returns {boolean}
 */
export function isNativeShareAvailable () {
  return isBrowser && typeof window.navigator.share === 'function';
}

/**
 * @param {{title: string, text: string, url: string}} options
 * @returns {Promise<*>}
 */
export async function nativeShare (options = {}) {
  if (!isNativeShareAvailable()) {
    throw new Error( 'Native Share API does not supported by current browser version' );
  }

  const shareDefaultOptions = {
    title: document.title,
    text: document.title,
    url: location.href
  };

  const mergedOptions = Object.assign( {}, shareDefaultOptions, options );

  return navigator.share( mergedOptions );
}
