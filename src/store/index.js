import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsListData: {},
    paymentsListLength: 0,
    paymentList: []
  },
  mutations: {
    // setPaymentsListData (state, payload) {
    //   state.paymentsListData = payload
    // },
    addToPaymentsListData (state, payload) {
      const payloadKey = Object.keys(payload.newPage)[0]
      for (const key of Object.keys(state.paymentsListData)) {
        if (key === payloadKey) return
      }
      state.paymentsListData = { ...state.paymentsListData, ...payload.newPage }
    },
    setPaymentListLength (state, payload) {
      state.paymentsListLength = payload
    }
    // addToList (state, payload) {
    //   state.paymentList = [...state.paymentList, payload]
    // }
  },
  getters: {
    getPaymentListLength: state => state.paymentsListLength,
    getPaymentsListData: state => pageNumber => {
      return state.paymentsListData[`page${pageNumber}`]
    }
  },
  actions: {
    fetchFromGithub ({ commit }) {
      fetch('https://raw.githubusercontent.com/Evgenii-K/My_personal_costs_Vue/Lesson_4/public/database/paymentList.json')
        .then(res => res.json())
        .then(pages => commit('setPaymentsListData', pages))
    },
    fetchFromServe ({ commit }, page) {
      fetch(`/database/${page}`)
        .then(res => res.json())
        .then(list => commit('addToPaymentsListData', { newPage: list }))
    },
    fetchPaymentsListLength ({ commit }) {
      fetch('/lengthList')
        .then(res => res.json())
        .then(length => {
          commit('setPaymentListLength', length)
        })
    }
  }
})
