<template>
  <v-card>
    <v-card-title class="text-h5">
      Do you really want to delete item?
    </v-card-title>

    <v-card-actions>
      <v-spacer></v-spacer>

      <v-btn
        color="blue darken-1"
        text
        @click="$emit('close')"
      >
        Cencel
      </v-btn>

      <v-btn
        color="red darken-1"
        text
        @click="$emit('deleteItem')"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  props: {
    item: Object
  }
}
</script>

<style>

</style>
