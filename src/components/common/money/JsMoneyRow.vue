<script>
  import JsBtn from '../../base/JsBtn';
  import JsImage from '../../base/JsImage';

  // Store
  import { DEFAULT_FUNDS } from '../../../store/money/constants';

  export default {
    name: 'js-money-row',

    props: {
      item: {
        type: Object,
        required: true
      }
    },

    components: {
      JsBtn,
      JsImage
    },

    data: () => ({
      defaultFunds: DEFAULT_FUNDS
    }),

    methods: {
      addFunds (ev) {
        if (ev.isTrusted || typeof ev.isTrusted === 'undefined') {
          this.$store.dispatch( 'money/addFunds', { userId: this.item.User.id } );
        }
      }
    },

    computed: {
      filledRowStyle () {
        return {
          width: `${(this.item.percents || 0).toFixed(0)}%`
        };
      },

      zooClasses () {
        const user = this.item.User;
        const colorScheme = user.colorScheme;
        if (!colorScheme) {
          return {};
        }
        const bcClass = colorScheme.split( '|' )[1];
        const zooClass = user.displayZoo;
        return {
          [bcClass]: true,
          [zooClass]: true
        };
      },

      tcClass () {
        const user = this.item.User;
        const colorScheme = user.colorScheme;
        if (!colorScheme) {
          return {};
        }
        const tc = colorScheme.split( '|' )[0];
        return {
          [tc]: true
        };
      },

      formattedBalance () {
        const balance = this.item.balance;
        return `$${balance.format(0, 3, ',')}`;
      }
    }
  };
</script>

<template>
  <button class="js-money-row" @click="addFunds" :data-user-id="item.userId">
    <div class="js-money-row__underlay">
      <div class="js-money-row__empty"></div>
      <div class="js-money-row__filled" :style="filledRowStyle"></div>
    </div>
    <div class="js-money-row__content">
      <div class="js-money-row__left">
        <div class="js-money-row__photo" :class="zooClasses"></div>
        <div class="js-money-row__name" :class="tcClass">{{ item.User.displayName }}</div>
      </div>
      <div class="js-money-row__right">
        <div class="js-money-row__add" :class="tcClass">+${{ defaultFunds }}</div>
        <div class="js-money-row__balance" :class="{'small': item.balance > 1e8}">{{ formattedBalance }}</div>
      </div>
    </div>
  </button>
</template>

<style lang="scss">
  @import "../../../styles/components/common/money/row";
</style>
