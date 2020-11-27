import Vue from 'vue'

export const setUser = (state, payload) => {
  state.user = Vue.set(state.user, {}, payload)
}

export const setLoggedIn = (state, payload) => {
  state.isLoggedIn = payload
}

export const setIsAdmin = (state, payload) => {
  state.isAdmin = payload
}

export const toggleModal = (state, payload) => {
  Vue.set(state.modals, payload, !state.modals[payload])
}

export const setFiles = (state, payload) => {
  Vue.set(state.files, payload.location, payload.value)
}

export const setReservations = (state, payload) => {
  state.reservations = payload
}

export const setArticles = (state, payload) => {
  state.articles = payload
}
