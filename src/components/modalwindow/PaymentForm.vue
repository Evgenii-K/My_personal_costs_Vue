<template>
  <div :class="$style.wrapper">
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
        <button
          :class="$style.btn__add"
          @click="$modal.show('editdescription', { x: 50 + '%', y: 50 + '%', overlay: true })"
        >
          Add own description
        </button>
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
    </form>
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
  created () {
    if (this.$route.params.description) {
      this.itemList.description = this.$route.params.description
      if (this.$route.query.value) {
        this.itemList.amount = +this.$route.query.value
        this.add()
      } else {
        this.itemList.date = this.getCurrentDate()
      }
      this.$router.push({ name: 'dashboard' })
    }
    this.options = this.getDescription()
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
      const d = today.getDate() > 9 ? today.getDate() : `0${today.getDate()}`
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
