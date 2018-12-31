<template>
  <v-app>
    <v-toolbar
      class="px-5"
      color="white"
      flat
      fixed
      tabs
    >
      <v-toolbar-title>
        <nuxt-link
          :to="$i18n.path('')"
          active-class="none"
          exact
        >
          Master Hiei
        </nuxt-link>
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
          <span class="font-weight-bold">{{ $t('language') }}</span>
        </v-btn>

        <v-list>
          <v-list-tile v-if="!isLocatedAt('zh-CN')">
            <v-list-tile-title>
              <nuxt-link
                :to="$route.fullPath.replace(/^\/[^\/]+/, '')"
                active-class="selected"
                exact
              >
                简体中文
              </nuxt-link>
            </v-list-tile-title>
          </v-list-tile>

          <v-list-tile v-if="!isLocatedAt('ja-JP')">
            <v-list-tile-title>
              <nuxt-link
                :to="`/ja-JP` + $route.fullPath"
                active-class="selected"
                exact
              >
                日本語
              </nuxt-link>
            </v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn icon>
        <v-icon>fab fa-github</v-icon>
      </v-btn>
    </v-toolbar>

    <nuxt/>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

  export default {
    computed: {
      ...mapGetters(['isLocatedAt'])
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  a
    text-decoration-line none
</style>
