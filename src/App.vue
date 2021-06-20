<template>
  <v-app>
    <v-app-bar app>
      <v-btn plain to="/dashboard">Dashboard</v-btn>
      <v-btn plain to="/about">About</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
      <transition name="fade">
        <Modal
          v-if="modalShown"
          :name="modalShown"
          :setting="modalSetting"
          :item="modalItem"
        />
      </transition>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      modalShown: '',
      modalSetting: {},
      modalItem: {}
    }
  },
  components: {
    Modal: () => import('./components/modalwindow/Modal')
  },
  methods: {
    onShow ({ name, setting }) {
      this.modalShown = name
      this.modalSetting = setting
    },
    onClose () {
      this.modalShown = ''
    },
    onContextTransfer ({ item }) {
      this.modalItem = item
    },
    showModal (name, setting) {
      this.$modal.show(name, setting)
    }
  },
  mounted () {
    if (this.$route.path === '/' || this.$route.params.value) {
      this.$router.push({ name: 'dashboard' })
    }
    this.$modal.EventBus.$on('show', this.onShow)
    this.$modal.EventBus.$on('close', this.onClose)
    this.$modal.EventBus.$on('contextTransfer', this.onContextTransfer)
  },
  beforeDestroy () {
    this.$modal.EventBus.$off('show', this.onShow)
    this.$modal.EventBus.$off('close', this.onClose)
    this.$modal.EventBus.$off('contextTransfer', this.onContextTransfer)
  }
}
</script>

<style lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s ease;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
