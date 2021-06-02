<template>
  <div id="app">
    <header :class="$style.header">
      My personal costs
    </header>
    <nav>
      <router-link :class="$style.link" to="/dashboard">Dashboard</router-link>
      <router-link :class="$style.link" to="/about">About</router-link>
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

  .link {
    font-size: 18px;
    font-weight: 700;
    color: black;
    text-decoration: none;
    margin: 10px;

    &:hover {
      color: lightskyblue;
    }
  }
</style>
