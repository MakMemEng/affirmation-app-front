class MyInject {
  constructor (ctx) {
    this.app = ctx.app
  }

  // i18nページタイトル変換
  pageTitle (routeName) {
    // routeName => 'account-settings'
    // jsonPath => 'pages.account.settings'
    const jsonPath = `pages.${routeName.replace(/-/g, '.')}`
    const title = this.app.i18n.t(jsonPath)
    return title
  }

  // 日付のフォーマット変換
  dataFormat (dataStr) {
    const dateTimeFormat = new Intl.DateTimeFormat(
      'ja', { dateStyle: 'medium', timeStyle: 'short' }
    )
    return dateTimeFormat.format(new Date(dataStr))
  }

  // アファメーションリンク
  affirmationLinkTo (id, name = 'affirmation-id-dashboard') {
    return { name, params: { id } }
  }
}

export default ({ app }, inject) => {
  inject('my', new MyInject({ app }))
}
