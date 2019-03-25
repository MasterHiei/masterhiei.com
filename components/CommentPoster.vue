<template>
  <v-flex wrap>
    <v-flex v-if="this.$auth.loggedIn" wrap>
      <v-flex my-2 wrap>
        <v-avatar size="44" tile>
          <!-- eslint-disable-next-line vue/html-self-closing -->
          <img
            v-lazy="this.$auth.user.avatar"
            :alt="this.$auth.user.username"
          />
        </v-avatar>

        <v-flex
          class="grey--text text--darken-1 font-weight-medium"
          tag="span"
          pa-0
          ml-3
          style="line-height: 44px;"
        >
          {{ $t('comment.promotion', { name: this.$auth.user.username }) }}
        </v-flex>
      </v-flex>

      <v-flex wrap>
        <the-editor callback="post" @post="post" />
      </v-flex>
    </v-flex>

    <v-flex v-else class="grey lighten-2 text-xs-center" mt-3 py-4 wrap>
      <v-flex wrap>
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

      <v-flex class="grey--text text--darken-1 my-2" d-block tag="span" wrap>
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

  methods: {
    async post(content) {
      await this.$axios.$post('/comments', {
        userId: this.$auth.user.id,
        articleId: this.$route.params.id,
        content: content,
      });
      this.$router.go();
    },
  },
};
</script>
