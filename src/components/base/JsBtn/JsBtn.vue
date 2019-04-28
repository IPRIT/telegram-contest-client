<script>
  import { factory as ToggleableFactory } from '../../../utils/vue/mixins/toggleable';
  import { inject as RegistrableInject } from '../../../utils/vue/mixins/registrable';
  import { routable as Routable } from '../../../utils/vue/mixins/routable';
  import { positionable as Positionable } from '../../../utils/vue/mixins/positionable';
  import { colorable as Colorable } from '../../../utils/vue/mixins/colorable';
  import { rippleable as Rippleable } from '../../../utils/vue/mixins/rippleable';

  export default {
    name: 'js-btn',

    mixins: [
      Colorable,
      Routable,
      Positionable,
      Rippleable,

      ToggleableFactory( 'inputValue' ),
      RegistrableInject( 'buttonGroup' )
    ],

    props: {
      activeClass: {
        type: String,
        default: 'js-btn_active'
      },
      block: Boolean,
      fab: Boolean,
      flat: Boolean,
      link: Boolean,
      icon: Boolean,
      large: Boolean,
      loading: Boolean,
      outline: Boolean,
      round: Boolean,
      shadowed: Boolean,
      small: Boolean,
      ripple: {
        type: [ Boolean, Object ],
        default: false
      },
      tag: {
        type: String,
        default: 'button'
      },
      type: {
        type: String,
        default: 'button'
      },
      value: null
    },

    computed: {
      classes () {
        const colorBackground = !this.outline && !this.flat;
        const colorText = !this.disabled && !colorBackground;

        const classes = {
          'js-btn': true,
          'js-btn_absolute': this.absolute,
          'js-btn_block': this.block,
          'js-btn_bottom': this.bottom,
          'js-btn_disabled': this.disabled,
          'js-btn_flat': this.flat,
          'js-btn_link': this.link,
          'js-btn_floating': this.fab,
          'js-btn_fixed': this.fixed,
          'js-btn_icon': this.icon,
          'js-btn_left': this.left,
          'js-btn_top': this.top,
          'js-btn_loading': this.loading,
          'js-btn_outline': this.outline,
          'js-btn_right': this.right,
          'js-btn_round': this.round,
          'js-btn_router': this.to,
          'js-btn_shadowed': this.shadowed && !this.flat,
          'js-btn_small': this.small,
          'js-btn_medium': !(this.small || this.large),
          'js-btn_large': this.large
        };

        if (!this.color) {
          Object.assign(classes, {
            'primary': this.primary && colorBackground,
            'secondary': this.secondary && colorBackground,
            'text_primary': this.primary && colorText,
            'text_secondary': this.secondary && colorText
          });
        }

        classes[this.activeClass] = this.isActive;

        return colorBackground
          ? this.addBackgroundColorClassChecks(classes)
          : this.addTextColorClassChecks(classes);
      }
    },

    methods: {
      // Prevent focus to match md spec
      click (e) {
        !this.fab &&
        e.detail &&
        this.$el.blur();

        this.$emit('click', e);
      },
      genContent () {
        const children = [ this.$slots.default ];
        return this.$createElement(
          'div',
          { 'class': 'js-btn__content' },
          children
        );
      },
      genLoader () {
        const children = [];

        if (!this.$slots.loader) {
          children.push(this.$createElement('div', 'Подождите...'));
        } else {
          children.push(this.$slots.loader);
        }

        return this.$createElement('span', {
          'class': 'js-btn__loading'
        }, children);
      }
    },

    mounted () {
      if (this.buttonGroup) {
        this.buttonGroup.register(this);
      }
    },

    beforeDestroy () {
      if (this.buttonGroup) {
        this.buttonGroup.unregister(this);
      }
    },

    render (h) {
      const { tag, data } = this.generateRouteLink();
      const children = [ this.genContent() ];

      tag === 'button' && (data.attrs.type = this.type);
      this.loading && children.unshift(this.genLoader());

      data.attrs.value = [ 'string', 'number' ].includes(typeof this.value)
        ? this.value
        : JSON.stringify(this.value);

      return h(tag, data, children);
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/components/base/button";
</style>
