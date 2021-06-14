import 'regenerator-runtime/runtime'
import { mount, createLocalVue } from '@vue/test-utils'
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

describe('App with PaymentList', () => {

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

  test('Click on context in PaymentList and float in App', () => {
    const wrapperApp = mount(App, { localVue, router })
    const wrapperList = mount(PaymentList, { localVue, router, store })

    const btnModal = wrapperList.find('[name="btn__context"]')
    btnModal.trigger('click')

    expect(wrapperApp.vm.modalShown).toEqual('context')
  })

  test('Displayed content', () => {
    const wrapperList = mount(PaymentList, { localVue, router, store })

    const currentId = wrapperList.find('[name="id"]')
    const currentDate = wrapperList.find('[name="date"]')
    const currentCategory = wrapperList.find('[name="category"]')
    const currentValue = wrapperList.find('[name="value"]')


    expect(currentId.text()).toBe("1")
    expect(currentDate.text()).toBe("23.03.2020")
    expect(currentCategory.text()).toBe("Entertaiment")
    expect(currentValue.text()).toBe("969")
  })
})
