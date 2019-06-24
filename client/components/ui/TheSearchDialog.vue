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
          id="search-input"
          v-model.trim="keywords"
          :label="$t('search.title')"
          :loading="loading"
          prepend-inner-icon="fas fa-search"
          single-line
          color="accent"
          type="search"
          autofocus
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

              // Content
              v-flex.list-item-content(
                v-html="strippedContent(article.content)"
                wrap
              )

              v-divider.mt-3.mr-1
</template>

<script lang="ts">
import { setTimeout } from 'timers';
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { State } from 'vuex-class';
import debounce from 'lodash/debounce';
import markdownIt from 'markdown-it';

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
    this.debounceSearch = debounce(this.search, 500);
  }

  // Watch

  // Show dialog if state changed
  @Watch('showSearchDialog')
  onDialogStateChanged(): void {
    // Show dialog
    this.show = true;

    // Focus search input
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 1000 / 60);
    }
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
    if (!this.keywords) {
      return;
    }

    // Call search API
    this.loading = true;
    this.searchResult = [];
    const { articles } = await this.$axios.$get('/search', {
      params: { keywords: this.keywords },
    });
    this.searchResult = articles;
    this.loading = false;
  }

  /**
   * Returns stripped article content
   */
  strippedContent(content: string): string {
    // Parse markdown
    const tokens = markdownIt().parse(content, {});

    // Strip markdown
    let strippedContent = '';
    tokens.forEach((token): void => {
      if (token.type === 'inline' && token.content !== '[[toc]]') {
        strippedContent += `${token.content} `;
      }
    });

    if (!this.keywords) {
      return strippedContent.slice(0, 150) + '...';
    }

    // Emphasize keywords
    return this.emphasizedContent(content, this.keywords);
  }

  /**
   * Returns emphasized keyword
   */
  emphasizedContent(content: string, keyword: string): string {
    const regex = new RegExp(keyword, 'ig');
    const keyIndex = content.search(regex);
    if (keyIndex > -1) {
      // Slice 150 characters beginning at 20 characters before keyword
      const preIndex = keyIndex > 20 ? keyIndex - 20 : 0;
      const slicedContent = content.slice(preIndex, 150);

      // Emphasize whole of keyword
      const word = content.slice(keyIndex, keyIndex + keyword.length);
      const emphasizedWord = `<em class="search-keyword">${word}</em>`;
      return slicedContent.replace(regex, emphasizedWord) + '...';
    }
    // TODO: Emphasize multiple keywords
    return content.slice(0, 150) + '...';
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
          display inline-block
          font-size 20px
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
          >>> .search-keyword
            padding 1px 4px
            font-size 0.9em
            color var(--v-accent-base)
            background-color var(--v-secondary-lighten1)
</style>
