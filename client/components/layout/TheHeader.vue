<template lang="pug">
  header(class="header")
    // Nav
    v-flex(class="header-present" pa-0 wrap)
      v-toolbar(
        :class="didScroll ? 'nav-sticky' : 'nav-transparent'"
        class="header-nav text-xs-center"
        :flat="!didScroll"
        height="60"
        app
      )

        // Mobile navbar
        the-navbar-mobile(
          v-if="$device.isMobile"
          :didScroll="didScroll"
          :pages="pages"
          :locales="locales"
        )

        v-spacer

        // Title
        v-toolbar-title
          n-link(:to="localePath('index')" extra)
            img(src="/logo.png" alt="logo")

        v-spacer

        // Desktop navbar
        the-navbar-desktop(
          v-if="!$device.isMobile"
          :didScroll="didScroll"
          :pages="pages"
          :locales="locales"
        )

        v-spacer

    // Background
    v-flex(class="header-background")
      // Brand
      v-flex(
        class="header-brand text-xs-center secondary-text"
        wrap
      )
        div(class="brand-name display-2")
          span(class="hidden-text") M
          span(class="hidden-text") r
          span(class="hidden-text") _
          span H
          span i
          span(class="hidden-text") e
          span(class="hidden-text") i
          span(class="present-text") !

        div(class="brand-motto subheading")
          span(class="hidden-text") 万
          span(class="hidden-text") 物
          span(class="hidden-text") 有
          span(class="hidden-text") 因
          span(class="hidden-text") 必
          span(class="hidden-text") 有
          span(class="hidden-text") 果
          span(class="hidden-text") ，
          span(class="hidden-text") 洗
          span(class="hidden-text") 洗
          span(class="hidden-text") 皆
          span(class="hidden-text") 可
          span(class="hidden-text") 吃
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { NuxtVueI18n } from 'nuxt-i18n/types/vue';

@Component({
  components: {
    TheNavbarMobile: () => import('./mobile/TheNavbar.vue'),
    TheNavbarDesktop: () => import('./desktop/TheNavbar.vue'),
  },
})
export default class TheHeader extends Vue {
  // Props
  @Prop({ type: Boolean, required: true }) readonly didScroll!: boolean;

  // Computed

  /**
   * Background color
   */
  get color(): string {
    return this.didScroll ? 'white' : 'transparent';
  }

  /**
   * Pages
   */
  get pages(): object[] {
    return [
      {
        path: this.localePath('index'),
        icon: 'fas fa-home',
        text: this.$i18n.t('link.index'),
      },
      {
        path: this.localePath('tags'),
        icon: 'fas fa-tags',
        text: this.$i18n.t('link.tags'),
      },
      {
        path: this.localePath('archives'),
        icon: 'fas fa-archive',
        text: this.$i18n.t('link.archives'),
      },
      {
        path: this.localePath('about'),
        icon: 'fas fa-portrait',
        text: this.$i18n.t('link.about'),
      },
    ];
  }

  /**
   * Global locale
   */
  get locales(): (string | NuxtVueI18n.Options.LocaleObject)[] {
    return this.$i18n.locales.filter(locale => {
      if (typeof locale !== 'string') {
        return locale.code !== this.$i18n.locale;
      } else {
        return locale !== this.$i18n.locale;
      }
    });
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
$mb = 120px

.header
  margin-bottom $mb
  // Container
  &-present
    height 60px
    // Animation
    .nav-transparent
      position relative !important
      padding 15px 0
      background-color transparent
    .nav-sticky
      background-color white

    // Nav
    .header-nav
      transition-property background-color, padding
      transition-duration .3s
      transition-timing-function ease-out
      transition-delay .1s

  // Background
  &-background
    height 360px
    position absolute
    top 0
    left 0
    right 0
    background-image url('/sites/upload/cover-3.jpg')
    background-repeat no-repeat
    background-size cover
    background-position center center
    &::before
      content ''
      width 100%
      height 100%
      position absolute
      top 0
      left 0

  // Brand
  &-brand
    position relative
    top $mb
    max-width 360px
    margin 0 auto

    .brand-name, .brand-motto
      display flex
      justify-content center

    .brand-motto
      margin-top $spacer * 1.5

    .hidden-text
      max-width 0
      opacity 0
      transition .5s ease-in

    &:hover .hidden-text
      max-width 1em
      opacity 1
    &:hover .present-text
      max-width 0
      opacity 0
</style>
