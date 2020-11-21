<template lang="pug">
button.close-btn(@click="clickHandler")
</template>

<script>
export default {
  methods: {
    clickHandler (e) {
      console.log('e', e)
      this.$emit('clicked', e)
    }
  }
}
</script>

<style lang="stylus">
.close-btn
  position relative
  width 20px
  height 20px
  padding 15px
  border-radius 3px
  &:after,
  &:before
    content ''
    display block
    width 2px
    height 20px
    background-color white
    position absolute
    border-radius 1px
  &:after
    top 50%
    left 50%
    transform translate(-50%, -50%) rotate(-45deg)
  &:before
    top 50%
    left 50%
    transform translate(-50%, -50%) rotate(45deg)

</style>
