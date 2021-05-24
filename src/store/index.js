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
    setPaymentList (state, payload) {
      state.paymentList = payload
    },
    addToList (state, payload) {
      state.paymentList = [...state.paymentList, payload]
    }
  },
  getters: {
    getPaymentList: state => state.paymentList
  },
  actions: {
    fetchData ({ commit }) {
      const pages = {
        page1: [
          { id: 1, date: '20.03.2020', category: 'Food', value: 169 },
          { id: 2, date: '21.03.2020', category: 'Navigation', value: 50 },
          { id: 3, date: '22.03.2020', category: 'Sport', value: 450 }
        ],
        page2: [
          { id: 4, date: '23.03.2020', category: 'Entertaiment', value: 969 },
          { id: 5, date: '24.03.2020', category: 'Education', value: 1500 },
          { id: 6, date: '25.03.2020', category: 'Food', value: 200 }
        ]
      }
      commit('setPaymentsListData', pages)
    },
    fetchPaymentList ({ commit }) {
      const list = [
        {
          date: '13.05.2021',
          category: 'Food',
          value: '3500'
        },
        {
          date: '14.05.2021',
          category: 'Shoes',
          value: '4200'
        },
        {
          date: '13.05.2021',
          category: 'Cellular',
          value: '440'
        }
      ]
      commit('setPaymentList', list)
    }
  }
})
