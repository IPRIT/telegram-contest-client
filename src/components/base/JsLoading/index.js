import JsLoading from './JsLoading.vue';

/* istanbul ignore next */
JsLoading.install = function install (Vue) {
  Vue.component('r-loading', JsLoading);
};

export default JsLoading;
