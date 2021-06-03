<template>
  <div class="wrapper" v-if="shown">
    <div :class="$style.modal">
      <header class="header">{{ shown }}</header>
      <div class="content">
        <PaymentForm v-if="shown === 'paymentform'" />
        <AuthForm v-if="shown === 'authform'" />
      </div>
      <div class="footer">
        <button @click="shown = ''">Close</button>
      </div>
    </div>
    <div :class="$style.rot"></div>
    <div :class="$style.overlay"></div>
  </div>
</template>

<script>
import PaymentForm from '../PaymentForm'
import AuthForm from '../AuthForm'

export default {
  data () {
    return {
      shown: ''
    }
  },
  components: {
    PaymentForm,
    AuthForm
  },
  props: {
    setting: Object
  },
  methods: {
    onShow ({ name }) {
      this.shown = name
    }
  },
  mounted () {
    this.$modal.EventBus.$on('show', this.onShow)
  }
}
</script>

<style module lang="scss">
  .modal {
    border: 1px solid black;
    background: white;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    max-width: 100%;
    z-index: 110;
  }

  .rot {
    position: fixed;
    border: 1px solid black;
    width: 50px;
    height: 50px;
    transform: rotate(45deg);
    z-index: 120;
    background: white;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.6);
    z-index: 100;
  }
</style>
