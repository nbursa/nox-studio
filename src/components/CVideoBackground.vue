<template lang="pug">
section.video-background
  .video-overlay
  video(autoplay loop playsinline :muted='muted' ref='video')
    source(v-for='source in sources' :src='source' :type='mediaType')
  .video-background__content
    slot

</template>

<script>
export default {
  name: 'VideoBackground',
  props: {
    sources: {
      type: Array,
      required: true
    },
    img: {
      type: String
    },
    muted: {
      type: Boolean,
      default: true
    },
    mediaType: {
      type: String,
      default: () => 'video/mp4'
    }
  },
  data () {
    return {
      videoRatio: null
    }
  },
  mounted () {
    this.setImageUrl()
    this.setContainerHeight()
    if (this.videoCanPlay()) {
      this.$refs.video.oncanplay = () => {
        if (!this.$refs.video) return
        this.videoRatio = this.$refs.video.videoWidth / this.$refs.video.videoHeight
        this.setVideoSize()
        this.$refs.video.style.visibility = 'visible'
      }
    }
    window.addEventListener('resize', this.resize)
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.resize)
  },
  methods: {
    resize () {
      this.setContainerHeight()
      if (this.videoCanPlay()) {
        this.setVideoSize()
      }
    },
    videoCanPlay () {
      return !!this.$refs.video.canPlayType
    },
    setImageUrl () {
      if (this.img) {
        this.$el.style.backgroundImage = `url(${this.img})`
      }
    },
    setContainerHeight () {
      this.$el.style.height = `${window.innerHeight}px`
    },
    setVideoSize () {
      var width; var height; var containerRatio = this.$el.offsetWidth / this.$el.offsetHeight
      if (containerRatio > this.videoRatio) {
        width = this.$el.offsetWidth
      } else {
        height = this.$el.offsetHeight
      }
      this.$refs.video.style.width = width ? `${width}px` : 'auto'
      this.$refs.video.style.height = height ? `${height}px` : 'auto'
    },
    getMediaType (src) {
      return 'video/' + src.split('.').pop()
    }
  }
}
</script>

<style lang="stylus">
  .video-background
    position relative
    background-size cover
    background-position center
    overflow hidden
    video
        position absolute
        top 50%
        left 50%
        visibility hidden
        transform translate(-50%, -50%)
    .video-background__content
        position absolute
        top 0
        left 0
        width 100%
        height 100%
    .video-overlay
      position absolute
      top 0
      left 0
      width 100%
      height 100%
      background-color rgba(251, 140, 0, .25)
      z-index 1

</style>
