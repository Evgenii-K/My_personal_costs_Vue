import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsListData: {},
    paymentList: []
  },
  mutations: {
    setPaymentsListData (state, payload) {
      state.paymentsListData = payload
    },
    addToList (state, payload) {
      state.paymentList = [...state.paymentList, payload]
    }
  },
  getters: {
    getPaymentListLength: state => Object.entries(state.paymentsListData).length,
    getPaymentsListData: state => pageNumber => {
      return state.paymentsListData[`page${pageNumber}`]
    }
  },
  actions: {
    fetchFromGithub ({ commit }) {
      fetch('https://raw.githubusercontent.com/Evgenii-K/My_personal_costs_Vue/Lesson_4/public/database/paymentList.json')
        .then(res => res.json())
        .then(pages => commit('setPaymentsListData', pages))
    }
  }
})
