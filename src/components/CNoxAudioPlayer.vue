<template lang="pug">
.nox-player
  audio.audio-player(controls='')
    source(:src='list[0]' type='audio/mpeg')
    | Your browser does not support the audio element.
  .run-container
    marquee.marqee(direction='' onmouseover='this.stop();' onmouseout='this.start();')
      h1 Novosti
      p Vest br1 tekst trcecih vesti...ili pestme koja je u toku...
      h1 Novosti
      p Vest b2 tekst trcecih vesti ili pestme koja je u toku... tekst trcecih vesti ili pestme koja je u toku...
      h1 Novosti
      p Vest br3 tekst trcecih vesti ili pestme koja je u toku...
      h1 Novosti
      p Vest br4 tekst trcecih vesti ili pestme koja je u toku... tekst trcecih vesti ili pestme koja je u toku...
      h1 Novosti
      p Vest br5 tekst trcecih vesti ili pestme koja je u toku...

</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  computed: {
    ...mapState({
      stateAudio: state => state.files.audio
    })
  },
  data () {
    return {
      list: []
    }
  },
  mounted () {
    this.fetchData('audio')
    this.makeList()
    // if (this.stateAudio) {
    //   this.makeList()
    // }
  },
  methods: {
    ...mapActions([
      'fetchData'
    ]),
    makeList () {
      this.stateAudio && this.stateAudio.map(a => {
        this.list.push(a.url)
      })
      // console.log('list: ', this.list)
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
  .audio-player
    width 30%
    margin-right 20px
  .run-container
    width 70%
    height 40px
    overflow hidden
    position relative
    display flex
    align-items center
    .marqee
      display flex
      align-items center
      font-size 20px
      height 40px
      h1, p
        display inline
        margin-right 20px
        line-height 1
        font-weight 100

</style>
