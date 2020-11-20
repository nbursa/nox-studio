<template lang="pug">
  .res
    h1.page-title REZERVACIJE
    v-row.fill-height
      v-col
    v-sheet(height='64')
      v-toolbar(flat='')
        v-btn.mr-4(outlined='' color='grey darken-2' @click='setToday')
          | Today
        v-btn(fab='' text='' small='' color='grey darken-2' @click='prev')
          v-icon(small='')
            | mdi-chevron-left
        v-btn(fab='' text='' small='' color='grey darken-2' @click='next')
          v-icon(small='')
            | mdi-chevron-right
        v-toolbar-title(v-if='$refs.calendar')
          | {{ $refs.calendar.title }}
        v-spacer
        v-menu(bottom='' right='')
          template(v-slot:activator='{ on, attrs }')
            v-btn(outlined='' color='grey darken-2' v-bind='attrs' v-on='on')
              span {{ typeToLabel[type] }}
              v-icon(right='')
                | mdi-menu-down
          v-list
            v-list-item(@click="type = 'day'")
              v-list-item-title Day
            v-list-item(@click="type = 'week'")
              v-list-item-title Week
            v-list-item(@click="type = 'month'")
              v-list-item-title Month
            v-list-item(@click="type = '4day'")
              v-list-item-title 4 days
    v-sheet(height='600')
      v-calendar(v-if="events" ref='calendar' v-model='focus' color='primary' :events='events' :event-color='getEventColor' :type='type' @click:event='' @click:more='viewDay' @click:date='viewDay' @change='updateRange')
      v-menu(v-model='selectedOpen' :close-on-content-click='false' :activator='selectedElement' offset-x='')
        v-card(color='grey lighten-4' min-width='350px' flat='')
          v-toolbar(:color='selectedEvent.color' dark='')
            v-btn(icon='')
              v-icon mdi-pencil
            v-toolbar-title(v-html='selectedEvent.name')
            v-spacer
            v-btn(icon='')
              v-icon mdi-heart
            v-btn(icon='')
              v-icon mdi-dots-vertical
          v-card-text
            span(v-html='selectedEvent.details')
          v-card-actions
            v-btn(text='' color='secondary' @click='selectedOpen = false')
              | Cancel

</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      reservations: state => state.reservations
    })
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
      events: []
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
    // eslint-disable-next-line
    // showEvent ({ nativeEvent, event }) {
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
    // },
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

</style>
