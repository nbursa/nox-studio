import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase/app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoggedIn: false,
    isAdmin: false,
    files: {
      audio: [],
      video: [],
      image: []
    },
    modals: {
      contact: false
    }
  },
  mutations: {
    setLoggedIn (state, payload) {
      state.isLoggedIn = payload
    },
    setIsAdmin (state, payload) {
      state.isAdmin = payload
    },
    // saveFile (state, payload) {
    //   state.files[payload.fileType].push(payload.file)
    // },
    toggleModal (state, payload) {
      const stateModals = state.modals
      stateModals[payload] = !stateModals[payload]
    },
    fetchFiles (state, payload) {
      const stateFiles = state.files
      console.log('stateFiles[payload]: ', stateFiles[payload], payload)
      stateFiles[payload].length = 0
      firebase.database().ref(payload).on('value', (snapshot) => {
        Object.values(snapshot.val()).forEach((item, i) => {
          const id = Object.keys(snapshot.val())[i]
          const fileItem = {
            id,
            name: item.name,
            url: item.url
          }
          state.files[payload].push(fileItem)
        })
      })
    }
  },
  actions: {
    setLoggedIn (store, payload) {
      store.commit('setLoggedIn', payload)
    },
    setIsAdmin (store, payload) {
      store.commit('setIsAdmin', payload)
    },
    // saveFile (store, payload) {
    //   const fileType = payload[0].toLowerCase()
    //   const file = payload[1]
    //   const formated = {
    //     fileType, file
    //   }
    //   store.commit('saveFile', formated)
    // },
    toggleModal (store, payload) {
      store.commit('toggleModal', payload)
    },
    fetchData (store, payload) {
      store.commit('fetchFiles', payload)
    }
  },
  getters: {},
  modules: {}
})
