import Vue from 'vue';
import { validator, errors } from '../utils';

const Validator = {
  install (Vue) {
    if (this.installed) {
      return;
    }

    this.installed = true;

    Vue.prototype.$validator = validator;
    Vue.prototype.$errors = errors;
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Validator);
} else {
  Vue.use(Validator);
}
