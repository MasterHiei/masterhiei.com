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
          :label="$t('search.title')"
          prepend-inner-icon="fas fa-search"
          single-line
          color="accent"
          type="search"
        )

      // Search result
      v-card-text#search-result
        // Search result stats
        v-flex#search-result-stats(wrap)
          | {{ $t('search.result', { number: 0 }) }}

        // Search result list
        v-container#search-result-list.scroll-y
          v-layout.list-container(column wrap)
            v-flex.list-item(wrap) 1
            v-flex.list-item(wrap) 2
            v-flex.list-item(wrap) 3
            v-flex.list-item(wrap) 4
            v-flex.list-item(wrap) 5
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'nuxt-property-decorator';
import { State } from 'vuex-class';

@Component
export default class TheSearchDialog extends Vue {
  // Data
  @State showSearchDialog;
  show = false;

  // Watch
  @Watch('showSearchDialog')
  onDialogStateChanged(): void {
    // Show dialog when state changed
    this.show = true;
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
      margin-bottom 12px
      font-size 12px
      font-weight 500
      color var(--v-secondary-darken4)
    #search-result-list
      padding 0
      max-height 480px
      .list-container .list-item
        margin 8px 0
</style>
