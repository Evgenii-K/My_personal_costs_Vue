<template>
  <div :class="$style.wrapper">
    <div @click="descriptionEmpty = false">
      <input
        :class="[$style.input__description, $style.input]"
        v-model="description"
        type="text"
        placeholder="Payment Description"
      >
    </div>
    <button
      :class="$style.btn__add"
      @click="add"
    >
      Add +
    </button>
    <button
      :class="$style.btn__add"
      @click="$modal.close()"
    >
      Cancel
    </button>
    <span
      :class="$style.span"
      v-if="descriptionEmpty"
    >
      You need to add a description
    </span>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'EditDescription',
  data () {
    return {
      description: '',
      descriptionEmpty: false
    }
  },
  methods: {
    ...mapMutations([
      'editDescription'
    ]),
    add () {
      if (!this.description) {
        this.descriptionEmpty = true
        return
      }

      this.editDescription(this.description)

      this.$modal.show('paymentform', { x: 50 + '%', y: 50 + '%', overlay: true })
    }
  }
}
</script>

<style module lang="scss">
  .wrapper {
    border-radius: 10px;
    background: white;
    position: fixed;
    transform: translate(-50%, -50%);
    max-width: 100%;
    padding: 20px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  }

  .input {
    display: block;
    font-size: 16px;
    font-weight: 500;
    box-sizing: border-box;
    padding: 5px;
    min-width: 100%;
    margin-bottom: 10px;
    border: 0.1px solid grey;
    border-radius: 5px;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.1);

    &__description {
      display: inline-block;
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;
      appearance: none;
    }
  }

  .btn__add {
    font-size: 14px;
    font-weight: 500;
    color: whitesmoke;
    background-color: rgba(37, 167, 154, 1.0);
    width: 160px;
    height: 36px;
    cursor: pointer;
    border: 0;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.1);
    outline: none;
    border-radius: 5px;
    margin: 0 5px;

    &::-moz-focus-inner {
    padding: 0;
    border: 0;
    }

    &:hover {
      transform: translateY(3px) translateX(3px);
      box-shadow: 0px 0px rgba(0, 0, 0, 0.1);
    }
  }

  .span {
    font-size: 16px;
    font-weight: 700;
    color: red;
    margin-left: 15px;
  }
</style>
