const extractCookies = Symbol( '@extractCookies' );

/**
 * @type {{setCookie(*, string, *, *=): void, getCookie(*, string, *=): *, removeCookie(*, string, *=): void}}
 */
export const cookies = {
  /**
   * @private
   */
  [ extractCookies ] (app) {
    if (app && app.$cookies) {
      return app.$cookies;
    }
    console.warn( 'Unable to find app.$cookies. Probably you use it without `app`.' );
  },
  /**
   * @param {*} app
   * @param {string} name
   * @param {*} value
   * @param {*} opts
   */
  setCookie (app, name, value, opts = {}) {
    const $cookies = this[ extractCookies ]( app );
    $cookies && $cookies.set( name, value, opts );
  },

  /**
   * @param {*} app
   * @param {string} name
   * @param {*} opts
   */
  getCookie (app, name, opts = {}) {
    const $cookies = this[ extractCookies ]( app );
    return $cookies && $cookies.get( name, opts );
  },

  /**
   * @param {*} app
   * @param {string} name
   * @param {*} opts
   */
  removeCookie (app, name, opts = {}) {
    const $cookies = this[ extractCookies ]( app );
    $cookies && $cookies.remove( name, opts );
  }
};
