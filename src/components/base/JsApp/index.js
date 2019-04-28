import JsApp from './JsApp.vue';

/* istanbul ignore next */
JsApp.install = function install (Vue) {
  Vue.component('js-app', JsApp);
};

export default JsApp;
