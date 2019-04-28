import { cookies } from './cookies';
import { buildQueryString } from './url';
import { TIME_PERIODS } from "./constants";

export const TOKEN_KEY = 'gcp-token';
export const TOKEN_QUERY_KEY = 'authToken';

/**
 * @param {*} app
 * @param {*} route
 * @param {boolean} repairQueryToken
 * @returns {*}
 */
export function extractToken (app, route = null, repairQueryToken = false) {
  let token = null;
  let fromQuery = false;

  if (route) {
    token = extractQueryToken( route );
    if (token) {
      fromQuery = true;

      if (repairQueryToken) {
        rememberToken( app, token );
      }
    }
  }

  if (!fromQuery) {
    token = cookies.getCookie( app, TOKEN_KEY );
  }

  return {
    fromQuery,
    token
  };
}

/**
 * @param {*} app
 * @param {string} token
 * @param {number} period
 */
export function rememberToken (app, token, period = TIME_PERIODS.year) {
  const expires = new Date( Date.now() + period );

  const options = {
    path: '/',
    expires
  };

  cookies.setCookie( app, TOKEN_KEY, token, options );
}

/**
 * @param {*} app
 */
export function forgetToken (app) {
  cookies.removeCookie( app, TOKEN_KEY, { path: '/' } );
}

/**
 * @param {*} route
 * @return {string|undefined}
 */
export function extractQueryToken (route) {
  const { query } = route;
  return query && query[ TOKEN_QUERY_KEY ];
}

/**
 * @param {*} route
 * @return {string}
 */
export function resolveRedirectTo (route) {
  let redirectTo = route.query.redirectTo || route.path;
  if (!route.query.redirectTo
    && Object.keys(route.query).length > 0) {
    redirectTo += `?${buildQueryString( route.query )}`;
  }
  return redirectTo;
}

/**
 * @param {*} store
 * @return {boolean}
 */
export function isUserLoggedIn (store) {
  return store && store.getters && store.getters[ 'user/hasAuthToken' ];
}

/**
 * @param route
 * @param {string} to
 * @return {string}
 */
export function prepareRedirectUri (route, to) {
  const redirectTo = resolveRedirectTo( route );
  return `/passport/${to}?${buildQueryString({ redirectTo })}`;
}
/**
 * @param {Function} redirect
 * @param {*} route
 * @param {string} to
 * @return {Function}
 */
export function prepareRedirect ({ redirect, route, to = 'sign-in' }) {
  // bind redirect function to login route with `redirectTo` param
  return redirect.bind( null, 302, prepareRedirectUri( route, to ) );
}

/**
 * @param {*} store
 * @param {*} route
 * @param {Function} redirect
 * @return {{needsRedirect: boolean, redirect: Function, redirectToLogin: Function, redirectToRegister: Function}}
 */
export function restrictRoute ({ store, route, redirect }) {
  const loggedIn = isUserLoggedIn( store );
  const guardResult = {
    needsRedirect: !loggedIn,
    redirect: () => {},
    redirectToLogin: () => {},
    redirectToRegister: () => {}
  };

  if (loggedIn) {
    return guardResult;
  }

  // build `redirectTo` param from current route
  const redirectRoutes = {};
  for (const to of [ 'sign-in', 'sign-up' ]) {
    redirectRoutes[ to ] = prepareRedirect({ redirect, route, to });
  }

  // bind redirect function to login route with `redirectTo` param
  guardResult.redirect = redirectRoutes[ 'sign-in' ];
  guardResult.redirectToLogin = redirectRoutes[ 'sign-in' ];
  guardResult.redirectToRegister = redirectRoutes[ 'sign-up' ];

  return guardResult;
}
