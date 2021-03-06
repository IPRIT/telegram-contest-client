<script>
  import { ImageLoader } from '@rabota/loader';

  import JsImageError from './JsImageError';

  import MdErrorOutline from 'md-svg-vue/dist/alert/MdErrorOutline.vue';
  import MdRefresh from 'md-svg-vue/dist/navigation/MdRefresh.vue';

  import JSBtn from '../JsBtn/JsBtn.vue';

  import { getElementWidth } from "../../../utils/browser";

  export default {
    name: 'js-image',

    components: {
      JsImageError,

      MdErrorOutline,
      MdRefresh,

      JSBtn
    },

    props: {
      image: Object,
      src: String,
      thumbnailSrc: String,

      alt: String,
      width: [ Number, String ],
      height: [ Number, String ],

      round: Boolean,
      mode: {
        type: String,
        default: 'image' // background, image
      },
      imageClip: {
        type: String,
        default: 'cover' // cover, contain
      },
      tag: {
        type: String,
        default: 'div'
      },
      showError: Boolean
    },

    data: () => ({
      originalLoaded: false,
      errored: false,
      containerWidth: 0,

      defaultImageClip: 'cover'
    }),

    methods: {
      async start () {
        if (!this.hasThumbnail) {
          return ( this.originalLoaded = true );
        }

        return this.loadImage( this.imageObject.src ).then(_ => {
          this.originalLoaded = true;
        }).catch(error => {
          this.updateContainerWidth();
          this.errored = true;
          console.warn( '[JSImage]', error );
        });
      },

      loadImage (imageUrl) {
        const imageLoader = new ImageLoader();
        return imageLoader.retry( imageUrl, 4 );
      },

      retry () {
        this.reset();
        this.start();
      },

      repairMeasureValue (value = 0) {
        const measureUnit = value.toString().replace( /(\d+)/, '' );

        if (typeof value === 'number' || !measureUnit) {
          return `${value}px`;
        }

        return value;
      },

      reset () {
        this.errored = false;
        this.originalLoaded = false;
      },

      getContainerWidth () {
        const container = this.$refs.container;
        return container && getElementWidth( container ) || 0;
      },

      updateContainerWidth () {
        this.containerWidth = this.getContainerWidth();
      }
    },

    computed: {
      classes () {
        return {
          'js-image': true,
          'js-image_thumbnail': this.hasThumbnail && !this.originalLoaded && !this.errored,
          'js-image_original': (!this.hasThumbnail || this.originalLoaded) && !this.errored,
          'js-image_round': this.round,
          'js-image_background': this.isBackgroundMode,
          'js-image_errored': this.errored,
        };
      },

      styles () {
        const styles = {};

        if (this.width) {
          Object.assign( styles, { width: this.repairMeasureValue( this.width ) } );
        }
        if (this.height) {
          Object.assign( styles, { height: this.repairMeasureValue( this.height ) } );
        }

        return styles;
      },

      imageStyles () {
        const styles = {};

        if (this.imageClip !== this.defaultImageClip) {
          Object.assign( styles, { 'object-fit': this.imageClip } );
        }

        return styles;
      },

      backgroundStyles () {
        const styles = {};
        const image = this.imageObject;

        if (!this.originalLoaded && this.hasThumbnail) {
          Object.assign( styles, { 'background-image': `url(${image.thumbnailSrc})` } );
        }

        if (this.originalLoaded || !this.hasThumbnail) {
          Object.assign( styles, { 'background-image': `url(${image.src})` } );
        }

        if (this.imageClip !== this.defaultImageClip) {
          Object.assign( styles, { 'background-size': `${this.imageClip} !important` } );
        }

        return styles;
      },

      imageObject () {
        if (this.image) {
          return this.image;
        }

        return {
          src: this.src,
          thumbnailSrc: this.thumbnailSrc
        };
      },

      hasThumbnail () {
        const image = this.imageObject;

        return image.thumbnailSrc && image.src !== image.thumbnailSrc;
      },

      isImgMode () {
        return this.mode === 'image';
      },

      isBackgroundMode () {
        return this.mode === 'background';
      }
    },

    watch: {
      '$future.breakpoint' () {
        this.updateContainerWidth();
      }
    },

    mounted () {
      this.start();
    }
  };
</script>

<template>
  <component :is="tag"
             :class="classes"
             :style="styles"
             ref="container">

    <div class="js-image__inner" v-if="isImgMode">

      <transition name="fade-transition">
        <js-image-error v-if="showError && errored"
                       :errored="errored"
                       :round="round"
                       :containerWidth="containerWidth"
                       @retry="retry"></js-image-error>
      </transition>

      <transition name="image-transition" mode="in-out">
        <div class="js-image__image-wrapper" v-if="!originalLoaded && hasThumbnail" key="thumbnail">
          <img :src="imageObject.thumbnailSrc" class="js-image__image" :alt="alt" :style="imageStyles">
        </div>
        <div class="js-image__image-wrapper" v-else key="original">
          <img :src="imageObject.src" class="js-image__image" :alt="alt" :style="imageStyles">
        </div>
      </transition>
    </div>

    <template v-else-if="isBackgroundMode">
      <div class="js-image__background" :style="backgroundStyles">
        <slot></slot>
      </div>
    </template>

  </component>
</template>

<style lang="scss">
  @import "../../../styles/components/base/image";
</style>
