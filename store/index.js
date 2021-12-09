const homePath = 'affirmations'

export const state = () => ({
  styles: {
    HomeAppBarHeight: 56
  },
  loggedIn: {
    homePath: {
      name: homePath
    }
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
  }
}
