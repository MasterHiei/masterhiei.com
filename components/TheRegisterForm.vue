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
        :error-messages="errors.first('email')"
        :label="this.$i18n.t('auth.email')"
        :loading="validating"
        class="pb-3"
        color="success"
        required
        @keyup="validateAfterDelay"
      />

      <v-text-field
        v-model="username"
        v-validate="'required|alpha_dash|max:12'"
        data-vv-name="username"
        :error-messages="errors.first('username')"
        :label="this.$i18n.t('auth.username')"
        :loading="validating"
        class="pb-3"
        color="success"
        required
      />

      <v-text-field
        v-model="password"
        v-validate="'required|password'"
        data-vv-name="password"
        :error-messages="errors.first('password')"
        :label="this.$i18n.t('auth.password')"
        :type="visiable ? 'text' : 'password'"
        :loading="password.length > 0"
        :append-icon="visiable ? 'fas fa-eye-slash' : 'fas fa-eye'"
        class="pb-3"
        color="success"
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
        @click="register"
      >
        {{ $t('auth.register') }}
      </v-btn>
    </form>
  </v-flex>
</template>

<script>
import SHA256 from 'crypto-js/sha256';
import delay from '@/common/utils/delay.js';
import { validateUser, register } from '@/api/index.js';

export default {
  $_veeValidate: {
    validator: 'new',
  },

  data() {
    return {
      email: '',
      username: '',
      password: '',
      validating: false,
      validEmail: false,
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
      // TODO: Add a button to send email validation code
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

    async register() {
      // User registration
      const valid = await this.$validator.validateAll();
      if (!valid || !this.validEmail) return;
      const { code } = await register({
        email: this.email,
        username: this.username,
        password: SHA256(this.password).toString(),
      });

      // Success
      if (code === 0) {
        await this.$auth.loginWith('local', {
          data: {
            email: this.email,
            password: SHA256(this.password).toString(),
          },
        });
        return;
      }

      // Failed
      if (code === 400) {
        console.log('Invalid email or password');
      } else {
        // TODO: Error handling
        console.log(code);
      }
    },
  },
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
>>>.v-input__icon .v-icon
  font-size 1.4rem
  margin-right 4px
</style>
