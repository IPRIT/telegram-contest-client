<script>
  // JsFuture
  import JsBtn from '../../base/JsBtn';
  import JsImage from '../../base/JsImage';

  // Components
  import JsMoneyRow from './JsMoneyRow';

  // Store
  import { createNamespacedHelpers } from 'vuex';

  const moneyStore = createNamespacedHelpers( 'money' );

  export default {
    name: 'js-money-table',

    components: {
      JsMoneyRow,
      JsBtn,
      JsImage
    },

    computed: {
      ...moneyStore.mapState({
        table: state => state.table
      }),

      classes () {
        return {
          'js-money-table': true
        };
      }
    }
  };
</script>

<template>
  <div :class="classes">

    <div class="js-money-table__title">Awards</div>

    <transition-group name="list-transition" tag="div">
      <js-money-row class="js-money-table__row"
                    v-for="row in table"
                    :key="row.userId"
                    :item="row"></js-money-row>
    </transition-group>

  </div>
</template>

<style lang="scss">
  @import "../../../styles/components/common/money/table";
</style>
