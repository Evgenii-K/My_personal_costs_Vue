<template>
  <div :class="$style.wrapper">
    <div @click="descriptionEmpty = false">
      <input
        :class="[$style.input__description, $style.input]"
        v-model="itemList.description"
        type="text"
        placeholder="Payment Description"
      >
      <input
        :class="[$style.input__amount, $style.input]"
        type="number"
        step="any"
        placeholder="Payment amount"
        v-model="itemList.amount"
      >
      <input
        :class="[$style.input__date, $style.input]"
        type="date"
        placeholder="Payment date"
        v-model="itemList.date"
      >
    </div>
    <button
      :class="$style.btn__add"
      @click="add"
    >
      Apply changes
    </button>
    <button
      :class="$style.btn__add"
      @click="$modal.close()"
    >
      Cancel
    </button>
    <span
      :class="$style.span"
      v-if="descriptionEmpty"
    >
      You need to add a description
    </span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'EditForm',
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
  props: {
    item: Object
  },
  mounted () {
    this.itemList.description = this.item.category
    this.itemList.amount = this.item.value
    this.itemList.date = this.item.date.split('.').reverse().join('-')
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
      if (!this.itemList.description) {
        this.descriptionEmpty = true
        return
      }

      if (!this.itemList.amount || isNaN(this.itemList.amount)) {
        this.itemList.amount = 0
      }

      if (!this.itemList.date) {
        this.itemList.date = this.getCurrentDate()
      }

      const newDate = this.itemList.date.split('-').reverse().join('.')

      const newItem = {
        id: this.item.id,
        date: newDate,
        category: this.itemList.description,
        value: this.itemList.amount
      }

      this.editItem(newItem)

      this.$modal.close()
    }
  }
}
</script>

<style module lang="scss">
  .wrapper {
    border-radius: 10px;
    background: white;
    position: fixed;
    transform: translate(-50%, -50%);
    max-width: 100%;
    padding: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  .input {
    display: block;
    font-size: 16px;
    font-weight: 500;
    box-sizing: border-box;
    padding: 5px;
    min-width: 100%;
    margin-bottom: 10px;
    border: 0.1px solid grey;
    border-radius: 5px;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.1);

    &__description {
      display: inline-block;
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      appearance: none;
    }

    &__amount {
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
          /* display: none; <- Crashes Chrome on hover */
          -webkit-appearance: none;
          margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
      }
    }
  }

  .btn__add {
    font-size: 14px;
    font-weight: 500;
    color: whitesmoke;
    background-color: rgba(37, 167, 154, 1.0);
    width: 160px;
    height: 36px;
    cursor: pointer;
    border: 0;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.1);
    outline: none;
    border-radius: 5px;
    margin: 0 5px;

    &::-moz-focus-inner {
    padding: 0;
    border: 0;
    }

    &:hover {
      transform: translateY(3px) translateX(3px);
      box-shadow: 0px 0px rgba(0, 0, 0, 0.1);
    }
  }

  .span {
    font-size: 16px;
    font-weight: 700;
    color: red;
    margin-left: 15px;
  }
</style>
