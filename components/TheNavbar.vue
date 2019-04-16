<template>
  <!-- Title -->
  <v-toolbar id="navbar" class="hidden-sm-and-down text-xs-center" app>
    <v-toolbar-title>
      <nuxt-link :to="localePath('index')" extra>
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img src="~static/logo.png" alt="logo" />
      </nuxt-link>
    </v-toolbar-title>

    <v-spacer />

    <!-- Page transitions -->
    <v-toolbar-items>
      <v-btn :to="localePath('index')" flat nuxt exact>
        {{ $t('links.index') }}
      </v-btn>

      <v-btn :to="localePath('articles')" flat nuxt exact>
        {{ $t('links.articles') }}
      </v-btn>

      <v-btn :to="localePath('about')" flat nuxt exact>
        {{ $t('links.about') }}
      </v-btn>
    </v-toolbar-items>

    <v-spacer />

    <!-- Tools menu -->
    <v-toolbar-items>
      <v-menu offset-y transition="slide-y-transition">
        <v-btn slot="activator" flat>
          <v-icon dark small left>
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
            <v-list-tile-title class="text-xs-center body-2">
              <span>{{ locale.name }}</span>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn v-if="this.$auth.loggedIn" active-class="" flat @click="logout">
        {{ $t('auth.logout') }}
      </v-btn>

      <v-btn v-else active-class="" :to="localePath('login')" nuxt exact flat>
        {{ $t('auth.login') }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { NuxtVueI18n } from 'nuxt-i18n/types/vue';

@Component
export default class TheNavbar extends Vue {
  // Computed
  get locales(): (string | NuxtVueI18n.Options.LocaleObject)[] {
    return this.$i18n.locales.filter(locale => {
      const localeObject = locale as NuxtVueI18n.Options.LocaleObject;
      return localeObject.code !== this.$i18n.locale;
    });
  }

  // Methods
  async logout(): Promise<void> {
    await this.$auth.logout();
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#navbar
  z-index 1000
</style>
