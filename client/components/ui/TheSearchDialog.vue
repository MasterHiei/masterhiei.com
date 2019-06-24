<template lang="pug">
  v-dialog(
    v-model="show"
    max-width="80%"
    lazy
  )
    v-card#search-card
      // Search form
      v-card-title#search-form
        v-text-field(
          v-model="keywords"
          :label="$t('search.title')"
          :loading="loading"
          prepend-inner-icon="fas fa-search"
          single-line
          color="accent"
          type="search"
        )

      // Search result
      v-card-text#search-result
        // Search result stats
        v-flex#search-result-stats(wrap)
          | {{ $t('search.result', { number: searchNumber }) }}

        // Search result list
        v-container#search-result-list.scroll-y
          v-layout.list-container(column wrap)
            // List item
            v-flex.list-item(
              v-for="article in searchResult"
              :key="article.id"
              wrap
            )
              // Item title
              span.list-item-title(
                @click="transiTo(article.id)"
              )
                | {{ article.title }}

              // Item detail
              v-flex.list-item-detail(wrap)
                // Post date
                time.post-date(:datetime="article.created_at")
                  | {{ $d(new Date(article.created_at), 'short', $i18n.locale) }}

                // Tags
                span {{ $t('search.tags') }}

                n-link.tags(
                  v-for="(tag, index) in article.tags"
                  :key="index"
                  :to="localePath({ name: 'tags-tag', params: { tag: tag } })"
                )
                  | {{ tag }}

              // TODO: Content
              v-flex.list-item-content(wrap)
                | {{ article.content.slice(0, 100) + '...' }}

              v-divider.mt-3.mr-1
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { State } from 'vuex-class';
import debounce from 'lodash/debounce';

@Component
export default class TheSearchDialog extends Vue {
  // Data
  @State showSearchDialog;
  show = false;
  keywords = '';
  debounceSearch = (): void => {};
  loading = false;
  searchResult = [];

  // Hooks
  created() {
    // Set debouec function
    this.debounceSearch = debounce(this.search, 1000);
  }

  // Watch

  // Show dialog if state changed
  @Watch('showSearchDialog')
  onDialogStateChanged(): void {
    this.show = true;
  }

  // Call search API if state changed
  @Watch('keywords')
  onKeywordsChanged(): void {
    this.debounceSearch();
  }

  // Computed

  /**
   * Count number of search result
   */
  get searchNumber(): number {
    return this.searchResult ? this.searchResult.length : 0;
  }

  // Methods

  /**
   * Search articles by keywords
   */
  async search(): Promise<void> {
    // Return if blank
    if (!this.keywords.trim()) {
      return;
    }

    // Call search API
    this.loading = true;
    const { articles } = await this.$axios.$get('/search', {
      params: { keywords: this.keywords.trim() },
    });
    this.searchResult = articles;
    this.loading = false;
  }

  /**
   * Transition to article page
   */
  transiTo(id: string): void {
    this.show = false;
    this.$router.push(this.localePath({ name: 'articles-id', params: { id } }));
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#search-card
  padding 24px 60px 48px 60px
  #search-form
    padding 0
    >>> .v-input__icon .v-icon
      font-size 18px
  #search-result
    padding 0
    height 480px
    overflow hidden
    #search-result-stats
      margin-bottom 4px
      font-size 12px
      font-weight 500
      color var(--v-secondary-darken3)
    #search-result-list
      padding 0
      max-height 480px
      .list-container .list-item
        margin 8px 0
      .list-item
        &-title
          display block
          font-size 18px
          font-weight 500
          margin-bottom 4px
          cursor pointer
          transition color .15s linear 0s
          &:hover
            color var(--v-accent-base)
        &-detail
          font-size 12px
          color var(--v-secondary-darken3)
          margin-bottom 4px
          .post-date
            margin-right 12px
          .tags
            margin-right 8px
            color var(--v-secondary-darken3)
            &:last-child
              margin-right 0
            &:hover
              text-decoration underline
        &-content
          font-size 14px
</style>
