<template>
  <div>
    <button
      @click="currentPage > 1 ? currentPage-- : '' "
    >
      Previous
    </button>
    <div v-for="n in pages" :key="'Page' + n">
      <button @click="currentPage = n">
        {{ n }}
      </button>
    </div>
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
