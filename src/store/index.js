import Vue from 'vue'
import Vuex from 'vuex'

import * as globalActions from './actions'
import * as globalMutations from './mutations'
import * as globalGetters from './getters'

// import files from './modules/files'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    isLoggedIn: !!localStorage.getItem('nox_jwt'),
    isAdmin: !!localStorage.getItem('nox_user') && JSON.parse(localStorage.getItem('nox_user')).isAdmin === 1,
    files: {
      audio: [],
      video: [],
      image: []
    },
    modals: {
      contact: false
    },
    reservations: [],
    articles: []
  },
  mutations: globalMutations,
  actions: globalActions,
  getters: globalGetters,
  modules: {}
})
