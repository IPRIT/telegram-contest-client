import * as mutations from "./mutations";

export const actions = {
  /**
   * @param {Function} commit
   * @param {boolean} isLoading
   * @param {string} loadingComponent
   */
  setLoading ({ commit }, { isLoading, loadingComponent }) {
    commit(mutations.SET_LOADING, { isLoading, loadingComponent });
  },
};
