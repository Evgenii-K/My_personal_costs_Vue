<template>
  <div>
    <button
      @click="currentPage > 1 ? currentPage-- : '' "
    >
      Previous
    </button>
    <router-link
      :to="`/dashboard/${page}`"
      v-for="page in pages"
      :key="'Page' + page"
    >
      {{ page }}
    </router-link>
    <button
      @click="getPaymentListLength > currentPage ? currentPage++ : ''"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
