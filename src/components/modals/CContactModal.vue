<template lang="pug">
v-dialog(v-model="contact", persistent)
  .card
    validation-observer(ref="observer" v-slot="{ invalid }")
      v-form(@submit.prevent="send")
        .card-header
          span.headline Kontakt
          button.close-btn(@click="closeContact")
        .card-body
          .col
            validation-provider(v-slot="{errors}" rules="required|min:3" name="Name")
              v-text-field(v-model="form.name" label="Name" :error-messages="errors" required)
          .col
            validation-provider(v-slot="{errors}" rules="required|email" name="Email")
              v-text-field(v-model="form.email" label="Email" :error-messages="errors" required)
          .col
            validation-provider(v-slot="{errors}" rules="required|min:3" name="Message")
              v-textarea(v-model="form.message" label="Message" type="text" rows="3" :error-messages="errors" required)
        .card-footer
          v-btn.send-btn(@click="send" type="submit" :disabled="invalid") Posalji
</template>

<script>
import { mapState, mapActions } from 'vuex'
import sendEmail from '@/modules/nodemailer.js'
import { required, email, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters'
})

extend('email', {
  ...email,
  message: 'Email must be valid'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      invalid: true,
      form: {
        name: '',
        email: '',
        message: ''
      }
    }
  },
  computed: {
    ...mapState({
      contact: state => state.modals.contact
    }),
    formIsReady: function () {
      return !!this.form.name && !!this.form.email && !!this.form.message
    }
  },
  methods: {
    ...mapActions(['toggleModal']),
    closeContact () {
      this.toggleModal('contact')
    },
    reset () {
      this.form = {
        name: '',
        email: '',
        message: ''
      }
      this.$refs.observer.reset()
    },
    send () {
      if (this.formIsReady) {
        this.$refs.observer.validate()
        sendEmail(this.form)
        this.reset()
        this.closeContact()
      }
    }
  }
}
</script>

<style lang="stylus">
.v-dialog
  max-width 500px
  margin 0
  .card
    padding 20px
    background-color #1e1e1e
    &-header
      display flex
      align-items center
      justify-content space-between
      padding 0 20px
      .close-btn
        position relative
        width 20px
        height 20px
        padding 15px
        border-radius 3px
        &:after,
        &:before
          content ''
          display block
          width 2px
          height 20px
          background-color white
          position absolute
          border-radius 1px
        &:after
          top 50%
          left 50%
          transform translate(-50%, -50%) rotate(-45deg)
        &:before
          top 50%
          left 50%
          transform translate(-50%, -50%) rotate(45deg)
    &-footer
      padding 30px 20px 0
      display flex
      align-items center
      justify-content flex-end
      .send-btn
        padding 20px 30px
    &-body
      padding 20px
      .col
        padding 0

</style>
