<template lang="pug">
v-dialog(v-model="contact" persistent)
  v-card
    v-card-title
      span.headline Kontakt
    v-card-text
      v-col(cols="12")
        v-text-field(label="Name", required)
      v-col(cols="12")
        v-text-field(label="Email", required)
      v-col(cols="12")
        v-textarea(label="Message", type="text", required)
    v-card-actions
      v-spacer
      v-btn(color="red" @click="closeContact")
        | Close
      v-btn(color="gray" @click="closeContact")
        | Save
</template>

<script>
export default {
  computed: {
    contact: function () {
      return this.$store.state.modals.contact
    }
  },
  methods: {
    closeContact () {
      this.$store.dispatch('toggleModal', 'contact')
    }
  }
}
</script>

<style lang="stylus">
.v-dialog
  max-width 600px
  margin 0
  .v-card
    &__actions
      padding 20px 36px
</style>
