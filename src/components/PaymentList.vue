<template>
  <div>
    <div v-for="(item, key) in itemsOnPage" :key="key">
      {{ (currentPage - 1) * 10 + (key + 1) }} {{ item.date }} {{ item.category }} {{ item.value }}
    </div>
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
      @click="list.length > endPage ? currentPage++ : ''"
    >
      Next
    </button>
  </div>
</template>

<script>
export default {
  name: 'PaymentList',
  data () {
    return {
      currentPage: 1
    }
  },
  props: {
    list: {
      type: Array
    }
  },
  watch: {
    itemsOnPage () {
      if (this.itemsOnPage.length === 0 && this.currentPage > 1) {
        this.currentPage--
      }
    }
  },
  computed: {
    startPage () {
      return (this.currentPage - 1) * 10
    },
    endPage () {
      return this.currentPage * 10
    },
    itemsOnPage () {
      const itemsOnPage = this.list
        .slice(this.startPage, this.endPage)

      return itemsOnPage
    },
    pages () {
      const num = this.list.length
      return Math.ceil(num / 10)
    }
  }
}
</script>

<style>

</style>
