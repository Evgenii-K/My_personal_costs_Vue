<template>
  <div class="content">
    <div
      :class="$style.wrapper"
      :style="{left: setting.x, top: setting.y}"
    >
      <PaymentForm v-if="name === 'paymentform'" />
      <Context v-if="name === 'context'" />
    </div>
    <div
      :class="[$style.overlay, setting.overlay != '' ? $style.overlay__background : '']"
      @click="$modal.close()"
    >
    </div>
  </div>
</template>

<script>
import PaymentForm from '../PaymentForm'
import Context from './Context'

export default {
  data () {
    return {
    }
  },
  props: {
    name: String,
    setting: Object
  },
  components: {
    PaymentForm,
    Context
  }
}
</script>

<style module lang="scss">
  .wrapper {
    position: fixed;
    z-index: 120;
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
  }

  .overlay__background {
    background: rgba(0, 0, 0, 0.6);
  }
</style>
