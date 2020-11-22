<template lang="pug">
.nox-player
  audio.audio-player(controls v-if="list.length")
    source(:src='list[0]' type='audio/mp3')
    | Your browser does not support the audio element.
  .no-songs(v-if="!list.length") Lista je prazna
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
    })
  },
  data () {
    return {
      list: [],
      animationDuration: '0'
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
      this.stateAudios.map(audio => {
        this.list.push(audio.url)
      })
    },
    prepareMarqueeAnimation () {
      const marquee = this.$refs.marquee
      const parentWidth = marquee.parentNode.offsetWidth
      const marqueeWidth = marquee.offsetWidth
      const odnos = (parentWidth / marqueeWidth) * 100
      this.animationDuration = `${Math.round(parentWidth / odnos)}s`
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
    .audio-player
      width 60% !important
      padding 0 5px
      height 50px
      margin-right 0 !important
    .run-container
      width 100% !important
  .audio-player,
  .no-songs
    width 30%
    margin-right 20px
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
