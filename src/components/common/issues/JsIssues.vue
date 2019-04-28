<script>
  // Icons
  import MdRefresh from 'md-svg-vue/dist/navigation/MdRefresh.vue';
  import MdArrowDownward from 'md-svg-vue/dist/navigation/MdArrowDownward.vue';

  import JsBtn from '../../base/JsBtn';
  import JsImage from '../../base/JsImage';
  import JsInfinityScroll from '../../base/JsInfinityScroll';

  import * as rootStore from 'vuex';
  import JsIssueItem from './JsIssueItem';

  export default {
    name: 'js-issues',

    components: {
      JsIssueItem,
      JsBtn,
      JsImage,
      JsInfinityScroll,

      MdRefresh,
      MdArrowDownward
    },

    data: () => ({
      isMoreLoading: false,
      isErrored: false,
    }),

    methods: {
      loadMore () {
        const { dispatch } = this.$store;

        this.isErrored = false;
        this.isMoreLoading = true;

        return dispatch( 'fetchMoreIssues' ).catch(error => {
          this.isErrored = true;
        }).finally(_ => {
          this.isMoreLoading = false;
        });
      }
    },

    computed: {
      ...rootStore.mapState({
        issues: state => state.issues,
        offset: state => state.offset
      }),

      classes () {
        return {
          'js-issues': true
        };
      },
    }
  };
</script>

<template>
  <main :class="classes">
    <js-infinity-scroll :loading="isMoreLoading"
                       :canLoadNext="offset > 0 && !isMoreLoading"
                       :maxAutoLoadings="5"
                       :containerOffset="400"
                       class="js-issues__infinity-list"
                       @load="loadMore">

      <transition-group name="fade-transition-group">
        <js-issue-item class="js-issues__item"
                       v-for="item in issues"
                       :key="item.id"
                       :item="item"></js-issue-item>
      </transition-group>

      <div slot="actions" class="js-issues__load-more">
        <js-btn block
                outline
                color="primary"
                @click="loadMore">

          <template v-if="!isErrored">
            <md-arrow-downward></md-arrow-downward>
            <span>Load more</span>
          </template>

          <template v-else>
            <md-refresh></md-refresh>
            <span class="hidden-sm-and-down">An error occurred.&nbsp;</span>
            <span>Try again</span>
          </template>

        </js-btn>
      </div>

    </js-infinity-scroll>

  </main>
</template>

<style lang="scss">
  @import "../../../styles/components/common/issues";
</style>
