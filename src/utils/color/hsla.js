import { ensureString } from "../misc/index";

/**
 * @param {string} color
 * @returns {boolean}
 */
export function isHsla (color) {
  color = ensureString( color );

  return color.startsWith( 'hsla' );
}

/**
 * @param {string} color
 * @returns {Array<number>}
 */
export function parseHsla (color) {
  const hsla = color.split( ',' ).map(value => {
    return ensureString( value ).match( /([0-9.]+)/ )[ 1 ];
  }).map( parseFloat );

  // normalize hsl
  hsla[ 0 ] /= 360;
  hsla[ 1 ] /= 100;
  hsla[ 2 ] /= 100;

  return hsla;
}

/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param {Array<number>} rgba
 * @returns {Array<number>}
 */
export function rgbaToHsla (rgba = []) {
  // eslint-disable-next-line prefer-const
  let [ r, g, b, a ] = rgba;
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max( r, g, b );
  const min = Math.min( r, g, b );

  let h, s;
  const l = ( max + min ) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;

    s = l > 0.5
      ? d / (2 - max - min)
      : d / (max + min);

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }

    h /= 6;
  }

  return [ h, s, l, a ];
}

/**
 * @param {Array<number>} hsla
 * @returns {string}
 */
export function hslaToString (hsla) {
  hsla[ 0 ] *= 360;
  hsla[ 1 ] *= 100;
  hsla[ 2 ] *= 100;

  return `hsla(${hsla[0]}, ${hsla[1]}%, ${hsla[2]}%, ${hsla[3] || 1})`;
}
