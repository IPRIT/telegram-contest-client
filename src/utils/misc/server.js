import { getObjectValueByPath } from "./helpers";

/**
 * @param {{context: {req: *}}} app
 * @returns {*}
 */
export function extractRequest (app) {
  return getObjectValueByPath( app, 'context.req' );
}

/**
 * @param {{context: {req: *}}} app
 * @returns {string}
 */
export function extractRemoteAddress (app) {
  const req = extractRequest( app );

  // from proxy headers, can be spoofed if you don't have a proxy in front of your app,
  // so drop it if your app is naked.
  const forwardedFor = req.headers[ 'x-forwarded-for' ];

  return forwardedFor && forwardedFor.split( ',' ).pop()
    || req.connection.remoteAddress
    || req.socket.remoteAddress
    || req.connection.socket.remoteAddress;
}
