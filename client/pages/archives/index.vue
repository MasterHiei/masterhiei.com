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
    v-layout(justify-center wrap)
      v-flex(md10 wrap)
        v-timeline(dense)
          // Year
          v-timeline-item(color="accent" large fill-dot)
            template(#icon)
              span.subheading.white--text
                | {{ year }}
            div.py-4

          template(v-for="monthlyArticle in monthlyArticles")
            // Month
            v-timeline-item(color="accent" fill-dot)
              template(#icon)
                span.white--text
                  | {{ monthlyArticle.month }}
              div.py-3

            // Articles
            v-timeline-item(
              v-for="article in monthlyArticle.articles"
              :key="article.id  "
              color="accent"
              small
            )
              v-layout.my-2(justify-center wrap)
                v-flex(md8 wrap)
                  article-list-item(:article="article")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import dayjs from 'dayjs';
import { Article } from '@/models/article';

/**
 * An list include articles created at same month
 * @interface MonthlyArticle
 */
declare interface MonthlyArticle {
  /** Numebr of created month */
  month: string;

  /** Article list */
  articles: Article[];
}

@Component({
  components: {
    TheCalendar: () => import('@/components/ui/chart/TheCalendar.vue'),
    ArticleListItem: () => import('@/components/ui/article/ListItem.vue'),
  },

  // Hooks
  async asyncData({ $axios }) {
    const { articles, yearMonthDay } = await $axios.$get('/archives');
    return { articles, yearMonthDay };
  },

  // Transition animation
  transition: 'page',
})
export default class ArchivesPage extends Vue {
  // Data
  articles: Article[] = [];
  year = dayjs().year();

  // Computed

  /**
   * Article list grouped by created month
   */
  get monthlyArticles(): MonthlyArticle[] {
    const monthlyArticles: MonthlyArticle[] = [];
    const months: number[] = [];
    this.articles.forEach((article): void => {
      const createdAt = dayjs(article.created_at);
      const month = createdAt.month();
      if (months.includes(month)) {
        monthlyArticles[monthlyArticles.length - 1].articles.push(article);
      } else {
        const monthlyArticle: MonthlyArticle = {
          month: this.$i18n.d(createdAt.toDate(), 'month', this.$i18n.locale),
          articles: [article],
        };
        monthlyArticles.push(monthlyArticle);
        months.push(month);
      }
    });
    return monthlyArticles;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.section-item
  margin 48px auto 24px auto
  >>> .v-timeline-item .v-card__text
    .v-card::before, .v-card::after
      display none
</style>
