/**
 * @param {*} axios
 * @param {string} url
 * @param {*} data
 */
import { getObjectValueByPath } from "./helpers";

export function post (axios, url, data = {}) {
  return axios.$post( url, data ).then( transformResponse ).catch( transformError );
}

/**
 * @param {*} axios
 * @param {string} url
 * @param {*} params
 */
export function get (axios, url, params = {}) {
  return axios.$get( url, { params } ).then( transformResponse );
}

/**
 * @param {{ response: any }} data
 * @return {*}
 */
export function transformResponse (data) {
  return data && data.response;
}

/**
 * @param data
 * @return {*|{message: (*|string)}}
 */
export function transformError (data) {
  const errorObject = getObjectValueByPath( data, 'response.data.error' );
  const nativeErrorMessge = getObjectValueByPath( data, 'message' );
  const $error = errorObject || { message: nativeErrorMessge || 'Произошла неизвестная ошибка' };

  throw $error;
}
