/**
 * @param module
 * @returns {Object}
 */
export function resolveDynamicState (module) {
  return typeof module.state === 'function'
    ? module.state()
    : module.state;
}

/**
 * @param module
 * @returns {Object}
 */
export function resolveVuexModules (module) {
  return module && (
    module.modules || module.createModules && module.createModules()
  ) || {};
}

/**
 * @param {Object} modules
 * @param {boolean} namespaced
 * @returns {Object}
 */
export function createVuexModules (modules, namespaced = true) {
  return Object.keys( modules ).reduce((preparedModules, moduleName) => {
    const module = modules[ moduleName ];

    return Object.assign(preparedModules, {
      [moduleName]: {
        namespaced, // should module be namespaced (namespace/action)

        state: resolveDynamicState( module ),
        getters: module.getters || {},
        actions: module.actions || {},
        mutations: module.mutations || {},
        modules: resolveVuexModules( module )
      }
    });
  }, {});
}
