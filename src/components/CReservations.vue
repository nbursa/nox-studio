<template lang="pug">
  .reservations-sidebar(:style="{right:navToggle ? '0' : '-380px'}" v-click-outside="blurSidebar")
    .flag(@click="toggleNav" :style="{bottom: navToggle && smallScreen ? '0 !important' : 'auto'}")
      span.icon(icon)
        v-icon(medium) {{ navToggle ? 'mdi-close' : 'mdi-calendar' }}
    .reservations
      h1.page-title REZERVACIJA
      validation-observer(ref="observer" v-slot="{ invalid }")
        v-form
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
              color="primary"
              mode="date"
              :class="{'open-date': toggleDate}"
              @click.native.stop="toggleDatePicker"
              :min="today"
            )
          h2 Pocetak
          .form-field
            v-time-picker(
              v-model="form.start"
              format="24hr"
              mode="time"
              color="primary"
              :value="'YYYY-MM-DD hh:mm'"
              :class="{'open-time': toggleStart}"
              @click.native="toggleStartTime"
              :allowed-hours="allowedStartHours"
              :allowed-minutes="allowedStartMinutes"
              dark
            )
          h2 Kraj
          .form-field
            v-time-picker(
              v-model="form.end"
              format="24hr"
              mode="time"
              color="primary"
              :value="'YYYY-MM-DD hh:mm'"
              :class="{'open-time': toggleEnd}"
              @click.native="toggleEndTime"
              :allowed-minutes="allowedEndMinutes"
            )
          .submit
            v-btn(@click="send" type="submit" :disabled="invalid") Rezervisi

</template>

<script>
import { required, numeric, min } from 'vee-validate/dist/rules'
import { extend, ValidationObserver, ValidationProvider, setInteractionMode } from 'vee-validate'
import firebase from 'firebase/app'
import { mapState } from 'vuex'

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
      form: {},
      navToggle: false,
      toggleDate: false,
      toggleStart: false,
      toggleEnd: false,
      today: new Date().toISOString()
    }
  },
  computed: {
    ...mapState({
      reservations: state => state.reservations
    }),
    smallScreen: function () {
      return window.innerWidth < 600
    },
    allowedStartHours: function () {
      const reservedHours = this.reservations.filter(res => {
        return res.date === this.form.date
      }).map(item => {
        return item.start.getHours()
      })
      return Array.from(Array(24).keys()).filter(item => !reservedHours.includes(item))
    },
    allowedEndHours: function () {
      const reservedHours = this.reservations.filter(res => {
        return res.date === this.form.date
      }).map(item => {
        return item.end.getHours()
      })
      const hours = Array.from(Array(24).keys()).filter(item => !reservedHours.includes(item))
      return hours
    },
    allowedStartMinutes: function () {
      const reservedMinutes = this.reservations.filter(res => {
        return res.date === this.form.date
      }).map(item => {
        return item.start.getMinutes()
      })
      const minutes = Array.from(Array(60).keys()).filter(item => !reservedMinutes.includes(item))
      return minutes
    },
    allowedEndMinutes: function () {
      const minutes = Array.from(Array(60).keys())
      return minutes
    }
  },
  mounted () {
    this.resetForm()
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
        date: new Date().toISOString().split('T')[0],
        start: `${new Date().getHours()}:${new Date().getMinutes()}`,
        end: `${new Date().getHours()}:${new Date().getMinutes()}`,
        color: 'gray',
        timed: true
      }
    },
    async send () {
      await firebase
        .database()
        .ref(`reservations/${this.form.date}-${this.form.start}-${this.form.end}`)
        .set(this.form)
        .then(this.resetForm())
    },
    blurSidebar (e) {
      this.navToggle = false
    },
    toggleDatePicker () {
      this.toggleDate = !this.toggleDate
    },
    toggleStartTime (e) {
      this.toggleStart = !this.toggleStart
    },
    toggleEndTime () {
      this.toggleEnd = !this.toggleEnd
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
    max-width 100vw
    background-color #1e1e1e
    transition right .25s ease-in-out
    border-left 5px solid #121212
    box-sizing content-box
    z-index 4
    .v-picker--date
      transition height .25s ease-in-out
      .v-picker__title
        cursor pointer !important
        // border 1px solid goldenrod !important
        // color goldenrod
        &__btn
          cursor pointer
        .v-date-picker-title
          pointer-events none
      .v-picker__body
        height 0
      &.open-date
        // .v-picker__title
        //   border 1px solid goldenrod !important
        //   color goldenrod
        .v-picker__body
          height 100% !important
    .v-picker--time
      transition height .25s ease-in-out
      .v-time-picker-title__time
        width 100%
        display flex
        justify-content center
        .v-picker__title
          border
          &__btn
            cursor pointer
            flex 1
            &--active
              font-size 50px !important
            &:first-child
              justify-content flex-end
              margin-right 10px
            &:nth-child(3)
              justify-content flex-start
              margin-left 10px
      .v-picker__body
        height 0
      &.open-time
        > .v-picker__body
          height 100%
    @media screen and (max-width: 600px)
      .flag
        position fixed !important
        bottom 0 !important
        top auto !important
        right 0 !important
        width 30px !important
        height 20px !important
        background-color #ffffff !important
        border-radius 15px 0 0 0 !important
        justify-content flex-end !important
        z-index 8
        .v-icon
          color #1e1e1e !important
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
      justify-content flex-start
      position absolute
      top 10px
      right 380px
      z-index 1
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
