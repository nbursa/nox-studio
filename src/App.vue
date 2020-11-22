<template lang="pug">
  v-app.app
    v-main
      .status(v-if="isAdmin") You are logged in as ADMIN
      c-navigation
      c-reservations
      contact-modal(v-if="contactModal")
      .router-view
        router-view
      c-nox-audio-player

</template>

<script>
import CNavigation from '@/components/CNavigation.vue'
import CReservations from '@/components/CReservations.vue'
import ContactModal from '@/components/modals/CContactModal.vue'
import CNoxAudioPlayer from '@/components/CNoxAudioPlayer.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    CNavigation,
    CReservations,
    ContactModal,
    CNoxAudioPlayer
  },
  data () {
    return {
      contactModal: true
    }
  },
  computed: {
    ...mapGetters(['isAdmin'])
  }
}
</script>

<style lang="stylus">
.app
  position relative
  max-height 100vh
  overflow hidden
  overflow-y auto
  .status
    position absolute
    top 0
    left 0
    width 100%
    height 20px
    z-index 2
    text-align center
    font-size 5px
    font-weight 100
    color yellow

</style>
