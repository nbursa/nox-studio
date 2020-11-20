import firebase from 'firebase/app'

export const toggleModal = ({
  commit
}, payload) => {
  commit('toggleModal', payload)
  return Promise.resolve()
}

export const setLoggedIn = ({
  commit
}, payload) => {
  commit('setLoggedIn', payload)
  return Promise.resolve()
}

export const setIsAdmin = ({
  commit
}, payload) => {
  commit('setIsAdmin', payload)
  return Promise.resolve()
}

export const fetchData = ({
  commit, state
}, payload) => {
  const stateFiles = {
    audio: [],
    video: [],
    image: []
  }
  // console.log('fetching load', payload)
  commit('setFiles', {
    location: payload,
    value: []
  })
  firebase.database().ref(payload).on('value', (snapshot) => {
    Object.values(snapshot.val()).forEach((item, i) => {
      const id = Object.keys(snapshot.val())[i]
      const fileItem = {
        id,
        name: item.name,
        url: item.url
      }
      stateFiles[payload].push(fileItem)
      // console.log('statfilese: ', stateFiles)
    })
    Object.keys(stateFiles).forEach(key => {
      if (stateFiles[key].length) {
        const set = {
          location: key,
          value: stateFiles[key]
        }
        // console.log('set: ', set)
        commit('setFiles', set)
        // console.log('state: ', state.files)
      }
    })
  })
  return Promise.resolve()
}

export const fetchReservations = ({
  commit
}) => {
  commit('setReservations', [])
  const reservations = []
  firebase.database().ref('reservations').on('value', (snapshot) => {
    Object.values(snapshot.val()).forEach((item, i) => {
      const id = Object.keys(snapshot.val())[i]
      const reservationItem = {
        id,
        date: item.date,
        start: new Date(`${item.date} ${item.end}`),
        end: new Date(`${item.date} ${item.end}`),
        name: item.name,
        phone: item.phone,
        email: item.email,
        color: item.color,
        timed: item.timed
      }
      reservations.push(reservationItem)
    })
  })
  commit('setReservations', reservations)
  return Promise.resolve()
}
