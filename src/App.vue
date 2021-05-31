<template>
  <div id="app">
    <header>
      My personal costs
    </header>
    <button @click="showForm = !showForm">ADD NEW COST +</button>
    <PaymentForm
      @addToList="addToList"
      v-show="showForm"
    />
    <PaymentList :list="paymentlist"/>
  </div>
</template>

<script>
import PaymentForm from './components/PaymentForm.vue'
import PaymentList from './components/PaymentList.vue'

export default {
  name: 'App',
  components: {
    PaymentForm,
    PaymentList
  },
  data () {
    return {
      paymentlist: [
        {
          date: '13.05.2021',
          category: 'Food',
          value: '3500'
        },
        {
          date: '14.05.2021',
          category: 'Shoes',
          value: '4200'
        },
        {
          date: '13.05.2021',
          category: 'Cellular',
          value: '440'
        }
      ],
      showForm: false
    }
  },
  methods: {
    addToList (newItem) {
      this.paymentlist = [...this.paymentlist, newItem]
    }
  }
}
</script>

<style lang="scss">

</style>
