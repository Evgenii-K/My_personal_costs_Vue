<template>
  <div>
    <header>
      <div :class="[$style.item__id, $style.item__header]">&#35;</div>
      <div :class="[$style.item__date, $style.item__header]">Date</div>
      <div :class="[$style.item__cat, $style.item__header]">Category</div>
      <div :class="[$style.item__value, $style.item__header]">Value</div>
    </header>
    <div :class="$style.paymentList">
      <div v-for="(item, key) in itemsOnPage" :key="key" :class="$style.itemName">
        <div :class="[$style.item__id, $style.item]">{{ item.id }}</div>
        <div :class="[$style.item__date, $style.item]">{{ item.date }}</div>
        <div :class="[$style.item__cat, $style.item]">{{ item.category }}</div>
        <div :class="[$style.item__value, $style.item]">{{ item.value }}</div>
      </div>
    </div>
    <router-link
      :to="{ name: 'pagination', params: { page: currentPage > 1 ? currentPage - 1 : 1}}"
    >
      Previous
    </router-link>
    <router-link
      :to="`/dashboard/${page}`"
      v-for="page in pages"
      :key="'Page' + page"
    >
      {{ page }}
    </router-link>
    <router-link
      :to="{ name: 'pagination', params: { page: getPaymentListLength > currentPage ? currentPage + 1 : currentPage}}"
    >
      Next
    </router-link>
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
      if (!this.itemsOnPage) return
      if (this.itemsOnPage.length === 0 && this.currentPage > 1) {
        this.currentPage--
      }
    },
    $route (to) {
      if (to.params.page) {
        this.currentPage = +to.params.page
      }
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentListLength', 'getPaymentsListData'
    ]),
    itemsOnPage () {
      const itemsOnPage = this.getPaymentsListData(this.currentPage)
      this.fetchCurrentPage(this.currentPage)
      return itemsOnPage
    },
    pages () {
      const num = this.getPaymentListLength
      return num
    }
  },
  methods: {
    ...mapActions([
      'fetchPaymentsListLength', 'fetchFromServe', 'fetchCurrentPage'
    ])
  },
  mounted () {
    this.fetchPaymentsListLength()
  }
}
</script>

<style module lang="scss">
  .paymentList {
    width: 550px;
  }

  .item {
    font-size: 18px;
    font-weight: 500;
    padding-top: 5px;
    padding-bottom: 5px;
    border-top: 1px solid lightgray;

    &__id {
      display: inline-block;
      min-width: 30px;
    }

    &__date {
      display: inline-block;
      min-width: 150px;
    }

    &__cat {
      display: inline-block;
      min-width: 250px;
    }

    &__value {
      display: inline-block;
      min-width: 100px;
    }

    &__header {
      font-size: 16px;
      font-weight: 900;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }
</style>
