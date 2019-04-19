<template lang="pug">
  v-container(fluid grid-list-sm)
    v-layout(justify-center row wrap)
      v-spacer

      // Left menu
      v-flex(class="hidden-sm-and-down text-xs-center" mt-5 md1)
        | left-side-area

      // Main contents
      v-flex(mt-3 md8 xs12)
        // Title
        v-flex(class="text-xs-center" wrap)
          v-flex(tag="h1" class="primary-text display-2")
            | Master Hiei

          v-flex(tag="h2" class="body-2 secondary-text")
            | 万物有因必有果，洗洗皆可吃

        v-divider(class="my-4")

        article-list

      // Right menu
      v-flex(class="hidden-sm-and-down" mt-5 md1)
        v-navigation-drawer(
          id="right-navi"
          class="text-xs-center"
          stateless
          hide-overlay
          width="60"
          height="auto"
          fixed
          right
          value="true"
        )
          // Search
          v-btn(icon @click="")
            v-icon(color="accent")
              | fas fa-search

          // Github
          v-btn(
            icon
            href="https://github.com/MasterHiei/masterhiei.com"
            target="_blank"
          )
            v-icon(color="accent")
              | fab fa-github

          // Feedback
          v-btn(icon @click="")
            v-icon(color="accent")
              | fas fa-question

      v-spacer
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ArticleList: () => import('@/components/article/List.vue'),
  },

  async fetch({ store }) {
    await store.dispatch('article/fetchAll');
  },
})
export default class IndexPage extends Vue {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#right-navi
  background-color var(--v-secondary-lighten1)
  top 32%
  right 8%
  &>>>.v-navigation-drawer__border
    display none !important
</style>
