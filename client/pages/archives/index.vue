<template lang="pug">
  v-flex(
    tag="section"
    class="section-item"
    md6
    xs11
    wrap
  )
    // Calendar
    v-card(v-if="$device.isDesktopOrTablet")
      the-calendar(:data="yearMonthDay")

    // Timeline
    v-timeline(align-top dense)
      v-timeline-item(
        v-for="(article, index) in articles"
        :key="index"
        color="accent"
        small
      )
        article-list-item(:article="article")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import dayjs from 'dayjs';
import includes from 'lodash/includes';
import { Article } from '@/models/article';

// Interface declaration
declare interface CreatedMonth {
  id: Article['id'];
  month: number;
}

@Component({
  components: {
    TheCalendar: () => import('@/components/chart/TheCalendar.vue'),
    ArticleListItem: () => import('@/components/article/ListItem.vue'),
  },

  // Hooks
  async asyncData({ $axios }) {
    const { articles, yearMonthDay } = await $axios.$get('/archives');
    return { articles, yearMonthDay };
  },

  // Transition animation
  transition: {
    enterActiveClass: 'animated slideInLeft',
    leaveActiveClass: 'animated slideOutRight',
  },
})
export default class ArchivesPage extends Vue {
  // Data
  articles: Article[] = [];

  // Computed

  /**
   * Article created month list
   */
  get months(): CreatedMonth[] {
    const months: CreatedMonth[] = [];
    this.articles.forEach(
      (article): void => {
        const month = dayjs(article.created_at).month();
        if (!includes(months, { month: month })) {
          months.push({ id: article.id, month: month });
        }
      }
    );
    return months;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.section-item
  margin 48px auto 24px auto
</style>
