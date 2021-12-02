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
    list: [
      { id: 1, name: 'MyAffirmation01', updatedAt: '2020-04-01T12:00:00+09:00' },
      { id: 2, name: 'MyAffirmation02 MyAffirmation02MyAffirmation02MyAffirmation02MyAffirmation02MyAffirmation02', updatedAt: '2020-04-05T12:00:00+09:00' },
      { id: 3, name: 'MyAffirmation03', updatedAt: '2020-04-03T12:00:00+09:00' },
      { id: 4, name: 'MyAffirmation04', updatedAt: '2020-04-04T12:00:00+09:00' },
      { id: 5, name: 'MyAffirmation05', updatedAt: '2020-04-01T12:00:00+09:00' }
    ]
  },
  user: {
    current: null
  },
  auth: {
    token: null,
    expires: 0,
    payload: {}
  }
})

export const getters = {}

export const mutations = {
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
  }
}

export const actions = {
  // { state, getters, commit, dispatch, rootState, rootGetters }
  // rootState => ルート(store/index.js)のstateを取得(rootState = state)
  getCurrentAffirmation ({ state, commit }, params) {
    const id = Number(params.id)
    const currentAffirmation =
      state.affirmation.list.find(affirmation => affirmation.id === id) || null
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
  }
}
