<script>
  import JsMoneyTable from '../components/common/money/JsMoneyTable';

  export default {
    name: 'awards-page',

    layout: 'default',

    components: {
      JsMoneyTable
    },

    async fetch ({ app, store, route }) {
      const { dispatch } = store;

      return Promise.all([
        dispatch( 'money/fetchTable' ),
      ]);
    }
  };
</script>

<template>
  <div class="awards-page">
    <js-money-table class="awards-page__table"></js-money-table>
  </div>
</template>

<style lang="scss">
  @import "../styles/pages/awards-page";
</style>
