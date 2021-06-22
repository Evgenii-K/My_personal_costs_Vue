<template>
  <v-container
    fluid
  >
    <div class="text-h5 text-sm-h3 pb-4">My personal costs</div>
    <v-row>
      <v-col>
        <v-btn
          dark
          color="teal"
          @click="$modal.show('paymentform', { x: 50 + '%', y: 50 + '%', overlay: true })"
        >
          ADD NEW COST
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
        <v-row
          align="center"
          justify="space-between"
        >
          <v-col>
            <v-btn
              dark
              color="teal"
              v-for="(value, key) in descriptionTemplate"
              :key="key"
              :to="`/add/payment/${key}?value=${value}`"
              class="my-2 mr-2"
            >
              {{ key }}
            </v-btn>
          </v-col>
        </v-row>
        <PaymentList />
      </v-col>
      <v-col>
        Chart
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentList from '../PaymentList'

export default {
  components: {
    PaymentList
  },
  data () {
    return {
      showForm: false,
      descriptionTemplate: {
        Food: 200,
        Transport: 50,
        Entertainment: ''
      }
    }
  },
  watch: {
    $route (to) {
      if (to.params.description) {
        this.$modal.show('paymentform', { x: 50 + '%', y: 50 + '%', overlay: true })
      }
    }
  }
}
</script>

<style lang="scss" module>
</style>
