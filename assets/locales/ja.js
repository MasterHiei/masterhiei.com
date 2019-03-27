module.exports = {
  links: {
    locale: '日本語',
    index: 'ホーム',
    articles: '記事',
    about: 'このサイトについて',
  },
  article: {
    comments: '{number}件',
    readMore: '続きを読む',
    createdDate: '{date}に作成',
    updatedDate: '{date}に更新',
    views: '閲覧数 {number}',
  },
  auth: {
    register: '登録',
    registerLink: 'こちら',
    registerPromotion: 'アカウントの作成は{link}へ',
    login: 'ログイン',
    loginWithGithub: 'Githubアカウントでログイン',
    loginWithGoogle: 'Googleアカウントでログイン',
    loginPromotion: 'ねぇ、コメントを投稿してみませんか？',
    logout: 'ログアウト',
    email: 'メールアドレス',
    username: 'ユーザ名',
    usernameTips: '可：半角英数字、スペース、記号（-._）',
    password: 'パスワード',
    passwordTips: '必須：半角英数字、可：下線',
  },
  comment: {
    promotion: '{name}さん、コメントを書きましょう！',
    reply: '返信',
    edit: '編集',
    remove: '削除',
  },
  post: '投稿',
  errors: {
    auth: {
      invalid: 'メールアドレスかパスワードが間違っています',
      existed: 'このアカウントが既に存在します',
    },
    failed:
      '何か問題が起こったようです。もう一度お試し、もしくは管理者に連絡してください。',
  },
};
