export const SET_LOADING = 'SET_LOADING';

export const mutations = {
  [SET_LOADING] (state, { isLoading, loadingComponent }) {
    state.loaders[ loadingComponent ] = isLoading;
  },
};
