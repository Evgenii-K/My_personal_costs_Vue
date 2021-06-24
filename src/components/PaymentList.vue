<template>
  <div>
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
            <v-list-item @click.stop="editForm = true"><v-list-item-title><v-icon left>mdi-pencil</v-icon>Edit</v-list-item-title></v-list-item>
              <v-dialog
                v-model="editForm"
                max-width="290"
              >
                <EditForm
                  :item="item"
                  @close="editForm = false"
                />
              </v-dialog>
            <v-list-item @click.stop="dialogDelete(item)"><v-list-item-title><v-icon left>mdi-basket</v-icon>Delete</v-list-item-title></v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
    <v-dialog
      v-model="dialog"
      max-width="290"
    >
      <DeleteItem
        :item='selectedItem'
        @deleteItem='deleteItem(selectedItem)'
        @close='dialog = false'
      />
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditForm from './modalwindow/EditForm.vue'
import DeleteItem from './modalwindow/DeleteItem.vue'

export default {
  components: {
    EditForm,
    DeleteItem
  },
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
      options: {},
      dialog: false,
      editForm: false,
      selectedItem: Object
    }
  },
  watch: {
    // Следим за изменением параметров таблици (пагинация, кол. элементов на странице и тд)
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
    dialogDelete (item) {
      this.selectedItem = item
      this.dialog = true
    },
    async deleteItem (item) {
      console.log('PaymentList: ', item)
      this.dialog = false
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
