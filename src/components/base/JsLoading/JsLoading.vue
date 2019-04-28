<script>
  import { colorable, positionable } from "../../../utils/vue/mixins";

  export default {
    name: 'js-loading',

    mixins: [
      colorable,
      positionable
    ],

    props: {
      large: Boolean,
      small: Boolean,
      disabled: Boolean,
      colorful: Boolean,
      tilesNumber: {
        type: [ String, Number ],
        default: 3
      },
      line: Boolean,
      lineHeight: {
        type: Number,
        default: 3
      },
      progress: {
        type: Number,
        default: 0
      },
      color: {
        type: String,
        default: 'primary'
      },
      lineBackground: {
        type: String,
        default: 'transparent'
      },
      lineRound: Boolean,
      lineShadow: Boolean,

      jsFuture: Boolean
    },

    computed: {
      classes () {
        let classes = {
          'loading': true,
          'loading_disabled': this.disabled,
          'loading_large': this.large,
          'loading_small': this.small,
          'loading_colorful': this.colorful
        };

        if (this.line) {
          classes = {
            'loading': true,
            'loading_disabled': this.disabled,
            'loading_line': this.line,
            'loading_round-line': this.lineRound,
            'loading_shadow-line': this.lineShadow
          };
        }

        if (this.jsFuture) {
          classes = {
            'loading': true,
            'loading_js-future': this.jsFuture
          };
        }

        return this.addBackgroundColorClassChecks(classes);
      },
      tiles () {
        return Number(this.tilesNumber) || 3;
      }
    },

    render (h) {
      const data = {
        class: this.classes
      };
      const children = [];

      if (this.line) {
        data.style = {
          background: this.lineBackground,
          height: `${this.lineHeight}px`
        };
        children.push(
          h('div', {
            staticClass: 'loading__line',
            class: {
              [this.color]: true
            },
            style: {
              width: `${this.progress}%`
            }
          })
        );
      } else if (this.jsFuture) {
        const path = 'M4.1,95.2L22.6,84  c3.6,6.3,6.8,11.7,14.6,11.7c7.5,0,12.2-2.9,12.2-14.3V4.3H72v77.4c0,23.5-13.8,34.2-33.9,34.2C20,115.9,9.5,106.5,4.1,95.2   M84.3,92.8c6.6,13.1,20.3,23.2,41.3,23.2c21.5,0,37.6-11.2,37.6-31.6c0-19-10.9-27.4-30.1-35.6l-5.7-2.4c-9.7-4.2-13.9-7-13.9-13.8  c0-5.5,4.2-9.7,10.9-9.7c6.5,0,10.7,2.8,14.6,9.7l17.7-11.3C149.1,8,138.8,3,124.3,3c-20.3,0-33.2,13-33.2,30  c0,18.5,10.9,27.2,27.2,34.2l5.7,2.4c10.4,4.5,16.5,7.3,16.5,15.1c0,6.5-6,11.2-15.4,11.2c-11.2,0-17.5-5.8-22.4-13.8L84.3,92.8';

        children.push(
          h('svg', {
            attrs: {
              viewBox: "0 0 166.2 118.9"
            }
          }, [
            h('path', {
              attrs: {
                d: path
              }
            })
          ])
        );
      } else {
        let tiles = this.tiles;
        while (tiles--) {
          children.push(
            h('div', {
              staticClass: 'loading__circle'
            })
          );
        }
      }

      return h('div', data, children);
    }
  };
</script>

<style lang="scss">
  @import "../../../styles/components/base/loading";
</style>
