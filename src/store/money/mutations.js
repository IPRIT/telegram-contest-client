import { DEFAULT_FUNDS } from './constants';

export const SET_TABLE = 'SET_TABLE';
export const ADD_FUNDS = 'ADD_FUNDS';

export const mutations = {
  [SET_TABLE] (state, table) {
    state.table = table;
  },

  [ADD_FUNDS] (state, row) {
    row.balance += DEFAULT_FUNDS;
  }
};
