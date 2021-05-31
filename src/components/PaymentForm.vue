<template>
  <div>
    <form v-on:submit.prevent="add">
      <div
        v-for="(item, key) in Object.keys(itemList)"
        :key="key"
        @click="descriptionEmpty = false"
      >
        <input
          :type="item == 'amount' ? 'number' : 'text'"
          :placeholder="`Payment ${item}`"
          v-model="itemList[item]"
        >
      </div>
      <button>Add</button>
      <span v-if="descriptionEmpty">You need to add a description</span>
    </form>
  </div>
</template>

<script>
export default {
  name: 'PaymentForm',
  data () {
    return {
      itemList: {
        description: '',
        amount: '',
        date: ''
      },
      descriptionEmpty: false
    }
  },
  methods: {
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

      this.$emit('addToList', newItem)
    }
  }
}
</script>

<style>

</style>
