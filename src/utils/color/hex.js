import { clampNumber, ensureString } from "../misc/index";

/**
 * @param {string} color
 * @returns {boolean}
 */
export function isHex (color) {
  color = ensureString( color );

  return color.startsWith( '#' );
}

/**
 * @param {string} color
 * @returns {number}
 */
export function parseHex (color) {
  let hexValue = ensureString( color ).match( /([0-9a-fA-F]+)/ )[ 1 ];
  if (hexValue.length === 3) {
    hexValue += hexValue;
  }
  return parseInt( hexValue, 16 );
}

/**
 * @param {Array<number>} rgb
 * @returns {string}
 */
export function rgbToHex (rgb) {
  const [ r, g, b ] = rgb;
  const bin = r << 16 | g << 8 | b;
  return hexToString( bin );
}

/**
 * @param {number} intValue
 * @returns {string}
 */
export function hexToString (intValue) {
  const hex = clampNumber(intValue, 0, (1 << 24) - 1).toString( 16 );
  const hexText = new Array(7 - hex.length).join( '0' ) + hex;

  return `#${hexText}`;
}
