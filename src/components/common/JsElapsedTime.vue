<script>
  export default {
    name: 'js-elapsed-time',

    props: {
      time: {
        type: [ Date, Number, String ],
        default: () => Date.now()
      },
      updateInterval: {
        type: Number,
        default: 20000
      }
    },

    data () {
      return {
        updateIntervalId: null,

        elapsedTime: this.time,
        formatTime: this.time,

        instance: null,
      };
    },

    methods: {
      createMoment () {
        const instance = this.$moment( this.time );
        instance.locale( 'en-gb' );
        return instance;
      },

      update () {
        this.elapsedTime = this.instance.fromNow();
        this.formatTime = this.instance.format( 'LLLL' );
      },

      createObserver () {
        this.deleteObserver();
        this.updateIntervalId = setInterval(_ => this.update(), this.updateInterval);
      },

      deleteObserver () {
        if (this.updateIntervalId) {
          clearInterval( this.updateIntervalId );
          this.updateIntervalId = null;
        }
      },
    },

    watch: {
      time () {
        this.instance = this.createMoment();
        this.update();
      }
    },

    created () {
      this.instance = this.createMoment();
      this.update();
    },

    mounted () {
      this.update();
      this.createObserver();
    },

    beforeDestroy () {
      this.deleteObserver();
    }
  };
</script>

<template>
  <span class="js-elapsed-time" v-else :title="formatTime">{{ elapsedTime }}</span>
</template>

<style lang="scss">
  .js-elapsed-time {
    user-select: auto !important;
  }
</style>
