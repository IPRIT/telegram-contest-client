import path from 'path';
import fs from 'fs';

import { developmentConfig } from "./config/development";
import { productionConfig } from "./config/production";

const configs = {
  development: developmentConfig,
  production: productionConfig
};

// Environment variables
const environment = process.env.NODE_ENV;
const isProduction = environment === 'production';
const isDevelopment = environment === 'development';
const isStaging = environment === 'staging';
const isTest = environment === 'test';
const isSpa = process.argv.some(arg => arg.startsWith( '--spa' ));

const config = configs[ environment ];

// Project paths
const buildDir = `.dist${isSpa ? '-spa' : ''}${isDevelopment ? '-dev': ''}`;
const srcDir = 'src/';
const publicPath = `/dist/`;

const apiProtocol = 'http' + (isProduction ? 's' : '');
const apiServerEndpoint = `http://${config.apiHost}/api`;
const apiBrowserEndpoint = `${apiProtocol}://${config.apiHost}/api`;
const socketURL = `${apiProtocol}://${config.apiHost}`;

const productionModules = [
  /**
   * PWA plugin
   * @link https://github.com/nuxt-community/pwa-module
   */
  '@nuxtjs/pwa'
];

export default {
  server: {
    port: process.env.PORT || 9000,
    host: isDevelopment ? 'localhost' : '0.0.0.0'
  },

  globalName: 'jsbelov',

  /**
   * @see https://nuxtjs.org/api/configuration-builddir#the-builddir-property
   */
  buildDir,
  /**
   * @see https://nuxtjs.org/api/configuration-srcdir#the-srcdir-property
   */
  srcDir,
  /**
   * SPA config
   */
  generate: {
    fallback: 'index.html'
  },

  loadingIndicator: {
    color: '#ffffff',
    background: '#0088cc'
  },

  /**
   * Router middlewares
   */
  router: {
    /**
     * Run the middleware/*.js on every pages
     */
    middleware: [
    ]
  },

  modules: [
    ...(isProduction ? productionModules : []),
    /**
     * Router module
     * @link https://github.com/nuxt-community/router-module
     *!/
    '@nuxtjs/router',*/
    /**
     * Axios crossplatform module
     * @link https://github.com/nuxt-community/axios-module
     */
    '@nuxtjs/axios',
    /**
     * Component caching
     * @link https://nuxtjs.org/faq/cached-components#how-to-cache-vue-components-
     */
    ['@nuxtjs/component-cache', {
      max: 100,
      maxAge: 100000 // microcaching https://ssr.vuejs.org/en/caching.html
    }],
    /**
     * Display webpack build progress
     * @link https://github.com/nuxt-community/webpack-profile-module
     */
    // '@nuxtjs/webpack-profile',
    /**
     * Universal cookies
     * @see https://www.npmjs.com/package/cookie-universal-nuxt
     */
    'cookie-universal-nuxt',
    /**
     * Moment
     * @see https://github.com/nuxt-community/moment-module
     */
    ['@nuxtjs/moment', [ 'en-gb' ]],
    /**
     * Yandex Metrika for Nuxt.js
     * @see https://github.com/RabotaRu/yandex-metrika
     */
    ['@rabota/yandex-metrika', {
      staticCounters: [{
        id: 53584345,
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true,
      }],
      noscript: true,
      manualFirstHit: false,
      firstHitVisitParams: false,
      logging: isDevelopment,
      development: true,
    }],
  ],
  /**
   * PWA Manifest
   */
  manifest: {
    name: 'Telegram Contest Issues',
    short_name: 'Issues',
    description: 'Developer Challenges / Issues',
    keywords: 'javascript, android, ios',
    lang: 'en',
    background_color: '#fafafa',
    theme_color: '#0088cc',
  },
  /**
   * Workbox configuration
   * @see https://pwa.nuxtjs.org/modules/workbox.html
   * @see Workbox build options: https://developers.google.com/web/tools/workbox/modules/workbox-build
   */
  workbox: {
    cacheId: `cache:contest-platform`,
    swSrc: path.resolve(buildDir, `sw.template.js`),
    swDest: path.resolve(srcDir, 'static', `sw-contest-platform.js`),
    swURL: `sw-contest-platform.js`
  },
  /**
   * @see https://pwa.nuxtjs.org/modules/icon
   */
  icon: {
    iconSrc: path.resolve(srcDir, 'static/static', 'icon.png'),
  },
  /**
   * Axios default settings
   * @link https://github.com/nuxt-community/axios-module
   */
  axios: {
    baseURL: apiServerEndpoint,
    browserBaseURL: apiBrowserEndpoint,
    prefix: ''
  },
  /**
   * Headers of the page
   * @link https://nuxtjs.org/guide/views#html-head
   */
  head: {
    title: 'Real-time Issues — Developer Challenges',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: `viewport-fit=cover, width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1` },
      { hid: 'description', name: 'description', content: 'Real-time issues from contest.dev' },
      { hid: 'keywords', name: 'keywords', content: 'javascript, android, ios' },
      { hid: 'theme-color', name: 'theme-color', content: '#fff' },
      { 'http-equiv': 'X-UA-Compatible', content: 'IE=edge' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/static/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:400,500,700&amp;subset=cyrillic' },
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: 'components/common/JsPageLoading.vue',
  /**
   * Global CSS
   * @link https://nuxtjs.org/examples/global-css#__nuxt
   */
  css: [
  ],
  /**
   * Vue plugins
   * Project directory: ~/plugins
   * @link https://nuxtjs.org/guide/plugins#__nuxt
   */
  plugins: [
    { src: '~/plugins/polyfills', ssr: false },
    { src: '~/plugins/ion', ssr: false },
    { src: '~/plugins/socket', ssr: false },
    '~/plugins/vuex-router-sync',
    '~/plugins/axios',
    '~/plugins/future',
    '~/plugins/validator',
  ],
  /*
  ** Build configuration
  */
  build: {
    /**
     * @see https://nuxtjs.org/api/configuration-build#publicpath
     */
    publicPath,
    /**
     * Add node_modules to the project
     */
    transpile: [
      'md-svg-vue',
      '@rabota/loader',
      '@rabota/analytics-layer',
      '@rabota/yandex-metrika',
    ],
    /**
     * Override chunks naming
     * @link https://nuxtjs.org/api/configuration-build#filenames
     */
    filenames: {
    },
    /**
     * Enable to splitting chunks by layouts
     */
    splitChunks: {
      layouts: true,
      pages: true,
    },
    /**
     * Compile in parallel with Webpack 4
     */
    parallel: true,
    /*
    ** Run ESLint on save
    */
    extend (config, context) {
      overrideWebpackConfig( config, context );
    }
  }
};

/**
 * @param config
 * @param context
 * @return {*}
 */
function overrideWebpackConfig (config, context) {
  if (context.isDev && process.client) {
    config.module.rules.push({
      enforce: 'pre',
      test: /\.(js|vue)$/,
      loader: 'eslint-loader',
      exclude: /(node_modules)/
    });
  }

  // increase size of base64 image
  context.loaders.imgUrl.limit = 2500;
  context.loaders.vue.transformAssetUrls['js-image'] = [
    'src', 'thumbnail-src', 'thumbnailSrc'
  ];

  const definitionPlugin = (config.plugins || []).find(plugin => {
    return plugin && plugin.hasOwnProperty('definitions');
  });

  if (definitionPlugin) {
    const definitions = definitionPlugin.definitions;
    definitions['process.apiHost'] = `"${config.apiHost}"`;
    definitions['process.isSpa'] = `${isSpa}`;
    definitions['process.socketURL'] = `"${socketURL}"`;
  }

  return config;
}

/**
 * @param {*} config
 */
function debugWebpackConfig (config) {
  if (!isProduction) {
    const filePath = `./webpack.${ environment + '.' }config.json`;
    tryCatch(_ => fs.unlinkSync(filePath));
    tryCatch(_ => fs.writeFileSync(filePath, JSON.stringify(config, null, 2)));
  }
}

/**
 * @param {Function} operation
 * @param {Function?} onError
 */
function tryCatch (operation, onError = () => {}) {
  try {
    operation && operation();
  } catch (e) {
    onError( e );
  }
}
