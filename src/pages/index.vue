<script>
  import JsIssues from '../components/common/issues/JsIssues';

  export default {
    name: 'index-page',

    layout: 'default',

    components: {
      JsIssues
    },

    async fetch ({ app, store, route }) {
      const { dispatch } = store;

      return Promise.all([
        dispatch( 'fetchIssues' ),
        dispatch( 'money/fetchTable' ),
      ]);
    }
  };
</script>

<template>
  <js-issues class="index-page"></js-issues>
</template>

<style lang="scss">
  @import "../styles/pages/index-page";
</style>
