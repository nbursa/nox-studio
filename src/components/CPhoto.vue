<template lang="pug">
.photoPreview(@click="close")
  img(:src="photoUrl" :style="{height, width}")
  .photoPreview-info
    | {{ photoName }}
</template>

<script>
export default {
  data () {
    return {
      height: 'auto',
      width: '75vw'
    }
  },
  computed: {
    photo: function () {
      return this.$store.state.files.image.find((photo) => {
        return photo.id === this.$route.params.id
      })
    },
    photoUrl: function () {
      return this.photo && this.photo.url
    },
    photoName: function () {
      return this.photo && this.photo.name
    },
    imageStyle: function () {
      return {
        height: this.height,
        width: this.width
      }
    }
  },
  mounted () {
    if (this.photo.height > this.photo.width) {
      this.height = '100%'
      this.width = 'auto'
    }
  },
  methods: {
    close () {
      this.$router.push('/galery')
    }
  }
}

</script>

<style lang="stylus">
.photoPreview
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  background-color rgba(0, 0, 0, .75)
  cursor pointer
  display flex
  justify-content center
  align-items center
  flex-direction column
  img
    margin auto
    width 100%
    max-height 90vh
    border-radius 5px
  &-info
    font-size 22px
    display flex
    align-items center
    justify-content center
    position absolute
    left 50%
    bottom 20px
    transform translateX(-50%)
    background-color rgba(0, 0, 0, .45)
    border-radius 5px
    padding 3px 20px

</style>
