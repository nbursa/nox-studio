<template lang="pug">
  .navigation
    .flag Meni
    nav
      .top
        v-btn.lang(@click="changeLang" small rounded) {{ locale }}
        router-link.logo(to="/")
          h1 NOX UNDERGROUND STUDIO
        a.mail(@click="toggleContact")
          span nox_studio
          br
          span @noxstudio.com
      .list
        router-link.nav-link(v-for="item in navItems" :key="item.id" :to="item.path" @click.native="toggleNav") {{ item.name }}
        router-link.nav-link(v-if="isAdmin" to="/admin") ADMIN
        router-link.nav-link(v-if="!isLoggedIn" to="/login") LOGIN
        router-link.nav-link(v-if="isLoggedIn" to="" @click.native="logOut") LOGOUT

</template>

<script>
import firebase from 'firebase/app'

export default {
  data () {
    return {
      navItems: [
        { id: 0, path: '/about', name: 'O Nama' },
        { id: 1, path: '/music', name: 'Muzika' },
        { id: 2, path: '/galery', name: 'Galerija' }
      ],
      navToggle: false
    }
  },
  computed: {
    locale: function () {
      return this.$vuetify.lang.current
    },
    isLoggedIn: function () {
      return this.$store.state.isLoggedIn
    },
    isAdmin: function () {
      return this.$store.state.isAdmin
    },
    smallScreen: function () {
      return window.innerWidth < 550
    }
  },
  methods: {
    logOut () {
      firebase.auth().signOut().then(() => {
        localStorage.removeItem('nox_user')
        localStorage.removeItem('nox_jwt')
        this.$store.dispatch('setLoggedIn', false)
        this.$store.dispatch('setIsAdmin', false)
        this.$router.push('/')
      }).catch(function (error) {
        console.log('firebase logout error: ', error)
      })
    },
    toggleNav () {
      this.navToggle = !this.navToggle
    },
    toggleContact () {
      this.$store.dispatch('toggleModal', 'contact')
    },
    changeLang () {
      this.$vuetify.lang.current === 'en'
        ? this.$vuetify.lang.current = 'sr'
        : this.$vuetify.lang.current = 'en'
    }
  }
}

</script>

<style scoped lang="stylus">
.navigation
  position fixed
  top 0
  left -200px
  width 200px
  height 100vh
  background-color #1e1e1e
  transition left .25s ease-in-out
  border-right 5px solid #121212
  box-sizing content-box
  z-index 2
  &:hover
    left 0
    border-right 5px solid transparent
  .flag
    display block
    position absolute
    top 10px
    left 200px
    z-index 300
    padding 10px 20px
    cursor pointer
    background-color #1e1e1e
    border-radius 0 15px 15px 0
    text-transform uppercase
    color #ffffff
  nav
    display flex
    flex-direction column
    padding 20px
    .top
      padding 0 0 20px
      .mail
        color #ffffff
        transition text-decoration, color .25s ease-in-out
        &:hover
          text-decoration underline
          color darken(#ffffff, 40%)
      .logo
        color #ffffff
        text-decoration none
        h1
          margin-bottom 20px
      .lang
        margin-bottom 20px
        border 1px solid #ffffff
    .list
      display flex
      flex-direction column
      border-top 1px solid black
      padding 20px 0 0
      .nav-link
        text-transform uppercase
        text-decoration none
        color #ffffff
        margin 10px 0
        transition color .25s ease-in-out
        &:hover
          color darken(#ffffff, 40%)

</style>
