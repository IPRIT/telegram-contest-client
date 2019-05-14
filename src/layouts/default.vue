<script>
  // Base components
  import JsApp from '../components/base/JsApp/JsApp.vue';
  import JsAppWrapper from '../components/common/JsAppWrapper.vue';
  import JsPageHeader from "../components/common/JsPageHeader";

  // Store
  import { createNamespacedHelpers } from 'vuex';

  const uiStore = createNamespacedHelpers( 'ui' );

  export default {
    components: {
      JsApp,
      JsAppWrapper,
      JsPageHeader,
    },

    computed: {
      ...uiStore.mapState({
        theme: state => state.theme
      }),

      classes () {
        return {
          [`theme-${this.theme}`]: true
        };
      }
    }
  };
</script>

<template>
  <js-app :class="classes">
    <js-app-wrapper>
      <template slot="header">
        <js-page-header></js-page-header>
      </template>

      <div slot="body"
           style="min-height: 100vh;">
        <nuxt></nuxt>
      </div>

      <span slot="footer"></span>
    </js-app-wrapper>
  </js-app>
</template>

<style lang="scss">
  @import "../styles/core/presets/index";
</style>
