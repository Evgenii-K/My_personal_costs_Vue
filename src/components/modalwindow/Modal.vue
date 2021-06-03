<template>
  <div class="wrapper" v-if="shown">
        <PaymentForm v-if="shown === 'paymentform'" />
        <AuthForm v-if="shown === 'authform'" />
        <Context v-if="shown === 'context'" />
  </div>
</template>

<script>
import PaymentForm from '../PaymentForm'
import AuthForm from '../AuthForm'
import Context from './Context'

export default {
  data () {
    return {
      shown: ''
    }
  },
  components: {
    PaymentForm,
    AuthForm,
    Context
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

</style>
