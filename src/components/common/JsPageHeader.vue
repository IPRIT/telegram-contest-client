<script>
  import JsBtn from '../base/JsBtn';
  import JsImage from '../base/JsImage';

  // Utils
  import { animationDelay } from '../../utils/animation';

  // Store
  import { createNamespacedHelpers } from 'vuex';

  const uiStore = createNamespacedHelpers( 'ui' );

  export default {
    name: 'js-page-header',

    components: {
      JsBtn,
      JsImage,
    },

    data: () => ({
      logoSrc: require( '~/assets/ui/logo/logo-colorful.svg' ),
      logoSrcWhite: require( '~/assets/ui/logo/logo-white.svg' ),

      isThemeChanging: false
    }),

    methods: {
      scrollToTop () {
        this.$future.scrollTo(0, {
          duration: 300,
          easing: 'easeInOutCubic'
        });
      },

      toggleTheme (ev) {
        if (this.isThemeChanging) {
          return;
        }
        this.isThemeChanging = true;

        if (this.theme === 'dark' && this.$router.currentRoute.path !== '/') {
          this.$router.push( '/' );
        }

        const themeClass = `theme-ripple_${this.theme}`;

        const { pageX = 0, pageY = 0 } = ev;
        const root = document.querySelector( '#app' );
        const rippleElement = document.createElement( 'div' );
        rippleElement.className = `theme-ripple ${themeClass}`;
        rippleElement.style.transform = `translate3d(${pageX}px, ${pageY}px, 0) scale(0.001)`;
        document.querySelector('html').style.overflow = 'hidden';
        root.appendChild( rippleElement );

        return animationDelay( 10 ).then(_ => {
          rippleElement.style.transform = `translate3d(${pageX}px, ${pageY}px, 0) scale(10)`;
          return animationDelay( 200 );
        }).then(_ => {
          const newTheme = this.theme === 'default'
            ? 'dark' : 'default';
          this.$store.dispatch( 'ui/setTheme', newTheme );
          this.$store.dispatch( 'ui/rememberTheme', newTheme );

          return animationDelay( 300 );
        }).then(_ => {
          rippleElement.className = `theme-ripple ${themeClass} theme-ripple_hiding`;
          return animationDelay( 300 );
        }).then(_ => {
          root.removeChild( rippleElement );
          document.querySelector('html').style.overflow = null;
          return animationDelay( 300 );
        }).then(_ => {
          this.isThemeChanging = false;
        });
      }
    },

    computed: {
      ...uiStore.mapState({
        theme: state => state.theme
      }),

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
        <button class="page-header__logo-image-wrapper" @click="toggleTheme">
          <img :src="logoSrc"
               v-if="theme === 'default'"
               class="page-header__logo-image">
          <img :src="logoSrcWhite"
               v-else
               class="page-header__logo-image">
        </button>
        <a class="page-header__nav-item page-header__nav-item_logo"
           href="https://contest.dev/" target="_blank" rel="noopener">
          <span class="hidden-sm-and-down">Developer Challenges</span>
        </a>

        <div class="page-header__divider">/</div>

        <span class="page-header__nav-item active" @click="scrollToTop">Real-time Issues</span>
      </div>

      <transition name="slide-x-reverse-transition">
        <div class="page-header__user" v-if="theme === 'dark'">
          <a class="page-header__user-logout" @click="toggleTheme">Logout</a>
          <div class="page-header__user-photo bc0 dog" title="Fair Dog"></div>
        </div>
      </transition>

    </div>
  </header>
</template>

<style lang="scss">
  @import "../../styles/components/common/page-header";
</style>
