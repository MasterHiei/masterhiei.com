<template>
  <v-flex wrap>
    <v-layout v-if="this.$auth.loggedIn" row>
      <v-flex mr-3 wrap>
        <!-- eslint-disable-next-line vue/html-self-closing -->
        <img
          v-lazy="this.$auth.user.avatar"
          :alt="this.$auth.user.username"
          height="44"
          width="44"
        />
      </v-flex>

      <v-flex xs11 wrap>
        asdasdasdsad
      </v-flex>
    </v-layout>

    <v-flex v-else class="grey lighten-2 text-xs-center" py-4 wrap>
      <v-flex mb-2 wrap>
        <v-btn
          class="subheading font-weight-light"
          color="green darken-1"
          depressed
          dark
          :to="localePath('login')"
          nuxt
          exact
        >
          {{ $t('auth.login') }}
        </v-btn>
      </v-flex>

      <v-flex class="grey--text text--darken-1" tag="span" wrap>
        {{ $t('auth.loginPromotion') }}
      </v-flex>
    </v-flex>
  </v-flex>
</template>

<script>
export default {};
</script>
