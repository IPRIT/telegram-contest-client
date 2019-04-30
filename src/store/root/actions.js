import * as mutations from './mutations';
import { getIssues } from '../../api/issues/getIssues';

export const actions = {
  fetchIssues ({ commit, state }) {
    commit( mutations.RESET_OFFSET );

    const { offset, limit, entryIds = [] } = state;

    const params = { offset, limit };

    if (entryIds && entryIds.length) {
      Object.assign(params, {
        entryIds: entryIds.join( ',' )
      })
    }

    return getIssues( this.$axios, params ).then(issues => {
      commit( mutations.SET_ISSUES, issues );
      commit( mutations.ADD_OFFSET, state.limit );

      return issues;
    });
  },

  fetchMoreIssues ({ commit, state }) {
    const { offset, limit, entryIds = [] } = state;

    const params = { offset, limit };

    if (entryIds && entryIds.length) {
      Object.assign(params, {
        entryIds: entryIds.join( ',' )
      })
    }

    return getIssues( this.$axios, params ).then(issues => {
      commit( mutations.APPEND_ISSUES, issues );
      commit( mutations.ADD_OFFSET, state.limit );

      return issues;
    });
  },

  prependIssues ({ commit, state }, issues = []) {
    commit( mutations.PREPEND_ISSUES, issues );
    commit( mutations.POP_ISSUES, issues.length );
  }
};
