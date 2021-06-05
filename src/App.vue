<template>
  <div id="app">
    <header :class="$style.header">
      My personal costs
    </header>
    <nav :class="$style.nav">
      <router-link :class="$style.link" to="/dashboard">Dashboard</router-link>
      <router-link :class="$style.link" to="/about">About</router-link>
    </nav>
    <main>
      <router-view />
      <Modal
        v-if="modalShown"
        :name="modalShown"
        :setting="modalSetting"
      />
    </main>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      modalShown: '',
      modalSetting: {}
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
  },
  beforeDestroy () {
    this.$modal.EventBus.$off('show', this.onShow)
    this.$modal.EventBus.$off('close', this.onClose)
  }
}
</script>

<style lang="scss" module>
  .header {
    font-size: 36px;
    font-weight: 700;
    padding-bottom: 10px;
  }

  .nav {
    background-color: lightgray;
    padding: 10px;
    width: 520px;
  }

  .link {
    font-size: 18px;
    font-weight: 700;
    color: black;
    text-decoration: none;
    padding: 0 10px;

    &:not(:last-child) {
      border-right: 2px solid black;
    }

    &:hover {
      color:lightblue;
    }
  }
</style>
