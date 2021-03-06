<script>
  // Icons
  import MdRefresh from 'md-svg-vue/dist/navigation/MdRefresh.vue';
  import MdArrowDownward from 'md-svg-vue/dist/navigation/MdArrowDownward.vue';
  import MdAttachMoney from 'md-svg-vue/dist/editor/MdAttachMoney.vue';

  import JsBtn from '../../base/JsBtn';
  import JsImage from '../../base/JsImage';
  import JsSmartRender from '../../base/JsSmartRender';
  import JsInfinityScroll from '../../base/JsInfinityScroll';

  import JsIssueItem from './JsIssueItem';

  // Store
  import * as rootStore from 'vuex';
  import { createNamespacedHelpers } from 'vuex';
  import JsMoneyTable from '../money/JsMoneyTable';

  const uiStore = createNamespacedHelpers( 'ui' );

  export default {
    name: 'js-issues',

    components: {
      JsMoneyTable,
      JsIssueItem,

      JsBtn,
      JsImage,
      JsSmartRender,
      JsInfinityScroll,

      MdRefresh,
      MdArrowDownward,
      MdAttachMoney
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

      ...uiStore.mapState({
        theme: state => state.theme
      }),

      classes () {
        return {
          'js-issues': true
        };
      },
    },

    watch: {
      theme (themeName) {
        if (themeName === 'dark') {
          return this.$store.dispatch( 'money/fetchTable' );
        }
      }
    }
  };
</script>

<template>
  <main :class="classes">
    <div style="width: 100%;">
      <div class="js-issues__title">Issues</div>

      <js-infinity-scroll :loading="isMoreLoading"
                          :canLoadNext="offset > 0 && !isMoreLoading"
                          :maxAutoLoadings="5"
                          :containerOffset="2200"
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
    </div>

    <div class="js-issues__prize-pool hidden-sm-and-down" v-if="theme === 'dark'">
      <js-smart-render breakpoints="smAndUp">
        <js-money-table></js-money-table>
      </js-smart-render>
    </div>

    <nuxt-link class="js-issues__awards-button hidden-sm-and-up" v-if="theme === 'dark'" :to="'/awards'">
      <md-attach-money class="icon_large"></md-attach-money>
    </nuxt-link>

  </main>
</template>

<style lang="scss">
  @import "../../../styles/components/common/issues";
</style>
