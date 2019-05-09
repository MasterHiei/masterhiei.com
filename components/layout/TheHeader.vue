<template lang="pug">
  header(class="header")
    // Nav
    v-flex(class="header-container" pa-0 wrap)
      v-toolbar(
        :class="didScroll ? 'nav-sticky' : 'nav-transparent'"
        class="header-nav hidden-sm-and-down text-xs-center"
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

        // Page transitions
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

        v-toolbar-items
          // Locales
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

        v-spacer

    // Background
    v-flex(class="header-background" :style="bgStyle")
      v-flex(class="header-brand text-xs-center secondary-text" wrap)
        v-flex(tag="h1" class="display-2")
          | Mr_Hiei
        v-flex(tag="h2" class="subheading" mt-4)
          | 万物有因必有果，洗洗皆可吃
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
.header
  margin-bottom 120px
  // Container
  &-container
    height 60px
    // Animation
    .nav-transparent
      position relative !important
      padding 15px 0
      background-color transparent

    .nav-sticky
      background-color white

  // Nav
  &-nav
    transition-property background-color, padding
    transition-duration 0.3s
    transition-timing-function ease-out
    transition-delay 0.1s

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
    top 120px
</style>
