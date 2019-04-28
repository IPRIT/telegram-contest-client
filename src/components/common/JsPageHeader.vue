<script>
  import JsBtn from '../base/JsBtn';
  import JsImage from '../base/JsImage';

  export default {
    name: 'js-page-header',

    components: {
      JsBtn,
      JsImage,
    },

    data: () => ({
      logo: {
        src: require( '~/assets/ui/logo/logo-colorful.svg' )
      }
    }),

    methods: {
      scrollToTop () {
        this.$future.scrollTo(0, {
          duration: 300,
          easing: 'easeInOutCubic'
        });
      }
    },

    computed: {
      classes () {
        return {
          'page-header': true
        };
      },
    }
  };
</script>

<template>
  <header class="page-header">
    <div class="page-header__inner">

      <div class="page-header__nav">
        <a class="page-header__nav-item page-header__nav-item_logo"
           href="https://contest.dev/" target="_blank" rel="noopener">
          <img :src="logo.src"
               class="page-header__logo-image">
          <span>Developer Challenges</span>
        </a>

        <div class="page-header__divider">/</div>

        <span class="page-header__nav-item active" @click="scrollToTop">Real-time Issues</span>
      </div>

    </div>
  </header>
</template>

<style lang="scss">
  @import "../../styles/components/common/page-header";
</style>
