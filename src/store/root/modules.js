import { createVuexModules } from '../../utils';

// Modules
import * as ui from '../ui';
import * as money from '../money';

const modules = {
  ui,
  money
};

/**
 * @returns {Object}
 */
export function createModules () {
  return createVuexModules( modules );
}
