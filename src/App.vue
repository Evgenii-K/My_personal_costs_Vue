<template>
  <div id="app">
    <header>
      My personal costs
    </header>
    <button @click="showForm = !showForm">ADD NEW COST +</button>
    <PaymentForm />
    <PaymentList />
  </div>
</template>

<script>
import PaymentForm from './components/PaymentForm.vue'
import PaymentList from './components/PaymentList.vue'
import { mapActions } from 'vuex'

export default {
  name: 'App',
  components: {
    PaymentForm,
    PaymentList
  },
  data () {
    return {
      showForm: false
    }
  },
  methods: {
    ...mapActions([
      'fetchPaymentList'
    ])
  },
  created () {
    this.fetchPaymentList()
  }
}
</script>

<style lang="scss">

</style>
