import { ensureString } from "../misc/index";
import { hslaToString, isHsla, parseHsla } from "./hsla";

/**
 * @param {string} color
 * @returns {boolean}
 */
export function isHsl (color) {
  color = ensureString( color );

  return !isHsla( color ) && color.startsWith( 'hsl' );
}

/**
 * @param {string} color
 * @returns {Array<number>}
 */
export function parseHsl (color) {
  return parseHsla( color );
}

/**
 * @param {Array<number>} hsl
 * @returns {string}
 */
export function hslToString (hsl) {
  return hslaToString( hsl );
}
