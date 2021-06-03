import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    paymentsListData: {
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
    },
    paymentsListLength: 2,
    paymentList: [],
    newItem: {},
    description: ['Food', 'Shoes', 'Cellular', 'Entertainment', 'Transport']
  },
  mutations: {
    setNewItem (state, payload) {
      state.newItem = payload
    },
    addToPaymentsListData (state, payload) {
      state.paymentsListData = { ...state.paymentsListData, ...payload.newPage }
    },
    setPaymentListLength (state, payload) {
      state.paymentsListLength = payload
    }
  },
  getters: {
    // Запрос колличства страниц
    getPaymentListLength: state => state.paymentsListLength,
    getPaymentsListData: state => pageNumber => {
      return state.paymentsListData[`page${pageNumber}`]
    },
    getDescription: state => state.description
  },
  actions: {
    // Реализация получения данных с github в виде массива объектов
    fetchFromGithub ({ commit }) {
      fetch('https://raw.githubusercontent.com/Evgenii-K/My_personal_costs_Vue/Lesson_4/public/database/paymentList.json')
        .then(res => res.json())
        .then(pages => commit('setPaymentsListData', pages))
    },
    fetchCurrentPage ({ state, dispatch }, page) {
      const currentPage = `page${page}`
      if (!state.paymentsListData[currentPage]) {
        dispatch('fetchFromServe', page)
      }
    },
    fetchFromServe ({ commit }, page) {
      fetch(`/database/${page}`)
        .then(res => res.json())
        .then(list => commit('addToPaymentsListData', { newPage: list }))
    },
    // Запрос колличества страниц с сервера
    fetchPaymentsListLength ({ commit }) {
      fetch('/lengthList')
        .then(res => res.json())
        .then(length => {
          commit('setPaymentListLength', length)
        })
    },
    async addItem ({ dispatch }, item) {
      await fetch('/addToList', {
        method: 'post',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      await dispatch('fetchPaymentsListLength')
    }
  }
})
