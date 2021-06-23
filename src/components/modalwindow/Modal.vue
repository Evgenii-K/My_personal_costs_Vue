<template>
  <div>
    <PaymentForm v-if="name === 'paymentform'" />
    <EditDescription v-if="name === 'editdescription'" />
  </div>
</template>

<script>
import PaymentForm from './PaymentForm'
import EditDescription from './EditDescription'

export default {
  data () {
    return {
      dialog: false
    }
  },
  props: {
    name: String,
    item: Object
  },
  components: {
    PaymentForm,
    EditDescription
  }
}
</script>

<style module lang="scss">
</style>
