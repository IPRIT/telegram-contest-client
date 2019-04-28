import { ensureString, normalizeClassName } from "../misc";

/**
 * @param {string} c
 * @param {string|*} el
 * @param {string} name
 * @return {Object}
 */
export function createSimpleFunctional (c, el = 'div', name) {
  name = name || c.replace(/__/g, '-');

  return {
    name: `js-${name}`,
    functional: true,

    render: (h, { data, children }) => {
      data.staticClass = normalizeClassName(`${c} ${data.staticClass || ''}`);

      return h(el, data, children);
    }
  };
}

/**
 * @param {string} name
 * @param {string} origin
 * @param {string} mode
 * @param {boolean} isGroup
 * @return {Object}
 */
export function createSimpleTransition (name, origin = 'top center 0', mode, isGroup = false) {
  return {
    name,

    functional: true,

    props: {
      origin: {
        type: String,
        default: origin
      }
    },

    render (h, context) {
      context.data = context.data || {};
      context.data.props = { name };
      context.data.on = context.data.on || {};
      if (!Object.isExtensible(context.data.on)) {
        context.data.on = { ...context.data.on };
      }

      if (mode) {
        context.data.props.mode = mode;
      }

      context.data.on.beforeEnter = el => {
        el.style.transformOrigin = context.props.origin;
        el.style.webkitTransformOrigin = context.props.origin;
      };

      const component = isGroup ? 'transition-group' : 'transition';

      return h(component, context.data, context.children);
    }
  };
}

/**
 * @param {string} name
 * @param {string} origin
 * @param {string} mode
 * @return {{name, functional, props, render}}
 */
export function createSimpleTransitionGroup (name, origin = 'top center 0', mode) {
  return createSimpleTransition(name + '-group', origin, mode, true);
}

export function createJavaScriptTransition (name, functions, css = true, mode = 'in-out', isGroup = false) {
  return {
    name,

    functional: true,

    props: {
      css: {
        type: Boolean,
        default: css
      },
      mode: {
        type: String,
        default: mode
      }
    },

    render (h, context) {
      const data = {
        props: {
          ...context.props,
          name
        },
        on: functions
      };

      const component = isGroup ? 'transition-group' : 'transition';

      return h(component, data, context.children);
    }
  };
}

/**
 * @param binding
 * @param defaults
 * @return {Object}
 */
export function directiveConfig (binding, defaults = {}) {
  return Object.assign({},
    defaults,
    binding.modifiers,
    { value: binding.arg },
    binding.value || {}
  );
}

/**
 * @param {Array} array
 * @param {string|*} tag
 * @return {Array}
 */
export function filterChildren (array = [], tag) {
  return array.filter(child => {
    return child.componentOptions &&
      child.componentOptions.Ctor &&
      child.componentOptions.Ctor.options &&
      child.componentOptions.Ctor.options.name === tag;
  });
}

/**
 * @param {*} obj
 * @returns {boolean}
 */
export function isVueComponent (obj) {
  return !!( obj && obj.$el );
}

/**
 * @param {*} target
 * @returns {Element}
 */
export function resolveElement (target) {
  if (target instanceof Element) {
    return target;
  } else if (isVueComponent(target)) {
    return target.$el;
  } else if (typeof target === 'string') {
    return document.querySelector(target);
  } else {
    return target;
  }
}

/**
 * @param {Array<VNode>|VNode} vnodes
 * @param {boolean} deep
 */
export function extractVNodeText (vnodes, deep = false) {
  if (!vnodes) {
    return '';
  }

  if (!Array.isArray(vnodes)) {
    vnodes = [ vnodes ];
  }

  return vnodes.reduce((result, vnode) => {
    // if we have native element
    // then return inner text content
    const elm = vnode.$el;
    const elmText = elm && (elm.innerText || elm.textContent);

    if (elmText) {
      return result + ' ' + ensureString( elmText ).trim();
    }

    if (vnode.text) {
      result += ' ' + ensureString( vnode.text ).trim();
    }

    if (deep && vnode.children && vnode.children.length) {
      result += ' ' + extractVNodeText( vnode.children );
    }

    return result;
  }, '');
}

/**
 * @param {Map} nonreactive
 * @param {string[]|string} props
 * @return {Object}
 */
export function nonreactiveMapGetter (nonreactive, props) {
  if (!Array.isArray(props)) {
    props = [].concat( props );
  }

  const object = {};
  for (const prop of props) {
    object[ prop ] = {
      get () {
        return nonreactive.get( prop );
      },
      set (value) {
        nonreactive.set( prop, value );
      }
    };
  }

  return object;
}
