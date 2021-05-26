<template>
  <div id="app">
    <header :class="$style.header">
      My personal costs
    </header>
    <button @click="showForm = !showForm" :class="$style.btn__add">ADD NEW COST +</button>
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

<style lang="scss" module>
  .header {
    font-size: 36px;
    font-weight: 700;
  }
  .btn__add {
    font-size: 14px;
    font-weight: 500;
    color: whitesmoke;
    margin-top: 15px;
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
      // transform: translateX(3px);
    }
  }
</style>
