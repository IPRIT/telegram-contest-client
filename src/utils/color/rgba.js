import { ensureString } from "../misc/index";
import { hexToRgb, isRgb, parseRgb } from "./rgb";
import { isHex, parseHex } from "./hex";
import { isHsla, parseHsla } from "./hsla";
import { isHsl, parseHsl } from "./hsl";

/**
 * @param {string} color
 * @returns {boolean}
 */
export function isRgba (color) {
  color = ensureString( color );

  return color.startsWith( 'rgba' );
}

/**
 * @param {string} color
 * @returns {Array<number>}
 */
export function parseRgba (color) {
  return color.split( ',' ).map(value => {
    return ensureString( value ).match( /([0-9.]+)/ )[ 1 ];
  }).map( parseFloat );
}

/**
 * @param {Array<number>} hsla
 * @returns {Array<number>}
 */
export function hslaToRgba (hsla = []) {
  const [ h, s, l, a ] = hsla;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb (p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb( p, q, h + 1 / 3 );
    g = hue2rgb( p, q, h );
    b = hue2rgb( p, q, h - 1 / 3 );
  }

  return [ r * 255, g * 255, b * 255, a ];
}

/**
 * @param {Array<number>} rgba
 * @returns {string}
 */
export function rgbaToString (rgba) {
  return `rgba(${rgba.join(', ')})`;
}

/**
 * @param {string} color
 * @returns {Array<number>}
 */
export function colorToRgbaArray (color) {
  try {
    if (isRgba( color )) {
      return parseRgba( color );
    }

    if (isRgb( color )) {
      return parseRgb( color ).concat( 1 );
    }

    if (isHex( color )) {
      return [ ...hexToRgb( parseHex( color ) ), 1 ];
    }

    if (isHsla( color )) {
      return hslaToRgba( parseHsla( color ) );
    }

    if (isHsl( color )) {
      return hslaToRgba( parseHsl( color ).concat( 1 ) );
    }
  } catch (e) {}

  return Array( 4 ).fill( 0 );
}
