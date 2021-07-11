<template>
  <div id="app">
    <header :class="$style.header">
      My personal costs
    </header>
    <nav>
      <router-link to="/dashboard">Dashboard</router-link>
      <router-link to="/about">About</router-link>
    </nav>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
    }
  },
  mounted () {
    if (this.$route.path === '/' || this.$route.params.value) {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style lang="scss" module>
  .header {
    font-size: 36px;
    font-weight: 700;
  }
</style>
