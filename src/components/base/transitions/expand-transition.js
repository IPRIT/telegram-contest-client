import { addOnceEventListener } from "../../../utils/browser";

export default function (expandedParentClass = '') {
  return {
    enter (el, done) {
      el._parent = el.parentNode;

      addOnceEventListener(el, 'transitionend', done);

      // Get height that is to be scrolled
      el.style.overflow = 'hidden';
      el.style.height = 0;
      el.style.minHeight = 0;
      el.style.display = 'block';
      expandedParentClass && el._parent.classList.add(expandedParentClass);

      setTimeout(() => {
        el.style.height = `${el.scrollHeight}px`;
        el.style.minHeight = `${el.scrollHeight}px`;
      }, 100);
    },

    afterEnter (el) {
      el.style.overflow = null;
      el.style.height = null;
      el.style.minHeight = null;
    },

    leave (el, done) {
      // Remove initial transition
      addOnceEventListener(el, 'transitionend', done);

      // Set height before we transition to 0
      el.style.overflow = 'hidden';
      el.style.height = `${el.offsetHeight}px`;
      el.style.minHeight = `${el.offsetHeight}px`;

      setTimeout(() => {
        el.style.height = 0;
        el.style.minHeight = 0;
      }, 100);
    },

    afterLeave (el) {
      expandedParentClass && el._parent.classList.remove(expandedParentClass);
    }
  };
}
