import { isBrowser, isServer } from '../misc/system';

/**
 * @returns {boolean}
 */
export function hasGeolocation () {
  return !isServer && 'geolocation' in navigator;
}

/**
 * @returns {Promise<{coords: Object, timestamp: Number}>}
 */
export function getCurrentPosition (options = {}) {
  return new Promise((resolve, reject) => {
    if (!isBrowser) {
      reject( new Error( 'Failed to retrieve position' ) );
    } else if (!hasGeolocation()) {
      reject( new Error( 'Browser does not support geolocation' ) );
    }

    const defaultOptions = {
      timeout: 30 * 1000
    };

    options = Object.assign( {}, defaultOptions, options );

    navigator.geolocation.getCurrentPosition( resolve, reject, options );
  });
}
