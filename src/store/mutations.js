export const setLoggedIn = (state, payload) => {
  state.isLoggedIn = payload
}

export const setIsAdmin = (state, payload) => {
  state.isAdmin = payload
}

export const toggleModal = (state, payload) => {
  const stateModals = state.modals
  stateModals[payload] = !stateModals[payload]
}

export const setFiles = (state, payload) => {
  state.files[payload.location] = payload.value
}

export const setReservations = (state, payload) => {
  state.reservations = payload
}
