import { isProduction } from './system';

isProduction && consoleLogNamespaced('javascript-future.io').log( 'frontend', `© ${new Date().getFullYear()}` );

/**
 * @param {string} ns
 */
export function consoleLogNamespaced (ns = 'global') {
  const themes = {
    log: {
      primaryPanel: ['#002ff8', '#0024c0'],
      secondaryPanel: ['#00bcd4', '#00deff'],
      borders: ['#002ff8', '#0024c0']
    },
    error: {
      primaryPanel: ['#ff270f', '#ff5644'],
      secondaryPanel: ['#FBD91A', '#ff3d8d'],
      borders: ['#dd260f', '#cb4438']
    },
    warn: {
      primaryPanel: ['#FBD91A', '#e8c61a'],
      secondaryPanel: ['#424b5c', '#001333'],
      borders: ['#ffd91b', '#333a47']
    },
    info: {
      primaryPanel: ['#00bcd4', '#00deff'],
      secondaryPanel: ['#424b5c', '#001333'],
      borders: ['#00e0ff', '#333a47']
    }
  };

  /**
   * @param {object} colorTheme
   * @param {string} subNs
   * @param {*} args
   */
  function printMessage (colorTheme, subNs, ...args) {
    if (isProduction && subNs !== 'frontend') {
      return;
    }

    // потому что можем себе позволить :)
    if (subNs === 'frontend') {
      subNs = 'made with ❤';
    }

    if (typeof window === 'undefined') {
      return console.log(subNs, ...args);
    }

    if (typeof subNs !== 'string') {
      args.unshift( subNs );
      subNs = null;
    }

    console.log(
      `%c${ns}${subNs ? `%c${subNs}` : ''}%c`,

      `background: linear-gradient(to right, ${colorTheme.primaryPanel[ 0 ]} 0%, ${colorTheme.primaryPanel[ 1 ]} 100%); ` +
      `border: 1px solid ${colorTheme.borders[ 0 ]}; border-right: 0; padding: 1px 7px; ` +
      `border-radius: 3px 0 0 3px; color: #fff`,

      `background: linear-gradient(to right, ${colorTheme.secondaryPanel[ 0 ]} 0%, ${colorTheme.secondaryPanel[ 1 ]} 100%); ` +
      `border: 1px solid ${colorTheme.borders[ 1 ]}; border-left: 0; padding: 1px 7px; ` +
      `border-radius: 0 3px 3px 0; color: #fff`,

      'background: transparent; padding: 2px;',
      ...args
    );
  }

  /**
   * @param {string} subNs
   * @param {*} args
   */
  function log (subNs, ...args) {
    const colorTheme = themes[ 'log' ];
    printMessage(colorTheme, subNs, ...args);
  }

  /**
   * @param {string} subNs
   * @param {*} args
   */
  function error (subNs, ...args) {
    const colorTheme = themes[ 'error' ];
    printMessage(colorTheme, subNs, ...args);
  }

  /**
   * @param {string} subNs
   * @param {*} args
   */
  function warn (subNs, ...args) {
    const colorTheme = themes[ 'warn' ];
    printMessage(colorTheme, subNs, ...args);
  }

  /**
   * @param {string} subNs
   * @param {*} args
   */
  function info (subNs, ...args) {
    const colorTheme = themes[ 'info' ];
    printMessage(colorTheme, subNs, ...args);
  }

  return {
    log, error,
    warn, info
  };
}
