<template>
  <div>
    <v-toolbar class="px-5" flat tabs dark>
      <v-toolbar-title
        id="toolbar-title"
        class="display-1"
        @click="toIndex(localePath('index'))"
      >
        Master Hiei
      </v-toolbar-title>

      <v-spacer />

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
            <v-list-tile-title>{{ locale.name }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn icon href="https://github.com/MasterHiei">
        <v-icon>fab fa-github</v-icon>
      </v-btn>
    </v-toolbar>

    <v-tabs hide-slider grow centered dark>
      <v-spacer />

      <v-tab :to="localePath('index')" class="subheading" nuxt exact>
        {{ $t('links.home') }}
      </v-tab>
      <v-tab :to="localePath('articles')" class="subheading" nuxt exact>
        {{ $t('links.articles') }}
      </v-tab>
      <v-tab :to="localePath('about')" class="subheading" nuxt exact>
        {{ $t('links.about') }}
      </v-tab>

      <v-spacer />
    </v-tabs>
  </div>
</template>

<script>
export default {
  computed: {
    locales() {
      return this.$i18n.locales.filter(
        locale => locale.code !== this.$i18n.locale
      )
    }
  },
  methods: {
    toIndex(localePath) {
      this.$router.replace(localePath)
    }
  }
}
</script>

<style scope lang="stylus" rel="stylesheet/stylus">
#toolbar-title
  cursor pointer
.v-tabs__item--active
  font-weight bold
  background-color red
</style>
