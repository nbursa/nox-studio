<template lang="pug">
.navigation(:style="{left:navToggle ? '0' : '-380px'}")
  .flag(@click="toggleNav")
    span.icon(icon)
      v-icon(large) {{ navToggle ? 'mdi-close' : 'mdi-menu' }}
  nav
    .top
      .top-header
        v-btn.lang(@click="changeLang" small rounded) {{ locale }}
        .links
          v-btn.soc(v-for="item in social" :key="item.id")
            span.icon(icon)
              v-icon(medium) {{ item.icon }}
      router-link.logo(to="/")
        h1 NOX UNDERGROUND STUDIO
        p Adresa, 11070 Novi Beograd
        p +381 99 9999 999
      a.mail(@click="toggleContact")
        span.mail-text nox_studio
        span.mail-text @noxstudio.com
    .list
      router-link.nav-link(v-for="item in navItems" :key="item.id" :to="item.path" @click.native="toggleNav") {{ item.name }}
      router-link.nav-link(v-if="isAdmin" to="/admin") ADMIN
      router-link.nav-link.log-btn(v-if="!isLoggedIn" to="/login") LOGIN
      router-link.nav-link.log-btn(v-if="isLoggedIn" to="" @click.native="logOut") LOGOUT

</template>

<script>
import firebase from 'firebase/app'

export default {
  data () {
    return {
      navItems: [
        { id: 0, path: '/about', name: 'O Nama' },
        { id: 1, path: '/music', name: 'Muzika' },
        { id: 2, path: '/galery', name: 'Galerija' },
        { id: 3, path: '/reservations', name: 'Rezervacije' }
      ],
      navToggle: false,
      social: [
        {
          text: 'Instagram',
          icon: 'mdi-instagram'
        },
        {
          text: 'Facebook',
          icon: 'mdi-facebook'
        },
        {
          text: 'Twitter',
          icon: 'mdi-twitter'
        },
        {
          text: 'LinkedIn',
          icon: 'mdi-linkedin'
        }
      ]
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
  left -380px
  width 380px
  height 100vh
  background-color #1e1e1e
  transition left .25s ease-in-out
  border-right 5px solid #121212
  box-sizing content-box
  z-index 2
  &:hover
    border-right 5px solid transparent
  .flag
    display block
    position absolute
    top 10px
    left 380px
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
      &-header
        .lang
          margin-bottom 20px
          border 1px solid #ffffff
          margin-right 0
          margin-left auto
        .links
          width 100%
          display flex
          justify-content flex-start
          .soc
            padding 0
            display inline-flex
            background-color transparent
            box-shadow none
            min-width 40px
            height 40px
            margin-right 20px
      .mail
        color #ffffff
        transition text-decoration, color .25s ease-in-out
        margin-top 10px
        &:hover
          color darken(#ffffff, 40%)
        &-text
          font-size 8px !important
          display block
          font-weight 100
      .logo
        color #ffffff
        text-decoration none
        &:hover
          color darken(#ffffff, 40%)
        h1
          font-size 25px
          margin 40px 0 10px
        p
          font-weight 100
          line-height 1
          margin-bottom 10px
    .list
      display flex
      flex-direction column
      border-top 1px solid black
      padding 20px 0 0
      .nav-link
        font-size 20px
        font-family: Oswald, serif
        text-transform uppercase
        text-decoration none
        color #ffffff
        margin 10px 0
        transition color .25s ease-in-out
        &:hover
          color darken(#ffffff, 40%)
        &.log-btn
          font-weight 100

</style>
