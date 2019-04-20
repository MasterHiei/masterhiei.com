<template lang="pug">
  v-container(fluid grid-list-sm)
    v-layout(justify-center row wrap)
      // Main contents
      v-flex(mt-3 md7 xs12)
        // Title
        v-flex(class="text-xs-center" wrap)
          v-flex(tag="h1" class="primary-text display-2")
            | Master Hiei

          v-flex(tag="h2" class="body-2 secondary-text")
            | 万物有因必有果，洗洗皆可吃

        v-divider(class="my-4")

        article-list

      // Side menu
      v-card(
        id="side-menu"
        class="text-xs-center"
        color="transparent"
        max-width="56"
        flat
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
            | fas fa-bug
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
#side-menu
  position fixed
  top 40%
  right 1.3rem
  opacity 0.35
  transition opacity 0.75s
  &:hover
    opacity 1
</style>
