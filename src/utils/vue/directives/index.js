import { clickOutside as ClickOutside } from './click-outside';
import { keydownToggle as KeydownToggle } from './keydown-toggle';
import { resize as Resize } from './resize';
import { scroll as Scroll } from './scroll';
import { touch as Touch } from './touch';
import { ripple as Ripple } from './ripple';

export {
  ClickOutside,
  KeydownToggle,
  Resize,
  Ripple,
  Scroll,
  Touch
};

export default function install (Vue) {
  Vue.directive('click-outside', ClickOutside);
  Vue.directive('keydown-toggle', KeydownToggle);
  Vue.directive('resize', Resize);
  Vue.directive('ripple', Ripple);
  Vue.directive('scroll', Scroll);
  Vue.directive('touch', Touch);
}
