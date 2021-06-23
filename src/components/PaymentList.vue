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
            <v-list-item @click.stop="dialog = true"><v-list-item-title><v-icon left>mdi-basket</v-icon>Delete</v-list-item-title></v-list-item>
              <v-dialog
                v-model="dialog"
                max-width="290"
              >
                <v-card>
                  <v-card-title class="text-h5">
                    Do you really want to delete item?
                  </v-card-title>

                  <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                    >
                      Cencel
                    </v-btn>

                    <v-btn
                      color="red darken-1"
                      text
                      @click="deleteItem(item)"
                    >
                      Delete
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import EditForm from './modalwindow/EditForm.vue'

export default {
  components: {
    EditForm
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
      editForm: false
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
    async deleteItem (item) {
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
