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
          v-flex(tag="h1" class="display-3 grey--text text--darken-3")
            | Master Hiei

          v-flex(tag="h2" class="subheading grey--text")
            | 万物有因必有果，洗洗皆可吃

        v-divider(class="my-4")

        article-list

      // Right menu
      v-flex(class="hidden-sm-and-down text-xs-center" mt-5 md1)
        // Search
        v-btn(icon @click="show = true")
          v-icon(color="success" small)
            | fas fa-search

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
