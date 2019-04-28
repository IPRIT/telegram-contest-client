import { errors } from "../errors/errors";
import { validate } from "../validator";
/**
 * @param {Object} options
 * @return {Function}
 */
export function required (options = {}) {
  return validate({
    message: errors.required,
    validator: v => !!v,
    ...options
  });
}
