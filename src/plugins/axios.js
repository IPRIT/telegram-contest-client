import { consoleLogNamespaced, ensureNumber, extractToken, isBrowser } from "../utils/misc";

const logger = consoleLogNamespaced( 'Axios' );

export default function ({ $axios, app, store }) {
  const { token } = extractToken( app );
  token && $axios.setHeader( 'X-Token', token );

  $axios.onRequest( onRequest );
  $axios.onError( onError );

  $axios.onResponse( onResponse.bind(null, store) );
  $axios.onResponseError( onResponseError.bind(null, store) );
}

/**
 * @param {*} config
 */
function onRequest (config) {
  logger.info( 'requesting', config.url, ...filterArguments( { config } ) );
}

/**
 * @param {*} error
 */
function onError (error) {
  const code = ensureNumber( error.response && error.response.status );
  logger.warn( `error`, code, ...filterArguments( { error } ) );
}

/**
 * @param {*} store
 * @param {*} response
 */
function onResponse (store, response) {
}

/**
 * @param store
 * @param {*} error
 */
function onResponseError (store, error) {
  if (isBrowser) {
    logger.warn( 'response error', ...filterArguments( { error } ) );
  }
}

/**
 * @param object
 * @return {*}
 */
function filterArguments (object) {
  return isBrowser ? [ object ] : [];
}
