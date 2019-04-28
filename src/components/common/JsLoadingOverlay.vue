<script>
  // Store
  import { createNamespacedHelpers } from 'vuex';

  const uiStore = createNamespacedHelpers( 'ui' );

  export default {
    name: 'js-loading-overlay',

    props: {
      loader: {
        type: String,
        required: true
      }
    },

    computed: {
      ...uiStore.mapState({
        loaders: state => state.loaders
      }),

      isLoading () {
        return this.loaders[ this.loader ];
      }
    },
  };
</script>

<template>
  <transition name="fade-transition">
    <div class="loading-overlay"
         v-show="isLoading">
      Подождите...
    </div>
  </transition>
</template>

<style lang="scss">
  @import "../../styles/components/common/loading-overlay";
</style>

