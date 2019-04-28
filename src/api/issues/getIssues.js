import { get } from "../../utils/misc";

const endpoint = '/platform/issues';

/**
 * @param {*} axios
 * @param {*} params
 * @return {*}
 */
export async function getIssues (axios, params = {}) {
  return get( axios, endpoint, params );
}
