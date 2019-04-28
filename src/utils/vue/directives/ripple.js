function style (el, value) {
  el.style['transform'] = value;
  el.style['webkitTransform'] = value;
}

const RippleDataAttribute = 'data-ripple';

const rippleSetup = {
  /**
   * @param {Event} e
   * @param {Element} el
   * @param {{ class?: string, center?: boolean }} [value={}]
   */
  // eslint-disable-next-line max-statements
  show: (e, el, { value = {} }) => {
    if (el.getAttribute(RippleDataAttribute) !== 'true') {
      return;
    }
    const container = document.createElement('span');
    const animation = document.createElement('span');

    container.appendChild(animation);
    container.className = 'ripple__container';

    if (value.class) {
      container.className += ` ${value.class}`;
    }

    if (value.style && typeof value.style === 'object') {
      Object.assign(container.style, value.style);
    }

    const size = el.clientWidth > el.clientHeight
      ? el.clientWidth
      : el.clientHeight;
    animation.className = 'ripple__animation';
    animation.style.width = `${size * (value.center ? 1 : 2)}px`;
    animation.style.height = animation.style.width;

    if (typeof value.alpha !== 'undefined') {
      animation.style.opacity = value.alpha;
    }

    el.appendChild(container);
    const computed = window.getComputedStyle(el);
    if (computed.position !== 'absolute' &&
      computed.position !== 'fixed') {
      el.style.position = 'relative';
    }

    const offset = el.getBoundingClientRect();
    const x = value.center ? '50%' : `${e.clientX - offset.left}px`;
    const y = value.center ? '50%' : `${e.clientY - offset.top}px`;

    animation.classList.add('ripple__animation_enter');
    animation.classList.add('ripple__animation_visible');
    style(animation, `translate(-50%, -50%) translate(${x}, ${y}) scale3d(0.01,0.01,0.01)`);
    animation.dataset.activated = Date.now();

    setTimeout(() => {
      animation.classList.remove('ripple__animation_enter');
      style(animation, `translate(-50%, -50%) translate(${x}, ${y})  scale3d(0.99,0.99,0.99)`);
    }, 0);
  },

  hide: (el) => {
    if (el.getAttribute(RippleDataAttribute) !== 'true') {
      return;
    }

    const ripples = el.getElementsByClassName('ripple__animation');

    if (ripples.length === 0) {
      return;
    }
    const animation = ripples[ripples.length - 1];
    const diff = Date.now() - Number(animation.dataset.activated);
    let delay = 400 - diff;

    delay = delay < 0 ? 0 : delay;

    setTimeout(() => {
      animation.classList.remove('ripple__animation_visible');

      setTimeout(() => {
        // Need to figure out a new way to do this
        try {
          if (ripples.length < 1) {
            el.style.position = null;
          }
          animation.parentNode && el.removeChild(animation.parentNode);
        } catch (e) {}
      }, 300);
    }, delay);
  }
};

function isRippleEnabled (binding) {
  return typeof binding.value === 'undefined' || !!binding.value;
}

function directive (el, binding) {
  el.setAttribute(RippleDataAttribute, isRippleEnabled(binding));

  if ('ontouchstart' in window) {
    el.addEventListener('touchend', () => rippleSetup.hide(el), false);
    el.addEventListener('touchcancel', () => rippleSetup.hide(el), false);
  }

  el.addEventListener('mousedown', e => rippleSetup.show(e, el, binding), false);
  el.addEventListener('mouseup', () => rippleSetup.hide(el), false);
  el.addEventListener('mouseleave', () => rippleSetup.hide(el), false);
  // Anchor tags can be dragged, causes other hides to fail - #1537
  el.addEventListener('dragstart', () => rippleSetup.hide(el), false);
}

function unbind (el, binding) {
  el.removeEventListener('touchstart', e => rippleSetup.show(e, el, binding), false);
  el.removeEventListener('mousedown', e => rippleSetup.show(e, el, binding), false);
  el.removeEventListener('touchend', () => rippleSetup.hide(el), false);
  el.removeEventListener('touchcancel', () => rippleSetup.hide(el), false);
  el.removeEventListener('mouseup', () => rippleSetup.hide(el), false);
  el.removeEventListener('mouseleave', () => rippleSetup.hide(el), false);
  el.removeEventListener('dragstart', () => rippleSetup.hide(el), false);
}

function update (el, binding) {
  if (binding.value === binding.oldValue) {
    return;
  }

  el.setAttribute(RippleDataAttribute, isRippleEnabled(binding));
}

export const ripple = {
  name: 'ripple',
  bind: directive,
  unbind: unbind,
  update: update
};
