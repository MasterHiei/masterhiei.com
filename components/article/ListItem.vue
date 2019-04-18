<template lang="pug">
  v-flex(xs12)
    v-hover
      v-card(
        slot-scope="{ hover }"
        hover
        height="300"
        :to="localePath({ name: 'articles-id', params: { id: article.id } })"
        nuxt
        extra
      )
        // Title
        v-card-title(class="pb-0" primary-title)
          v-flex(
            tag="h1"
            class="headline font-weight-bold grey--text text--darken-3"
          )
            | {{ article.title }}

        // Icons
        v-card-actions
          v-flex(class="caption grey--text text--darken-2" wrap)
            v-flex(tag="span" mr-2)
              v-icon(class="mr-1" small)
                | far fa-calendar-alt
              | {{ distanceToNow }}

            v-flex(tag="span" mr-2)
              v-icon(class="mr-1" small)
                | far fa-comment-dots
              | {{ $t('article.comments', { number: article.comments.length }) }}

            v-flex(tag="span" mr-2)
              v-icon(class="mr-1" small)
                | far fa-eye
              | {{ $t('article.views', { number: article.views }) }}

        v-divider(class="mx-5 mt-1")

        // Contents
        v-card-text(class="pt-3")
          v-flex(tag="span") {{ summary }}

        // Read more button
        v-scroll-x-transition
          v-btn(
            v-show="hover"
            class="body-1 font-weight-light"
            color="purple lighten-1"
            round
            depressed
            dark
            style="position: absolute; bottom: 6%; left: 34%;"
          )
            v-icon(class="mr-1" size="15")
              | fas fa-book-reader
            | {{ $t('article.readMore') }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { distanceInWordsToNow } from 'date-fns';
import zh_cn from 'date-fns/locale/zh_cn';
import ja from 'date-fns/locale/ja';

@Component
export default class ListItem extends Vue {
  // Props
  @Prop({ type: Object, required: true })
  readonly article!: Record<string, string>;

  // Computed
  get locales() {
    return {
      'zh-CN': zh_cn,
      'ja-JP': ja,
    };
  }

  get distanceToNow(): string {
    return distanceInWordsToNow(this.article.created_at, {
      addSuffix: true,
      locale: this.locales[this.$i18n.locale],
    });
  }

  get summary(): string {
    const content = this.article.content;
    if (content.length <= 120) return content;
    return `${this.article.content.slice(0, 120)}...`;
  }
}
</script>
