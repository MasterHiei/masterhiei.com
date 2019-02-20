<template>
  <v-toolbar id="navbar" class="hidden-sm-and-down" height="80" app>
    <v-spacer />

    <v-flex class="text-xs-center" wrap>
      <nuxt-link :to="localePath('index')" extra>
        <!-- prettier-ignore -->
        <img src="~assets/img/logo.jpg" alt="logo">
      </nuxt-link>
    </v-flex>

    <v-flex class="text-xs-center" justify-center wrap>
      <v-btn
        :to="localePath('index')"
        class="subheading font-weight-bold"
        round
        flat
        nuxt
        exact
      >
        {{ $t('links.index') }}
      </v-btn>
      <v-btn
        :to="localePath('articles')"
        class="subheading font-weight-bold"
        round
        flat
        nuxt
        exact
      >
        {{ $t('links.articles') }}
      </v-btn>
      <v-btn
        :to="localePath('about')"
        class="subheading font-weight-bold"
        round
        flat
        nuxt
        exact
      >
        {{ $t('links.about') }}
      </v-btn>
    </v-flex>

    <v-flex class="text-xs-center" wrap>
      <v-menu offset-y transition="slide-y-transition">
        <v-btn slot="activator" flat>
          <v-icon left>
            fas fa-globe
          </v-icon>
          <span class="font-weight-bold subheading">
            {{ $t('links.locale') }}
          </span>
        </v-btn>

        <v-list>
          <v-list-tile
            v-for="locale in locales"
            :key="locale.code"
            :to="switchLocalePath(locale.code)"
            nuxt
            exact
          >
            <v-list-tile-title
              class="text-xs-center font-weight-bold subheading"
            >
              {{ locale.name }}
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn icon href="https://github.com/MasterHiei">
        <v-icon>fab fa-github</v-icon>
      </v-btn>
    </v-flex>

    <v-spacer />
  </v-toolbar>
</template>

<script>
export default {
  computed: {
    locales() {
      return this.$i18n.locales.filter(
        locale => locale.code !== this.$i18n.locale
      );
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
#navbar
  z-index 1000
</style>
