<template lang="pug">
  .blog
    .vbg
      c-video-background(:sources="videoSources" img='' :mediaType="'video/mp4'")
      .section-header
        h1 Novosti
    section.articles
      v-card.article(v-if="articles" v-for="(article, i) in articles" :key="i")
        h2.article-title(v-if="article.title") {{ article.title }}
        p.article-time(v-if="article.time") {{ article.time }}
        v-img.article-image(v-if="article.image" :src="article.image[0].url")
        .article-body(v-if="article.article" v-html="article.article")
      .no-articles(v-if="!articles")
        h2 No articles found

</template>

<script>
import { mapState, mapActions } from 'vuex'
import CVideoBackground from '@/components/CVideoBackground.vue'

export default {
  components: {
    CVideoBackground
  },
  computed: {
    ...mapState({
      articles: state => state.articles,
      stateVideo: state => state.files.video
    })
  },
  data () {
    return {
      videoSources: ['https://firebasestorage.googleapis.com/v0/b/nox-underground.appspot.com/o/resources%2Fvideo1212.mp4?alt=media&token=2a5b1510-7c87-4d60-a258-ef10f3b1a1ca', 'https://firebasestorage.googleapis.com/v0/b/nox-underground.appspot.com/o/resources%2FPexels%20Videos%202022395.mp4?alt=media&token=dbcfd345-b656-4b02-9ca7-68a0fa24edff']
    }
  },
  mounted () {
    this.fetchArticles()
    this.fetchData('video')
  },
  methods: {
    ...mapActions([
      'fetchArticles',
      'fetchData'
    ])
  }
}
</script>

<style lang="stylus">
  .blog
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
    .articles
      width 80%
      max-width 800px
      margin 20px auto
      .article
        padding 20px
        margin 0 0 20px
        &-title
          font-size 40px
          text-transform capitalize
        &-time
          margin-bottom 20px
          font-size 10px !important
          font-weight 100
          font-style italic
        &-image
          margin-bottom 20px
        &-body
          font-size 16px
          font-weight 100
          *
            background-color transparent !important
            color #ffffff !important
          a
            color goldenrod !important
      .no-articles
        display flex
        align-items center
        justify-content center
        margin-top 50px

</style>
