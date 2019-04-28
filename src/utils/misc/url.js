import { isBrowser, isProduction, isServer } from "./system";
import { getObjectValueByPath, extractRequest } from "../index";

/**
 * @returns {boolean}
 */
export function isHttps () {
  if (isBrowser) {
    return location.href.startsWith( 'https' );
  }
  return isProduction;
}

/**
 * @param {*} params
 * @returns {string}
 */
export function buildQueryString (params = {}) {
  if (!params) {
    params = {};
  }

  const pairs = [];
  for (const paramKey in params) {
    if (!params.hasOwnProperty(paramKey)) {
      continue;
    }
    pairs.push( `${paramKey}=${encodeURIComponent( params[paramKey] )}` );
  }

  return pairs.join( '&' );
}

/**
 * @param {string} url
 * @returns {string}
 */
export function extractHostFromUrl (url) {
  const hasProtocol = url.startsWith( 'http' );
  const parts = url.split( '/' );
  return parts[ hasProtocol ? 2 : 0 ];
}

/**
 * @param {{context: {req: *}}} app
 * @returns {*}
 */
export function extractRoute (app) {
  return getObjectValueByPath( app, 'context.route' );
}

/**
 * @param {*} app
 * @returns {string}
 */
export function extractHost (app) {
  let host = '';

  if (isServer) {
    const req = extractRequest( app );
    if (req) {
      host = extractHostFromUrl( req.headers.host );
    }
  } else {
    host = extractHostFromUrl( window.location.host );
  }

  return host;
}

/**
 * @param {*} app
 * @returns {string}
 */
export function extractHref (app) {
  const host = extractHost( app );

  if (isServer) {
    const { fullPath } = extractRoute( app );

    return `http${isHttps() ? 's' : ''}://${host}${fullPath}`;
  } else {
    return window.location.href;
  }
}

/**
 * @param {string} host
 * @returns {boolean}
 */
export function isLocalHost (host) {
  return /^(localhost|127\.0\.0\.1|0\.0\.0\.0)/i.test( host );
}

/**
 * Opens URL in a new tab
 *
 * @param {string} toURL
 */
export function openInNewTab (toURL) {
  if (isServer) {
    return;
  }

  Object.assign(document.createElement('a'), {
    target: '_blank',
    href: toURL,
  }).click();
}

/**
 * Opens URL in a current tab
 *
 * @param {string} toURL
 */
export function openInCurrentTab (toURL) {
  if (isServer) {
    return;
  }

  Object.assign(document.createElement('a'), {
    href: toURL,
  }).click();
}
