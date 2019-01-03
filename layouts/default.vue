<template>
  <v-app>
    <v-toolbar
      class="px-5"
      flat
      tabs
      dark
    >
      <v-toolbar-title
        id="toolbar-title"
        class="display-1"
        @click="transTo('/')"
      >
        Master Hiei
      </v-toolbar-title>

      <v-spacer/>

      <v-menu
        open-on-hover
        offset-y
        transition="slide-y-transition"
      >
        <v-btn
          slot="activator"
          flat
        >
          <v-icon left>fas fa-globe</v-icon>
          <span class="font-weight-bold subheading">{{ $t('links.locale') }}</span>
        </v-btn>

        <v-list>
          <v-list-tile v-if="!isLocatedAt('zh-CN')">
            <v-list-tile-title>
              <a @click="change('zh-CN')">简体中文</a>
            </v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-if="!isLocatedAt('ja-JP')">
            <v-list-tile-title>
              <a @click="change('ja-JP')">日本語</a>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn icon>
        <v-icon>fab fa-github</v-icon>
      </v-btn>
    </v-toolbar>

    <v-tabs
      hide-slider
      grow
      centered
      dark
    >
      <v-spacer/>

      <v-tab
        class="subheading"
        nuxt
        to="/"
        exact
      >
        {{ $t('links.home') }}
      </v-tab>
      <v-tab
        class="subheading"
        nuxt
        to="/articles"
        exact
      >
        {{ $t('links.articles') }}
      </v-tab>
      <v-tab
        class="subheading"
        nuxt
        to="/about"
        exact
      >
        {{ $t('links.about') }}
      </v-tab>

      <v-spacer/>
    </v-tabs>

    <nuxt/>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['isLocatedAt'])
    },
    methods: {
      ...mapActions(['changeLocale']),
      change (locale) {
        this.changeLocale(locale)
        this.$i18n.locale = locale
      },
      transTo (path) {
        this.$router.replace(path)
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
