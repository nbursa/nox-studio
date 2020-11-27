<template lang="pug">
  .home
    h1 MUZIKA

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

export default {
  name: 'Music',
  computed: {
    ...mapState({
      stateVideo: state => state.files.video,
      stateAudio: state => state.files.audio
    })
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
  .home
    padding 20px 20px 50px
    h1
      text-align center
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
