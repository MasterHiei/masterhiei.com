<template>
  <v-container grid-list-xs>
    <v-layout justify-center row wrap>
      <v-flex md8 xs11 wrap>
        <v-btn
          v-if="this.$auth.hasScope('admin')"
          color="success"
          :to="
            localePath({ name: 'articles-edit-id', params: { id: article.id } })
          "
          nuxt
          exact
        >
          Edit
        </v-btn>

        <v-flex class="headline font-weight-bold" tag="h1" pt-4 wrap>
          {{ article.title }}
        </v-flex>

        <v-flex class="grey--text" py-2 wrap>
          <v-flex v-if="isEqualToDate" tag="span" mr-3 wrap>
            {{
              $t('article.createdDate', {
                date: dateFormate(article.created_at),
              })
            }}
          </v-flex>

          <v-flex v-else tag="span" mr-3 wrap>
            {{
              $t('article.updatedDate', {
                date: dateFormate(article.modified_at),
              })
            }}
          </v-flex>

          <v-flex tag="span" mr-3 wrap>
            {{ $t('article.views', { number: article.views }) }}
          </v-flex>
        </v-flex>

        <v-flex pb-2 wrap>
          <v-chip
            v-for="(tag, index) in article.tags"
            :key="index"
            class="mr-3"
            color="blue-grey lighten-4"
            small
          >
            <v-icon class="mr-2" color="success" size="13" left>
              fas fa-tag
            </v-icon>
            {{ tag }}
          </v-chip>
        </v-flex>

        <the-markdown-view :content="article.content" />

        <comment-list :comments="article.comments" />

        <comment-poster />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import TheMarkdownView from '@/components/TheMarkdownView';
import CommentList from '@/components/CommentList';
import CommentPoster from '@/components/CommentPoster';
import isEqual from 'date-fns/is_equal';

export default {
  components: {
    TheMarkdownView,
    CommentList,
    CommentPoster,
  },

  computed: {
    isEqualToDate() {
      if (!this.article.created_at || !this.article.modified_at) {
        return true;
      }
      return isEqual(this.article.created_at, this.article.modified_at);
    },
  },

  async asyncData({ store, params }) {
    const article = await store.dispatch('article/getArticle', params.id);
    return { article: article };
  },

  methods: {
    dateFormate(dateStr) {
      return this.$d(new Date(dateStr), 'short', this.$i18n.locale);
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.v-chip__content .v-icon
  margin-left -2px
</style>
