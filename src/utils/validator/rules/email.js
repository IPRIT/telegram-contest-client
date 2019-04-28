import { errors } from "../errors/errors";
import { validate } from "../validator";

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

/**
 * @param {Object} options
 * @return {Function}
 */
export function email (options = {}) {
  return validate({
    regex: emailRegex,
    message: errors.email,
    ...options
  });
}
