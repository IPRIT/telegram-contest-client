<script>
  import JsBtn from '../../base/JsBtn';
  import JsImage from '../../base/JsImage';
  import JsElapsedTime from '../JsElapsedTime';

  import MdThumbUp from 'md-svg-vue/dist/action/MdThumbUp.vue';

  export default {
    name: 'js-issue-item',

    props: {
      item: {
        type: Object,
        required: true
      }
    },

    components: {
      JsElapsedTime,
      JsBtn,
      JsImage,
      MdThumbUp,
    },

    data: () => ({
    }),

    computed: {
      classes () {
        return {
          'js-issue-item': true
        };
      },

      userTcClass () {
        const user = this.item.Author;
        const colorScheme = user.colorScheme;
        if (!colorScheme) {
          return {};
        }
        const tcClass = colorScheme.split( '|' )[0];
        return {
          [tcClass]: true
        };
      },

      zooClasses () {
        const user = this.item.Author;
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

      hasAnimal () {
        const user = this.item.Author;
        return !!user.displayZoo;
      },

      userPhoto () {
        const user = this.item.Author;
        return user && user.Photo;
      },

      userFirstLetter () {
        return this.item.Author.displayName.substr(0, 1);
      },

      platformType () {
        return this.item.Entry.platformType;
      },

      issueURL () {
        return `https://contest.dev/chart-${this.platformType}/entry${this.item.Entry.externalId}?sort=date#issue${this.item.externalId}`;
      },

      displayMessage () {
        return this.item.displayMessage.replace( /<a/gi, '<a target="_blank" rel="noopener"' );
      }
    }
  };
</script>

<template>
  <section :class="classes">
    <div class="js-issue-item__wrapper">
      <a class="js-issue-item__photo" rel="noopener" target="_blank" :href="issueURL">
        <div class="js-issue-item__animal" v-if="hasAnimal" :class="zooClasses"></div>
        <div class="js-issue-item__image" v-else-if="userPhoto">
          <img :src="userPhoto.src" :alt="userPhoto.displayName">
        </div>
        <div class="js-issue-item__letter" v-else>{{ userFirstLetter }}</div>
      </a>
      <div class="js-issue-item__body">
        <a class="js-issue-item__header" rel="noopener" target="_blank" :href="issueURL">
          <div class="js-issue-item__user-name" :class="userTcClass">{{ item.Author.displayName }}</div>
          <span class="js-issue-item__created-at">
            <js-elapsed-time :time="item.createdAt" :updateInterval="5000"></js-elapsed-time>
            <span v-if="item.parentIssueId">&nbsp;(replied to the issue)</span>
          </span>

          <span class="js-issue-item__entry-id"><span class="hidden-sm-and-down">Entry&nbsp;</span>#{{ item.Entry.externalId }}</span>
        </a>
        <div class="js-issue-item__text" v-html="displayMessage"></div>
        <div class="js-issue-item__files" v-if="item.MediaFiles.length">
          <a class="js-issue-item__file" target="_blank" rel="noopener" :href="file.src" :title="file.displayName" v-for="file in item.MediaFiles">
            <div class="js-issue-item__file-thumb" v-if="file.thumbnailSrc" :style="{'background-image': `url(${file.thumbnailSrc})`}"></div>
            <div v-else class="js-issue-item__file-empty-thumb"></div>
            <div class="js-issue-item__file-body">
              <div class="js-issue-item__file-name">{{ file.displayName }}</div>
              <div class="js-issue-item__file-size">{{ file.displaySize }}</div>
            </div>
          </a>
        </div>
        <div class="js-issue-item__bottom">
          <div class="js-issue-item__device">{{ item.displayDevice }}</div>
          <div class="js-issue-item__rating" v-if="item.rating > 0">
            <md-thumb-up></md-thumb-up>
            <span>{{ item.rating }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss">
  @import "../../../styles/components/common/issue-item";
</style>
