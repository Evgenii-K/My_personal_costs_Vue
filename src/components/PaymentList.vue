<template>
  <div>
    <header :class="$style.header">
      <div :class="[$style.item__id, $style.item__header]">&#35;</div>
      <div :class="[$style.item__date, $style.item__header]">Date</div>
      <div :class="[$style.item__cat, $style.item__header]">Category</div>
      <div :class="[$style.item__value, $style.item__header]">Value</div>
    </header>
    <div :class="$style.paymentList">
      <div v-for="(item, key) in itemsOnPage" :key="key" :class="$style.itemName">
        <div :class="[$style.item__id, $style.item]">{{ (currentPage - 1) * maxItemOnPage + (key + 1) }}</div>
        <div :class="[$style.item__date, $style.item]">{{ item.date }}</div>
        <div :class="[$style.item__cat, $style.item]">{{ item.category }}</div>
        <div :class="[$style.item__value, $style.item]">{{ item.value }}</div>
        <div :class="[$style.wrapper__context, $style.item]">
          <div
            :class="$style.content"
            @click="showModal($event, 'context')"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" class=""><path fill-rule="evenodd" d="M8 11.365a1.817 1.817 0 010 3.632 1.817 1.817 0 010-3.632zm0-5.191a1.826 1.826 0 010 3.65 1.826 1.826 0 010-3.65zm0-5.171a1.81 1.81 0 11-.001 3.617A1.81 1.81 0 018 1.003z"></path></svg>
          </div>
        </div>
      </div>
    </div>
    <Pagination />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Pagination from './PyamentPagination'

export default {
  name: 'PaymentList',
  components: {
    Pagination
  },
  data () {
    return {
      currentPage: Number,
      maxItemOnPage: 3
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
        console.log(this.currentPage)
      }
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentsListData'
    ]),
    startPage () {
      return (this.currentPage - 1) * this.maxItemOnPage
    },
    endPage () {
      return this.currentPage * this.maxItemOnPage
    },
    itemsOnPage () {
      const itemsOnPage = this.getPaymentsListData.slice(this.startPage, this.endPage)
      return itemsOnPage
    }
  },
  methods: {
    showModal (event, name) {
      const setting = { x: 0, y: 0, overlay: false }
      setting.x = (event.clientX - event.layerX) + 'px'
      setting.y = (event.clientY + event.layerY) + 'px'
      this.$modal.show(name, setting)
    }
  }
}
</script>

<style module lang="scss">
  .header {
    display: flex;
  }

  .paymentList {
    width: 550px;
  }

  .itemName {
    display: flex;
  }

  .item {
    font-size: 18px;
    font-weight: 500;
    padding-top: 5px;
    padding-bottom: 5px;
    border-top: 1px solid lightgray;

    &__id {
      min-width: 30px;
    }

    &__date {
      min-width: 150px;
    }

    &__cat {
      min-width: 250px;
    }

    &__value {
      min-width: 100px;
    }

    &__header {
      font-size: 16px;
      font-weight: 900;
      padding-top: 5px;
      padding-bottom: 5px;
    }
  }

  .wrapper__context {
    position: relative;
  }

  .content > svg {
    vertical-align: text-bottom;
    cursor: pointer;
  }
</style>
