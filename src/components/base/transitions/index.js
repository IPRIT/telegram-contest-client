import { createJavaScriptTransition, createSimpleTransition, createSimpleTransitionGroup } from "../../../utils/vue";

import ExpandTransitionGenerator from './expand-transition';

// Component specific transitions
export const RDialogTransition = createSimpleTransition('dialog-transition');
export const RDialogTopTransition = createSimpleTransition('dialog-top-transition');
export const RDialogBottomTransition = createSimpleTransition('dialog-bottom-transition');
export const RDialogLeftTransition = createSimpleTransition('dialog-left-transition');
export const RDialogRightTransition = createSimpleTransition('dialog-right-transition');

export const RBottomSheetTranstion = createSimpleTransition('bottom-sheet-transition');
export const RMenuTransition = createSimpleTransition('menu-transition');
export const RFabTransition = createSimpleTransition('fab-transition', 'center center', 'out-in');

// Generic transitions
export const RFadeTransition = createSimpleTransition('fade-transition');
export const RScaleTransition = createSimpleTransition('scale-transition');
export const RSlideXTransition = createSimpleTransition('slide-x-transition');
export const RSlideXReverseTransition = createSimpleTransition('slide-x-reverse-transition');
export const RSlideYTransition = createSimpleTransition('slide-y-transition');
export const RSlideYReverseTransition = createSimpleTransition('slide-y-reverse-transition');

// Generic transitions' groups
export const RFadeTransitionGroup = createSimpleTransitionGroup('fade-transition');
export const RSlideXTransitionGroup = createSimpleTransitionGroup('slide-x-transition');
export const RSlideXReverseTransitionGroup = createSimpleTransitionGroup('slide-x-reverse-transition');
export const RSlideYTransitionGroup = createSimpleTransitionGroup('slide-y-transition');
export const RSlideYReverseTransitionGroup = createSimpleTransitionGroup('slide-y-reverse-transition');
export const RScaleTransitionGroup = createSimpleTransitionGroup('scale-transition');

// JavaScript transitions
export const RExpandTransition = createJavaScriptTransition('expand-transition', ExpandTransitionGenerator());

/* istanbul ignore next */
// eslint-disable-next-line max-statements
function install (Vue) {
  // Component transitions
  Vue.component('js-bottom-sheet-transition', RBottomSheetTranstion);
  Vue.component('js-dialog-transition', RDialogTransition);
  Vue.component('js-dialog-top-transition', RDialogTopTransition);
  Vue.component('js-dialog-bottom-transition', RDialogBottomTransition);
  Vue.component('js-dialog-left-transition', RDialogLeftTransition);
  Vue.component('js-dialog-right-transition', RDialogRightTransition);
  Vue.component('js-fab-transition', RFabTransition);
  Vue.component('js-menu-transition', RMenuTransition);

  // Generic transitions
  Vue.component('js-fade-transition', RFadeTransition);
  Vue.component('js-scale-transition', RScaleTransition);
  Vue.component('js-slide-x-transition', RSlideXTransition);
  Vue.component('js-slide-x-reverse-transition', RSlideXReverseTransition);
  Vue.component('js-slide-y-transition', RSlideYTransition);
  Vue.component('js-slide-y-reverse-transition', RSlideYReverseTransition);

  // Generic group transitions
  Vue.component('js-fade-transition-group', RFadeTransitionGroup);
  Vue.component('js-slide-x-transition-group', RSlideXTransitionGroup);
  Vue.component('js-slide-x-reverse-transition-group', RSlideXReverseTransitionGroup);
  Vue.component('js-slide-y-transition-group', RSlideYTransitionGroup);
  Vue.component('js-slide-y-reverse-transition-group', RSlideYReverseTransitionGroup);
  Vue.component('js-scale-transition-group', RScaleTransitionGroup);

  // JavaScript transitions
  Vue.component('js-expand-transition', RExpandTransition);
}

export default install;
