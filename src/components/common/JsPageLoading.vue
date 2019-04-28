<script>
  import JsLoading from '../base/JsLoading';

  // Store
  import { createNamespacedHelpers } from 'vuex';

  const uiStore = createNamespacedHelpers('ui');

  export default {
    name: 'js-page-loading',

    components: {
      JsLoading
    },

    data: () => ({
      progress: 0,
      loading: false,
      progressInterval: null,
      resetLineAnimation: false
    }),

    methods: {
      start () {
        this.loading = true;
        this.startProgressChange();
      },

      finish () {
        this.stopProgressChange();
        this.progress = 100;
        setTimeout(_ => {
          this.loading = false;
        }, 100);
      },

      startProgressChange () {
        if (this.progressInterval) {
          this.clearProgressInterval();
        }
        if (this.progress > 0) {
          this.resetLineAnimation = true;
        }
        this.$nextTick(() => {
          this.progress = 0;
          const maxProgressValue = 60;
          this.progressInterval = setInterval(_ => {
            this.resetLineAnimation && (this.resetLineAnimation = false);
            this.progress += (maxProgressValue - this.progress) / 10;
          }, 100);
        });
      },

      stopProgressChange () {
        this.clearProgressInterval();
      },

      clearProgressInterval () {
        clearInterval(this.progressInterval);
        this.progressInterval = null;
      }
    },

    computed: {
      ...uiStore.mapState({
        pageLoading: state => state.loaders.pageLoading
      }),

      classes () {
        return {
          'page-loading': true,
          'page-loading_reset-line-animation': this.resetLineAnimation
        };
      },
    },

    watch: {
      pageLoading (value) {
        value
          ? this.start()
          : this.finish();
      }
    }
  };
</script>

<template>
  <transition name="loading" mode="out-in">
    <div :class="classes" v-show="loading">
      <js-loading line
                  :lineHeight="2"
                  :progress="progress"
                  lineRound
                  color="primary"
                  lineShadow></js-loading>
    </div>
  </transition>
</template>

<style lang="scss">
  @import "../../styles/components/common/page-loading";
</style>
