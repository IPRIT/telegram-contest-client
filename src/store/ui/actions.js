import * as mutations from "./mutations";
import { clearLocalHost, cookies, extractHost, isLocalHost } from '../../utils/misc';
import { TIME_PERIODS } from '../../utils/misc/constants';

export const actions = {
  /**
   * @param {Function} commit
   * @param {boolean} isLoading
   * @param {string} loadingComponent
   */
  setLoading ({ commit }, { isLoading, loadingComponent }) {
    commit(mutations.SET_LOADING, { isLoading, loadingComponent });
  },

  setTheme ({ commit }, theme = 'default') {
    commit( mutations.SET_THEME, theme );
  },

  rememberTheme ({ commit }, theme = 'default') {
    const expires = new Date( Date.now() + 100 * TIME_PERIODS.year );

    const host = extractHost( this.app );
    const isLocal = isLocalHost( host );

    const domain = isLocal
      ? clearLocalHost( host )
      : host;

    const options = {
      path: '/',
      expires,
      domain
    };

    cookies.setCookie( this.app, 'js:theme', theme, options );
  }
};
