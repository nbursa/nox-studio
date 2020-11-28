<template lang="pug">
  .music
    .vbg
      c-video-background(:sources="videoSources" img='' :mediaType="'video/mp4'")
      .section-header
        h1 Muzika
    section.section
      h1.section-title VIDEO
      .videos
        .cards
          .video-card(v-for="(item, i) in stateVideo" :key="i")
            video.player(controls='')
              source(:src="item.url" type='video/mp4')
              p
                | Your browser doesn&apos;t support HTML5 video. Here is a
                a(:href='item.url') link to the video
                |  instead.

            p.title {{ item.name }}

    section.section
      h1.section-title AUDIO
      .audio
        .cards
          v-card.audio-card(v-for="(item, i) in stateAudio" :key="i")
            p.title {{ item.name }}
            audio.audio-player(controls='')
              source(:src='item.url' type='audio/mpeg')
              | Your browser does not support the audio element.

</template>

<script>
import { mapActions, mapState } from 'vuex'
import CVideoBackground from '@/components/CVideoBackground.vue'

export default {
  name: 'Music',
  components: {
    CVideoBackground
  },
  computed: {
    ...mapState({
      stateVideo: state => state.files.video,
      stateAudio: state => state.files.audio
    })
  },
  data () {
    return {
      videoSources: ['https://firebasestorage.googleapis.com/v0/b/nox-underground.appspot.com/o/resources%2FPexels%20Videos%202022395.mp4?alt=media&token=dbcfd345-b656-4b02-9ca7-68a0fa24edff']
    }
  },
  mounted () {
    this.fetchData('video')
    this.fetchData('audio')
  },
  methods: {
    ...mapActions([
      'fetchData'
    ])
  }
}

</script>

<style lang="stylus">
  .music
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
    .section
      &-title
        text-align left
      .videos,
      .audio
        margin-bottom 20px
        overflow hidden
        position relative
        .cards
          display grid
          grid-template-columns repeat(auto-fill, minmax(20rem, 1fr))
          grid-gap 1rem
          max-width 80rem
          margin 5rem auto
          padding 0 5rem
          .video-card
            display flex
            position relative
            width 400px
            height 225px
            margin-right 20px
            cursor pointer
            &:hover
              .title
                opacity 1
            .title
              opacity 0
              position absolute
              top 0
              left 0
              width 100%
              height auto
              font-size .5rem !important
              font-weight 400
              line-height 1.5rem
              margin-bottom 0
              padding 0 20px
              pointer-events none
              transition opacity .15s ease-in-out
              background-color rgba(0,0,0,.5)
            .player
              width 100%
              object-fit cover
              border-radius 0.75rem
          .audio-card
            display inline-flex
            flex-direction column
            position relative
            margin-right 20px
            overflow hidden
            word-break break-all
            padding 20px
            .title
              font-size .5rem
            .audio-player
              width 100%
              object-fit cover
              border-radius 0.75rem
</style>
