<template>
  <v-toolbar id="navbar" class="hidden-sm-and-down" height="80" app>
    <v-spacer />

    <v-flex class="text-xs-center" wrap>
      <nuxt-link :to="localePath('index')" extra>
        <!-- prettier-ignore -->
        <img src="~static/logo.jpg" alt="logo">
      </nuxt-link>
    </v-flex>

    <v-flex class="text-xs-center" justify-center wrap>
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

    <v-flex class="text-xs-center" wrap>
      <v-menu offset-y transition="slide-y-transition">
        <v-btn slot="activator" class="subheading" flat>
          <v-icon left>
            fas fa-globe
          </v-icon>
          {{ $t('links.locale') }}
        </v-btn>

        <v-list>
          <v-list-tile
            v-for="locale in locales"
            :key="locale.code"
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
        v-show="!loggedIn"
        class="subheading text"
        active-class=""
        :to="localePath('register')"
        color="green lighten-2"
        round
        depressed
        dark
        nuxt
        exact
      >
        {{ $t('register.message') }}
      </v-btn>

      <v-btn
        v-show="!loggedIn"
        class="subheading"
        active-class=""
        :to="localePath('login')"
        color="green lighten-2"
        round
        outline
        nuxt
        exact
      >
        {{ $t('login.message') }}
      </v-btn>

      <v-btn
        v-show="loggedIn"
        class="subheading"
        active-class=""
        outline
        @click="logout"
      >
        {{ $t('logout.message') }}
      </v-btn>
    </v-flex>

    <v-spacer />
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      loggedIn: this.$store.state.auth.loggedIn,
    };
  },
  computed: {
    locales() {
      return this.$i18n.locales.filter(
        locale => locale.code !== this.$i18n.locale
      );
    },
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#navbar
  z-index 1000
</style>
