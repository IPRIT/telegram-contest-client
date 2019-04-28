import { errors } from "./errors/index";

export function validate (options = {}) {
  const {
    message = errors.unknown,
    regex = null,
    validator = null
  } = options;

  return value => {
    let isValid = true;

    try {
      if (regex instanceof RegExp) {
        isValid = regex.test( String(value).toLowerCase() );
      } else if (validator && typeof validator === 'function') {
        isValid = validator( value );
      }
    } catch (e) {
      return message;
    }

    if (!isValid) {
      return message;
    }

    return true;
  };
}
