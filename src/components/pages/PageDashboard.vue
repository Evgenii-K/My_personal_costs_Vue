<template>
  <div>
    <button
      @click="$modal.show('paymentform', { x: 50 + '%', y: 50 + '%', overlay: true })"
      :class="$style.btn__add"
    >
      ADD NEW COST +
    </button>
    <router-link
      :class="[$style.btn__add, $style.btn__add__template]"
      v-for="(value, key) in descriptionTemplate"
      :key="key"
      :to="`/add/payment/${key}?value=${value}`"
    >
      {{ key }}
    </router-link>
    <PaymentList />
  </div>
</template>

<script>
import PaymentList from '../PaymentList'

export default {
  components: {
    PaymentList
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
        this.$modal.show('paymentform', { x: 50 + '%', y: 50 + '%', overlay: true })
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
    display: block;
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

    &__template {
      display: inline-block;
      margin-top: 0;
      margin-right: 5px;
      text-align: center;
      text-decoration: none;
      border-radius: 3px;
      box-shadow: 1px 1px rgba(0, 0, 0, 0.1);
      font-size: 12px;
      width: 80px;
      height: 20px;
      padding-top: 5px;

      &:hover {
        transform: translateY(1px) translateX(1px);
      }
    }
  }
</style>
