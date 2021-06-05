<template>
  <div :class="$style.wrapper">
    <router-link
      :class="$style.link"
      :to="{ name: 'pagination', params: { page: currentPage > 1 ? currentPage - 1 : 1}}"
    >
      <svg :class="$style.img" width="9" height="14"
        viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M8.99512 2L3.99512 7L8.99512 12L7.99512 14L0.995117 7L7.99512 0L8.99512 2Z" />
      </svg>
    </router-link>
    <router-link
      :class="[$style.link, currentPage === page ? $style.active : '']"
      :to="`/dashboard/${page}`"
      v-for="page in this.getPaymentListLength"
      :key="'Page' + page"
    >
      {{ page }}
    </router-link>
    <router-link
      :to="{ name: 'pagination', params: { page: getPaymentListLength > currentPage ? currentPage + 1 : currentPage}}"
      :class="$style.link"
    >
      <svg
        :class="$style.img"
        width=" 9"
        height="14"
        viewBox="0 0 9 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0.994995 12L5.995 7L0.994995 2L1.995 0L8.995 7L1.995 14L0.994995 12Z" />
      </svg>
    </router-link>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Pagination',
  data () {
    return {
      currentPage: Number
    }
  },
  watch: {
    $route (to) {
      if (to.params.page) {
        this.currentPage = +to.params.page
      }
      this.fetchFromServe(this.currentPage)
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentListLength'
    ])
  },
  methods: {
    ...mapActions([
      'fetchPaymentsListLength', 'fetchFromServe'
    ])
  },
  beforeCreate () {
    this.$router.push({ name: 'pagination', params: { page: 1 } })
  },
  created () {
    this.fetchPaymentsListLength()
  }
}
</script>

<style module lang="scss">
  .wrapper {
    font-family: arial;
    width: 520px;
    height: 20px;
    font-size: 16px;
    font-weight: 500;
    border: 0.1px solid grey;
    border-radius: 5px;
    box-shadow: 3px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
    padding: 10px;
    margin-top: 10px;
  }

  .link {
    text-decoration: none;
    color: black;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 19px;

    &:hover {
      color: lightskyblue;
    }

    &:hover > svg {
      fill: lightskyblue;
    }
  }

  .active {
    color: lightskyblue
  }

  .img {
    fill: black;
    margin: -1px;
  }
</style>
