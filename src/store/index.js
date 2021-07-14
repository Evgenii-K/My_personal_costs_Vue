import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsListData: {},
    paymentsListLength: Number,
    paymentsList: [],
    paymentsListIDS: [],
    description: ['Food', 'Shoes', 'Cellular', 'Entertainment', 'Transport'],
    paymentsListNew: [],
    paymentsListLengthNew: Number
  },
  mutations: {
    addToPaymentsListData (state, payload) {
      const newUniqObjs = payload.filter(obj => {
        return state.paymentsListIDS.indexOf(obj.id) < 0
      })
      const uniqIDS = newUniqObjs.map(obj => obj.id)
      state.paymentsListIDS.push(...uniqIDS)
      state.paymentsList.push(...newUniqObjs)
    },
    setPaymentListLength (state, payload) {
      state.paymentsListLength = payload
    },
    removeFromState (state, payment) {
      state.paymentsList = state.paymentsList.filter((item) => item !== payment)
      state.paymentsListIDS = state.paymentsListIDS.filter((item) => item !== payment.id)
    },
    editPayment (state, payload) {
      state.paymentsList = state.paymentsList.map(item => {
        if (item.id === payload.id) {
          item = { ...item, ...payload }
          return item
        } else {
          return item
        }
      })
    },
    editDescription (state, payload) {
      state.description.push(payload)
    }
  },
  getters: {
    getPaymentListLength: state => state.paymentsListLength,
    getPaymentsListData: state => state.paymentsList,
    getDescription: state => state.description
  },
  actions: {
    // Реализация получения данных с github в виде массива объектов
    fetchFromGithub ({ commit }) {
      fetch('https://raw.githubusercontent.com/Evgenii-K/My_personal_costs_Vue/Lesson_4/public/database/paymentList.json')
        .then(res => res.json())
        .then(pages => commit('setPaymentsListData', pages))
    },
    // Реализация получения данных с cервера в виде массива объектов
    fetchFromServe ({ commit }, page) {
      fetch(`/getList/${page}`)
        .then(res => res.json())
        .then(res => Object.values(res))
        .then(res => res.flat())
        .then(list => commit('addToPaymentsListData', list))
    },
    // Запрос колличества страниц с сервера
    fetchPaymentsListLength ({ commit }) {
      fetch('/getLength')
        .then(res => res.json())
        .then(length => commit('setPaymentListLength', length))
    },
    // Добавление элемента списка
    async addItem ({ dispatch }, item) {
      await fetch('/addItem', {
        method: 'post',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await dispatch('fetchPaymentsListLength')
    },
    async removeFromList ({ commit, dispatch }, item) {
      await fetch('/removeItem', {
        method: 'post',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await dispatch('fetchPaymentsListLength')
      commit('removeFromState', item)
    },
    editItem ({ commit }, item) {
      fetch('/editItem', {
        method: 'post',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      commit('editPayment', item)
    }
  }
})
