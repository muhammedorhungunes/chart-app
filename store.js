import { createStore } from 'vuex'

// root state object.
// each Vuex instance is just a single state tree.
const state = {
  isLogin: false,
  auth: ''
}

// mutations are operations that actually mutate the state.
// each mutation handler gets the entire state tree as the
// first argument, followed by additional payload arguments.
// mutations must be synchronous and can be recorded by plugins
// for debugging purposes.
const mutations = {
   logout (state) {
    state.isLogin = false
  },
  login (state) {
    state.isLogin = true
  },
  auth (state, {auth}) {
    state.auth = auth
  }
}

// actions are functions that cause side effects and can involve
// asynchronous operations.
const actions = {
  login: ({ commit }) => commit('login'),
  logout: ({ commit }) => commit('logout'),
  auth: ({ commit }, auth) => commit('auth',{ auth: auth }),
}

// getters are functions.
const getters = {
  nowIsLogin: state => state.isLogin,
  getAuth: state => state.auth
}

// A Vuex instance is created by combining the state, mutations, actions,
// and getters.
export default createStore({
  state,
  getters,
  actions,
  mutations
})