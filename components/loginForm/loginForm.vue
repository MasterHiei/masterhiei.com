<template>
  <v-flex xs8 sm3>
    <v-flex class="text-xs-center title font-weight-bold" mb-3>
      {{ $t('auth.login') }}
    </v-flex>

    <v-form v-model="valid">
      <v-text-field
        v-model="email"
        class="pb-3"
        color="success"
        :rules="emailRules"
        :label="this.$i18n.t('auth.email')"
        clear-icon="fas fa-times"
        clearable
        autofocus
      />

      <v-text-field
        v-model="password"
        class="pb-3"
        color="success"
        :rules="passwordRules"
        :label="this.$i18n.t('auth.password')"
        :type="visiable ? 'text' : 'password'"
        clear-icon="fas fa-times"
        clearable
        :append-icon="visiable ? 'fas fa-eye-slash' : 'fas fa-eye'"
        @click:append="visiable = !visiable"
      />

      <v-btn
        class="subheading mt-4"
        color="success"
        depressed
        block
        dark
        @click="onSubmit"
      >
        {{ $t('auth.login') }}
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
        v => !!v || this.$i18n.t('errors.auth.email'),
        v => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || this.$i18n.t('errors.auth.email');
        },
      ],
      password: '',
      passwordRules: [v => !!v || this.$i18n.t('errors.auth.password')],
      visiable: false,
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
  font-size 1.4rem
</style>
