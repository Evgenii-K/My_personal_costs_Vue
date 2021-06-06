<template>
  <div class="content">
    <div
      :class="$style.wrapper"
      :style="{left: styleLeft, top: styleTop}"
    >
      <PaymentForm v-if="name === 'paymentform'" />
      <Context
        v-if="name === 'context'"
        :item="item"
      />
      <EditForm
        v-if="name === 'editform'"
        :item="item"
      />
      <EditDescription v-if="name === 'editdescription'" />
    </div>
    <div
      :class="[$style.overlay, setting.overlay != '' ? $style.overlay__background : '']"
      @click="$modal.close()"
    >
    </div>
  </div>
</template>

<script>
import PaymentForm from './PaymentForm'
import Context from './Context'
import EditForm from './EditForm'
import EditDescription from './EditDescription'

export default {
  data () {
    return {
    }
  },
  props: {
    name: String,
    setting: Object,
    item: Object
  },
  components: {
    PaymentForm,
    Context,
    EditForm,
    EditDescription
  },
  computed: {
    styleLeft () {
      if (this.setting.x) {
        return this.setting.x
      } else {
        return '0px'
      }
    },
    styleTop () {
      if (this.setting.y) {
        return this.setting.y
      } else {
        return '0px'
      }
    }
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
