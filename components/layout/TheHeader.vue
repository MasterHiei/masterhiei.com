<template lang="pug">
  v-toolbar(
    class="hidden-sm-and-down text-xs-center"
    app
  )
    v-spacer

    // Title
    v-toolbar-title
      nuxt-link(:to="localePath('index')" extra)
        img(src="~static/logo.png" alt="logo")

    v-spacer

    // Page transitions
    v-toolbar-items
      // Index
      v-btn(
        class="primary-text"
        active-class=""
        :to="localePath('index')"
        flat
        nuxt
        exact
      )
        v-icon(class="mr-1" small)
          | fas fa-home
        | {{ $t('links.index') }}

      // Archives
      v-btn(
        class="primary-text"
        active-class=""
        :to="localePath('archives')"
        flat
        nuxt
        exact
      )
        v-icon(class="mr-1" small)
          | fas fa-archive
        | {{ $t('links.archives') }}

      // About
      v-btn(
        class="primary-text"
        active-class=""
        :to="localePath('about')"
        flat
        nuxt
        exact
      )
        v-icon(class="mr-1" small)
          | fas fa-portrait
        | {{ $t('links.about') }}

      // Locales
      v-menu(offset-y transition="slide-y-transition")
        v-btn(class="primary-text" slot="activator" flat)
          v-icon(class="mr-1" small)
            | fas fa-globe
          | {{ $t('links.locale') }}

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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NuxtVueI18n } from 'nuxt-i18n/types/vue';

@Component
export default class TheHeader extends Vue {
  // Computed
  get locales(): (string | NuxtVueI18n.Options.LocaleObject)[] {
    return this.$i18n.locales.filter(locale => {
      const localeObject = locale as NuxtVueI18n.Options.LocaleObject;
      return localeObject.code !== this.$i18n.locale;
    });
  }
}
</script>
