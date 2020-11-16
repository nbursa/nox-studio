<template lang="pug">
  .reservations
    h1.page-title REZERVACIJE
    //- template
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
      v-calendar(ref='calendar' v-model='focus' color='primary' :events='events' :event-color='getEventColor' :type='type' @click:event='showEvent' @click:more='viewDay' @click:date='viewDay' @change='updateRange')
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
export default {
  data () {
    return {
      focus: '',
      type: 'month',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days'
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party']
    }
  },
  mounted () {
    this.$refs.calendar.checkChange()
  },
  methods: {
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
    updateRange ({ start, end }) {
      const events = []

      const min = new Date(`${start.date}T00:00:00`)
      const max = new Date(`${end.date}T23:59:59`)
      const days = (max.getTime() - min.getTime()) / 86400000
      const eventCount = this.rnd(days, days + 20)

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0
        const firstTimestamp = this.rnd(min.getTime(), max.getTime())
        const first = new Date(firstTimestamp - (firstTimestamp % 900000))
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
        const second = new Date(first.getTime() + secondTimestamp)

        events.push({
          name: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          timed: !allDay
        })
      }

      this.events = events
    },
    rnd (a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a
    }
  }
}

</script>

<style lang="stylus">
  .reservations
    position absolute
    top 0
    right 0px
    width 300px
    height 100%
    background-color #1e1e1e
    transition right .25s ease-in-out
    transition transform .25s ease-in-out
    border-left 5px solid #121212
    padding 20px
    transform translateX(300px)
    overflow hidden
    // text-align initial
    box-sizing content-box
    z-index 2
    &:hover
      transform translateX(0)
      right 0
      border-left 5px solid transparent
    .page-title
      font-weight bold
      margin-bottom 20px
    .date-pickers
      h2
        margin 10px
    .time-pickers
      display flex
      .time-start-picker
        margin-right 20px
      .time-start-picker,
      .time-end-picker
        flex 1
        h2
          margin 10px
        .vc-container
          width 100%
        .vc-time-picker
          .vc-time-icon
            display none
          .vc-date-time
            width 100%
            .vc-date
              display none
            .vc-time
              .vc-select
                width 50%
                select
                  width 100%

</style>
