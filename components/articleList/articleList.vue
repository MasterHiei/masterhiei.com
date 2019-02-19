<template>
  <v-layout column wrap>
    <v-flex
      v-for="(article, index) in articles"
      :id="article._id"
      :key="index"
      class="article-item-container"
    >
      <transition name="fade">
        <article-list-item :article="article" />
      </transition>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapGetters } from 'vuex';
import articleListItem from './articleListItem';

export default {
  components: {
    articleListItem,
  },
  computed: {
    ...mapGetters({
      articles: 'articles/all',
      count: 'articles/count',
    }),
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.article-item-container
  border-bottom thin solid lightgray
</style>
