import * as mutations from "./mutations";
import { getTable } from '../../api/money/getTable';
import { SocketManager } from '../../utils/network/socket-manager';
import { animationDelay } from '../../utils/animation';
import { createAnimation } from './helpers';
import { DEFAULT_FUNDS } from './constants';
import debounce from 'lodash.debounce';

export async function fetchTable ({ commit, dispatch }) {
  return getTable( this.$axios ).then(({ table, prizePool = 0 }) => {
    commit( mutations.SET_TABLE, table );
    commit( mutations.SET_PRIZE_POOL, prizePool );
    dispatch( 'sortTable' );
  });
}

export function addFunds ({ commit, state, dispatch }, { userId }) {
  const row = state.table.find(row => {
    return row.userId == userId;
  });
  commit( mutations.ADD_FUNDS, row );

  const socketManager = SocketManager.getManager();
  socketManager.socket.emit( 'money.addFunds', userId );

  createAnimation( userId, DEFAULT_FUNDS );

  return animationDelay( 10 ).then(_ => {
    dispatch( 'sortTable' );
  });
}

let debouncedSort = null;

export function sortTable ({ commit, state }) {
  if (!debouncedSort) {
    debouncedSort = debounce(_ => {
      const table = state.table.sort((a, b) => {
        return b.balance - a.balance;
      });
      commit( mutations.SET_TABLE, table );
    }, 1000);
  }

  debouncedSort();
}

export function updateFromServer ({ commit, state, dispatch }, updates = []) {
  const updateMap = updates.reduce((m, v) => {
    m.set( v.userId, v );
    return m;
  }, new Map());

  const table = state.table;
  for (let i = 0; i < table.length; ++i) {
    if (updateMap.has( table[i].userId )) {
      const update = updateMap.get( table[i].userId );
      if (update.balance > table[i].balance) {
        const oldBalance = table[i].balance;

        table[i].balance = update.balance;

        createAnimation( update.userId, update.balance - oldBalance );
      }
    }
  }

  return animationDelay( 10 ).then(_ => {
    dispatch( 'sortTable' );
  });
}

export function setPrizePool ({ commit, state, dispatch }, prizePool = 0) {
  commit( mutations.SET_PRIZE_POOL, prizePool );
}
