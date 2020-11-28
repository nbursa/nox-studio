<template lang="pug">
  .about
    .vbg
      c-video-background(:sources="videoSources" img='' :mediaType="'video/mp4'")
      .section-header
        h1 O Nama

</template>

<script>
import { mapActions } from 'vuex'
import CVideoBackground from '@/components/CVideoBackground.vue'

export default {
  components: {
    CVideoBackground
  },
  data () {
    return {
      videoSources: ['https://firebasestorage.googleapis.com/v0/b/nox-underground.appspot.com/o/resources%2FPexels%20Videos%202022395.mp4?alt=media&token=dbcfd345-b656-4b02-9ca7-68a0fa24edff']
    }
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
  .about
    padding-bottom 100px
    .vbg
      position relative
      height 100vh
      z-index 0
      .section-header,
      .video-background
        position absolute
        top 0
        left 0
        width 100%
        height auto
        max-height 100vh
        max-width 100vw
      .section-header
        display flex
        align-items center
        justify-content center
        height 100%
        z-index 1
        h1
          font-size 80px

</style>
