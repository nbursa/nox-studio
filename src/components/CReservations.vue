<template lang="pug">
  .reservations-sidebar(:style="{right:navToggle ? '0' : '-380px'}")
    .flag(@click="toggleNav")
      span.icon(icon)
        v-icon(large) {{ navToggle ? 'mdi-close' : 'mdi-calendar' }}
    .reservations
      h1.page-title REZERVACIJA
      validation-observer(ref="observer" v-slot="{ invalid }")
        v-form(@submit.prevent="send")
          h2 Ime
          .form-field-input
            validation-provider(v-slot="{errors}" rules="required|min:3" name="Ime")
              v-text-field(v-model="form.name" label="Ime" :error-messages="errors" required)
          h2 Kontakt
          .form-field-input
            validation-provider(v-slot="{errors}" rules="required|numeric|min:9" name="Telefon")
              v-text-field(v-if="select === 'phone'" v-model="form.phone" label="Telefon" :error-messages="errors" required)
          h2 Datum
          .form-field
            v-date-picker(
              v-model="form.date"
              color="gray"
              mode="date"
            )
          h2 Pocetak
          .form-field
            v-time-picker(
              v-model="form.start"
              format="24hr"
              mode="time"
              :value="'YYYY-MM-DD hh:mm'"
            )
          h2 Kraj
          .form-field
            v-time-picker(
              v-model="form.end"
              format="24hr"
              mode="time"
              :value="'YYYY-MM-DD hh:mm'"
            )
          .submit
            v-btn(@click="send" type="submit" :disabled="invalid") Rezervisi

</template>

<script>
import { required, numeric, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import firebase from 'firebase/app'

setInteractionMode('aggressive')

extend('required', {
  ...required,
  message: '{_field_} can not be empty'
})

extend('min', {
  ...min,
  message: '{_field_} may not be less than {length} characters'
})

extend('numeric', {
  ...numeric,
  message: '{_field_} can contain only numbers'
})

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data () {
    return {
      invalid: true,
      contactType: ['phone', 'email'],
      select: 'phone',
      form: {
        name: '',
        email: '',
        phone: '',
        date: new Date().toISOString().substr(0, 10),
        start: new Date(),
        end: new Date(),
        color: 'gray',
        timed: true
      },
      navToggle: false
    }
  },
  methods: {
    toggleNav () {
      this.navToggle = !this.navToggle
    },
    resetForm () {
      this.form = {
        name: '',
        email: '',
        phone: '',
        date: new Date().toISOString().substr(0, 10),
        start: new Date(),
        end: new Date(),
        color: 'gray',
        timed: true
      }
    },
    send () {
      firebase
        .database()
        .ref(`reservations/${this.form.date}-${this.form.start}-${this.form.end}`)
        .set(this.form)
        .then(this.resetForm())
    }
  }
}
</script>

<style lang="stylus">
  .reservations-sidebar
    position fixed
    top 0
    right 420px
    height 100vh
    width 380px
    background-color #1e1e1e
    transition right .25s ease-in-out
    border-left 5px solid #121212
    box-sizing content-box
    z-index 2
    &:hover
      border-left 5px solid transparent
    .reservations
      max-height 100vh
      overflow-x hidden
      overflow-y auto
      padding 20px
      .form-field-input
        padding-left 20px
    .flag
      display flex
      align-items center
      justify-content space-between
      position absolute
      top 10px
      right 380px
      z-index 300
      padding 10px 20px
      cursor pointer
      background-color #1e1e1e
      border-radius 15px 0 0 15px
      text-transform uppercase
      color #ffffff
      .text
        margin-left 10px
    .page-title
      font-weight bold
      margin-bottom 20px
      position relative
    .v-picker
      &--date
        padding 0
        margin-bottom 20px
        .v-date-picker-title
          &__date
            font-size 30px
        .v-picker__body
          width 100% !important
          .v-date-picker-table
            .v-btn
              font-size 1.2rem
              height 38px
              margin-bottom 0
      &--time
        margin-bottom 20px
        .v-picker__body
          width 100% !important
          background none
        .v-picker__title
          padding 0
          .v-time-picker-title
            justify-content center
            padding 0
            .v-picker__title__btn
              font-size 2rem
            span
              font-size 2rem
    .submit
      .v-btn
        display inline-block
        margin 0 0 100px
        height 50px
        width 100%
        font-size 1rem
        padding 0

</style>
