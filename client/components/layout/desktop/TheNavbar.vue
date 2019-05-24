<template lang="pug">
  v-toolbar-items
    // Pages
    v-toolbar-items(
      v-for="(page, index) in pages"
      :key="index"
    )
      v-btn(
        active-class=""
        class="toolbar-item-link"
        :class="didScroll ? 'button-sticky' : 'button-transparent'"
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
          :class="didScroll ? 'button-sticky' : 'button-transparent'"
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
            nuxt
            exact
            @click="switchLocale(locale.code)"
          )
            v-list-tile-title(class="text-xs-center")
              v-flex(tag="span" class="primary-text body-2")
                | {{ locale.name }}
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';
import { NuxtVueI18n } from 'nuxt-i18n/types/vue';

@Component
export default class TheHeader extends Vue {
  // Props
  @Prop({ type: Boolean, required: true }) readonly didScroll!: boolean;
  @Prop({ type: Array, required: true }) readonly pages!: object[];
  @Prop({ type: Array, required: true })
  readonly locales!: (string | NuxtVueI18n.Options.LocaleObject)[];

  // Methods

  /**
   * Switch locale
   */
  switchLocale(locale: string): void {
    this.$i18n.setLocaleCookie(locale);
    console.log(this.switchLocalePath(locale));
    this.$router.replace(this.switchLocalePath(locale));
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.button-transparent
  color var(--v-secondary-base)
  &>>>.v-btn__content::after
    background-color var(--v-secondary-base) !important

.button-sticky
  color var(--v-primary-base)

.toolbar-item-link
  &>>>.v-btn__content
    &::after
      content ''
      position absolute
      left 0
      bottom -10px
      width 100%
      height 3px
      border-radius 1.5px
      background-color var(--v-accent-base)
      transform scaleX(0)
      transform-origin center top
      transition transform .3s
  &:hover>>>.v-btn__content::after
    transform scaleX(1)
</style>
