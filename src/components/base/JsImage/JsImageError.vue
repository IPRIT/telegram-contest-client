<script>
  import MdErrorOutline from 'md-svg-vue/dist/alert/MdErrorOutline.vue';
  import MdRefresh from 'md-svg-vue/dist/navigation/MdRefresh.vue';

  import JsBtn from '../JsBtn/JsBtn.vue';

  export default {
    name: 'js-image-error',

    components: {
      MdErrorOutline,
      MdRefresh,

      JsBtn
    },

    props: {
      errored: Boolean,
      containerWidth: Number,
      round: Boolean
    },

    methods: {
      retry () {
        this.$emit( 'retry' );
      }
    },

    computed: {
      classes () {
        return {
          'js-image-error': true,
          'js-image-error_round': this.round
        };
      },

      isContainerSmall () {
        return this.containerWidth < 320;
      }
    }
  };
</script>

<template>
  <div :class="classes"
       title="Невозможно загрузить изображение">

    <div class="js-image-error__inner">
      <md-error-outline class="text_gray-dark icon_small" v-if="!isContainerSmall"></md-error-outline>
      <span class="js-image-error__text" v-if="!isContainerSmall">Невозможно загрузить изображение</span>
      <js-btn ripple
             outline
             small
             @click="retry"
             :round="round"
             v-if="!isContainerSmall">Повторить</js-btn>
      <js-btn flat
             ripple
             small
             icon
             @click="retry"
             :round="round"
             v-else>
        <md-refresh class="text_gray-dark icon_small"></md-refresh>
      </js-btn>
    </div>

  </div>
</template>

<style lang="scss">
  @import "../../../styles/components/base/image-error";
</style>
