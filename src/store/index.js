import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsListLength: Number,
    paymentsList: [],
    description: ['Food', 'Shoes', 'Cellular', 'Entertainment', 'Transport'],
    options: {},
    chartData: {
      labels: [],
      datasets: []
    }
  },
  mutations: {
    setPaymentsList (state, payload) {
      state.paymentsList = payload
      state.paymentsList.forEach(item => {
        if (!state.description.includes(item.category)) {
          state.description.push(item.category)
        }
      })
    },
    setPaymentsListLength (state, payload) {
      state.paymentsListLength = payload
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
    async fetchFromServe ({ commit }, options) {
      const { sortBy, sortDesc, page, itemsPerPage } = options
      await fetch(`/getList?page=${page}&sortBy=${sortBy}&sortDesc=${sortDesc}&itemsPerPage=${itemsPerPage}`)
        .then(res => res.json())
        .then(res => Object.values(res))
        .then(res => res.flat())
        .then(list => commit('setPaymentsList', list))
      await fetch('/getChartData')
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
    async removeFromList ({ dispatch }, item) {
      await fetch('/removeItem', {
        method: 'post',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await dispatch('fetchPaymentsListLength')
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
