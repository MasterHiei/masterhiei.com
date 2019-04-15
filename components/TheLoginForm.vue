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
        @keyup.enter="login"
        @click:append="visiable = !visiable"
      />

      <i18n class="body-1 flex" path="auth.registerPromotion" tag="span">
        <nuxt-link
          class="green--text"
          :to="localePath('register')"
          place="link"
        >
          {{ $t('auth.registerLink') }}
        </nuxt-link>
      </i18n>

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

      <v-divider class="mt-4" />

      <v-btn
        class="subheading text-none mt-4"
        depressed
        block
        dark
        @click="loginWith('github')"
      >
        <v-icon class="mr-2" dark size="22" left>
          fab fa-github
        </v-icon>
        {{ $t('auth.loginWithGithub') }}
      </v-btn>
    </form>
  </v-flex>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SHA256 from 'crypto-js/sha256';

@Component({
  $_veeValidate: {
    validator: 'new',
  },
})
export default class TheLoginForm extends Vue {
  // Data
  email = '';
  password = '';
  visiable = false;

  // Methods
  async login(): Promise<void> {
    const valid = await this.$validator.validateAll();
    if (!valid) return;
    await this.$auth.loginWith('local', {
      data: {
        email: this.email,
        password: SHA256(this.password).toString(),
      },
    });
  }

  async loginWith(provider: string): Promise<void> {
    await this.$auth.loginWith(provider);
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
>>>.v-input__icon .v-icon
  font-size 1.4rem
  margin-right 4px
</style>
