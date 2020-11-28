<template lang="pug">
  .galery
    .vbg
      c-video-background(:sources="videoSources" img='' :mediaType="'video/mp4'")
      .section-header
        h1 Foto
    section.section
      .photos
        .cards
          .image-card(v-for="(item, i) in statePhotos" :key="i")
            router-link(v-if="item" :to="`/galery/${item.id}`")
              img.image(v-if="item.url" :aspect-ratio='16/9' :src='item.url')
              img.image(v-if="!item.url" :aspect-ratio='16/9' src='gs://nox-underground.appspot.com/resources/placeholder-600x400.png')
              p.text {{ item.name }}
    c-photo(v-if="openPhoto")

</template>

<script>
import CPhoto from '@/components/CPhoto.vue'
import { mapState, mapActions } from 'vuex'
import CVideoBackground from '@/components/CVideoBackground.vue'

export default {
  components: {
    CPhoto,
    CVideoBackground
  },
  data () {
    return {
      width: 400,
      videoSources: ['https://firebasestorage.googleapis.com/v0/b/nox-underground.appspot.com/o/resources%2FPexels%20Videos%202022395.mp4?alt=media&token=dbcfd345-b656-4b02-9ca7-68a0fa24edff']
    }
  },
  computed: {
    ...mapState({
      statePhotos: state => state.files.image
    }),
    openPhoto: function () {
      return this.$route.name === 'Photo'
    }
  },
  mounted () {
    this.fetchData('image')
    this.fetchData('video')
  },
  methods: {
    ...mapActions([
      'fetchData'
    ]),
    close () {
      this.$router.push('/galery')
    }
  }
}

</script>

<style lang="stylus">
  .galery
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
      .photos
        padding-top 60px
        .cards
          display grid
          grid-template-columns repeat(auto-fill, minmax(20rem, 1fr))
          grid-gap 1rem
          max-width 80rem
          margin 5rem auto
          padding 0 5rem
          .image-card
            position relative
            a
              color #ffffff
              text-decoration none
            .text
              position absolute
              bottom 9px
              left 0
              width 100%
              height auto
              background-color rgba(0, 0, 0, .45)
              padding 20px
              margin-bottom 0
              border-radius 0 0 0.75rem 0.75rem
              opacity 0
            &:hover
              .text
                opacity 1
            .image
              width 100%
              object-fit cover
              border-radius 0.75rem
              color #000

</style>
