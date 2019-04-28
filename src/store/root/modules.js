import { createVuexModules } from '../../utils';

// Modules
import * as ui from '../ui';

const modules = {
  ui
};

/**
 * @returns {Object}
 */
export function createModules () {
  return createVuexModules( modules );
}
