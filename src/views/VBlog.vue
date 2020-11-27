<template lang="pug">
  .blog
    h1 BLOG
    .articles
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

export default {
  computed: {
    ...mapState({
      articles: state => state.articles
    })
  },
  mounted () {
    this.fetchArticles()
  },
  methods: {
    ...mapActions([
      'fetchArticles'
    ])
  }
}
</script>

<style lang="stylus">
  .blog
    padding 20px 20px 100px
    h1
      text-align center
    .articles
      width 80%
      max-width 800px
      margin 0 auto
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
