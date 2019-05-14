import { get } from "../../utils/misc";

const endpoint = '/money/table';

/**
 * @param {*} axios
 * @param {*} params
 * @return {*}
 */
export async function getTable (axios, params = {}) {
  return get( axios, endpoint, params );
}
