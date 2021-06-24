<template>
  <v-app>
    <v-app-bar app>
      <v-btn plain to="/dashboard">Dashboard</v-btn>
      <v-btn plain to="/about">About</v-btn>
    </v-app-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  mounted () {
    if (this.$route.path === '/' || this.$route.params.value) {
      this.$router.push({ name: 'dashboard' })
    }
  }
}
</script>

<style lang="scss">
</style>
