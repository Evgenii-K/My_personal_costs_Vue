<template>
  <div>
    <div>
      <router-link
        v-for="(value, key) in descriptionTemplate"
        :key="key"
        :to="`/add/payment/${key}?value=${value}`"
      >
        Add {{ key }}
      </router-link>
    </div>
    <button @click="showForm = !showForm" :class="$style.btn__add">ADD NEW COST +</button>
    <PaymentForm v-show="showForm"/>
    <PaymentList />
  </div>
</template>

<script>
import PaymentList from '../PaymentList'
import PaymentForm from '../PaymentForm'

export default {
  components: {
    PaymentList,
    PaymentForm
  },
  data () {
    return {
      showForm: false,
      descriptionTemplate: {
        Food: 200,
        Transport: 50,
        Entertainment: ''
      }
    }
  },
  watch: {
    $route (to) {
      if (to.params.description) {
        if (!to.query.value) {
          this.showForm = true
        }
      }
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
    }
  }
</style>
