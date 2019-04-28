import { clampNumber } from "../misc/index";
import { colorToRgbaArray, hslaToRgba, rgbaToString } from "./rgba";
import { rgbaToHsla } from "./hsla";

/**
 * @param {string} color
 * @param {number} by
 * @returns {string}
 */
export function transparentize (color, by = 0) {
  const rgba = colorToRgbaArray( color );
  rgba[ 3 ] = 1 - clampNumber( by, 0, 1 );
  return rgbaToString( rgba );
}

/**
 * Makes a color darker.
 * Takes a color and a number between 0 and 1,
 * and returns a color with the lightness decreased by that amount.
 *
 * @see http://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method
 * @param {string} color
 * @param {number} value - between 0 and 1
 */
export function darken (color, value) {
  const hsla = rgbaToHsla( colorToRgbaArray( color ) );
  hsla[ 2 ] = clampNumber( hsla[ 2 ] - value, 0, 1 );
  return rgbaToString( hslaToRgba( hsla ) );
}

/**
 * Makes a color lighter.
 * Takes a color and a number between `0` and `1`,
 * and returns a color with the lightness increased by that amount.
 *
 * @see http://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method
 * @param {string} color
 * @param {number} value - between 0 and 1
 */
export function lighten (color, value) {
  const hsla = rgbaToHsla( colorToRgbaArray( color ) );
  hsla[ 2 ] = clampNumber( hsla[ 2 ] + value, 0, 1 );
  return rgbaToString( hslaToRgba( hsla ) );
}
