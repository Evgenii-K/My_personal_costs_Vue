<template>
  <v-data-table
    :headers="headers"
    :items="items"
    :options.sync="options"
    :server-items-length="getPaymentsListLength"
    :loading="loading"
    class="elevation-1"
  >
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="showModal($event, item)"
      >
        mdi-dots-vertical
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'PaymentList',
  data () {
    return {
      headers: [
        { text: '#', value: 'id', width: '30px' },
        { text: 'Date', value: 'date', width: '100px' },
        { text: 'Category', value: 'category', width: '400px' },
        { text: 'Value', value: 'value', width: '100px' },
        { text: '', value: 'actions', sortable: false, width: '30px' }
      ],
      loading: true,
      options: {}
    }
  },
  watch: {
    options: {
      handler () {
        this.getDataFromApi()
      },
      deep: true
    },
    // При удалении всех элементов на странице переходим на страницу назад
    items () {
      if (!this.items.length && this.options.page > 1) {
        this.options.page = this.options.page - 1
      }
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentsListData', 'getPaymentsListLength'
    ]),
    items () {
      return this.getPaymentsListData.map((item, id) => {
        const { page, itemsPerPage } = this.options
        item.id = (id + 1) + (itemsPerPage * (page - 1))
        return item
      })
    }
  },
  methods: {
    ...mapActions([
      'fetchPaymentsListLength', 'fetchFromServe'
    ]),
    showModal (event, item) {
      const location = event.target.getBoundingClientRect()
      const setting = { x: 0, y: 0, overlay: false }
      setting.x = Math.round(location.x) + 'px'
      setting.y = Math.round(location.y + location.height / 2) + 'px'
      this.$modal.show('context', setting)
      this.$modal.contextTransfer(item)
    },
    getDataFromApi () {
      this.loading = true
      this.fetchFromServe(this.options).then(() => {
        this.loading = false
      })
    }
  },
  created () {
    this.fetchPaymentsListLength()
  }
}
</script>

<style module lang="scss">
</style>
