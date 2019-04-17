<template>
  <v-flex xs12>
    <v-hover>
      <v-card
        slot-scope="{ hover }"
        class="text-xs-center"
        hover
        height="300"
        :to="localePath({ name: 'articles-id', params: { id: article.id } })"
        nuxt
        extra
      >
        <!-- Title -->
        <v-card-title class="pb-0" primary-title>
          <v-flex tag="h2" pa-0 wrap>
            {{ article.title }}
          </v-flex>
        </v-card-title>

        <!-- Icons -->
        <v-card-actions>
          <v-flex class="caption grey--text text--darken-2" pa-0 mt-1 wrap>
            <v-flex tag="span" mr-2>
              <v-icon class="mr-1" small>
                far fa-calendar-alt
              </v-icon>
              {{ distanceToNow }}
            </v-flex>

            <v-flex tag="span" mr-2>
              <v-icon class="mr-1" small>
                far fa-comment-dots
              </v-icon>
              {{ $t('article.comments', { number: article.comments.length }) }}
            </v-flex>

            <v-flex tag="span" mr-2>
              <v-icon class="mr-1" small>
                far fa-eye
              </v-icon>
              {{ $t('article.views', { number: article.views }) }}
            </v-flex>
          </v-flex>
        </v-card-actions>

        <v-divider class="mx-5 my-2" />

        <!-- Content -->
        <v-card-text class="pt-3">
          <v-flex tag="span">
            {{ summary }}
          </v-flex>
        </v-card-text>

        <!-- Read more button -->
        <v-scroll-x-transition>
          <v-btn
            v-show="hover"
            class="body-1 font-weight-light mt-4"
            color="purple lighten-1"
            round
            depressed
            dark
          >
            <v-icon class="mr-1" size="15">
              fas fa-book-reader
            </v-icon>
            {{ $t('article.readMore') }}
          </v-btn>
        </v-scroll-x-transition>
      </v-card>
    </v-hover>
  </v-flex>
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
