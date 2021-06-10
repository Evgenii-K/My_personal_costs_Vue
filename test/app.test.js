import 'regenerator-runtime/runtime'
import { mount, shallowMount, createLocalVue } from '@vue/test-utils'
import App from '../src/App'
import PaymentList from '../src/components/PaymentList'
import VueRouter from 'vue-router'
import Modal from '../src/plugins/ModalWindow/index'

const localVue = createLocalVue()
localVue.use(Modal)
localVue.use(VueRouter)
const router = new VueRouter()

shallowMount(App, {
  localVue,
  router
})

describe('App', () => {
  test('Content of the TestComponent', () => {
    const wrapperApp = mount(App)
    const wrapperList = mount(PaymentList)

    const btnModal = wrapperList.find('.context')
    btnModal.trigger('click')

    expect(wrapperApp.vm.modalShown).toEqual('context')
  })
})