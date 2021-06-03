<template>
  <div :class="$style.wrapper__context">
    <ul :class="$style.context__menu">
      <li :class="$style.context__item">
        Редактировать
      </li>
      <li :class="$style.context__item">
        Удалить
      </li>
      <span :class="$style.context__menu_arrow" style="left: 20px;"></span>
    </ul>
  </div>
</template>

<script>
export default {

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
    box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 32%);
    list-style: none;
    padding: 8px 0;
    position: absolute;
    transform-origin: 0 0;
    z-index: 20;
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
