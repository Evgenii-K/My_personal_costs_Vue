import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsListLength: Number,
    paymentsList: [],
    description: ['Food', 'Shoes', 'Cellular', 'Entertainment', 'Transport']
  },
  mutations: {
    setPaymentsList (state, payload) {
      state.paymentsList = payload
    },
    setPaymentsListLength (state, payload) {
      state.paymentsListLength = payload
    },
    // Удаление элемнета списка
    removeFromState (state, payment) {
      state.paymentsList = state.paymentsList.filter((item) => item !== payment)
    },
    // Изменение элемента списка
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
    // Добавление собственной категории
    editDescription (state, payload) {
      state.description.push(payload)
    }
  },
  getters: {
    getPaymentsListLength: state => state.paymentsListLength,
    getPaymentsListData: state => state.paymentsList,
    getDescription: state => state.description
  },
  actions: {
    // Реализация получения данных с cервера в виде массива объектов
    fetchFromServe ({ commit }, options) {
      const { sortBy, sortDesc, page, itemsPerPage } = options
      fetch(`/getList?page=${page}&sortBy=${sortBy}&sortDesc=${sortDesc}&itemsPerPage=${itemsPerPage}`)
        .then(res => res.json())
        .then(res => Object.values(res))
        .then(res => res.flat())
        .then(list => commit('setPaymentsList', list))
    },
    // Запрос колличества элементов
    fetchPaymentsListLength ({ commit }) {
      fetch('/getLength')
        .then(res => res.json())
        .then(length => commit('setPaymentsListLength', length))
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
    // Удаление элемнета списка
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
    // Изменение элемента списка
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
