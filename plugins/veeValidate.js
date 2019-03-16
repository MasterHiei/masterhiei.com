import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import ja from 'vee-validate/dist/locale/ja';

Vue.use(VeeValidate, { inject: false });

// Using custom rules
Validator.extend('username', {
  validate: value => /^[a-zA-Z0-9_\-. ]{3,12}$/.test(value),
});

Validator.extend('password', {
  validate: value => /^(?=.*?[a-z])(?=.*?\d)[a-z\d_]{8,100}$/i.test(value),
});

// Costomize error messages
const messages = {
  zh_CN: {
    attributes: {
      username: '用户名',
    },
    custom: {
      email: {
        required: () => '请输入有效的邮箱地址',
        email: () => '请输入有效的邮箱地址',
      },
      username: {
        required: () => '请输入有效的用户名',
        username: () => '请输入有效的用户名',
      },
      password: {
        required: () => '请输入有效的用户密码',
        password: () => '请输入有效的用户密码',
      },
    },
  },
  ja: {
    attributes: {
      username: 'ユーザ名',
    },
    custom: {
      email: {
        required: () => 'メールアドレスを入力してください',
        email: () => 'メール アドレスは無効のようです',
      },
      username: {
        required: () => 'ユーザ名を入力してください',
        username: () => '有効なユーザ名を入力してください',
      },
      password: {
        required: () => 'パスワードを入力してください',
        password: () => '有効なパスワードを入力してください',
      },
    },
  },
};
Validator.localize('zh-CN', messages.zh_CN);
Validator.localize('ja-JP', messages.ja);

// Loading default languages for Vee
Validator.localize('zh-CN', zh_CN);
Validator.localize('ja-JP', ja);

export default ({ app }) => {
  //Localizing the app when user refresh or access a localized link
  Validator.localize(app.i18n.locale);

  // Reset Vee localizetion before setting a new locale
  app.i18n.beforeLanguageSwitch = (_, newLocale) => {
    Validator.localize(newLocale);
  };
};
