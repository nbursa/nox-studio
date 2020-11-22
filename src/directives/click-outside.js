import Vue from 'vue'

export default Vue.directive('click-outside', {
  bind (el, binding, vnode) {
    el.event = (event) => {
      !(el === event.target || el.contains(event.target)) && vnode.context[binding.expression](event)
    }
    document.body.addEventListener('click', el.event)
  },
  unbind () {
    document.body.removeEventListener('click', this.event)
  }
})
