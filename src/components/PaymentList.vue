<template>
  <div>
    <div v-for="(item, key) in itemsOnPage" :key="key">
      {{ item.id }} {{ item.date }} {{ item.category }} {{ item.value }}
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
      @click="getPaymentListLength > currentPage ? currentPage++ : ''"
    >
      Next
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'PaymentList',
  data () {
    return {
      currentPage: 1
    }
  },
  watch: {
    itemsOnPage () {
      this.fetchFromServe(this.currentPage)
      if (!this.itemsOnPage) return
      if (this.itemsOnPage.length === 0 && this.currentPage > 1) {
        this.currentPage--
      }
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentListLength', 'getPaymentsListData'
    ]),
    itemsOnPage () {
      const itemsOnPage = this.getPaymentsListData(this.currentPage)
      return itemsOnPage
    },
    pages () {
      const num = this.getPaymentListLength
      return num
    }
  },
  methods: {
    ...mapActions([
      'fetchPaymentsListLength', 'fetchFromServe'
    ])
  },
  created () {
    this.fetchPaymentsListLength()
    this.fetchFromServe(this.currentPage)
  }
}
</script>

<style>

</style>
