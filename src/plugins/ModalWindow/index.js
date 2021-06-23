export default {
  install (Vue) {
    if (this.installed) {
      return
    }

    this.installed = true

    Vue.prototype.$modal = {
      EventBus: new Vue(),

      show (name) {
        this.EventBus.$emit('show', { name })
      },

      close () {
        this.EventBus.$emit('close')
      },

      contextTransfer (item) {
        this.EventBus.$emit('contextTransfer', { item })
      }
    }
  }
}
