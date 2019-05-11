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
        v-spacer

        // Title
        v-toolbar-title
          n-link(:to="localePath('index')" extra)
            img(src="~static/logo.png" alt="logo")

        v-spacer

        v-toolbar-items(v-show="$vuetify.breakpoint.smAndUp")
          // Pages
          v-toolbar-items(
            v-for="(page, index) in pages"
            :key="index"
          )
            v-btn(
              active-class=""
              :class="didScroll ? 'primary-text' : 'secondary-text'"
              :to="page.path"
              flat
              nuxt
              exact
            )
              v-icon(class="mr-1" small)
                | {{ page.icon }}
              | {{ page.text }}

          // Localization
          v-toolbar-items
            v-menu(offset-y transition="slide-y-transition")
              v-btn(
                :class="didScroll ? 'primary-text' : 'secondary-text'"
                slot="activator"
                flat
              )
                v-icon(class="mr-1" small)
                  | fas fa-globe
                | {{ $t('link.locale') }}

              v-list
                v-list-tile(
                  v-for="(locale, index) in locales"
                  :key="index"
                  :to="switchLocalePath(locale.code)"
                  nuxt
                  exact
                )
                  v-list-tile-title(class="text-xs-center")
                    v-flex(tag="span" class="primary-text body-2")
                      | {{ locale.name }}

        // Menu
        v-toolbar-items(v-show="!$vuetify.breakpoint.smAndUp")
          v-btn(flat)
            v-icon(color="secondary" small)
              | fas fa-bars

        v-spacer

    // Background
    v-flex(class="header-background" :style="bgStyle")
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

@Component
export default class TheHeader extends Vue {
  // Props
  @Prop({ type: Boolean, required: true }) readonly didScroll!: boolean;

  // Computed

  /**
   * Background image
   */
  get bgStyle(): string {
    return `background-image:\
    url(${process.env.DOMAIN}/public/sites/default/cover-3.jpg);\
    height:${this.height}px`;
  }

  /**
   * Background color
   */
  get color(): string {
    return this.didScroll ? 'white' : 'transparent';
  }

  /**
   * Background height
   */
  get height(): number {
    const name = this.$route.name || '';
    const isIndex = name.includes('index');
    return isIndex ? 720 : 360;
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
      const localeObject = locale as NuxtVueI18n.Options.LocaleObject;
      return localeObject.code !== this.$i18n.locale;
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
    position absolute
    top 0
    left 0
    right 0
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
