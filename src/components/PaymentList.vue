<template>
  <div :class="$style.paymentList">
    <div v-for="(item, key) in itemsOnPage" :key="key" :class="$style.itemName">
      <div :class="$style.itemName__id">{{ item.id }}</div>
      <div :class="$style.itemName__date">{{ item.date }}</div>
      <div :class="$style.itemName__cat">{{ item.category }}</div>
      <div :class="$style.itemName__value">{{ item.value }}</div>
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
      // если на странице удалён последний элемент и страница не первая то переходим на предыдущую страницу
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

<style module lang="scss">
  .paymentList {}

  .itemName {
    font-size: 12px;
    font-weight: 500;
    padding-top: 5px;
    padding-bottom: 5px;

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

    // &:not(:last-child) {
    //   border-bottom: 1px solid lightgray;
    // }
  }
</style>
