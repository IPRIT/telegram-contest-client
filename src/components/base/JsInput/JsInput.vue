<script>
  import { ensureNumber, ensureString } from "../../../utils/misc";

  export default {
    name: 'js-input',

    inheritAttrs: false,

    props: {
      disabled: Boolean,
      placeholder: String,
      name: String,
      textarea: Boolean,
      rows: {
        type: [ String, Number ],
        default: 1
      },
      autoGrow: Boolean,
      maxRows: {
        type: [ String, Number ],
        default: Infinity
      },
      value: {
        type: String,
        default: ''
      },
    },

    data () {
      return {
        lazyValue: this.value
      };
    },

    methods: {
      onInput (ev) {
        this.lazyValue = ev.target.value || ev.target.innerHTML;
      },

      focus () {
        this.$refs.input && this.$refs.input.focus();
      }
    },

    computed: {
      classes () {
        return {
          'js-input': true,
          'js-input_disabled': this.disabled,
          'js-input_textarea': this.isTextarea,
        };
      },

      isTextarea () {
        return this.textarea || this.rows > 1;
      },

      inputTag () {
        return this.isTextarea
          ? 'textarea'
          : 'input';
      },

      inputProps () {
        const props = {
          class: 'js-input__input',
          type: this.type
        };

        if (this.placeholder) {
          props.placeholder = this.placeholder;
        }

        if (this.disabled) {
          props.disabled = this.disabled;
        }

        if (this.name) {
          props.name = this.name;
        }

        if (this.isTextarea) {
          props.rows = this.rowsNumber;
        }

        if (this.$attrs) {
          Object.assign( props, { ...this.$attrs } );
        }

        Object.assign( props, this.$attrs );

        return props;
      },

      computedRowsNumber () {
        const text = this.lazyValue;
        return ensureString( text ).split( '\n' ).length;
      },

      rowsNumber () {
        if (!this.autoGrow) {
          return this.rows;
        }

        return Math.max(
          ensureNumber( this.rows ),
          Math.min(
            this.computedRowsNumber,
            ensureNumber( this.maxRows )
          )
        );
      }
    },

    watch: {
      lazyValue (value) {
        this.$emit( 'input', value );
      },
      value (value) {
        this.lazyValue = value;
      }
    }
  };
</script>

<template>
  <div :class="classes">

    <component :is="inputTag" ref="input"
               :value="lazyValue"
               @input="onInput"
               v-bind="inputProps"></component>

  </div>
</template>

<style lang="scss">
  @import "../../../styles/components/base/input";
</style>
