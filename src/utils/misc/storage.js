import { isBrowser } from './system';

const serverStorage = new Map();

const serializeProperty = Symbol( '@serialize' );
const deserializeProperty = Symbol( '@deserialize' );

/**
 * @type {{
 *   getItem(string, {version?: number|string}=): *,
 *   setItem(string, (*), {expired?: number, version?: number|string}=): boolean,
 *   removeItem(string): boolean
 * }}
 */
export const storage = {
  /**
   * @param {string} itemKey
   * @param {number|string?} version
   * @returns {*}
   */
  getItem (itemKey, { version = null } = {}) {
    const serializedItem = universalStorage.getItem( itemKey );

    if (!serializedItem) {
      return null;
    }

    const deserializedItem = this[ deserializeProperty ]( serializedItem );
    if (!deserializedItem) {
      return null;
    }

    if (deserializedItem.expiredAtMs && deserializedItem.expiredAtMs < Date.now()
      || version && deserializedItem.version !== version) {
      this.removeItem( itemKey );
      return null;
    }

    return deserializedItem.item;
  },

  /**
   * @param {string} itemKey
   * @param {object|*} itemValue
   * @param {number?} expired
   * @param {number|string|*?} version
   * @returns {boolean}
   */
  setItem (itemKey, itemValue, { expired = null, version = null } = {}) {
    const year = 365 * 3600 * 24 * 1000;
    const serializedItem = this[ serializeProperty ]({
      expiredAtMs: expired || Date.now() + 5 * year,
      item: itemValue,
      version
    });

    universalStorage.setItem(
      itemKey,
      serializedItem
    );
  },

  /**
   * @param {string} itemKey
   * @param {*} options
   * @returns {*}
   */
  hasItem (itemKey, options = {}) {
    return !! this.getItem( itemKey, options );
  },

  /**
   * @param {string} itemKey
   * @returns {boolean}
   */
  removeItem (itemKey) {
    return universalStorage.removeItem( itemKey );
  },

  /**
   * @param {object|*} item
   * @returns {string|*}
   * @private
   */
  [ serializeProperty ] (item) {
    try {
      return JSON.stringify( item );
    } catch (e) {
      console.error('Cannot serialize an object', item);
      return null;
    }
  },

  /**
   * @param {string} string
   * @returns {object|*}
   * @private
   */
  [ deserializeProperty ] (string) {
    try {
      return JSON.parse( string );
    } catch (e) {
      console.error('Cannot deserialize an object', string);
      return string;
    }
  }
};

const universalStorage = {
  getItem (itemKey) {
    if (isBrowser) {
      return localStorage.getItem( itemKey );
    }
    return serverStorage.get( itemKey );
  },

  setItem (itemKey, itemValue) {
    if (isBrowser) {
      localStorage.setItem( itemKey, itemValue );
    } else {
      serverStorage.set( itemKey, itemValue );
    }
  },

  hasItem (itemKey) {
    return !! this.getItem( itemKey );
  },

  removeItem (itemKey) {
    if (isBrowser) {
      localStorage.removeItem( itemKey );
    } else {
      serverStorage.delete( itemKey );
    }

    return true;
  }
};
