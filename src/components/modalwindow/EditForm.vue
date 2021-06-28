<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Edit item</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-select
              v-model="itemList.category"
              :items="getDescription"
              label="Payment Category"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-text-field
              v-model="itemList.value"
              label="Payment value"
              type="number"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="itemList.date"
              width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="itemList.date"
                  label="Picker in dialog"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="itemList.date"
                scrollable
              >
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="primary"
                  @click="modal = false"
                >
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(itemList.date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
      <small>*indicates required field</small>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        color="blue darken-1"
        text
        @click="$emit('close')"
      >
        Cancel
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        @click="add"
      >
        Apply
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EditForm',
  data () {
    return {
      itemList: {
        category: '',
        value: '',
        date: ''
      },
      modal: false
    }
  },
  props: {
    item: Object
  },
  watch: {
    item () {
      this.loadingItem()
    }
  },
  mounted () {
    this.loadingItem()
  },
  methods: {
    ...mapActions([
      'editItem'
    ]),
    getCurrentDate () {
      const today = new Date()
      const d = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`
      const m = today.getMonth() > 8 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
      const y = today.getFullYear()
      return `${y}-${m}-${d}`
    },
    add () {
      if (!this.itemList.value || isNaN(this.itemList.value)) {
        this.itemList.value = 0
      }

      if (!this.itemList.date) {
        this.itemList.date = this.getCurrentDate()
      }

      const newDate = this.itemList.date.split('-').reverse().join('.')

      const newItem = {
        id: this.item.id,
        date: newDate,
        category: this.itemList.category,
        value: +this.itemList.value
      }

      this.editItem(newItem)

      this.$emit('close')
    },
    loadingItem () {
      if (this.item) {
        this.itemList = Object.assign({}, this.item)
        this.itemList.date = this.itemList.date.split('.').reverse().join('-')
      }
    }
  },
  computed: {
    ...mapGetters([
      'getDescription'
    ])
  }
}
</script>

<style>

</style>
