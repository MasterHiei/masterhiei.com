<template>
  <v-flex xs8 sm3>
    <v-flex class="text-xs-center title font-weight-bold" mb-3>
      {{ $t('auth.login') }}
    </v-flex>

    <form>
      <v-text-field
        v-model="email"
        v-validate="'required|email'"
        data-vv-name="email"
        :error-messages="errors.first('email')"
        :label="this.$i18n.t('auth.email')"
        class="pb-3"
        color="success"
        autofocus
        required
      />

      <v-text-field
        v-model="password"
        v-validate="'required'"
        data-vv-name="password"
        :error-messages="errors.first('password')"
        :label="this.$i18n.t('auth.password')"
        :type="visiable ? 'text' : 'password'"
        :append-icon="visiable ? 'fas fa-eye-slash' : 'fas fa-eye'"
        class="pb-3"
        color="success"
        required
        @click:append="visiable = !visiable"
      />

      <v-btn
        class="subheading mt-4"
        color="success"
        depressed
        block
        dark
        @click="login"
      >
        {{ $t('auth.login') }}
      </v-btn>

      <v-btn
        class="subheading text-none mt-4"
        depressed
        block
        dark
        @click="loginWith('github')"
      >
        <v-icon dark left>
          fab fa-github
        </v-icon>
        {{ $t('auth.loginWithGithub') }}
      </v-btn>
    </form>
  </v-flex>
</template>

<script>
import SHA256 from 'crypto-js/sha256';

export default {
  $_veeValidate: {
    validator: 'new',
  },

  data() {
    return {
      email: '',
      password: '',
      visiable: false,
    };
  },

  methods: {
    async login() {
      const valid = await this.$validator.validateAll();
      if (!valid) return;
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: SHA256(this.password).toString(),
        },
      });
    },

    async loginWith(provider) {
      await this.$auth.loginWith(provider);
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
>>>.v-input__icon .v-icon
  font-size 1.4rem
</style>
