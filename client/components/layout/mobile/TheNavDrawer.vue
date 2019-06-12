<template lang="pug">
  v-navigation-drawer(
    v-model="show"
    temporary
    fixed
    app
  )
    // Avatar
    v-list
      v-list-tile(avatar)
        v-list-tile-avatar
          img(src="https://avatars1.githubusercontent.com/u/20240686?v=4")
        v-list-tile-content
          v-list-tile-title
            | 万物有因必有果，洗洗皆可吃

    v-list(dense)
      v-divider

      // Page link
      v-list-tile(
        v-for="(page, index) in pages"
        :key="index"
        :to="page.path"
        active-class=""
        nuxt
        exact
      )
        v-list-tile-action
          v-icon(color="primary" small)
            | {{ page.icon }}

        v-list-tile-content
          v-list-tile-title
            | {{ page.text }}

      v-divider

      // Locales
      v-list-group(prepend-icon="fas fa-globe")
        template(#activator)
          v-list-tile
            v-list-tile-title
              | {{ $t('link.locale') }}
        v-list-tile(
          v-for="(locale, index) in locales"
          :key="index"
          nuxt
          exact
          @click="switchLocale(locale.code)"
        )
          v-list-tile-action

          v-list-tile-content
            v-list-tile-title
              | {{ locale.name }}

</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator';
import { State } from 'vuex-class';
import { NuxtVueI18n } from 'nuxt-i18n/types/vue';

@Component
export default class TheNavDrawer extends Vue {
  // Props
  @Prop({ type: Array, required: true }) readonly pages!: object[];
  @Prop({ type: Array, required: true }) readonly locales!: (
    | string
    | NuxtVueI18n.Options.LocaleObject)[];

  // Data
  @State showNavDrawer;
  show = false;

  // Methods

  /**
   * Switch locale
   */
  switchLocale(locale: string): void {
    this.$i18n.setLocaleCookie(locale);
    this.$router.replace(this.switchLocalePath(locale));
  }

  // Watch
  @Watch('showNavDrawer')
  onDrawerStateChanged(): void {
    // Open nav drawer when state changed
    this.show = true;
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
>>> .v-list__tile--active
  background-color var(--v-secondary-base)

>>> .v-list__group__header
  .v-list__group__header__prepend-icon, .v-list__group__header__append-icon
    .v-icon::before
      font-size 1.15rem !important
      color var(--v-primary-base)
</style>
