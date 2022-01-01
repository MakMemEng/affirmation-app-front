const homePath = 'affirmations'

export const state = () => ({
  styles: {
    HomeAppBarHeight: 56
  },
  loggedIn: {
    homePath: {
      name: homePath
    },
    rememberPath: {
      name: homePath,
      params: {}
    },
    // ログイン後アクセス不可ルート一覧
    redirectPaths: [
      'index',
      'signup',
      'login'
    ]
  },
  affirmation: {
    current: null,
    list: []
  },
  user: {
    current: null
  },
  auth: {
    token: null,
    expires: 0,
    payload: {}
  },
  toast: {
    msg: null,
    color: 'error',
    timeout: 4000
  },
  comment: {
    list: []
  }
})

export const getters = {}

export const mutations = {
  setAffirmationList (state, payload) {
    state.affirmation.list = payload
  },
  setCurrentAffirmation (state, payload) {
    state.affirmation.current = payload
  },
  setCurrentUser (state, payload) {
    state.user.current = payload
  },
  setAuthToken (state, payload) {
    state.auth.token = payload
  },
  setAuthExpires (state, payload) {
    state.auth.expires = payload
  },
  setAuthPayload (state, payload) {
    state.auth.payload = payload
  },
  setToast (state, payload) {
    state.toast = payload
  },
  setRememberPath (state, payload) {
    state.loggedIn.rememberPath = payload
  },
  setCommentList (state, payload) {
    state.comment.list = payload
  }
}

export const actions = {
  // { state, getters, commit, dispatch, rootState, rootGetters }
  // rootState => ルート(store/index.js)のstateを取得(rootState = state)
  getAffirmationList ({ commit }, affirmations) {
    affirmations = affirmations || []
    commit('setAffirmationList', affirmations)
  },
  getCurrentAffirmation ({ state, commit }, params) {
    let currentAffirmation = null
    if (params && params.id) {
      const id = Number(params.id)
      currentAffirmation =
        state.affirmation.list.find(affirmation => affirmation.id === id) || null
    }
    commit('setCurrentAffirmation', currentAffirmation)
  },
  getCurrentUser ({ commit }, user) {
    commit('setCurrentUser', user)
  },
  getAuthToken ({ commit }, token) {
    commit('setAuthToken', token)
  },
  getAuthExpires ({ commit }, expires) {
    expires = expires || 0
    commit('setAuthExpires', expires)
  },
  getAuthPayload ({ commit }, jwtPayload) {
    jwtPayload = jwtPayload || {}
    commit('setAuthPayload', jwtPayload)
  },
  getToast ({ commit }, { msg, color, timeout }) {
    color = color || 'error'
    timeout = timeout || '4000'
    commit('setToast', { msg, color, timeout })
  },
  // ログイン前ユーザーがアクセスしたルートを記憶する
  getRememberPath ({ state, commit }, { name, params }) {
    // ログイン前パスが渡された場合はloggedIn.homePathに書き換える
    if (state.loggedIn.redirectPaths.includes(name)) {
      name = state.loggedIn.homePath.name
    }
    params = params || {}
    commit('setRememberPath', { name, params })
  },
  getCommentList ({ commit }, comments) {
    comments = comments || []
    commit('setCommentList', comments)
  }
  // ,
  // getCurrentComment ({ state, commit }, params) {
  //   let currentComment = null
  //   if (params && params.id) {
  //     const id = Number(params.id)
  //     currentComment =
  //       state.affirmation.list.find(affirmation => affirmation.id === id) || null
  //   }
  //   commit('setCurrentComment', currentComment)
  // },
  // getCommentList ({ state, commit }, params) {
  //   comments = comments || []
  //   let commentList = null
  //   if (params && params.id) {
  //     const id = Number(params.id)
  //     commentList =
  //       state.affirmation.find(id).comment.list || null
  //   }
  //   commit('setCommentList', commentList)
  // }
}
