<script>
  // Component level mixins
  import AppBreakpoint from './mixins/app-breakpoint';

  // Directives
  import { Resize } from "../../../utils/vue/directives";

  export default {
    name: 'js-app',

    mixins: [
      AppBreakpoint
    ],

    directives: {
      Resize
    },

    props: {
      id: {
        type: String,
        default: 'app'
      }
    },

    watch: {
      breakpoint (args) {
        console.log(args);
      }
    },
  };
</script>

<template>
  <div class="app"
       data-app="true"
       :id="this.id"
       v-resize="onResize">
    <div class="app__wrap">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss">
  @import "../../../styles/components/base/app";
</style>
