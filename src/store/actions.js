import firebase from 'firebase/app'

export const setUser = ({
  commit
}, payload) => {
  commit('setUser', payload)
  return Promise.resolve()
}

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
    })
    Object.keys(stateFiles).forEach(key => {
      if (stateFiles[key].length) {
        const set = {
          location: key,
          value: stateFiles[key]
        }
        commit('setFiles', set)
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
    if (snapshot.val()) {
      Object.values(snapshot.val()).forEach((item, i) => {
        const id = Object.keys(snapshot.val())[i]
        const reservationItem = {
          id,
          date: item.date,
          start: new Date(`${item.date} ${item.start}`),
          end: new Date(`${item.date} ${item.end}`),
          name: item.name,
          phone: item.phone,
          email: item.email,
          color: item.color,
          timed: item.timed
        }
        reservations.push(reservationItem)
      })
    }
  })
  reservations && commit('setReservations', reservations)
  return Promise.resolve()
}

export const fetchArticles = ({
  commit
}) => {
  commit('setArticles', [])
  const articles = []
  firebase.database().ref('articles').on('value', (snapshot) => {
    if (snapshot.val()) {
      Object.values(snapshot.val()).forEach((item, i) => {
        const id = Object.keys(snapshot.val())[i]
        const articleItem = {
          id,
          title: item.title,
          time: item.time,
          image: item.image,
          article: item.article
        }
        articles.push(articleItem)
      })
    }
  })
  articles && commit('setArticles', articles)
  return Promise.resolve()
}
