import Vue from 'vue';
import VeeValidate, { Validator } from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN';
import ja from 'vee-validate/dist/locale/ja';

Vue.use(VeeValidate, { inject: false });

// Costomize error messages
const messages = {
  zh_CN: {
    custom: {
      email: {
        required: () => '请输入一个有效的邮箱地址',
        email: () => '请输入一个有效的邮箱地址',
      },
      password: {
        required: () => '请输入一个有效的用户密码',
        regex: () => '用户密码需要8位以上且含有字母和数字',
      },
    },
  },
  ja: {
    custom: {
      email: {
        required: () => 'メールアドレスを入力してください',
        email: () => 'メール アドレスは無効のようです',
      },
      password: {
        required: () => 'パスワードを入力してください',
        regex: () => '8文字以上の半角英数字を入力してください',
      },
    },
  },
};
Validator.localize('zh_CN', messages.zh_CN);
Validator.localize('ja', messages.ja);

// Loading default languages for Vee
Validator.localize('zh_CN', zh_CN);
Validator.localize('ja', ja);

export default ({ app }) => {
  //Localizing the app when user refresh or access a localized link
  Validator.localize(app.i18n.locale);

  // Reset Vee localizetion before setting a new locale
  app.i18n.beforeLanguageSwitch = (_, newLocale) => {
    Validator.localize(newLocale);
  };
};
