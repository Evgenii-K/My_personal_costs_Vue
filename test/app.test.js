import 'regenerator-runtime/runtime'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import App from '../src/App'
import PaymentList from '../src/components/PaymentList'
import VueRouter from 'vue-router'
import Modal from '../src/plugins/ModalWindow/index'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Modal)
localVue.use(VueRouter)
localVue.use(Vuex)
const router = new VueRouter()

describe('App', () => {

  let getters
  let actions
  let store

  beforeEach(() => {
    getters = {
      getPaymentsListData: jest.fn(() => {
        return [{ id: 4, date: "23.03.2020", category: "Entertaiment", value: 969 }]
      }),

      getPaymentListLength: jest.fn(() => {
        return 1
      })
    }

    actions = {
      fetchPaymentsListLength: jest.fn()
    }

    store = new Vuex.Store({
      getters,
      actions
    })
  })

  test('Click on context', () => {
    const wrapperApp = shallowMount(App, { localVue, router })
    const wrapperList = mount(PaymentList, { localVue, router, store })

    const btnModal = wrapperList.find('[name="btn__context"]')
    btnModal.trigger('click')

    expect(wrapperApp.vm.modalShown).toEqual('context')
  })

  test('Displayed content', () => {
    const wrapperList = mount(PaymentList, { localVue, router, store })

    const currentPage = wrapperList.find('[name="page"]')

    expect(currentPage.text()).toEqual("1")
  })
})
