import JsTooltip from './JsTooltip.vue';

/* istanbul ignore next */
JsTooltip.install = function install (Vue) {
  Vue.component('js-tooltip', JsTooltip);
};

export default JsTooltip;
