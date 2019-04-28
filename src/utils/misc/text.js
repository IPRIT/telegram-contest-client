import { isServer } from './system';
import { ensureString } from "./helpers";

// trailing
export const entersTrailingRegex = /\n(?=\n{2,})/gi;
export const brTrailingRegex = /(<br\s*\/?>)(?=(<br\s*\/?>){1,})/gi;
export const spacesTrailingRegex = /[ ](?=[ ]+)/gi;

// trimming
export const brTrimmingRegex = /^(\s|(&nbsp;)|(<br\s?\/?>))+|(\s|(&nbsp;)|(<br\s?\/?>))+$/gi;

/**
 * @param {string} text
 * @return {Promise<string>}
 */
export async function copyText (text = '') {
  return new Promise(resolve => {
    if (isServer) {
      return resolve( text );
    }

    let succeeded = true;
    let selection;
    const range = document.createRange();

    if (window.clipboardData) {
      // for IE
      window.clipboardData.setData( 'Text', text );
    } else {
      // create a temporary element off screen
      const temporaryElement = document.createElement('div');
      temporaryElement.style.position = 'absolute';
      temporaryElement.style.left = '-1000px';
      temporaryElement.style.top = '-1000px';

      // Add the input value to the temp element.
      temporaryElement.innerHTML = text;
      document.body.appendChild( temporaryElement );

      // Select temp element.
      range.selectNodeContents( temporaryElement );
      selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange( range );

      // Lets copy.
      try {
        succeeded = document.execCommand( 'copy', false, null );
      } catch (e) {
        window.prompt( 'Чтобы скопировать, нажмите: Ctrl+C, Enter', text );
      }

      if (succeeded) {
        // remove temporary element
        temporaryElement.remove();
      }
    }

    resolve( text );
  });
}

/**
 * @example pluralize( 3, 'курс', ["", "а", "ов"] )
 *
 * @param {number} number
 * @param {string} word
 * @param {string[]} postfixes
 * @return {string}
 */
export function pluralize (number, word, postfixes) {
  const mod10 = number % 10;
  const mod100 = number % 100;

  let postfix = '';
  if (mod100 >= 5 && mod100 < 21
    || mod10 >= 5 && mod10 <= 9
    || !mod10) {
    postfix = postfixes[2];
  } else if (mod10 === 1) {
    postfix = postfixes[0];
  } else {
    postfix = postfixes[1];
  }

  return `${word}${postfix}`;
}

/**
 * @param {string} string
 * @returns {string}
 */
export function capitalize (string) {
  try {
    return string.charAt(0).toUpperCase() + string.slice(1);
  } catch (e) {
    return string;
  }
}

/**
 * @param {string} text
 * @return {string}
 */
export function removeTrailingSpaces (text) {
  return ensureString( text ).replace( entersTrailingRegex, '' ) // remove enters more than 2 in a row
    .replace( spacesTrailingRegex, '' ) // remove spaces more than 1 in a row
    .trim();
}

/**
 * @param {string} text
 * @returns {string}
 */
export function removeTrailingBrs (text) {
  return ensureString( text )
    .replace( brTrailingRegex, '' ) // remove br more than 2 in a row
    .trim();
}

/**
 * @param {string} text
 * @returns {string}
 */
export function trimBrs (text) {
  return ensureString( text )
    .replace( brTrimmingRegex, '' ) // trim br and spaces
    .trim();
}

/**
 * @param {string} description
 * @param {number} limit
 * @param {boolean} ellipsis
 * @returns {string}
 */
export function transformHtmlToText (description, limit = Infinity, ellipsis = true) {
  let descriptionText = description
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/ig, ' ')
    .slice( 0, limit );

  descriptionText = removeTrailingSpaces( descriptionText );

  const shouldEllipsis = ellipsis && description.length !== descriptionText.length;

  return `${descriptionText}${shouldEllipsis ? ' ...' : ''}`;
}
