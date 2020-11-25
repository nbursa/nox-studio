<template lang="pug">
  .res
    h1.page-title {{ $t('reservations', 'title') }}
    v-row.fill-height
      v-col
    v-sheet(height='64')
      v-toolbar(flat)
        v-btn.mr-4(@click='setToday')
          | {{ $t('reservations', 'today') }}
        v-btn(fab text small color='white lighten-2' @click='prev')
          v-icon(small='')
            | mdi-chevron-left
        v-toolbar-title(v-if='$refs.calendar')
          | {{ $t('months', $refs.calendar.times.now.month - 1) }} {{ $refs.calendar.times.now.year }}
        v-btn(fab text small color='white lighten-2' @click='next')
          v-icon(small='')
            | mdi-chevron-right
        v-spacer
        v-menu(bottom='' right='')
          template(v-slot:activator='{ on, attrs }')
            v-btn(@click="type === 'day' ? type = 'month' : type = 'day'")
              | {{ type === 'day' ? $t('reservations', 'month') : $t('reservations', 'day') }}
    v-sheet(min-height='600px' rounded)
      v-calendar(ref='calendar' v-model='focus' color='primary' :events='events' :event-color="'primary'" :type='type' @click:event='showEvent' @click:more='viewDay' @click:date='viewDay' @change='updateRange')
      v-menu(v-model='selectedOpen' :close-on-content-click='false' :activator='selectedElement' offset-x='')
        v-card(color='primary lighten-4' min-width='350px' max-width="450px" flat='')
          v-toolbar(:color='selectedEvent.color' dark)
            v-btn(icon @click="textDisabled = !textDisabled" v-if="isAdmin")
              v-icon mdi-pencil
            v-toolbar-title(v-html='selectedEvent.name')
            v-spacer
            v-btn(icon @click='selectedOpen = false')
              v-icon mdi-close
          v-card-text.text-card(:class="{gray: textDisabled}")
            .text( v-if="!isAdmin")
              //- .date Datum: {{ eventDate }}
              .date Datum: {{ eventDate.getDate() }}-{{ eventDate.getMonth() }}-{{ eventDate.getYear() }}
              .start Pocetak: {{ eventStart }}
              .end Kraj: {{ eventEnd }}
            v-textarea.text(
              v-if="isAdmin"
              clearable
              clear-icon="mdi-close-circle"
              color="noxdark"
              :disabled="textDisabled"
              name="input-7-1"
              label="Detalji rezervacije"
              :value="`Datum: ${eventDate}\n Pocetak: ${eventStart}\n Kraj: ${eventEnd}`"
              hint="Hint text"
            )

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      reservations: state => state.reservations,
      isAdmin: state => state.isAdmin
    }),
    eventDate: function () {
      return new Date(this.selectedEvent.date)
    },
    eventStart: function () {
      return this.selectedEvent.start && this.selectedEvent.start.toLocaleTimeString()
    },
    eventEnd: function () {
      return this.selectedEvent.end && this.selectedEvent.end.toLocaleTimeString()
    }
  },
  data () {
    return {
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Mesec',
        week: 'Nedelja',
        day: 'Dan',
        '4day': '4 Dana'
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      textDisabled: true
    }
  },
  watch: {
    reservations: {
      handler: 'updateRange',
      immediate: true
    }
  },
  mounted () {
    this.fetchReservations()
    this.$refs.calendar.checkChange()
  },
  methods: {
    ...mapActions([
      'fetchReservations'
    ]),
    viewDay ({ date }) {
      this.focus = date
      this.type = 'day'
    },
    getEventColor (event) {
      return event.color
    },
    setToday () {
      this.focus = ''
    },
    prev () {
      this.$refs.calendar.prev()
    },
    next () {
      this.$refs.calendar.next()
    },
    showEvent ({ nativeEvent, event }) {
      console.log('show event: ', nativeEvent, event)
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        setTimeout(() => {
          this.selectedOpen = true
        }, 10)
      }
      if (this.selectedOpen) {
        this.selectedOpen = false
        setTimeout(open, 10)
      } else {
        open()
      }
      nativeEvent.stopPropagation()
    },
    updateRange () {
      const events = []
      this.reservations && this.reservations.forEach((item, i) => {
        events.push({
          id: i,
          color: item.color,
          date: item.date,
          email: item.email,
          end: item.end,
          name: item.name,
          phone: item.phone,
          start: item.start,
          timed: item.timed
        })
      })
      this.events = events
    }
  }
}

</script>

<style lang="stylus">
  .res
    padding 20px
    h1
      text-align center
    .v-event
      text-align center
      margin 10px auto 0
    .v-calendar-weekly__week
      min-height 100px
    .v-calendar-weekly__head
      border-bottom 1px solid #9e9e9e
    .v-btn--outlined
      border thin solid white
      .v-btn__content
        color white
    .v-toolbar
      background-color #FB8C00 !important
      color #ffffff
    .v-present .v-btn
      font-size 20px
  .v-card__text.text-card
    background-color #1e1e1e !important
  .text.theme--dark.v-input--is-disabled input, .text.theme--dark.v-input--is-disabled textarea
    color lightgray !important

</style>
