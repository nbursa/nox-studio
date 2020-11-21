<template lang="pug">
  .home
    section.vbg
      c-video-background(:sources="videoSources" img='' :mediaType="'video/mp4'")
    section.center
      h1 NOX STUDIO
      p Adresa, 11070, Novi Beograd
      p +381 99 9999 999
    section.news

</template>

<script>
import CVideoBackground from '@/components/CVideoBackground.vue'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    CVideoBackground
  },
  data () {
    return {
      videoSources: ['https://firebasestorage.googleapis.com/v0/b/nox-underground.appspot.com/o/resources%2FPexels%20Videos%203856.mp4?alt=media&token=12a9b5c9-e896-49ca-896f-b158a6e73249', 'https://firebasestorage.googleapis.com/v0/b/nox-underground.appspot.com/o/resources%2Fvideo1212.mp4?alt=media&token=2a5b1510-7c87-4d60-a258-ef10f3b1a1ca', 'https://firebasestorage.googleapis.com/v0/b/nox-underground.appspot.com/o/resources%2FPexels%20Videos%202022395.mp4?alt=media&token=dbcfd345-b656-4b02-9ca7-68a0fa24edff']
    }
  },
  computed: {
    ...mapState({
      stateVideo: state => state.files.video
      // stateAudio: state => state.files.audio
    })
    // videoSources: function () {
    //   return this.stateVideo && this.stateVideo.map(v => v.url).filter(l => l.includes('video.mp4'))
    // }
  },
  mounted () {
    this.fetchData('video')
  },
  methods: {
    ...mapActions([
      'fetchData'
    ])
  }
}
</script>

<style lang="stylus">
  .home
    position relative
    z-index 1
    .video-background
      position absolute
      top 0
      left 0
      width 100%
      height auto
      max-height 100vh
      max-width 100vw
      z-index -1
      pointer-events none
    .center
      position relative
      text-align center
      height calc(100vh - 105px)
      // h1
      p
        margin-bottom 0
        font-weight 100
    .news
      height 100vh
</style>
