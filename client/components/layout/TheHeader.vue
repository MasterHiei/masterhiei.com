<template lang="pug">
  header.header
    // Mobile nav drawer
    the-nav-drawer(
      v-if="$device.isMobile"
      :pages="pages"
      :locales="locales"
    )

    // Nav
    v-flex(class="header-present" pa-0 wrap)
      v-toolbar(
        :class="didScroll ? 'nav-sticky' : 'nav-transparent'"
        class="header-nav"
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

        // Logo
        v-toolbar-title.header-logo
          n-link(:to="localePath('index')" extra)
            img(src="/logo.png" alt="logo")

        v-spacer

        // Desktop navbar
        the-navbar-desktop(
          v-if="$device.isDesktopOrTablet"
          :didScroll="didScroll"
          :pages="pages"
          :locales="locales"
        )

        v-spacer

    // Background
    div.header-background
      // Brand
      div.header-brand.text-xs-center.secondary-text
        div.brand-name.display-2
          span.hidden-text M
          span.hidden-text r
          span.hidden-text _
          span H
          span i
          span.hidden-text e
          span.hidden-text i
          span.present-text !

        div.brand-motto.subheading
          span.hidden-text 万
          span.hidden-text 物
          span.hidden-text 有
          span.hidden-text 因
          span.hidden-text 必
          span.hidden-text 有
          span.hidden-text 果
          span.hidden-text ，
          span.hidden-text 洗
          span.hidden-text 洗
          span.hidden-text 皆
          span.hidden-text 可
          span.hidden-text 吃
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { NuxtVueI18n } from 'nuxt-i18n/types/vue';

@Component({
  components: {
    TheNavbarMobile: () => import('./mobile/TheNavbar.vue'),
    TheNavbarDesktop: () => import('./desktop/TheNavbar.vue'),
    TheNavDrawer: () => import('@/components/layout/mobile/TheNavDrawer.vue'),
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
        text: this.$i18n.t('menu.index'),
      },
      {
        path: this.localePath('tags'),
        icon: 'fas fa-tags',
        text: this.$i18n.t('menu.tags'),
      },
      {
        path: this.localePath('archives'),
        icon: 'fas fa-archive',
        text: this.$i18n.t('menu.archives'),
      },
      {
        path: this.localePath('about'),
        icon: 'fas fa-portrait',
        text: this.$i18n.t('menu.about'),
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
      text-align center
      transition-property background-color, padding
      transition-duration .3s
      transition-timing-function ease-out
      transition-delay .1s
      .header-logo
        margin 0
      +screen-width-less-than(sm)
        padding 0
        >>> .v-toolbar__content
          padding 0

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
      transition all .5s ease-in

    &:hover .hidden-text
      max-width 1em
      opacity 1
    &:hover .present-text
      max-width 0
      opacity 0
</style>
