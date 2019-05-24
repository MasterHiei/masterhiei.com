<template lang="pug">
  v-layout(class="section" justify-center wrap)
    // Chart
    v-flex(
      tag="section"
      class="section-item"
      md6
      xs11
      wrap
    )
      v-card(class="tag-card")
        // Title
        v-flex(class="tag-card-title" wrap)
          v-icon(size="26") fas fa-tags
          | {{ $t('tag.title') }}

        // Tags
        v-flex(class="tag-card-content" warp)
          v-badge(
            v-for="(tag, index) in tags"
            :key="index"
            color="accent lighten-1"
          )
            template(v-slot:badge)
              span {{ tag.value }}
            v-chip(
              class="tag-label elevation-3"
              :color="randomColor()"
              label
              @click="transiTo(tag.name)"
            )
              | {{ tag.name }}

      v-card(class="tag-chart-card")
        the-bar(:data="tags")
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';
import sample from 'lodash/sample';

@Component({
  components: {
    TheBar: () => import('@/components/chart/TheBar.vue'),
  },

  // Hooks
  async asyncData({ $axios }) {
    const { tags } = await $axios.$get('/tags');
    return { tags };
  },

  // Transition animation
  transition: {
    enterActiveClass: 'animated slideInLeft',
    leaveActiveClass: 'animated slideOutRight',
  },
})
export default class TagsPage extends Vue {
  // Data
  tags = [];

  // Methods

  /**
   * Return a random vuetify color
   */
  randomColor(): string {
    const platte = [
      'red',
      'pink',
      'purple',
      'deep-purple',
      'indigo',
      'blue',
      'light-blue',
      'cyan',
      'teal',
      'green',
      'light-green',
      'lime',
      'yellow',
      'amber',
      'orange',
      'deep-orange',
    ];
    return `${sample(platte)} lighten-4`;
  }

  /**
   * Transition to tag page
   */
  transiTo(tag): void {
    this.$router.push(
      this.localePath({ name: 'tags-tag', params: { tag: tag } })
    );
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.section
  margin-top 48px
  &-item
    margin-bottom 30px
    // Tag card
    .tag-card
      padding 30px
      margin-bottom 60px
      &-title
        font-size 28px
        font-weight 700
        text-align center
        margin-bottom 8px
        .v-icon
          color var(--v-primary-base)
          margin 0 8px 4px 0
      &-content
        text-align center
        padding 8px 30px
        @media (max-width $grid-breakpoints.sm)
          padding 12px 0
        .tag-label
          font-size 1rem
          margin 10px
          transition .3s
          &:hover
            color #FFF !important
            background var(--v-accent-base) !important
          &>>>.v-chip__content
            cursor pointer
        .v-badge
          &>>>.v-badge__badge
            top 2px
            right 2px

    // Chart card
    .tag-chart-card
      padding 30px
</style>
