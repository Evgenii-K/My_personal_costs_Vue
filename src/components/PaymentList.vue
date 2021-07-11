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
    <Pagination />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Pagination from './PyamentPagination'

export default {
  name: 'PaymentList',
  components: {
    Pagination
  },
  data () {
    return {
      currentPage: Number
    }
  },
  watch: {
    itemsOnPage () {
      if (!this.itemsOnPage) return
      // если на странице удалён последний элемент и страница не первая то переходим на предыдущую страницу
      if (this.itemsOnPage.length === 0 && this.currentPage > 1) {
        this.currentPage--
      }
    },
    '$route.path': function () {
      if (this.$route.params.page) {
        this.currentPage = this.$route.params.page
      }
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentsListData'
    ]),
    itemsOnPage () {
      const itemsOnPage = this.getPaymentsListData(this.currentPage)
      this.fetchCurrentPage(this.currentPage)
      return itemsOnPage
    }
  },
  methods: {
    ...mapActions([
      'fetchCurrentPage'
    ])
  },
  mounted () {
    this.currentPage = this.$route.params.page
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
