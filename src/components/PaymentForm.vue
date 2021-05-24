<template>
  <div>
    <form v-on:submit.prevent="add">
      <div @click="descriptionEmpty = false">
        <select v-model="itemList.description">
          <option disabled value="">Payment description</option>
          <option v-for="(option, key) in options" :key="key">
            {{ option }}
          </option>
        </select>
        <input
          type="number"
          placeholder="Payment amount"
          v-model="itemList.amount"
        >
        <input
          type="text"
          placeholder="Payment date"
          v-model="itemList.date"
        >
      </div>
      <button>Add</button>
      <span v-if="descriptionEmpty">You need to add a description</span>
    </form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'PaymentForm',
  data () {
    return {
      itemList: {
        description: '',
        amount: '',
        date: ''
      },
      descriptionEmpty: false,
      options: ['Food', 'Shoes', 'Cellular']
    }
  },
  methods: {
    ...mapMutations([
      'addToList'
    ]),
    getCurrentDate () {
      const today = new Date()
      const d = today.getDate()
      const m = today.getMonth() > 8 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
      const y = today.getFullYear()
      return `${d}.${m}.${y}`
    },
    add () {
      if (!this.itemList.description) {
        this.descriptionEmpty = true
        return
      }

      if (!this.itemList.amount) {
        this.itemList.amount = 0
      }

      const newItem = {
        date: this.itemList.date || this.getCurrentDate(),
        category: this.itemList.description,
        value: this.itemList.amount
      }

      this.addToList(newItem)
    }
  }
}
</script>

<style>

</style>
