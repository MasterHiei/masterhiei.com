<template>
  <v-flex pa-0 wrap>
    <v-flex class="article-title font-weight-bold" px-0 wrap>
      {{ article.title }}
    </v-flex>
    <v-flex wrap>
      <v-flex d-inline pl-0 wrap>
        <v-chip color="white" text-color="grey darken-1" small outline disabled>
          <v-avatar>
            <v-icon color="success">
              fas fa-clock
            </v-icon>
          </v-avatar>
          {{ distanceToNow(article.created_at) }}
        </v-chip>
      </v-flex>
      <v-flex d-inline wrap>
        <v-chip color="white" text-color="grey darken-1" small outline disabled>
          <v-avatar>
            <v-icon color="success ">
              fas fa-comments
            </v-icon>
          </v-avatar>
          {{ $t('article.comments', { number: article.comments.length }) }}
        </v-chip>
      </v-flex>
    </v-flex>
    <v-flex pa-0>
      <v-flex
        ref="contentContainer"
        class="subheading font-weight-regular overflow-y-hidden"
        :class="{ 'content-hidden': showCover }"
        px-0
        warp
      >
        {{ article.content }}

        <div v-show="showCover" class="cover-view" />
      </v-flex>
    </v-flex>
    <v-flex wrap>
      <v-btn
        class="read-more-btn subheading font-weight-bold ma-0"
        block
        depressed
        color="success"
        dark
        :to="localePath({ name: 'articles-id', params: { id: article.id } })"
        nuxt
        extra
      >
        {{ $t('article.readMore') }}
      </v-btn>
    </v-flex>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { distanceInWordsToNow } from 'date-fns';
import zh_cn from 'date-fns/locale/zh_cn';
import ja from 'date-fns/locale/ja';

@Component
export default class ArticleListItem extends Vue {
  // Props
  @Prop({ type: Object, required: true })
  readonly article!: Record<string, string>;

  // Data
  showCover = false;

  // Computed
  get locales() {
    return {
      'zh-CN': zh_cn,
      'ja-JP': ja,
    };
  }

  // Hooks
  mounted() {
    // Show cover if element height exceeds limit
    const element = this.$refs.contentContainer;
    if (!(element instanceof Element)) {
      return;
    }
    const height = element.clientHeight;
    if (height > 480) {
      this.showCover = true;
    }
  }

  // Methods
  distanceToNow(date: string): string {
    return distanceInWordsToNow(date, {
      addSuffix: true,
      locale: this.locales[this.$i18n.locale],
    });
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.article-title
  font-size 2.5rem
.content-hidden
  position relative
  max-height 480px
  z-index 99
.cover-view
  height 100%
  width 100%
  position absolute
  top 0
  left 0
  z-index 100
  background -webkit-linear-gradient(rgba(255, 255, 255, 0), rgba(250, 250, 250, 0.97))
  background -moz-linear-gradient(rgba(255, 255, 255, 0), rgba(250, 250, 250, 0.97))
  background -o-linear-gradient(rgba(255, 255, 255, 0), rgba(250, 250, 250, 0.97))
  background linear-gradient(rgba(255, 255, 255, 0), rgba(250, 250, 250, 0.97))
.read-more-btn
  letter-spacing 1px
</style>
