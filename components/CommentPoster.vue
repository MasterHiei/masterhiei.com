<template>
  <v-flex wrap>
    <v-flex v-if="this.$auth.loggedIn" wrap>
      Post a comment
    </v-flex>

    <v-flex v-else class="grey lighten-3 text-xs-center" py-4 wrap>
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

      <v-flex class="blue-grey--text" tag="span" wrap>
        {{ $t('auth.loginPromotion') }}
      </v-flex>
    </v-flex>
  </v-flex>
</template>

<script>
export default {};
</script>
