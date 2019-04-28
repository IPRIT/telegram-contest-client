import { ensureString } from "../misc/index";
import { isRgba, parseRgba } from "./rgba";

/**
 * @param {string} color
 * @returns {boolean}
 */
export function isRgb (color) {
  color = ensureString( color );

  return !isRgba( color ) && color.startsWith( 'rgb' );
}

/**
 * @param {string} color
 * @returns {Array<number>}
 */
export function parseRgb (color) {
  return parseRgba( color );
}

/**
 * @param {number} hex
 * @returns {Array<number>}
 */
export function hexToRgb (hex) {
  const r = hex >> 16;
  const g = hex >> 8 & 0xFF;
  const b = hex & 0xFF;
  return [ r, g, b ];
}

/**
 * @param {Array<number>} rgb
 * @returns {string}
 */
export function rgbToString (rgb) {
  return `rgb(${rgb.join(', ')})`;
}
