import Vue from 'vue'
import App from './App.vue'
// import './registerServiceWorker'
import router from './router'
import store from './store'
import Calendar from 'v-calendar'
import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'
import vuetify from './plugins/vuetify'
import clickOutside from './directives/click-outside'
import golden from './directives/golden'
// import translate from './mixins/translation'
import sr from '@/lang/sr'
import en from './lang/en'

Vue.config.productionTip = false

Vue.use(Calendar, { componentPrefix: 'nox' })
Vue.use(clickOutside)
Vue.use(golden)
// Vue.use(translate)

Vue.mixin({
  methods: {
    $t: function (field, key) {
      if (field && key) {
        return this.$vuetify.lang.current === 'sr'
          ? sr.translations[field][key]
          : en.translations[field][key]
      }
    }
  }
})

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_apiKey,
  authDomain: process.env.VUE_APP_FIREBASE_authDomain,
  databaseURL: process.env.VUE_APP_FIREBASE_databaseURL,
  projectId: process.env.VUE_APP_FIREBASE_projectId,
  storageBucket: process.env.VUE_APP_FIREBASE_storageBucket,
  messagingSenderId: process.env.VUE_APP_FIREBASE_messagingSenderId,
  appId: process.env.VUE_APP_FIREBASE_appId,
  measurementId: process.env.VUE_APP_FIREBASE_measurementId
}

firebase.initializeApp(firebaseConfig)

new Vue({
  router,
  store,
  firebase,
  vuetify,
  render: h => h(App)
}).$mount('#app')
