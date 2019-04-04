<template>
  <v-container fluid grid-list-lg>
    <v-layout justify-center row pt-3 wrap>
      <v-flex class="text-xs-center" xs1>
        left-side-area
      </v-flex>

      <v-flex lg7 xs10>
        <article-list />
      </v-flex>

      <v-flex class="hidden-md-and-down text-xs-center" xs1>
        right-side-area
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ArticleList: () => import('~/components/ArticleList.vue'),
  },

  async fetch({ store }) {
    await store.dispatch('article/getArticles');
  },
})
export default class IndexPage extends Vue {}
</script>
