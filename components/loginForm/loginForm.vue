<template>
  <v-flex xs8 sm3>
    <p class="text-xs-center title font-weight-bold">
      {{ $t('login.message') }}
    </p>
    <v-form v-model="valid">
      <v-text-field
        v-model="email"
        class="pb-3"
        color="#438945"
        :rules="emailRules"
        :label="this.$i18n.t('login.email')"
        clear-icon="fas fa-times"
        clearable
      />
      <v-text-field
        v-model="password"
        class="pb-3"
        color="#438945"
        :rules="passwordRules"
        :label="this.$i18n.t('login.password')"
        :type="isVisible ? 'text' : 'password'"
        :append-icon="isVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
        clear-icon="fas fa-times"
        clearable
        @click:append="isVisible = !isVisible"
      />
      <v-btn
        class="mt-4"
        color="#438945"
        depressed
        block
        dark
        @click="onSubmit"
      >
        {{ $t('login.message') }}
      </v-btn>
    </v-form>
  </v-flex>
</template>

<script>
import md5 from 'crypto-js/md5';

export default {
  data() {
    return {
      valid: false,
      email: '',
      emailRules: [
        v => !!v || this.$i18n.t('login.errors.email'),
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || this.$i18n.t('login.errors.email');
        },
      ],
      password: '',
      passwordRules: [v => !!v || this.$i18n.t('login.errors.password')],
      isVisible: false,
    };
  },
  methods: {
    async onSubmit() {
      if (!this.valid) return;
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: md5(this.password).toString(),
        },
      });
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
>>>.v-input__icon .v-icon
  font-size 1.5rem
</style>
