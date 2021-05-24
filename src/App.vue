<template>
  <div id="app">
    <header>
      My personal costs
    </header>
    <button @click="showForm = !showForm">ADD NEW COST +</button>
    <PaymentForm v-show="showForm"/>
    <PaymentList />
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
      showForm: false
    }
  }
}
</script>

<style lang="scss">

</style>
