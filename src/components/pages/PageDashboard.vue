<template>
  <v-container
    fluid
  >
    <div class="text-h5 text-sm-h3 pb-4">My personal costs</div>
    <v-row>
      <v-col>
        <v-dialog
          v-model="paymentForm"
          max-width="350"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              dark
              color="teal"
              v-bind="attrs"
              v-on="on"
            >
              ADD NEW COST
              <v-icon dark>
                mdi-plus
              </v-icon>
            </v-btn>
          </template>
          <Form
            @close="paymentForm = false"
            v-if="paymentForm"
          />
        </v-dialog>
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
              @click="paymentForm = true"
            >
              {{ key }}
            </v-btn>
          </v-col>
        </v-row>
        <PaymentList />
      </v-col>
      <v-col>
        <DoughnutChart />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import PaymentList from '../PaymentList'
import Form from '../modalwindow/Form.vue'
import DoughnutChart from '../DoughnutChart'

export default {
  components: {
    PaymentList,
    Form,
    DoughnutChart
  },
  data () {
    return {
      showForm: false,
      descriptionTemplate: {
        Food: 200,
        Transport: 50,
        Entertainment: ''
      },
      paymentForm: false
    }
  }
}
</script>

<style lang="scss" module>
</style>
