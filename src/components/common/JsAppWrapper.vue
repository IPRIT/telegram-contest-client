<script>
  // Base components
  import JsSmartRender from '../base/JsSmartRender/JsSmartRender.vue';

  export default {
    name: 'js-app-wrapper',

    components: {
      JsSmartRender
    },

    computed: {
      classes () {
        return {
          'app-wrapper': true
        };
      }
    }
  };
</script>

<template>
  <div :class="classes" ref="container">

    <div class="app-wrapper__content"
         ref="content">

      <slot></slot>

      <div class="app-wrapper__inner"
           v-if="$slots.header || $slots.body || $slots.footer">
        <slot name="header"></slot>
        <slot name="body"></slot>
        <slot name="footer"></slot>
      </div>

    </div>

  </div>
</template>

<style lang="scss">
  @import "../../styles/components/common/app-wrapper";
</style>
