export const SET_LOADING = 'SET_LOADING';
export const SET_THEME = 'SET_THEME';

export const mutations = {
  [SET_LOADING] (state, { isLoading, loadingComponent }) {
    state.loaders[ loadingComponent ] = isLoading;
  },

  [SET_THEME] (state, theme) {
    state.theme = theme;
  }
};
