import Vue from 'vue';
import FutureModule from '../components/base/Future';
import Transitions from '../components/base/transitions';
import * as directives from '../utils/vue/directives';

function Future (Vue, args) {
  const Future = FutureModule;

  Vue.use(Future, {
    components: {},
    directives,
    ...args
  });

  Vue.config.ignoredElements = [ 'noindex' ];

  // use transitions from future
  Vue.use( Transitions );
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Future);
} else {
  Vue.use( Future );
}
