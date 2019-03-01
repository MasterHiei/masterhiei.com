<template>
  <v-flex xs8 sm3>
    <v-flex class="title-lable text-xs-center title font-weight-bold" mb-3>
      {{ $t('auth.register') }}
    </v-flex>

    <form>
      <v-text-field
        v-model="email"
        v-validate="'required|email'"
        data-vv-name="email"
        class="pb-3"
        color="success"
        :error-messages="errors.first('email')"
        :label="this.$i18n.t('auth.email')"
        :loading="validating"
        required
        @keyup="validateAfterDelay"
      />

      <v-text-field
        v-model="password"
        v-validate="{
          required: true,
          regex: /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
        }"
        data-vv-name="password"
        class="pb-3"
        color="success"
        :error-messages="errors.first('password')"
        :label="this.$i18n.t('auth.password')"
        :type="visiable ? 'text' : 'password'"
        :loading="password.length > 0"
        :append-icon="visiable ? 'fas fa-eye-slash' : 'fas fa-eye'"
        required
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
    </form>
  </v-flex>
</template>

<script>
import md5 from 'crypto-js/md5';
import delay from '@/common/utils/delay.js';
import { validateUser } from '@/api/index.js';

export default {
  $_veeValidate: {
    validator: 'new',
  },

  data() {
    return {
      email: '',
      validating: false,
      validEmail: false,
      password: '',
      visiable: false,
    };
  },

  computed: {
    progress() {
      return Math.min(100, (this.password.length / 12) * 100);
    },
    progressColor() {
      if (this.progress < (8 / 12) * 100 || this.fields.password.invalid) {
        return 'error';
      }
      if (this.progress < 100) {
        return 'warning';
      }
      return 'success';
    },
  },

  methods: {
    validateAfterDelay() {
      if (this.fields.email.invalid) {
        return;
      }
      delay(async () => {
        this.validating = true;
        const { code } = await validateUser(this.email).catch(() => false);
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
