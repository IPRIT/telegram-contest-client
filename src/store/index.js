import Vuex from 'vuex';

import { resolveDynamicState } from '../utils';

import * as root from './root';

export default function createStore () {
  return new Vuex.Store({
    state: resolveDynamicState( root ),
    getters: root.getters,
    actions: root.actions,
    mutations: root.mutations,

    modules: root.createModules()
  });
};
