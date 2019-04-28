/**
 * @param {Object} obj
 * @param {string} path
 * @return {*}
 */
export function getObjectValueByPath (obj, path) {
  // credit: http://stackoverflow.com/questions/6491463/accessing-nested-javascript-objects-with-string-key#comment55278413_6491621
  if (!path || path.constructor !== String) {
    return;
  }
  path = path.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
  path = path.replace(/^\./, ''); // strip a leading dot
  const a = path.split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (obj instanceof Object && k in obj) {
      obj = obj[k];
    } else {
      return;
    }
  }
  return obj;
}

/**
 * @param {number} length
 * @return {Array<number>}
 */
export function createRange (length) {
  return [ ...Array.from({ length }, (v, k) => k) ];
}

export const tagsToReplace = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;'
};

/**
 * @param {string} str
 * @return {string}
 */
export function escapeHTML (str) {
  return str.replace(/[&<>]/g, tag => tagsToReplace[tag] || tag);
}

/**
 * @param {Object} obj
 * @param {Array} keys
 */
export function filterObjectOnKeys (obj, keys) {
  const filtered = {};
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (typeof obj[key] !== 'undefined') {
      filtered[key] = obj[key];
    }
  }
  return filtered;
}

/**
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function clampNumber (value, min = -Infinity, max = Infinity) {
  if (min > max) {
    [ min, max ] = [ max, min ];
  }
  return Math.min(
    Math.max(ensureNumber(value), min),
    max
  );
}

/**
 * @param {*} value
 * @return {number}
 */
export function ensureNumber (value) {
  value = Number(value);
  if (Number.isNaN(value)) {
    return 0;
  }
  return value;
}

/**
 * @param {string|*} value
 * @returns {string}
 */
export function ensureString (value) {
  if (typeof value === 'string') {
    return value;
  }

  return ( value || '' ).toString();
}

/**
 * @param {string} className
 * @return {string}
 */
export function normalizeClassName (className) {
  const whitespaceRegexp = /(\s+(?=\s))/gi;
  return (className || '')
    .toString()
    .replace(whitespaceRegexp, '')
    .trim();
}

/**
 * @param {*} value
 * @returns {boolean}
 */
export function isObject (value) {
  return typeof value === 'object' && value !== null;
}

/**
 * @param {*} value
 * @return {boolean}
 */
export function isArray (value) {
  return Array.isArray( value );
}

/**
 * @param {RegExp|*} value
 * @returns {boolean}
 */
export function isRegex (value) {
  return Object.prototype.toString.call( value ) === '[object RegExp]';
}

/**
 * @param {*} value
 * @returns {boolean}
 */
export function isPlainValue (value) {
  return [ 'number', 'string' ].includes( typeof value )
    || value === null
    || value === undefined;
}

/**
 * @param {*} value
 * @returns {string}
 */
export function toString (value) {
  if (value === null) {
    return 'null';
  }

  if (value === undefined) {
    return 'undefined';
  }

  if (value.toString) {
    return value.toString();
  }

  return Object.prototype.toString.call( value );
}

/**
 * Number.prototype.format(n, x, s, c)
 *
 * @param {number} n - length of decimal
 * @param {number} x - length of whole part
 * @param {string} s - sections delimiter
 * @param {string} c - decimal delimiter
 */
Number.prototype.format = function(n = 0, x = 3, s = ' ', c = '.') {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')';
  const num = this.toFixed(Math.max(0, ~~n));

  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ' '));
};

/**
 * @param {number} min
 * @param {number} max
 * @return {number}
 */
export function generateNumber (min = 0, max = 1e9) {
  min = Math.ceil( min );
  max |= 0;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * @param {string|*} value
 * @param {Function?} modifier
 * @returns {any[]}
 */
export function splitStringArray(value, modifier = (v) => v) {
  return (value || '').toString()
    .split(',')
    .filter(val => !!val.length)
    .map(modifier);
}


/**
 * If arrays equal - returns true
 * @param {Array<*>} a
 * @param {Array<*>} b
 * @param {boolean} strict
 * @returns {boolean}
 */
export function arraysEqual(a, b, strict = false) {
  if (a === b) {
    return true;
  }
  if (a === null || b === null) {
    return false;
  }
  if (a.length !== b.length) {
    return false;
  }

  // If you don't care about the order of the elements inside
  // the array, you should sort both arrays here.
  if (!strict) {
    a = Array.isArray(a) ? a.slice().sort() : a;
    b = Array.isArray(b) ? b.slice().sort() : b;
  }

  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}

/**
 * @param {Object} a
 * @param {Object} b
 * @returns {boolean}
 */
export function objectsEqual (a, b) {
  const aProps = Object.getOwnPropertyNames(a),
    bProps = Object.getOwnPropertyNames(b);

  if (aProps.includes('__ob__')) {
    aProps.splice(aProps.indexOf('__ob__'), 1);
  }

  if (bProps.includes('__ob__')) {
    bProps.splice(bProps.indexOf('__ob__'), 1);
  }

  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let i = 0; i < aProps.length; i++) {
    const propName = aProps[i];

    // check for NaN's
    if (a[propName] !== a[propName]) {
      if (b[propName] !== b[propName]) {
        continue;
      }
      return false;
    }

    // do a recursive check if property value is an object
    if (isObject( a[propName] )) {
      if (isObject( b[propName] ) && objectsEqual(a[propName], b[propName])) {
        continue;
      }
      return false;
    }

    // otherwise compare values
    if (a[propName] !== b[propName]) {
      return false;
    }
  }

  return true;
}

/**
 * @param {Array<any>} array
 * @returns {Array<any>}
 */
export function toUniqueArray (array = []) {
  const set = new Set();

  return array.reduce((uniq, value) => {
    if (set.has( value )) {
      return uniq;
    }
    set.add( value );
    return uniq.concat( value );
  }, []);
}

/**
 * @param {object} value
 * @param {object?} container
 * @param {string?} scope
 * @returns {object}
 */
export function flattenObject (value, container = {}, scope = '') {
  if (isPlainValue( value )) {
    return toString( value );
  }

  for (const key in value) {
    if (!value.hasOwnProperty( key )) {
      continue;
    }

    const newScope = [ scope, key ].filter(v => v).join( '.' );

    if (isPlainValue( value[ key ] )) {
      container[ newScope ] = toString( value [ key ] );
    } else {
      flattenObject( value[ key ], container, newScope );
    }
  }

  return container;
}

/**
 * @param {Object} value
 * @return {string}
 */
export function objectFingerprint (value) {
  const flattenedObject = flattenObject( value );

  const flattenArray = Object.keys( flattenedObject ).map(key => {
    const value = flattenedObject[ key ];
    return [ key, value ].join( ':' );
  });

  const flattenArraySorted = toUniqueArray( flattenArray ).sort((a, b) => {
    if (a[0] === b[0]) {
      return 0;
    }
    return a[0] > b[0] ? 1 : -1;
  });

  return flattenArraySorted.join( '::' );
}
