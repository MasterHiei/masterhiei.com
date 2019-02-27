<template>
  <v-flex xs8 sm3>
    <v-flex class="title-lable text-xs-center title font-weight-bold" mb-3>
      {{ $t('auth.register') }}
    </v-flex>

    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="email"
        class="pb-3"
        color="#438945"
        :rules="emailRules"
        :label="this.$i18n.t('auth.email')"
        append-icon="fas fa-check"
      />

      <v-text-field
        v-model="password"
        class="pb-3"
        color="#438945"
        :rules="passwordRules"
        :label="this.$i18n.t('auth.password')"
        type="password"
      />

      <v-btn
        class="subheading mt-4"
        color="#438945"
        depressed
        block
        dark
        @click="onSubmit"
      >
        {{ $t('auth.register') }}
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
  color #438945
</style>
