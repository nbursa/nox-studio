import Vue from 'vue'

export default Vue.mixin({
  methods: {
    $t: function (string) {
      console.log('translate: ', string)
    }
  }
})
