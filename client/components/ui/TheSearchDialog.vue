<template lang="pug">
  v-dialog(
    v-model="show"
    max-width="85%"
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
          | {{ $t('search.result', { number: resultNumber }) }}

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
                v-html="strip(article.content)"
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
import sanitizeHTML from 'sanitize-html';

@Component
export default class TheSearchDialog extends Vue {
  // Data
  @State showSearchDialog;
  show = false;
  oldKeywords = '';
  keywordsProxy = '';
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
    if (searchInput instanceof HTMLInputElement) {
      setTimeout(() => {
        searchInput.focus();

        // Move cursor after the last character
        const textLength = searchInput.value.length;
        searchInput.setSelectionRange(textLength, textLength);
      }, 1000 / 60);
    }
  }

  // Computed

  /**
   * Returns keywords with trimming
   */
  get keywords(): string {
    const regex = new RegExp(' {2,}', 'g');
    if (regex.test(this.keywordsProxy)) {
      return this.keywordsProxy.replace(regex, ' ');
    }
    return this.keywordsProxy;
  }

  /**
   * Call when keywords changed
   */
  set keywords(keywords: string) {
    this.keywordsProxy = keywords;
    this.debounceSearch();
  }

  /**
   * Count number of search result
   */
  get resultNumber(): number {
    return this.searchResult ? this.searchResult.length : 0;
  }

  // Methods

  /**
   * Search articles by keywords
   */
  async search(): Promise<void> {
    // Return if blank or no change
    const keywords = this.keywords;
    if (!keywords || keywords === this.oldKeywords) {
      return;
    }

    // Start loading and clear result list
    this.loading = true;
    this.searchResult = [];

    // Call search API
    const { articles } = await this.$axios.$get('/search', {
      params: { keywords },
    });

    // Stop loading and save data
    this.searchResult = articles;
    this.oldKeywords = keywords;
    this.loading = false;
  }

  /**
   * Returns stripped article content
   */
  strip(content: string): string {
    // Parse markdown
    const tokens = markdownIt().parse(content, {});

    // Strip markdown
    let stripped = '';
    tokens.forEach((token): void => {
      if (token.type === 'inline' && token.content !== '[[toc]]') {
        stripped += `${token.content} `;
      }
    });

    // Returns scliced content if keywords is empty
    if (!this.keywords) {
      return stripped.slice(0, 150) + '...';
    }

    // Emphasize keywords
    const keywords = [this.keywords].concat(this.keywords.split(' '));
    const pattern = keywords.join('|');
    const regex = new RegExp(`(${pattern})`, 'ig');
    const keyIndex = stripped.search(regex);
    if (keyIndex > -1) {
      // Slice and sanitize text
      const sliceIndex = keyIndex > 20 ? keyIndex - 20 : 0;
      const sliced = content.slice(sliceIndex, 150);
      const replcace = '<em class="search-keyword">$&</em>';
      const emphasized = sliced.replace(regex, replcace);
      return this.sanitize(emphasized) + '...';
    }

    // Returns scliced content if no keyword matched
    return stripped.slice(0, 150) + '...';
  }
  /**
   * Sanitize content
   */
  sanitize(content: string): string {
    const sanitized = sanitizeHTML(content, {
      allowedTags: ['em'],
      allowedAttributes: { em: ['class'] },
    });
    return sanitized;
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
  +screen-width-less-than(sm)
    padding  0 16px 12px 16px
  #search-form
    padding 0
    >>> .v-input__icon .v-icon
      font-size 18px
  #search-result
    padding 0
    height 500px
    overflow hidden
    #search-result-stats
      margin-bottom 12px
      font-size 12px
      font-weight 500
      color var(--v-secondary-darken3)
    #search-result-list
      padding 0
      max-height 100%
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
            text-decoration underline
            &:last-child
              margin-right 0
            &:hover
              color var(--v-accent-base)
        &-content
          font-size 14px
          >>> .search-keyword
            padding 1px 4px 1px 2px
            font-size 0.9em
            font-weight 500
            color var(--v-accent-base)
            background-color var(--v-secondary-lighten1)
</style>
