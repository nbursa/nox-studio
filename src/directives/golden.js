import Vue from 'vue'

export default Vue.directive('golden', {
  bind (el) {
    el.style.color = 'goldenrod'
  }
})
