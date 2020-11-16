<template lang="pug">
  v-app.app
    v-main
      c-navigation
      c-reservations
      contact-modal(v-if="contactModal")
      .router-view
        router-view

</template>

<script>
import CNavigation from '@/components/CNavigation.vue'
import CReservations from '@/components/CReservations.vue'
import ContactModal from '@/components/modals/CContactModal.vue'

export default {
  name: 'App',
  components: {
    CNavigation,
    CReservations,
    ContactModal
  },
  data () {
    return {
      contactModal: true
    }
  }
}
</script>

<style lang="stylus">
.app
  max-height 100vh
  overflow hidden
  overflow-y auto
</style>
