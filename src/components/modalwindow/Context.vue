<template>
  <div :class="$style.wrapper">
    <ul :class="$style.context__menu">
      <li
        :class="$style.context__item"
        @click="edit"
      >
        Редактировать
      </li>
      <li
        :class="$style.context__item"
        @click="remove"
      >
        Удалить
      </li>
      <span :class="$style.context__menu_arrow" style="left: 20px;"></span>
    </ul>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
    }
  },
  props: {
    item: Object
  },
  methods: {
    remove () {
      this.removeFromState(this.item)
      this.$modal.close()
    },
    edit () {
      const setting = { x: 50 + '%', y: 50 + '%', overlay: true }
      this.$modal.show('editform', setting)
    },
    ...mapMutations([
      'removeFromState'
    ])
  }
}
</script>

<style module lang="scss">

  .wrapper__context {
    position: relative;
  }

  .context__menu {
    left: -20px;
    margin-top: 16px;
    background: #fff;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    list-style: none;
    padding: 8px 0;
    position: absolute;
    transform-origin: 0 0;
  }

  .context__item {
    font-size: 15px;
    font-weight: 400;
    line-height: 20px;
    position: relative;
    white-space: nowrap;
    color: #2c2d2e;
    cursor: pointer;
    display: block;
    padding: 10px 16px;
    text-decoration: none;
    user-select: none;

    &:hover {
      border-bottom-color: #005bd1;
      text-decoration: underline;
      background: #f0f1f3;
    }
  }

  .context__menu_arrow {
    border: 8px solid transparent;
    border-bottom-color: #fff;
    height: 0;
    position: absolute;
    top: -16px;
    left: 20px;
    width: 0;
  }
</style>
