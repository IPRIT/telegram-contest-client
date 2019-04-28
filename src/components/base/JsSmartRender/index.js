import JsSmartRender from './JsSmartRender.vue';

/* istanbul ignore next */
JsSmartRender.install = function install (Vue) {
  Vue.component('js-smart-render', JsSmartRender);
};

export default JsSmartRender;
