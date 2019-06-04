export default {
  link: {
    locale: '简体中文',
    index: '首页',
    tags: '标签',
    archives: '归档',
    about: '关于',
  },
  season: {
    spring: '春',
    summer: '夏',
    autumn: '秋',
    winter: '冬',
  },
  loading: {
    noResult: '然而，什么都没有发生。',
    error: '我们计划在下一个补丁中修复这个问题。',
  },
  article: {
    recommend: '推荐文章',
    list: '最新文章',
    views: '阅读 {number}',
    comments: '回复 {number}',
    stars: '点赞 {number}',
  },
  tag: {
    title: '文章标签',
    chart: {
      title: '文章标签统计',
      total: '合计',
      less: '更少',
      more: '更多',
    },
  },
  archives: {
    chart: {
      title: '敬业日历',
      dayLabel: ',一,,三,,五,',
      tooltip: {
        noData:
          '<span style="color: #D7D7D7; font-weight: 300;">{date}</span>我摸了',
        normal:
          '<span style="color: #D7D7D7; font-weight: 300;">{date}</span>发布了{number}篇文章',
      },
      less: '更少',
      more: '更多',
    },
  },
  profile: {
    name: 'L.',
    position: 'iOS & （伪）全栈程序员',
    experience: '经历',
    skill: '技术栈',
  },
  auth: {
    register: '注册',
    registerLink: '这里',
    registerPromotion: '还没有帐号？点击{link}注册吧！',
    login: '登录',
    loginWithGithub: '使用Github账号登录',
    loginWithGoogle: '使用Google账号登录',
    loginPromotion: '知道吗？登录之后就可以留言了哦~',
    logout: '退出',
    email: '邮箱',
    username: '用户名',
    usernameTips: '允许：英文字母、数字、空格、符号（-._）',
    password: '密码',
    passwordTips: '必须：字母和数字，允许：下划线',
  },
  post: '发布',
  dialog: {
    title: '确认',
    agree: '确定',
    cancel: '取消',
  },
  errors: {
    auth: {
      invalid: '邮箱地址或者密码错误',
      existed: '糟糕，该账号已经被注册了',
    },
    failed: '糟糕，系统出现了一些问题，请稍后重试或联系管理员。',
  },
};
