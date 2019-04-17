<template>
  <!-- Title -->
  <v-toolbar id="header" class="hidden-sm-and-down text-xs-center" app>
    <v-spacer />

    <v-toolbar-title>
      <nuxt-link :to="localePath('index')" extra>
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img src="~static/logo.png" alt="logo" />
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer />

    <!-- Page transitions -->
    <v-toolbar-items>
      <v-btn
        class="grey--text text--darken-2"
        active-class=""
        :to="localePath('index')"
        flat
        nuxt
        exact
      >
        <v-icon class="mr-1" color="grey darken-2" small>
          fas fa-home
        </v-icon>
        {{ $t('links.index') }}
      </v-btn>

      <v-btn
        class="grey--text text--darken-2"
        active-class=""
        :to="localePath('archives')"
        flat
        nuxt
        exact
      >
        <v-icon class="mr-1" color="grey darken-2" small>
          fas fa-archive
        </v-icon>
        {{ $t('links.archives') }}
      </v-btn>

      <v-btn
        class="grey--text text--darken-2"
        active-class=""
        :to="localePath('about')"
        flat
        nuxt
        exact
      >
        <v-icon class="mr-1" color="grey darken-2" small>
          fas fa-portrait
        </v-icon>
        {{ $t('links.about') }}
      </v-btn>

      <v-menu offset-y transition="slide-y-transition">
        <v-btn slot="activator" class="grey--text text--darken-2" flat>
          <v-icon class="mr-1" color="grey darken-2" small>
            fas fa-globe
          </v-icon>
          {{ $t('links.locale') }}
        </v-btn>

        <v-list>
          <v-list-tile
            v-for="(locale, index) in locales"
            :key="index"
            :to="switchLocalePath(locale.code)"
            nuxt
            exact
          >
            <v-list-tile-title class="text-xs-center grey--text text--darken-2">
              <span>{{ locale.name }}</span>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    <v-spacer />
  </v-toolbar>
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

<style scoped lang="stylus" rel="stylesheet/stylus">
#header
  z-index 1000
*
  font-size 15px
</style>
