import Vue from 'vue'
import Vuex from 'vuex'

import * as globalActions from './actions'
import * as globalMutations from './mutations'
import * as globalGetters from './getters'

// import files from './modules/files'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isAdmin: false,
    files: {
      audios: [],
      videos: [],
      images: []
    },
    modals: {
      contact: false
    },
    reservations: []
  },
  mutations: globalMutations,
  actions: globalActions,
  getters: globalGetters,
  modules: {}
})
