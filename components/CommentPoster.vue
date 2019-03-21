<template>
  <v-flex wrap>
    <v-divider class="my-2" />

    <v-flex v-if="this.$auth.loggedIn" wrap>
      <v-flex mb-2 wrap>
        <v-layout row wrap>
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img v-lazy="avatar" :alt="username" height="44" width="44" />

          <v-flex
            class="grey--text text--darken-1 font-weight-medium"
            tag="span"
            pa-0
            ml-3
            style="line-height: 44px;"
          >
            {{ $t('comment.promotion', { name: username }) }}
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex wrap>
        <the-editor />
      </v-flex>
    </v-flex>

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
import TheEditor from '@/components/TheEditor';

export default {
  components: {
    TheEditor,
  },

  computed: {
    username() {
      switch (this.$auth.strategy.name) {
        case 'github':
          return this.$auth.user.name || this.$auth.user.login;
        case 'google':
          return this.$auth.user.displayName;
        default:
          return this.$auth.user.username;
      }
    },

    avatar() {
      switch (this.$auth.strategy.name) {
        case 'github':
          return this.$auth.user.avatar_url;
        case 'google':
          return this.$auth.user.photo.url;
        default:
          return this.$auth.user.avatar;
      }
    },
  },
};
</script>
