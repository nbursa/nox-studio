<template lang="pug">
.navigation(:style="{left:navToggle ? '0' : '-380px'}" v-click-outside="blurNavigation")
  .flag(@click="toggleNav" :style="flagStyle")
    span.icon(icon)
      v-icon(medium) {{ navToggle ? 'mdi-close' : 'mdi-menu' }}
  nav
    .top
      .top-header
        v-btn.lang(@click="changeLang" small rounded) {{ locale }}
        .links
          v-btn.soc(v-for="item in social" :key="item.id")
            span.icon(icon)
              v-icon(medium) {{ item.icon }}
      router-link.logo(to="/" @click.native="blurNavigation")
        h1 NOX UNDERGROUND STUDIO
        p Adresa, 11070 Novi Beograd
        p +381 99 9999 999
      a.mail(@click="toggleContact")
        span.mail-text nox_studio@noxstudio.com
    .list
      router-link.nav-link(v-for="item in navItems" :key="item.id" :to="item.path" @click.native="toggleNav") {{ item.name }}
      router-link.nav-link(v-if="isAdmin" to="/admin"  @click.native="blurNavigation") ADMIN
      router-link.nav-link.log-btn(v-if="!isLoggedIn" to="/login"  @click.native="blurNavigation") LOGIN
      router-link.nav-link.log-btn(v-if="isLoggedIn" to="" @click.native="logOut(); blurNavigation()") LOGOUT

</template>

<script>
import firebase from 'firebase/app'
import { mapState } from 'vuex'

export default {
  data () {
    return {
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
    ...mapState({
      isLoggedIn: state => state.isLoggedIn,
      isAdmin: state => state.isAdmin
    }),
    locale: function () {
      return this.$vuetify.lang.current
    },
    smallScreen: function () {
      return window.innerWidth < 600
    },
    flagStyle: function () {
      return {
        bottom: this.navToggle && this.smallScreen ? '0 !important' : 'auto'
        // top: this.navToggle ? '0 !important' : 'auto !important',
        // opacity: this.navToggle ? '.5 !important' : '1'
      }
    },
    navItems: function () {
      return [
        { id: 0, path: '/', name: this.$t('navigation', 'home') },
        { id: 1, path: '/blog', name: this.$t('navigation', 'blog') },
        { id: 2, path: '/music', name: this.$t('navigation', 'music') },
        { id: 3, path: '/galery', name: this.$t('navigation', 'galery') },
        { id: 4, path: '/reservations', name: this.$t('navigation', 'reservations') },
        { id: 5, path: '/about', name: this.$t('navigation', 'about') }
      ]
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
    },
    blurNavigation (e) {
      this.navToggle = false
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
  max-width 100vw
  height 100vh
  background-color #1e1e1e
  transition left .25s ease-in-out
  border-right 5px solid #121212
  box-sizing content-box
  z-index 5
  &:hover
    border-right 5px solid transparent
  @media screen and (max-width: 600px)
    .flag
      position fixed !important
      bottom 0 !important
      top auto !important
      left 0 !important
      width 30px !important
      height 20px !important
      background-color #ffffff !important
      border-radius 0 15px 0 0 !important
      justify-content flex-start !important
      z-index 6
      .v-icon
        color #1e1e1e !important
  .flag
    display flex
    align-items center
    justify-content flex-end
    position absolute
    top 10px
    left 380px
    z-index 1
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
    height 100%
    max-height 100vh
    overflow hidden
    overflow-y auto
    &::-webkit-scrollbar
      width 5px
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
      padding 20px 0 100px
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
