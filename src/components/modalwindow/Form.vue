<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">Add new cost</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row align="center">
          <v-col
            cols="9"
          >
            <v-select
              v-model="itemList.category"
              :items="getDescription"
              label="Payment Category *"
            ></v-select>
          </v-col>
          <v-col
            cols="3"
          >
            <v-dialog
              v-model="addCategory"
              max-width="300"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  text
                  color="blue darken-1"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </template>
              <AddCategory
                @close="addCategory = false"
              />
            </v-dialog>
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
        Add
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'EditForm',
  components: {
    AddCategory: () => import('./AddCategory')
  },
  data () {
    return {
      itemList: {
        category: '',
        value: '',
        date: ''
      },
      descriptionEmpty: false,
      modal: false,
      addCategory: false
    }
  },
  created () {
    this.itemList.category = this.getDescription[0]
    if (this.$route.params.description) {
      this.itemList.category = this.$route.params.description
      if (this.$route.query.value) {
        this.itemList.value = +this.$route.query.value
      }
      this.itemList.date = this.getCurrentDate()
      this.$router.push({ name: 'dashboard' })
    }
  },
  methods: {
    ...mapActions([
      'addItem'
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
        date: newDate,
        category: this.itemList.category,
        value: this.itemList.value
      }

      this.addItem(newItem)

      this.$emit('close')
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
