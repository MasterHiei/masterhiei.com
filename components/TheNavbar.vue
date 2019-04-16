<template>
  <v-toolbar
    id="navbar"
    class="hidden-sm-and-down text-xs-center"
    height="80"
    app
  >
    <v-spacer />

    <v-flex wrap>
      <nuxt-link :to="localePath('index')" extra>
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img src="~static/logo.png" alt="logo" />
      </nuxt-link>
    </v-flex>

    <v-flex justify-center wrap>
      <v-btn :to="localePath('index')" class="subheading" round flat nuxt exact>
        {{ $t('links.index') }}
      </v-btn>
      <v-btn
        :to="localePath('articles')"
        class="subheading"
        round
        flat
        nuxt
        exact
      >
        {{ $t('links.articles') }}
      </v-btn>
      <v-btn :to="localePath('about')" class="subheading" round flat nuxt exact>
        {{ $t('links.about') }}
      </v-btn>
    </v-flex>

    <v-flex wrap>
      <v-menu offset-y transition="slide-y-transition">
        <v-btn slot="activator" class="subheading" flat>
          <v-icon left>
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
            <v-list-tile-title class="text-xs-center subheading">
              {{ locale.name }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn
        v-show="!this.$auth.loggedIn"
        class="subheading"
        active-class=""
        :to="localePath('login')"
        color="success"
        round
        outline
        nuxt
        exact
      >
        {{ $t('auth.login') }}
      </v-btn>

      <v-btn
        v-show="this.$auth.loggedIn"
        class="subheading"
        active-class=""
        outline
        @click="logout"
      >
        {{ $t('auth.logout') }}
      </v-btn>
    </v-flex>

    <v-spacer />
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
