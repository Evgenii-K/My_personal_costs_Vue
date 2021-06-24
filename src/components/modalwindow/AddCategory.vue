<template>
    <v-card>
    <v-card-title>
      <span class="text-h5">Add your own category</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col>
            <v-text-field
              v-model="category"
              label="Payment category"
              type="text"
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>
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
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      category: ''
    }
  },
  methods: {
    ...mapMutations([
      'editDescription'
    ]),
    add () {
      let string = this.category

      if (!string) return

      string = string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()

      this.editDescription(string)

      this.$emit('close')
    }
  }
}
</script>

<style>

</style>
