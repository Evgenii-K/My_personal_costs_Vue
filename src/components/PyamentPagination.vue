<template>
  <div>
    <router-link
      :to="{ name: 'pagination', params: { page: currentPage > 1 ? currentPage - 1 : 1}}"
    >
      Previous
    </router-link>
    <router-link
      :to="`/dashboard/${page}`"
      v-for="page in pages"
      :key="'Page' + page"
    >
      {{ page }}
    </router-link>
    <router-link
      :to="{ name: 'pagination', params: { page: getPaymentListLength > currentPage ? currentPage + 1 : currentPage}}"
    >
      Next
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
    }
  },
  computed: {
    ...mapGetters([
      'getPaymentListLength'
    ]),
    pages () {
      const num = this.getPaymentListLength
      return num
    }
  },
  methods: {
    ...mapActions([
      'fetchPaymentsListLength'
    ])
  },
  beforeCreate () {
    this.$router.push({ name: 'pagination', params: { page: 1 } })
  },
  created () {
    this.fetchPaymentsListLength()
  },
  mounted () {
    this.currentPage = this.$route.params.page
  }
}
</script>

<style>

</style>
