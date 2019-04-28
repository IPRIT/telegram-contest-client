export const SET_ISSUES = 'SET_ISSUES';
export const APPEND_ISSUES = 'APPEND_ISSUES';
export const PREPEND_ISSUES = 'PREPEND_ISSUES';
export const ADD_OFFSET = 'ADD_OFFSET';
export const RESET_OFFSET = 'RESET_OFFSET';

export const mutations = {
  [SET_ISSUES] (state, issues) {
    state.issues = issues;
  },

  [APPEND_ISSUES] (state, issues) {
    state.issues.push( ...issues );
  },

  [PREPEND_ISSUES] (state, issues) {
    state.issues.unshift( ...issues );
  },

  [ADD_OFFSET] (state, offset) {
    state.offset += offset;
  },

  [RESET_OFFSET] (state) {
    state.offset = 0;
  },
};
