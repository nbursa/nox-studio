<template lang="pug">
.nox-player
  .player(v-if="list.length")
    audio.audio-player(ref="player" v-if="list.length" :src='list[0].url' type='audio/mp3' @timeupdate="updateTime")
      | {{ supportedMessage }}
    .controls
      .play(@click="play")
        span.icon(icon v-if="!playing")
          v-icon(large) mdi-play
        span.icon(icon v-if="playing")
          v-icon(large) mdi-pause
      .column
        .title
          span {{ list[0].name }}
          span.icon(icon @click="next" v-if="playing")
            v-icon(large) mdi-skip-next
        .track
          .track-line(:style="{ width: `${currentTime}%` }")
  .no-songs(v-if="!list.length") {{ emptyMessage }}
  .run-container
    .marquee(ref="marquee" :style="{'animation-duration': animationDuration}")
      .news Lorem 1 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      .news Lorem 2 - Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      .news Lorem 3 - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      stateAudios: state => state.files.audio
    }),
    supportedMessage: function () {
      return this.$t('player', 'supported')
    },
    emptyMessage: function () {
      return this.$t('player', 'empty')
    }
  },
  data () {
    return {
      list: [],
      animationDuration: '0',
      playing: false,
      currentTime: 0
    }
  },
  watch: {
    stateAudios: {
      handler: 'makeList',
      immediate: true
    }
  },
  mounted () {
    this.fetchData('audio')
    this.prepareMarqueeAnimation()
  },
  methods: {
    ...mapActions([
      'fetchData'
    ]),
    makeList () {
      this.stateAudios.forEach(audio => {
        !this.list.includes(audio) && this.list.push(audio)
      })
    },
    prepareMarqueeAnimation () {
      const marquee = this.$refs.marquee
      const parentWidth = marquee.parentNode.offsetWidth
      const marqueeWidth = marquee.offsetWidth
      const odnos = (parentWidth / marqueeWidth) * 100
      this.animationDuration = `${Math.round(parentWidth / odnos)}s`
    },
    play () {
      this.playing = !this.playing
      this.playing
        ? this.$refs.player.play()
        : this.$refs.player.pause()
    },
    next () {
      this.$refs.player.next()
    },
    updateTime () {
      this.currentTime = this.$refs.player && (this.$refs.player.currentTime / this.$refs.player.duration * 100)
    }
  }
}
</script>

<style lang="stylus">
.nox-player
  display flex
  align-items center
  justify-content space-between
  position fixed
  bottom 0
  left 0
  width 100vw
  height 65px
  padding 0 20px
  background-color #1e1e1e
  z-index 1
  @media screen and (max-width: 600px)
    height 100px
    flex-direction column-reverse
    padding 5px 10px 0
    .player
      width 60% !important
      padding 0 5px
      height 50px
      margin-right 0 !important
    .run-container
      width 100% !important
  .player
    width 30%
    margin-right 20px
    audio.audio-player
      position relative
      width 0
      height 0
      display block
    .controls
      width 100%
      display flex
      flex-wrap wrap
      margin-left -5px
      .play
        width 50px
        height 50px
        display flex
        align-items center
        justify-content center
        cursor pointer
        .v-icon
          font-size 40px !important
      .column
        width calc(100% - 50px)
        display flex
        flex-direction column
        justify-content space-between
        .title
          width 100%
          height 25px
          font-size 5px !important
          line-height 1
          font-weight 100
          display flex
          align-items center
          justify-content center
          .icon
            cursor pointer
        .track
          border 1px solid #ffffff
          width 100%
          margin 0 auto
          height 10px
          border-radius 3px
          .track-line
            height 100%
            width 0%
            background white
  .run-container
    position relative
    overflow hidden
    width 70%
    height 40px
    &:hover
      .marquee
        animation-play-state paused
    .marquee
      width 100%
      display flex
      position absolute
      white-space nowrap
      will-change transform
      height 40px
      min-width fit-content
      animation marquee linear infinite
      animation-duration 0s
      animation-play-state running
      .news
        float left
        flex 1
        line-height 40px
        display inline
        min-width fit-content
        margin-right 20px
        font-weight 100
      @keyframes marquee
        0%
          transform translateX(100vw)
        100%
          transform translateX(-100%)

</style>
