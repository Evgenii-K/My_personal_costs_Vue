<template>
  <div>
    <form v-on:submit.prevent="add">
      <div @click="descriptionEmpty = false">
        <select
          :class="[$style.input__description, $style.input]"
          v-model="itemList.description"
        >
          <option value="" disabled selected hidden>Payment description</option>
          <option v-for="(option, key) in options" :key="key">
            {{ option }}
          </option>
        </select>
        <button :class="$style.btn__add">Add own description</button>
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
      <button :class="$style.btn__add">ADD +</button>
      <span
        :class="$style.span"
        v-if="descriptionEmpty"
      >
        You need to add a description
      </span>
    </form>
    <div></div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

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
      options: []
    }
  },
  watch: {
    $route (to) {
      if (to.params.description) {
        this.itemList.description = to.params.description
        if (to.query.value) {
          this.itemList.amount = +to.query.value
          this.add()
        }
      }
    }
  },
  methods: {
    ...mapActions([
      'addItem', 'fetchFromServe', 'fetchPaymentsListLength'
    ]),
    ...mapGetters([
      'getDescription', 'getPaymentListLength'
    ]),
    getCurrentDate () {
      const today = new Date()
      const d = today.getDate()
      const m = today.getMonth() > 8 ? today.getMonth() + 1 : `0${today.getMonth() + 1}`
      const y = today.getFullYear()
      return `${y}-${m}-${d}`
    },
    async add () {
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
        date: newDate,
        category: this.itemList.description,
        value: this.itemList.amount
      }

      await this.addItem(newItem)

      await this.fetchFromServe(this.getPaymentListLength())
    }
  },
  created () {
    this.options = this.getDescription()
  }
}
</script>

<style module lang="scss">
  .input {
    display: block;
    font-size: 16px;
    font-weight: 500;
    padding: 5px;
    min-width: 300px;
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
      min-width: 312px;
      margin-right: 10px;
    }

    &__description option{
      padding: 5px;
      margin: 5px;
    }

    &__amount {
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
          /* display: none; <- Crashes Chrome on hover */
          -webkit-appearance: none;
          margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
      }
    }

    &__date {
    }
  }

  .btn__add {
    font-size: 14px;
    font-weight: 500;
    color: whitesmoke;
    margin-bottom: 10px;
    background-color: rgba(37, 167, 154, 1.0);
    width: 160px;
    height: 36px;
    cursor: pointer;
    border: 0;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.1);
    outline: none;
    border-radius: 5px;

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
