<template>
  <v-container fluid grid-list-sm>
    <v-layout justify-center row pt-3 wrap>
      <v-spacer />

      <!-- Left menu -->
      <v-flex class="hidden-sm-and-down text-xs-center" md2>
        left-side-area
      </v-flex>

      <v-spacer />

      <!-- Main contents -->
      <v-flex md6 xs12>
        <article-list />
      </v-flex>

      <v-spacer />

      <!-- Right menu -->
      <v-flex class="hidden-sm-and-down text-xs-center" md2>
        right-side-area
      </v-flex>

      <v-spacer />
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
    ArticleList: () => import('~/components/article/List.vue'),
  },

  async fetch({ store }) {
    await store.dispatch('article/fetchAll');
  },
})
export default class IndexPage extends Vue {}
</script>
