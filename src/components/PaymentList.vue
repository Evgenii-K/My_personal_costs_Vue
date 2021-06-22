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
      <v-menu
        bottom
        offset-y
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item @click="editItem(item)"><v-list-item-title><v-icon>mdi-pencil</v-icon>Edit</v-list-item-title></v-list-item>
          <v-list-item @click="deleteItem(item)"><v-list-item-title><v-icon>mdi-basket</v-icon>Delete</v-list-item-title></v-list-item>
        </v-list>
      </v-menu>
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
        { text: '#', value: 'index', width: '30px' },
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
      return this.getPaymentsListData.map((item, i) => {
        const { page, itemsPerPage } = this.options
        item.index = (i + 1) + (itemsPerPage * (page - 1))
        return item
      })
    }
  },
  methods: {
    ...mapActions([
      'fetchPaymentsListLength', 'fetchFromServe', 'removeFromList'
    ]),
    editItem (item) {
      const setting = { x: 50 + '%', y: 50 + '%', overlay: true }
      this.$modal.show('editform', setting)
      this.$modal.contextTransfer(item)
    },
    async deleteItem (item) {
      await this.removeFromList(item)
      await this.getDataFromApi()
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
