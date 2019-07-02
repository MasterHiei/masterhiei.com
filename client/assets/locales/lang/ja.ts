export default {
  title: {
    index: 'ホーム',
    tags: 'タグ一覧',
    tag: 'タグ: {name}',
    archives: 'アーカイブ',
    about: 'サイト関連',
  },
  menu: {
    locale: '日本語',
    index: 'ホーム',
    tags: 'タグ',
    archives: 'アーカイブ',
    about: 'サイト関連',
  },
  search: {
    title: '検索',
    result: '検索結果：{number}件',
    tags: 'タグ：',
  },
  season: {
    spring: '春',
    summer: '夏',
    autumn: '秋',
    winter: '冬',
  },
  article: {
    list: '新着記事',
    views: '閲覧数 {number}',
    comments: 'コメント {number}',
    toc: '目次',
  },
  tag: {
    title: 'タグ一覧',
    chart: {
      title: 'タグ数（棒グラフ）',
      total: '合計',
      less: '少ない',
      more: '多い',
    },
  },
  archives: {
    chart: {
      title: 'アクティビティカレンダー',
      monthLabel:
        '一月,二月,三月,四月,五月,六月,七月,八月,九月,十月,十一月,十二月',
      dayLabel: ',月,,水,,金,',
      tooltip: {
        noData:
          '<span style="color: #D7D7D7; font-weight: 300;">{date}の</span>記事はありません',
        normal:
          '<span style="color: #D7D7D7; font-weight: 300;">{date}に</span>{number}件の記事があります',
      },
      less: '少ない',
      more: '多い',
    },
  },
  profile: {
    name: 'S.Ryu',
    position: 'iOS & フルスタック（仮）エンジニア',
    experience: '経歴',
    skill: '技術スタック',
    desc2017:
      '企業向け業務管理システムの開発を担当し、小さな挫折を繰り返しながら成長してきた。使用した技術：HTML&CSS、JavaScript、Struts2、Spring framework、Oracle、PostgreSQL等。',
    desc2018:
      'グループの移動のため、Swift/Objective-Cを用いたネイティブアプリの開発に転生した。開発実績：店舗向け販促アプリ、銀行向け口座開設アプリ。使用した技術：RxSwift、PromiseKit、Alamofire、RealmSwift、Firebase、Google Tag Manager等。',
  },
  error: {
    backToHome: 'ホーム画面に戻る',
    internalServer:
      '申し訳ありません、ただいま障害が発生しております。しばらく経ってからお試しください。このページが繰り返し表示される場合はサイト管理者までご連絡ください。',
    notFound:
      'お探しのページが見つかりません。URLが間違っているか、ページが削除された可能性があります。ホーム画面からお探しのページへ移動ください。',
  },
};
