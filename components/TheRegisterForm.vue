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

      <v-tooltip
        v-model="showUsernameTips"
        nudge-top="13"
        nudge-left="4"
        lazy
        left
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="username"
            v-validate="'required|min:3|max:12|username'"
            data-vv-name="username"
            :error-messages="errors.first('username')"
            :label="usernameLabel"
            :loading="validating"
            class="pb-3"
            color="success"
            required
            @focus="showUsernameTips = true"
            @blur="showUsernameTips = false"
          />
        </template>

        <span>{{ $t('auth.usernameTips') }}</span>
      </v-tooltip>

      <v-tooltip
        v-model="showPasswordTips"
        nudge-top="13"
        nudge-left="4"
        lazy
        left
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="password"
            v-validate="'required|password'"
            data-vv-name="password"
            :error-messages="errors.first('password')"
            :label="passwordLabel"
            :type="passwordVisible ? 'text' : 'password'"
            :loading="password.length > 0"
            :append-icon="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"
            class="pb-3"
            color="success"
            required
            @focus="showPasswordTips = true"
            @blur="showPasswordTips = false"
            @keyup.enter="register"
            @click:append="passwordVisible = !passwordVisible"
          >
            <v-progress-linear
              slot="progress"
              :value="progress"
              :color="progressColor"
              height="2"
            />
          </v-text-field>
        </template>

        <span>{{ $t('auth.passwordTips') }}</span>
      </v-tooltip>

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

export default {
  $_veeValidate: {
    validator: 'new',
  },

  data() {
    return {
      email: '',
      validEmail: false,
      username: '',
      showUsernameTips: false,
      usernameLabel: this.$i18n.t('auth.username'),
      password: '',
      showPasswordTips: false,
      passwordLabel: this.$i18n.t('auth.password'),
      passwordVisible: false,
      validating: false,
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
        const { code } = await this.$axios
          .$put('/users/validate', { email: this.email })
          .catch(() => false);
        this.validating = false;
        this.validEmail = code === 0;
      }, 500);
    },

    async register() {
      // User registration
      const valid = await this.$validator.validateAll();
      if (!valid || !this.validEmail) return;
      const { code } = await this.$axios.$post('/users', {
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
