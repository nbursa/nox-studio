<template lang="pug">
  .reservations-sidebar
    .flag Rezervisi termin
    .reservations
      h1.page-title REZERVACIJA
      v-form
        h2 Ime
          v-text-field(label="Ime", required)
        h2 Kontakt telefon
          v-text-field(label="Ime", required)
        h2 Datum
        v-date-picker(
          v-model="date"
          color="gray"
          mode="date"
        )
        h2 Pocetak
        v-time-picker(
          v-model="startTime"
          format="24hr"
          mode="time"
        )
        h2 Kraj
        v-time-picker(
          v-model="endTime"
          format="24hr"
          mode="time"
        )
        .submit
          v-btn Rezervisi

</template>

<script>
export default {
  data () {
    return {
      date: new Date().toISOString().substr(0, 10),
      startTime: new Date(),
      endTime: new Date()
    }
  }
}

// @Component({})
// export default class VReservations extends Vue {
//   private date = new Date().toISOString().substr(0, 10)
//   private startTime = new Date()
//   private endTime = new Date()

// private focus = ''
// private type = 'month'
// private typeToLabel = {
//   month: 'Month',
//   week: 'Week',
//   day: 'Day',
//   '4day': '4 Days'
// }

// private selectedEvent = {}
// private selectedElement = null
// private selectedOpen = false
// private events = []
// private colors = ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']
// private names = ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']

// mounted () {
//   this.$refs.calendar.checkChange()
// }

// viewDay ({ date }: {date: string}) {
//   this.focus = date
//   this.type = 'day'
// }

// getEventColor (event: { color: string }) {
//   return event.color
// }

// setToday () {
//   this.focus = ''
// }

// prev () {
//   this.$refs.calendar.prev()
// }

// next () {
//   this.$refs.calendar.next()
// }

// // eslint-disable-next-line
// showEvent ({ nativeEvent, event }: { nativeEvent: any; event: any}) {
//   console.log('show event: ', nativeEvent, event)
//   const open = () => {
//     this.selectedEvent = event
//     this.selectedElement = nativeEvent.target
//     setTimeout(() => {
//       this.selectedOpen = true
//     }, 10)
//   }

//   if (this.selectedOpen) {
//     this.selectedOpen = false
//     setTimeout(open, 10)
//   } else {
//     open()
//   }

//   nativeEvent.stopPropagation()
// }

// updateRange ({ start, end }: { start: { date: Date }; end: { date: Date } }) {
//   const events = []

//   const min = new Date(`${start.date}T00:00:00`)
//   const max = new Date(`${end.date}T23:59:59`)
//   const days = (max.getTime() - min.getTime()) / 86400000
//   const eventCount = this.rnd(days, days + 20)

//   for (let i = 0; i < eventCount; i++) {
//     const allDay = this.rnd(0, 3) === 0
//     const firstTimestamp = this.rnd(min.getTime(), max.getTime())
//     const first = new Date(firstTimestamp - (firstTimestamp % 900000))
//     const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
//     const second = new Date(first.getTime() + secondTimestamp)

//     events.push({
//       name: this.names[this.rnd(0, this.names.length - 1)],
//       start: first,
//       end: second,
//       color: this.colors[this.rnd(0, this.colors.length - 1)],
//       timed: !allDay
//     })
//   }

//   this.events = events as never
// }

// rnd (a: number, b: number) {
//   return Math.floor((b - a + 1) * Math.random()) + a
// }
// }
</script>

<style lang="stylus">
  .reservations-sidebar
    position fixed
    top 0
    right 0
    height 100vh
    background-color #1e1e1e
    transition transform .25s ease-in-out
    border-left 5px solid #121212
    transform translateX(380px)
    box-sizing content-box
    z-index 2
    &:hover
      transform translateX(0)
      right 0
      border-left 5px solid transparent
    .reservations
      max-height 100vh
      overflow-x hidden
      overflow-y auto
      padding 20px
      width 340px
    .flag
      display block
      position absolute
      top 10px
      right 380px
      z-index 300
      padding 10px 20px
      cursor pointer
      background-color #1e1e1e
      border-radius 15px 0 0 15px
      text-transform uppercase
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
        max-width 300px

</style>
