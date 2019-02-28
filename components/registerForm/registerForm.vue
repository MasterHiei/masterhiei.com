<template>
  <v-flex xs8 sm3>
    <v-flex class="title-lable text-xs-center title font-weight-bold" mb-3>
      {{ $t('auth.register') }}
    </v-flex>

    <v-form ref="form" v-model="valid">
      <v-text-field
        v-model="email"
        class="pb-3"
        color="success"
        :rules="emailRules"
        :label="this.$i18n.t('auth.email')"
        :loading="validating"
        @keyup="validateAfterDelay"
      />

      <v-text-field
        v-model="password"
        class="pb-3"
        color="success"
        :rules="passwordRules"
        :label="this.$i18n.t('auth.password')"
        :type="visiable ? 'text' : 'password'"
        :loading="password.length > 0"
        :append-icon="visiable ? 'fas fa-eye-slash' : 'fas fa-eye'"
        @click:append="visiable = !visiable"
      >
        <v-progress-linear
          slot="progress"
          :value="progress"
          :color="progressColor"
          height="2"
        />
      </v-text-field>

      <v-btn
        class="subheading mt-4"
        color="success"
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
import delay from '@/common/utils/delay.js';
import { validateUser } from '@/api/index.js';

export default {
  data() {
    return {
      valid: false,
      email: '',
      emailPattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      emailRules: [
        v => !!v || this.$i18n.t('errors.auth.email'),
        v => this.emailPattern.test(v) || this.$i18n.t('errors.auth.email'),
      ],
      validating: false,
      validEmail: false,
      password: '',
      passwordPattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      passwordRules: [
        v => !!v || this.$i18n.t('errors.auth.password'),
        v =>
          this.passwordPattern.test(v) || this.$i18n.t('errors.auth.password'),
      ],
      minLength: 6,
      secureLength: 10,
      visiable: false,
    };
  },
  computed: {
    progress() {
      return Math.min(100, (this.password.length / this.secureLength) * 100);
    },
    progressColor() {
      if (
        this.progress < this.minLength * 10 ||
        !this.passwordPattern.test(this.password)
      ) {
        return 'error';
      }
      if (this.progress < this.secureLength * 10) {
        return 'warning';
      }
      return 'success';
    },
  },
  methods: {
    validateAfterDelay() {
      if (!this.emailPattern.test(this.email)) {
        return;
      }
      delay(async () => {
        this.validating = true;
        const { code } = await validateUser(this.email).catch(() => {});
        this.validating = false;
        this.validEmail = code === 0;
      }, 500);
    },
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
