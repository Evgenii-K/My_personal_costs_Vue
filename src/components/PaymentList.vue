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
      @click="getPaymentListLength > endPage ? currentPage++ : ''"
    >
      Next
    </button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PaymentList',
  data () {
    return {
      list: [],
      currentPage: 1,
      maxItemOnPage: 10
    }
  },
  watch: {
    getPaymentList () {
      this.list = this.getPaymentList
    },
    itemsOnPage () {
      if (this.itemsOnPage.length === 0 && this.currentPage > 1) {
        this.currentPage--
      }
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentList', 'getPaymentListLength'
    ]),
    startPage () {
      return (this.currentPage - 1) * this.maxItemOnPage
    },
    endPage () {
      return this.currentPage * this.maxItemOnPage
    },
    itemsOnPage () {
      const itemsOnPage = this.list
        .slice(this.startPage, this.endPage)

      return itemsOnPage
    },
    pages () {
      const num = this.getPaymentListLength
      return Math.ceil(num / 10)
    }
  },
  created () {
    this.list = this.getPaymentList
  }
}
</script>

<style>

</style>
