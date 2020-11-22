<template lang="pug">
.nox-player
  audio.audio-player(controls v-if="list.length")
    source(:src='list[0]' type='audio/mp3')
    | Your browser does not support the audio element.
  .no-songs(v-if="!list.length") Lista je prazna
  .run-container
    .marquee
      .news Novosti - Vest b1 tekst trcecih vesti...ili pestme koja je u toku...
      .news Novosti - Vest b2 tekst trcecih vesti...ili pestme koja je u toku...
      .news Novosti - Vest b3 tekst trcecih vesti...ili pestme koja je u toku...

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
      list: []
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
    this.makeList()
  },
  methods: {
    ...mapActions([
      'fetchData'
    ]),
    makeList () {
      this.stateAudios.map(audio => {
        this.list.push(audio.url)
      })
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
    padding 10px
    .audio-player
      width 100%
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
      animation marquee 15s linear infinite
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
          transform translateX(50%)
        100%
          transform translateX(-100%)

</style>
